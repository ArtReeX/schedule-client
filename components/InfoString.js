// imports
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-elements";

// classes
class CInfoString extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { text: this.props.discipline };
  }

  render() {
    const { text } = this.state;
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Текущая пара: {text}
        </Text>
      </View>
    );
  }
}

// check types
CInfoString.propTypes = {
  discipline: PropTypes.string.isRequired
};

// default props
CInfoString.defaultProps = {
  discipline: "-"
};

// exports
export default CInfoString;
