import React from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";

class CSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  nameToIcon(name) {
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
  }

  UTCToDate(utc) {
    return new Date(utc).toLocaleTimeString("ru");
  }

  renderList(list) {
    list.forEach(discipline => {
      discipline.icon = this.nameToIcon(discipline.name);
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
            value: this.UTCToDate(timeStart) + "-" + this.UTCToDate(timeEnd),
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
