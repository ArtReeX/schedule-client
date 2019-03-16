import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";

class CButtonGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: new Date().getDay()
    };
    this.selectedDate = this.selectedDate.bind(this);
  }

  selectedDate(date) {
    const difference = date - new Date().getDay();
    const msPerDay = 86400000;
    const format = "en-US";

    if (difference < 0) {
      return new Date(
        new Date().setTime(
          new Date(new Date().getTime() - msPerDay * Math.abs(difference))
        )
      ).toLocaleDateString(format);
    } else if (difference > 0) {
      return new Date(
        new Date().setTime(
          new Date(new Date().getTime() + msPerDay * Math.abs(difference))
        )
      ).toLocaleDateString(format);
    } else {
      return new Date().toLocaleDateString(format);
    }
  }

  render() {
    return (
      <ButtonGroup
        onPress={selectedIndex => {
          this.setState({ selectedIndex });
          this.props.updateDate(this.selectedDate(selectedIndex));
          this.props.updateSchedule();
        }}
        selectedIndex={this.state.selectedIndex}
        buttons={["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]}
        containerStyle={{ height: 40 }}
      />
    );
  }
}

CButtonGroup.propTypes = {
  updateSchedule: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired
};

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({
    updateDate: date => {
      dispatchEvent({ type: "UPDATE_DATE", date });
    }
  })
)(CButtonGroup);
