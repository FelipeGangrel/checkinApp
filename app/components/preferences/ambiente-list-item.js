import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { EvilIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { eventosActions } from "../../reducers/eventos";
import styles from "./styles";

@connectActionSheet
class AmbienteListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  _eventSelected = activeAmbiente => {
    const { switchActiveAmbiente } = this.props;
    switchActiveAmbiente(activeAmbiente);
  }

  _handleOnPress = () => {
    const { activeEvent } = this.props;
    const ambientesNames = activeEvent.ambientes.map(ambiente => ambiente.descricao);
    const options = [...["Todos"], ...ambientesNames, ...["Cancelar"]];


    const cancelButtonIndex = options.length - 1;
    const TodosButtonIndex = 0;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        if (buttonIndex !== cancelButtonIndex) {
          const activeAmbiente = buttonIndex != TodosButtonIndex
            ? activeEvent.ambientes[buttonIndex - 1]
            : null;
          this._eventSelected(activeAmbiente);
        }
      }
    );
  }

  render() {

    const { activeAmbiente } = this.props;

    const nome = activeAmbiente != null ? activeAmbiente.descricao : "Todos";
    const ellipsis = nome.length > 23 ? "..." : "";
    const ambienteNome = `${nome.substring(0, 20)}${ellipsis}`;

    return (
      <View style={styles.listItem}>
        <Text>Ambiente</Text>
        <TouchableOpacity style={styles.option} onPress={this._handleOnPress}>
          <Text style={styles.optionText}>{ambienteNome}</Text>
          <EvilIcons name="chevron-right" size={styles.iconSize} color={styles.iconColor} />
        </TouchableOpacity>
      </View>
    );
  }

}

const mapStateToProps = state => ({
  activeEvent: state.eventos.activeEvent,
  activeAmbiente: state.eventos.activeAmbiente,
});

const mapDispatchToProps = dispatch => ({
  switchActiveAmbiente: ambiente => dispatch(eventosActions.switchActiveAmbiente(ambiente)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AmbienteListItem);

