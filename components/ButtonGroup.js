// imports
import React from "react";
import { ButtonGroup } from "react-native-elements";

// classes
class CButtonGroup extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      selectedIndex: new Date().getDay()
    };

    this.updateSchedule = this.updateSchedule.bind(this);
  }

  updateSchedule(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const { selectedIndex } = this.state;

    return (
      <ButtonGroup
        onPress={this.updateSchedule}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={style}
      />
    );
  }
}

// styles
const style = { height: 40 };

// exports
export default CButtonGroup;
