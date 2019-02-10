import React from "react";
import { Text, View } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import { colors } from "../../colors";

export default class CheckinChartPercentual extends React.PureComponent {

  render() {

    let progress = 0.7;

    return (

      <View>
        <ProgressCircle 
          style={{ height: 300 }}
          progress={ progress } 
          progressColor={ colors.primary.base }
          backgroundColor={ colors.light.base }
          strokeWidth={ 10 }
        />
        <View style={{ height: 300, width: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }}>
          <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
            <Text style={{ fontSize: 100, color: colors.light.alternative }}>{ progress * 100 }</Text>
            <Text style={{ fontSize: 50, lineHeight: 100, color: colors.light.alternative }}>%</Text>
          </View>
          <Text style={{ color: colors.light.alternative }}>Credenciados presentes</Text>
        </View>
        
      </View>


     
    )
    
  } 

}