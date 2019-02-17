// imports
import React from "react";
import { Header, Text, Icon } from "react-native-elements";

// classes
const CHeader = () => {
  return (
    <Header
      centerComponent={<Text>График занятий</Text>}
      rightComponent={<Icon name="autorenew" />}
      containerStyle={{
        backgroundColor: "#FFFFFF"
      }}
    />
  );
};

// exports
export default CHeader;
