import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { colors } from "../../colors";
import Swipeable from "react-native-swipeable";
import { MaterialIcons } from "@expo/vector-icons";

export default class CredenciadoItem extends React.PureComponent {

  swipeable = null;

  constructor(props) {
    super(props);
  }

  _resetSwipeablePosition = () => {
    this.swipeable.recenter();
  };

  // este método se comunica com o componente pai
  _handleRightButtonPress = () => {
    const { id, eticket } = this.props.credenciado;
    this.props.onCredenciadoUpdate({
      id,
      eticket,
      presente: true,
    });
  };

  _handleLeftButtonPress = () => {
    const { id, eticket } = this.props.credenciado;
    this.props.onCredenciadoUpdate({
      id,
      eticket,
      presente: false,
    });
  };

  // este método se comunica com o componente pai
  _handleOnPress = () => {
    this.props.onPress(this.props.credenciado);
  }

  render() {

    const { credenciado } = this.props;

    const that = this;
    setTimeout(function () {
      that._resetSwipeablePosition();
    }, 500);

    let checkIcon = { name: "done", color: "#2ecc71" };
    if (!credenciado.presente)
      checkIcon = { ...checkIcon, ...{ color: "transparent" } };

    const backgroundColor = credenciado.presente ? "#e74c3c" : "#2ecc71";

    let color = "#FFFFFF";

    const leftContent = ([
      <TouchableOpacity onPress={this._handleLeftButtonPress}
        style={[styles.buttons, { backgroundColor: "#e74c3c", alignItems: "flex-end" }]}
      >
        <View style={[styles.buttonContent]}>
          <MaterialIcons name="close" size={25} color={color} />
          <Text style={{ color: color, fontSize: 10 }}>FAZER CHECK-OUT</Text>
        </View>
      </TouchableOpacity>
    ]);

    const rightContent = ([
      <TouchableOpacity onPress={this._handleRightButtonPress}
        style={[styles.buttons, { backgroundColor: "#2ecc71" }]}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="check" size={25} color={color} />
          <Text style={{ color: color, fontSize: 10 }}>FAZER CHECK-IN</Text>
        </View>
      </TouchableOpacity>
    ]);

    

    const title = <Text numberOfLines={1}>{credenciado.nome}</Text>;
    const subtitle = <Text numberOfLines={1}>{credenciado.email}</Text>

    return (
      <Swipeable onRef={ref => this.swipeable = ref}
        leftButtons={leftContent}
        leftButtonWidth={110}
        leftButtonsActivationDistance={30}
        rightButtons={rightContent}
        rightButtonWidth={110}
        rightButtonsActivationDistance={30}
      >
        <ListItem
          roundAvatar
          leftAvatar={{ source: { uri: credenciado.avatar.thumbnail } }}
          title={title}
          subtitle={subtitle}

          rightIcon={checkIcon}
          containerStyle={{ marginVertical: 0, borderBottomColor: "#e5e5e5" }}
          onPress={this._handleOnPress}
        />
      </Swipeable>
    );
  }

}

const styles = StyleSheet.create({
  searchView: {
    flex: 0,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    elevation: 30
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 110,
  }
});
