import React from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"
import { colors } from "../../colors";
import DrawerButton from "../../components/drawer-button";
import CheckinChartPercentual from "../../components/dashboard/checkin-chart-percentual";
import CheckinTotais from "../../components/dashboard/checkin-totais";
import { connect } from "react-redux";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Dashboard",
    headerLeft: <DrawerButton navigation={navigation} />
  });

  constructor(props) {
    super(props);
  }
  
  render() {

    const { credenciadosPresentes, credenciadosTotal, 
      activeEvent, activeAmbiente } = this.props;

    let percentual = Number(credenciadosPresentes) / Number(credenciadosTotal);
    if (isNaN(percentual)) percentual = 0;

    const evento = <Text style={styles.eventoText}>{activeEvent.nome}</Text>;
    const ambiente = activeAmbiente != null ? <Text>{activeAmbiente.nome}</Text> : <View></View>;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.evento}>
          {evento}
          {ambiente}
        </View>
        <View style={styles.mainRow}>
          <CheckinChartPercentual percentual={percentual} />
          <CheckinTotais total={credenciadosTotal} presentes={credenciadosPresentes} />
        </View>
        <TouchableOpacity style={styles.fab}
          onPress={() => {
            this.props.navigation.navigate("Leitor");
          }}
        >
          <Ionicons size={30} name="md-qr-scanner" color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  evento: {
    paddingVertical: 10,
    flex: 0,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    alignContent: "center",
  },
  eventoText: {
    color: colors.light.base,
    paddingVertical: 5,
    textAlign: "center",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.primary.base,
  },
  mainRow: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    alignContent: "center",
    paddingBottom: 50,
  },
  fab: {
    backgroundColor: colors.primary.base,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    right: 30,
    borderRadius: 50,
    // ios
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowColor: "black",
    shadowRadius: 5,
    // android
    elevation: 5
  }
});

const mapStateToProps = state => ({
  activeEvent: state.eventos.activeEvent,
  activeAmbiente: state.eventos.activeAmbiente,
  credenciadosTotal: state.credenciados.credenciadosTotal,
  credenciadosPresentes: state.credenciados.credenciadosPresentes,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);