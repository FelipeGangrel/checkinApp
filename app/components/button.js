import React from "react";
import { 
  StyleSheet,
  View,
} from "react-native";

import { Button, Text } from "native-base";
import { colors } from "../colors";

export default class MyButton extends React.Component {

  render() {
    let { onPress, variant, title, block, rounded, large, elevated, disabled } = this.props;

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

          <Text style={styles.text}>{title}</Text>
        </Button>
      </View>
    )
  }

}
