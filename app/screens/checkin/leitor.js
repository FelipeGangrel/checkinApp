import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SafeAreaView, View } from "react-native";
import API_URL from "../../reducers/api-paths";
import QrReader from "../../components/checkin/qr-reader";

class Leitor extends React.Component {

  static navigationOptions = {
    title: "Capturar QR Code", 
  }

  state = {
    processando: false,
  };

  _onScanned = object => {
    const { data } = object;
    if (!this.state.processando) {
      this._fetchTicketInfo(data);
    }
  }

  _fetchTicketInfo = eticket => {

    this.setState({
      processando: true
    });

    const { activeEvent, activeAmbiente, navigation } = this.props;

    let fetchUrl = `${API_URL}Api/Controller/APIExterna/AppCheckin/Credenciados.php?functionPage=CheckEticket`;
    fetchUrl += `&eticket=${eticket}&evento=${activeEvent.id}`;
    if (activeAmbiente != null) fetchUrl += `&ambiente=${activeAmbiente.id}`;

    axios
      .get(fetchUrl)
      .then(response => {
        this.setState({
          processando: false,
        });

        if (response.data.success) {
          const credenciado = response.data.data[0];
          navigation.navigate("Credenciado", { credenciado });
        } else {
          alert(response.data.msg);
        }
      })
      .catch(error => {
        console.log('ERRO AO OBTER ETICKET', error);
      });

  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <QrReader onScanned={this._onScanned} />
        </SafeAreaView>
      </View>
    )
  };

}

const mapStateToProps = state => ({
  activeEvent: state.eventos.activeEvent,
  activeAmbiente: state.eventos.activeAmbiente,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Leitor);