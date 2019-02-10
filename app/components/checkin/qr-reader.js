import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarCodeScanner, Camera, Permissions } from "expo";
import { colors } from "../../colors";

export default class QrReader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {

    const { hasCameraPermission } = this.state;

    let Layout;

    switch(hasCameraPermission) {
      case null:
        Layout = (
          <Text>Nos dê permissão para usar sua câmera</Text>
        ); break;
      case false:
        Layout = (
          <Text>Você não deu permissões para uso da câmera</Text>
        ); break;
      case true:
        Layout = (
          <View style={{ flex: 1, alignItems: "stretch"}} >
            <View style={styles.readerArea}>
              <BarCodeScanner 
                onBarCodeScanned={this._handleBarCodeScanned} 
                style={[StyleSheet.absoluteFill]} 
              />
              <View style={styles.mask}></View>
            </View>
          </View>
        ); break;
    }

    return Layout;
  }

  // enviando evento para o componente pai em leitor.js
  _handleBarCodeScanned = ({ type, data }) => {
    this.props.onScanned({ data });
  }
  
}


const styles = StyleSheet.create({
  readerArea: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  mask: {
    flex: 0,
    position: "absolute",
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  }

});