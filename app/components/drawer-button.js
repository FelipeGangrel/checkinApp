import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class DrawerButton extends React.Component {
  render() {

    const iconName = `${Platform.OS === "ios" ? "ios" : "md"}-menu`;

    return (
      <TouchableOpacity onPress={ () => this.props.navigation.toggleDrawer() }>
        <Ionicons name={iconName} size={35} style={{ marginLeft: 15 }}  />
      </TouchableOpacity>
    )
  }
}

