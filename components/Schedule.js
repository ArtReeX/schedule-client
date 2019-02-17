// imports
import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import { ListItem, Text } from "react-native-elements";

// name of discipline to icon
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

// UTC time to date
const UTCToDate = utc => {
  return new Date(utc).toLocaleTimeString("ru");
};

// classes
class CSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: this.props.list };
    this.renderList = this.renderList.bind(this);
  }

  renderList(list) {
    // adding icons
    list.forEach(discipline => {
      discipline.icon = nameToIcon(discipline.name);
    });

    return list.map((discipline, index) => (
      <ListItem
        key={index}
        leftIcon={{ name: discipline.icon }}
        title={discipline.name}
        subtitle={discipline.teacher}
        badge={{
          value:
            UTCToDate(discipline.timeStart) +
            "-" +
            UTCToDate(discipline.timeEnd),
          containerStyle: { marginTop: -20 }
        }}
      />
    ));
  }

  render() {
    return (
      <View>
        <ScrollView>{this.renderList(this.state.list)}</ScrollView>
      </View>
    );
  }
}

// check types
CSchedule.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      teacher: PropTypes.string.isRequired,
      room: PropTypes.number.isRequired,
      timeStart: PropTypes.number.isRequired,
      timeEnd: PropTypes.number.isRequired
    })
  )
};

// default props
CSchedule.defaultProps = {
  list: []
};

// exports
export default CSchedule;
