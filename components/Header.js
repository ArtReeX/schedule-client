import React from "react";
import { connect } from "react-redux";
import { Header, Text, Icon } from "react-native-elements";

export default class CHeader extends React.PureComponent {
  render() {
    return (
      <Header
        centerComponent={CAppName}
        rightComponent={CUpdateButton}
        containerStyle={{ backgroundColor: "#FFFFFF" }}
      />
    );
  }
}
class CUpdateButton extends React.PureComponent {
  onPress() {
    const { enableLoader, disableLoader, updateSchedule } = this.props;
    const { day, groupID } = this.props.store.settings;

    enableLoader();
    requests
      .getSchedule(day, groupID)
      .then(response => {
        updateSchedule(response);
        disableLoader();
      })
      .catch(enableLoader());
  }
  render() {
    return <Icon name="autorenew" onPress={onPress} />;
  }
}

const CAppName = () => <Text>График занятий</Text>;

connect(
  state => ({ store: state }),
  dispatchEvent => ({
    enableLoader: () => {
      dispatchEvent({ type: "ENABLE_LOADER" });
    },
    disableLoader: () => {
      dispatchEvent({ type: "DISABLE_LOADER" });
    },
    updateSchedule: params => {
      dispatchEvent({ type: "UPDATE_SCHEDULE", params });
    }
  })
)(CUpdateButton);
