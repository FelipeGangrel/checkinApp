import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { colors } from "../../colors";
import Swipeable from "react-native-swipeable";
import { MaterialIcons } from "@expo/vector-icons";

export default class CredenciadoItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      leftActionActivated: false,
    };
  }

  _navigateToCredenciado = () => {
   const { navigation } = this.props;
  }

  // este método se comunica com o componente pai
  _handleOnLeftSwipeComplete = () => {
    const { id, presente } = this.props.credenciado;
    // this.setState({ presente: !presente });
    this.props.onCredenciadoUpdate({
      id,
      presente: !presente,
    });
  };

  // este método se comunica com o componente pai
  _handleOnPress = () => {
    this.props.onPress(this.props.credenciado);
  }

  render() {
    const { leftActionActivated } = this.state;
    const { credenciado } = this.props;

    let checkIcon = { name: "done", color: "#2ecc71" };
    if (!credenciado.presente)
      checkIcon = { ...checkIcon, ...{ color: "transparent" } };

    let backgroundColor;

    let color = "#FFFFFF";
    if (!leftActionActivated) {
      backgroundColor = colors.light.base;
      color = "#999999";
    } else if (credenciado.presente) {
      backgroundColor = "#e74c3c";
    } else {
      backgroundColor = "#2ecc71";
    }

    const leftContent = (
      <View
        style={[styles.leftSwipeItem, { backgroundColor: backgroundColor }]}
      >
        {credenciado.presente ? (
          <MaterialIcons name="close" size={25} color={color} />
        ) : (
          <MaterialIcons name="check" size={25} color={color} />
        )}
      </View>
    );
    
    const title = <Text numberOfLines={1}>{credenciado.nome}</Text>;
    const subtitle = <Text numberOfLines={1}>{credenciado.email}</Text>

    return (
      <Swipeable
        leftActionActivationDistance={150}
        leftContent={leftContent}
        onLeftActionActivate={() =>
          this.setState({ leftActionActivated: true })
        }
        onLeftActionDeactivate={() =>
          this.setState({ leftActionActivated: false })
        }
        onLeftActionComplete={this._handleOnLeftSwipeComplete}
      >
        <ListItem
          roundAvatar
          leftAvatar={{ source: { uri: credenciado.avatar.thumbnail }}}
          title={title}
          subtitle={subtitle}
          
          rightIcon={checkIcon}
          containerStyle={{ marginVertical: 0, borderBottomColor: "#e5e5e5" }}
          onPress={ this._handleOnPress }
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
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20
  }
});
