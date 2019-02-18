import React from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { ListItem, Text } from "react-native-elements";

const nameToIcon = name => {
  switch (name) {
    case "Физкультура":
      return "accessibility";
    case "Базы данных":
      return "reorder";
    case "Экономика":
      return "timeline";
    case "WEB-программирование":
      return "code";
    default:
      return "label";
  }
};

const UTCToDate = utc => {
  return new Date(utc).toLocaleTimeString("ru");
};

class CSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList(list) {
    list.forEach(discipline => {
      discipline.icon = nameToIcon(discipline.name);
    });

    return list.map((discipline, index) => {
      const { icon, name, teacher, timeStart, timeEnd } = discipline;
      return (
        <ListItem
          key={index}
          leftIcon={{ name: icon }}
          title={name}
          subtitle={teacher}
          badge={{
            value: UTCToDate(timeStart) + "-" + UTCToDate(timeEnd),
            containerStyle: { marginTop: -20 }
          }}
        />
      );
    });
  }

  render() {
    const { schedule } = this.props.store.schedule;
    return (
      <View>
        <ScrollView>{this.renderList(schedule)}</ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({})
)(CSchedule);
