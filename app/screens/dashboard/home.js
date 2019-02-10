import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import DrawerButton from "../../components/drawer-button";
import CheckinChartPercentual from "../../components/dashboard/checkin-chart-percentual";
import CheckinTotais from "../../components/dashboard/checkin-totais";

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Dashboard",
    headerLeft: <DrawerButton navigation={navigation} />
  });

  render() {

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainRow}>
          <CheckinChartPercentual />
          <CheckinTotais />
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
