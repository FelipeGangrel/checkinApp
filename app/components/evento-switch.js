import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { eventosActions } from "../reducers/eventos";
import { colors } from "../colors";

@connectActionSheet 
class EventoSwitch extends React.Component {

  _openActionSheet = () => {
    const { events } = this.props;
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
  }

  _eventSelected = eventIndex => {
    const { events, switchActiveEvent } = this.props;
    const evento = events[eventIndex];
    switchActiveEvent(evento);
  }

  _renderButton = () => {
   const { events } = this.props;

   if (events.length > 1) {
     return(
        <TouchableOpacity onPress={this._openActionSheet}>
          <Entypo name="chevron-down" size={25} color="white" />
        </TouchableOpacity>
     ) 
   }
   
  }

  render() {
    const { activeEvent } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.nome}>{activeEvent.nome}</Text>
        { this._renderButton() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: colors.primary.base
  },
  nome: {
    color: "white"
  }
});

const mapStateToProps = state => ({
  activeEvent: state.eventos.activeEvent,
  events: state.eventos.events,
});

const mapDispatchToProps = dispatch => ({
  switchActiveEvent: event => dispatch(eventosActions.swithActiveEvent(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventoSwitch);
