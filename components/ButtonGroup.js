import React from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
import { getSchedule } from "../services/requests";

class CButtonGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: new Date().getDay()
    };
    this.updateSchedule = this.updateSchedule.bind(this);
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

  updateSchedule(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.updateDate(this.selectedDate(selectedIndex));

    const { enableLoader, disableLoader } = this.props;
    const { date, groupId } = this.props.store.settings;

    enableLoader();
    getSchedule(date, groupId)
      .then(response => {
        updateSchedule(response);
        disableLoader();
      })
      .catch(enableLoader());
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.updateSchedule}
        selectedIndex={selectedIndex}
        buttons={["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]}
        containerStyle={{ height: 40 }}
      />
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({
    enableLoader: () => {
      dispatchEvent({ type: "ENABLE_LOADER" });
    },
    disableLoader: () => {
      dispatchEvent({ type: "DISABLE_LOADER" });
    },
    updateDate: date => {
      dispatchEvent({ type: "UPDATE_DATE", date });
    },
    updateSchedule: lessons => {
      dispatchEvent({ type: "UPDATE_SCHEDULE", lessons });
    }
  })
)(CButtonGroup);
