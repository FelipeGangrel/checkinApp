import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { colors } from "../../colors";
import Button from "../../components/button";

export default class QrCodeProcessing extends React.Component {

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
              elevated />
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