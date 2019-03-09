import React from "react";
import { Text, View } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import { colors } from "../../colors";

export default class CheckinChartPercentual extends React.PureComponent {

  render() {
    
    const progress = Number(this.props.percentual);
    const progressText = Number(progress * 100).toFixed(1);

    return (
      <View>
        <ProgressCircle 
          style={{ height: 250}}
          progress={ progress } 
          progressColor={ colors.primary.base }
          backgroundColor={ colors.light.base }
          strokeWidth={ 10 }
        />
        <View style={{ height: 250, width: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }}>
          <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
            <Text style={{ fontSize: 80, color: colors.light.alternative }}>{ progressText  }</Text>
            <Text style={{ fontSize: 40, lineHeight: 100, color: colors.light.alternative }}>%</Text>
          </View>
          <Text style={{ color: colors.light.alternative }}>Tickets presentes</Text>
        </View>
        
      </View>

    )
    
  } 

}