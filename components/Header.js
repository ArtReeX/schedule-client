import React from "react";
import { connect } from "react-redux";
import { Header, Text, Icon } from "react-native-elements";
import axios from "axios";
import config from "../config.json";

class CHeader extends React.PureComponent {
  render() {
    return (
      <Header
        centerComponent={<Text>График занятий</Text>}
        rightComponent={
          <Icon
            name="autorenew"
            onPress={() => {
              const { day, groupID } = this.props.store.params;
              const { protocol, url, port } = config.server;
              axios
                .get(`${protocol}://${url}:${port}/getSchedule`, {
                  params: { day, groupID }
                })
                .then(this.props.disableLoader())
                .catch(this.props.enableLoader());
            }}
          />
        }
        containerStyle={{
          backgroundColor: "#FFFFFF"
        }}
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
    }
  })
)(CHeader);
