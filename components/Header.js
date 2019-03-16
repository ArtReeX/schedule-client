import React from "react";
import { connect } from "react-redux";
import { Header, Text, Icon } from "react-native-elements";
import { getSchedule } from "../services/requests";

class CHeader extends React.PureComponent {
  render() {
    return (
      <Header
        centerComponent={<Text>График занятий</Text>}
        rightComponent={
          <Icon
            name="autorenew"
            onPress={() => {
              const {
                enableLoader,
                disableLoader,
                updateSchedule
              } = this.props;
              const { date, groupId } = this.props.store.settings;

              enableLoader();
              getSchedule(date, groupId).then(({ data: { lessons } }) => {
                updateSchedule(lessons);
                disableLoader();
              });
            }}
          />
        }
        containerStyle={{ backgroundColor: "#FFFFFF" }}
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
    updateSchedule: lessons => {
      dispatchEvent({ type: "UPDATE_SCHEDULE", lessons });
    }
  })
)(CHeader);
