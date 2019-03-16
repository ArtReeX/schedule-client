import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text } from "react-native-elements";

class CInfoString extends React.PureComponent {
  getCurrentLesson(lessons) {
    const currentTimeNumber = Number(
      new Date().toLocaleTimeString("ru-RU").replace(/\D+/g, "")
    );

    for (let count = 0; count < lessons.length; count += 1) {
      const {
        beginTime,
        endTime,
        subject: { name }
      } = lessons[count];

      const beginTimeNumber = Number(beginTime.replace(/\D+/g, ""));
      const endTimeNumber = Number(endTime.replace(/\D+/g, ""));

      if (beginTimeNumber < currentTimeNumber < endTimeNumber) {
        return name;
      }
    }

    return "-";
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ textAlign: "center" }}>Текущая пара:</Text>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {this.getCurrentLesson(this.props.store.schedule)}
        </Text>
      </View>
    );
  }
}

export default connect(state => ({ store: state }))(CInfoString);
