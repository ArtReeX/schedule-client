import React from "react";
import PropTypes from "prop-types";
import { Header, Text, Icon } from "react-native-elements";

class CHeader extends React.PureComponent {
  render() {
    return (
      <Header
        centerComponent={<Text>График занятий</Text>}
        rightComponent={
          <Icon name="autorenew" onPress={this.props.updateSchedule} />
        }
        containerStyle={{ backgroundColor: "#FFFFFF" }}
      />
    );
  }
}

CHeader.propTypes = {
  updateSchedule: PropTypes.func.isRequired
};

export default CHeader;
