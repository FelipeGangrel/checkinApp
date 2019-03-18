import React from "react";
import { Text, View, Dimensions } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import { colors } from "../../colors";

export default class CheckinChartPercentual extends React.PureComponent {

  
  
  render() {
    const screenHeight = Dimensions.get('window').height;

    let progressCircleHeight = screenHeight / 2.5;
    if (progressCircleHeight > 250) progressCircleHeight = 250;

    const percentualFontSize = screenHeight / 9;
    
    const progress = Number(this.props.percentual);
    const progressText = Number(progress * 100).toFixed(1);

    return (
      <View>
        <ProgressCircle 
          style={{ height: progressCircleHeight}}
          progress={ progress } 
          progressColor={ colors.primary.base }
          backgroundColor={ colors.light.base }
          strokeWidth={ 10 }
        />
        <View style={{ height: progressCircleHeight, width: "100%", position: "absolute", 
          justifyContent: "center", alignItems: "center" }}>
          <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
            <Text style={{ fontSize: percentualFontSize, color: colors.light.alternative }}>{ progressText  }</Text>
            <Text style={{ fontSize: percentualFontSize / 2, lineHeight: percentualFontSize, color: colors.light.alternative }}>%</Text>
          </View>
          <Text style={{ color: colors.light.alternative }}>Tickets presentes</Text>
        </View>
        
      </View>

    )
    
  } 

}