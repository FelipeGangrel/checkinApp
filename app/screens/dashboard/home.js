import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
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

    const { credenciadosPresentes, credenciadosTotal } = this.props;
    console.log('credenciadosPresentes', credenciadosPresentes);
    console.log('credenciadosTotal', credenciadosTotal);
    const percentual = credenciadosPresentes / credenciadosTotal;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainRow}>
          <CheckinChartPercentual percentual={percentual} />
          <CheckinTotais total={credenciadosTotal} presentes={credenciadosPresentes} />
        </View>
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainRow: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    alignContent: "center"
  },
});

const mapStateToProps = state => ({
  credenciadosTotal: state.credenciados.credenciadosTotal,
  credenciadosPresentes: state.credenciados.credenciadosPresentes,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);