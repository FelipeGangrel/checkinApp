import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import API_URL from "../../reducers/api-paths";
import { colors } from "../../colors";
import Button from "../../components/button";

class VerificarEticket extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Processando QR code`,
    };
  };


  constructor(props) {
    super(props);
    this.state = {
      eticket: this.props.navigation.getParam("eticket"),
    };
  }

  _fetchTicketInfo = () => {
    const { eticket } = this.state;
    const { activeEvent, activeAmbiente } = this.props;
    const { navigation } = this.props;

    let fetchUrl = `${API_URL}Api/Controller/APIExterna/AppCheckin/Credenciados.php?functionPage=CheckEticket`;
    fetchUrl += `&eticket=${eticket}&evento=${activeEvent.id}`;
    if (activeAmbiente != null) fetchUrl += `&ambiente=${activeAmbiente.id}`;

    console.log('fetchUrl', fetchUrl);

    axios
      .get(fetchUrl)
      .then(response => {
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

    const { eticket } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
        
          <View style={styles.containerScreen}>
            <View style={styles.containerEticket}>
              <View style={styles.eticketBox}>
                <Text style={styles.eticket}>{eticket}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexBasis: 100, alignSelf: "center", width: "80%" }}>
            <Button
              title="VERIFICAR E-TICKET"
              variant="primary"
              block
              rounded
              large
              elevated
              onPress={this._fetchTicketInfo} />
          </View>


        </SafeAreaView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  containerEticket: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  eticketBox: {
    borderWidth: 4,
    borderColor: colors.primary.base,
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  eticket: {
    fontSize: 20,
    color: colors.primary.base,
  }
});

const mapStateToProps = state => ({
  activeEvent: state.eventos.activeEvent,
  activeAmbiente: state.eventos.activeAmbiente,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificarEticket);