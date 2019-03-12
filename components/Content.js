import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Bars } from "react-native-loader";
import CInfoString from "./InfoString";
import CButtonGroup from "./ButtonGroup";
import CSchedule from "./Schedule";

class CContent extends React.PureComponent {
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
          <CInfoString />
          <CButtonGroup />
          <CSchedule />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({})
)(CContent);
