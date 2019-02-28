import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../colors";

export default class CheckinTotais extends React.Component {

  render() {

    const { total, presentes } = this.props;

    return (
      <View style={{ width: "100%", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={ styles.textTitle }>{presentes}</Text>
          <Text style={ styles.textSubtitle }>Presentes</Text>
        </View>
        <MaterialIcons name="group" size={ 35 } color={ colors.light.alternative } /> 
        <View style={{ alignItems: "center" }}>
          <Text style={ styles.textTitle }>{total}</Text>
          <Text style={ styles.textSubtitle }>Tickets</Text>
        </View>
      </View>
    )

  }

}

export const styles = StyleSheet.create({
  textTitle: {
    fontSize: 30, 
    color: colors.primary.base
  },
  textSubtitle: {
    color: colors.light.alternative
  }
});