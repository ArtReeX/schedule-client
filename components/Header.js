// imports
import React from "react";
import { Header } from "react-native-elements";

// classes
const CHeader = () => {
  return (
    <Header
      leftComponent={{ icon: "list" }}
      centerComponent={{ text: "График занятий" }}
      rightComponent={{ icon: "autorenew" }}
      containerStyle={style}
    />
  );
};

// styles
const style = {
  backgroundColor: "#FFFFFF"
};

// exports
export default CHeader;
