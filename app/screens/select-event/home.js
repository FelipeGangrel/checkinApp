import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Button from "../../components/button";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { eventosActions } from "../../reducers/eventos";
import { colors } from "../../colors";

@connectActionSheet
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventoNome: "Selecione um evento",
      activeEvent: {},
      enableContinueButton: false,
    };
  }

  _eventSelected = eventIndex => {
    const { events } = this.props.eventos;
    const event = events[eventIndex];
    this.setState({
      eventoNome: event.nome,
      activeEvent: event,
      enableContinueButton: true
    });
  };

  _openActionSheet = () => {
    const { events } = this.props.eventos;
    const eventNames = events.map(event => event.nome);
    const options = [...eventNames, ...["Cancelar"]];

    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        if (buttonIndex !== cancelButtonIndex) {
          this._eventSelected(buttonIndex);
        }
      }
    );
  };

  _renderMessage = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <Text style={styles.mensagem}>
          Você está associado a mais de um evento. Para continuar, selecione um
          evento
        </Text>
      </View>
    );
  };

  _switchActiveEvent = () => {
    const { switchActiveEvent } = this.props;
    switchActiveEvent(this.state.activeEvent);
  };

  _renderButton = () => {
    return this.state.enableContinueButton ? (
      <Button
        title="CONTINUAR"
        block
        rounded
        large
        elevated
        variant="light"
        onPress={this._switchActiveEvent}
      />
    ) : null;
  };

  render() {
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={[colors.primary.base, colors.primary.alternative]}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.containerScreen}>
            <View style={styles.content}>
              {this._renderMessage()}
              <TouchableOpacity
                style={styles.selectEvent}
                onPress={this._openActionSheet}
              >
                <Text style={styles.selectEventText}>
                  {this.state.eventoNome}
                </Text>
                <Entypo
                  name="chevron-down"
                  color={colors.light.base}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexBasis: 100, alignSelf: "center", width: "80%" }}>
            {this._renderButton()}
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  containerScreen: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },
  content: {
    flex: 0.8,
    alignItems: "stretch",
    justifyContent: "center"
  },
  selectEvent: {
    flexBasis: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mensagem: {
    color: colors.light.base,
    textAlign: "center",
    fontSize: 18
  },
  selectEventText: {
    color: colors.light.base
  }
});

const mapStateToProps = state => ({
  eventos: state.eventos
});

const mapDispatchToProps = dispatch => ({
  switchActiveEvent: event => dispatch(eventosActions.switchActiveEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
