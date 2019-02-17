// imports
import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native-elements";

// classes
class CInfoString extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { text: this.props.discipline };
  }

  render() {
    const { text } = this.state;
    return <Text style={style}>Текущая пара: {text}</Text>;
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

// style
const style = { textAlign: "center", fontWeight: "bold" };

// exports
export default CInfoString;
