import React from "react";
import { Header, Text, Icon } from "react-native-elements";

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

export default CHeader;
