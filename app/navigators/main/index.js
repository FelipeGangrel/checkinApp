import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";
import DrawerContent from "./drawer-content";
import Tabs from "./tabs";
import Preferences from "../../screens/preferences";

const drawerNavigator = createDrawerNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      drawerLabel: "Início",
      drawerIcon: ({ tintColor }) => {
        return (
          <MaterialIcons name="dashboard" color={tintColor} />
        )
      }
    }
  },
  Preferences: {
    screen: Preferences,
    navigationOptions: {
      drawerLabel: "Preferências",
      drawerIcon: ({ tintColor }) => {
        let iconName = `${Platform.OS === "ios" ? "ios" : "md"}-options`;
        return (
          <Ionicons name={iconName} color={tintColor} />
        )
      }
    }
  }
},{
  contentComponent: (props) => {
    return (
      <DrawerContent { ... props } />
    )
  },
  initialRouteName: "Tabs",
  contentOptions: {
    activeTintColor: colors.primary.base,
  }
});

export default drawerNavigator;