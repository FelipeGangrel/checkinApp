import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { EvilIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { eventosActions } from "../../reducers/eventos";
import styles from "./styles";

@connectActionSheet
class EventoListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  _eventSelected = activeEvent => {
    const { switchActiveEvent } = this.props;
    switchActiveEvent(activeEvent);
  }

  _handleOnPress = () => {
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
          this._eventSelected(events[buttonIndex]);
        }
      }
    );
  }

  render() {

    const { activeEvent } = this.props;

    const ellipsis = activeEvent.nome.length > 23 ? "..." : "";
    const eventNome = `${activeEvent.nome.substring(0, 20)}${ellipsis}`;

    return (
      <View style={styles.listItem}>
        <Text>Evento</Text>
        <TouchableOpacity style={styles.option} onPress={this._handleOnPress}>
          <Text style={styles.optionText}>{eventNome}</Text>
          <EvilIcons name="chevron-right" size={styles.iconSize} color={styles.iconColor} />
        </TouchableOpacity>
      </View>
    );
  }

}

const mapStateToProps = state => ({
  events: state.eventos.events,
  activeEvent: state.eventos.activeEvent,
});

const mapDispatchToProps = dispatch => ({
  switchActiveEvent: event => dispatch(eventosActions.switchActiveEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventoListItem);

