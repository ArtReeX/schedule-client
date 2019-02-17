// imports
import React from "react";
import { View, Picker } from "react-native";
import { Card, Text } from "react-native-elements";

// classes
class CSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: "bachelor", course: 1, group: "pi" };
  }
  render() {
    const style = { textAlign: "center", fontWeight: "bold" };
    return (
      <Card title="ВАШИ НАСТРОЙКИ">
        <View nativeID="level">
          <Text style={style}>Степень</Text>
        </View>
        <View nativeID="course">
          <Text style={style}>Курс</Text>
        </View>
        <View nativeID="group">
          <Text style={style}>Группа</Text>
        </View>
      </Card>
    );
  }
}

// exports
export default CSetting;
