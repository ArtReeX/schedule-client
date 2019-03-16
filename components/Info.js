import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { Bars } from "react-native-loader";
import CCurrent from "./Current";
import CButtonGroup from "./ButtonGroup";
import CSchedule from "./Schedule";

class CInfo extends React.PureComponent {
  render() {
    const { loaderVisible } = this.props.store.face;
    return (
      <View>
        <View
          style={{
            margin: "40%",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            display: loaderVisible ? "flex" : "none"
          }}
        >
          <Bars size={15} color="#808080" />
        </View>
        <View
          style={{
            display: !loaderVisible ? "flex" : "none"
          }}
        >
          <CCurrent />
          <CButtonGroup updateSchedule={this.props.updateSchedule} />
          <CSchedule />
        </View>
      </View>
    );
  }
}

CInfo.propTypes = {
  updateSchedule: PropTypes.func.isRequired
};

export default connect(state => ({ store: state }))(CInfo);
