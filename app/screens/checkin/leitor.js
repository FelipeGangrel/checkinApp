import React from "react";
import { SafeAreaView, View } from "react-native";
import QrReader from "../../components/checkin/qr-reader";

export default class Leitor extends React.Component {

  static navigationOptions = {
    title: "Capturar QR Code", 
  }

  _onScanned = object => {
    const { navigation } = this.props;
    const { data } = object;
    navigation.navigate('QrCodeProcessing', { eticket: data });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <QrReader onScanned={this._onScanned} />
        </SafeAreaView>
      </View>
    )
  }
}