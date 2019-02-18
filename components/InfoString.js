import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text } from "react-native-elements";

class CInfoString extends React.PureComponent {
  render() {
    const { currentDiscipline } = this.props.store.schedule;
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Текущая пара: {currentDiscipline}
        </Text>
      </View>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({})
)(CInfoString);
