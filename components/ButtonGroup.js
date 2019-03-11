import React from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
import { getSchedule } from "../requests";

class CButtonGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: new Date().getDay()
    };
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  dayToDate(name) {
    switch (name) {
      case "Вс":
      case "Пн":
      case "Вт":
      case "Ср":
      case "Чт":
      case "Пт":
      case "Сб":
    }
  }

  updateSchedule(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.updateDay(dayToDate(selectedIndex));

    const { enableLoader, disableLoader } = this.props;
    const { day, groupID } = this.props.store.settings;

    getSchedule(day, groupID)
      .then(disableLoader())
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
    enableLoader: params => {
      dispatchEvent({ type: "ENABLE_LOADER" });
    },
    disableLoader: params => {
      dispatchEvent({ type: "DISABLE_LOADER" });
    },
    updateDay: day => {
      dispatchEvent({ type: "UPDATE_DAY", day });
    }
  })
)(CButtonGroup);
