import React from "react";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
import axios from "axios";
import config from "../config.json";

class CButtonGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: new Date().getDay()
    };
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  updateSchedule(selectedIndex) {
    const { day, groupID } = this.props.store.params;
    const { protocol, url, port } = config.server;

    this.setState({ selectedIndex });
    this.props.updateDay(selectedIndex);

    axios
      .get(`${protocol}://${url}:${port}/getSchedule`, {
        params: { day, groupID }
      })
      .then(this.props.disableLoader())
      .catch(this.props.enableLoader());
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
