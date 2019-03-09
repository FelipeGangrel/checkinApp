import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { colors } from "../../colors";
import { credenciadosActions } from "../../reducers/credenciados";
import Button from "../../components/button";

class Credenciado extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const credenciado = navigation.getParam("credenciado", "Detalhes");
    return {
      title: credenciado.nome
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      credenciado: this.props.navigation.getParam("credenciado")
    };
  }

  _handlePresencaSwitch = () => {
    
    const presente = !this.state.credenciado.presente;

    const { updateCredenciado } = this.props;

    const credenciado = Object.assign({}, this.state.credenciado, {
      presente
    });

    this.setState({
      credenciado
    });

    updateCredenciado(credenciado);
  };


  _renderCardMain = () => {
    const { credenciado } = this.state;

    const buttonTitle = credenciado.presente
      ? "FAZER CHECK-OUT" : "FAZER CHECK-IN";
    
    const colorVariant = credenciado.presente
      ? "dark" : "success";

    return (
      <Card containerStyle={[styles.card, {marginTop: 50 }]}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.cardAvatarImage}
            source={{ uri: credenciado.avatar.thumbnail }}
          />
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={styles.textHeader1}>{this.state.credenciado.nome}</Text>
            <Text>{credenciado.email}</Text>
          </View>
        </View>
        <View style={{ flex: 0, marginTop: 10 }}>
          <Button 
            title={buttonTitle}
            variant={colorVariant}
            block
            rounded
            large
            onPress={this._handlePresencaSwitch} />
        </View>
      </Card>
    );
  };

  _renderIngressoInfo = () => {
    const { credenciado } = this.state;
    return (
      <Card containerStyle={[styles.card, { backgroundColor: colors.primary.base }]}>
        <View style={[styles.cardLinha, {justifyContent: "space-between", marginBottom: 30}]}>
          <Text style={[{ color: "white", }]}>Código do E-Ticket</Text>
          <Text style={[styles.textHeader1, { color: "white", }]}>{credenciado.eticket}</Text>
        </View>
        <View style={[styles.cardLinha, {justifyContent: "space-between"}]}>
          <Text style={[{ color: "white", }]}>Ingresso</Text>
          <Text style={[styles.textHeader1, { color: "white", }]}>{credenciado.ingresso}</Text>
        </View>
      </Card>
    )
  };

  _renderCardNecEspeciais = () => {
    const { credenciado } = this.state;
    return (
      <Card containerStyle={styles.card}>
        <View style={[styles.cardLinha, {justifyContent: "space-between"}]}>
          <Text>Portador de necessidades especiais</Text>
          <Text style={{ marginLeft: 10 }}>{ credenciado.necessidadesEspeciais ? "SIM" : "NÃO" }</Text>
        </View>
      </Card>
    )
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.heroView} />
          <ScrollView style={styles.scrollView}>
            {this._renderCardMain()}
            {this._renderIngressoInfo()}
            {this._renderCardNecEspeciais()}
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textHeader1: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textLight: {
    color: colors.light.alternative
  },
  safeAreaView: {
    flex: 1,
    position: "relative",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
  },
  heroView: {
    flex: 1,
    backgroundColor: colors.primary.base,
    position: "absolute",
    width: "100%",
    height: 150
  },
  scrollView: {
    flex: 1,
    overflow: "visible",
    paddingBottom: 50,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    marginVertical: 0,
    marginBottom: 20,
    //== ios
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    // == android
    elevation: 3,
  },
  cardLinha: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  cardAvatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100
  }
});

const mapStateToProps = state => ({
  credenciados: state.credenciados
});

const mapDispatchToProps = dispatch => ({
  updateCredenciado: credenciado =>
    dispatch(credenciadosActions.updateCredenciado(credenciado))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Credenciado);
