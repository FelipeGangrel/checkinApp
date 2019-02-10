import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { colors } from "../../../colors";
import Dashboard from "../../../screens/dashboard";
import Checkin from "../../../screens/checkin";

export default createMaterialTopTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: "Dashboard",
        tabBarIcon: ({tintColor}) => {
          return (
            <MaterialIcons name="dashboard" size={25} color={tintColor} />
          )
        }
      }
    },
    Checkin: {
      screen: Checkin,
      navigationOptions: {
        tabBarLabel: "Chekin",
        tabBarIcon: ({tintColor}) => {
          let iconName = `${Platform.OS === "ios" ? "ios" : "md"}-list`;
          return (
            <Ionicons name={iconName} size={25} color={tintColor} />
          )
        }
      }
    }
  },
  {
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: colors.primary.base,
      inactiveTintColor: "#999",
      showLabel: false,
      showIcon: true,
      style: {
        // paddingBottom: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
        // paddingVertical: 15,
        borderTopWidth: 0,
        // backgroundColor: colors.light.base,
        backgroundColor: "white",
        //== ios
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 5,
        shadowColor: "black",
        shadowOpacity: 0.1,
        // == android
        elevation: 15,
      },
      indicatorStyle: {
        width: 0,
      }
    }
  }
);