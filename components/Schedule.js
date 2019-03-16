import React from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { ListItem } from "react-native-elements";

class CSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  nameToIcon(name) {
    name = name.toLowerCase();

    if (name.indexOf("физкультура") !== -1) return "accessibility";
    if (name.indexOf("экономика") !== -1) return "timeline";
    if (name.indexOf("базы") !== -1) return "reorder";
    if (name.indexOf("програм") !== -1) return "code";
    return "label";
  }

  renderList(lessons) {
    lessons.forEach(discipline => {
      const {
        subject: { name }
      } = discipline;

      discipline.icon = this.nameToIcon(name);
    });

    return lessons.map((discipline, index) => {
      const {
        icon,
        id,
        subject: { name, teacherName },
        beginTime,
        endTime
      } = discipline;

      return (
        <ListItem
          key={index}
          leftIcon={{ name: icon }}
          leftElement={<Text>{id}</Text>}
          title={name}
          subtitle={teacherName}
          subtitleStyle={{ color: "grey" }}
          badge={{
            value: `${beginTime.slice(0, -3)}-${endTime.slice(0, -3)}`,
            containerStyle: { marginTop: -20 },
            textStyle: { fontSize: 9 }
          }}
        />
      );
    });
  }

  render() {
    return (
      <View>
        <ScrollView>{this.renderList(this.props.store.schedule)}</ScrollView>
      </View>
    );
  }
}

export default connect(state => ({ store: state }))(CSchedule);
