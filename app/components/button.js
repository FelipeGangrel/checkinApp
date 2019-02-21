import React from "react";
import { 
  StyleSheet,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Text } from "native-base";
import { colors } from "../colors";
import Spinning from "./spinning";

export default class MyButton extends React.Component {

  render() {
    let { onPress, variant, title, block, rounded, large, elevated, disabled, isLoading } = this.props;

    function setTextColor(variant = "primary") {
      return colors[variant].dark ? colors.light.base : colors.dark.base;
    }

    let text = {
      color: setTextColor(variant),
    }

    let backgroundColor = colors[`${variant}`].base;

    let button = {}

    let elevatedButton = {
      // ios
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowColor: "black",
      shadowRadius: 15,
      // android
      elevation: 5,
    }

    if (elevated) button = { ... button, ... elevatedButton }
  
    const styles = {
      button,
      text,
    }

    const Content = isLoading 
      ? <Spinning>
          <FontAwesome name="spinner" size={35} />
        </Spinning>
      : <Text style={styles.text}>{title}</Text>

    return (
      <View style={{flex: 0, marginVertical: 20 }}>
        <Button 
          light
          onPress={onPress} 
          block={block} 
          rounded={rounded} 
          large={large} 
          disabled={disabled} 
          style={[styles.button, { backgroundColor: disabled ? `${backgroundColor}FF` : backgroundColor }] }>
          {Content}
        </Button>
      </View>
    )
  }

}
