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
    return (
      <ButtonGroup
        onPress={this.updateSchedule}
        selectedIndex={this.state.selectedIndex}
        buttons={["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]}
        containerStyle={{ height: 40 }}
      />
    );
  }
}

// exports
export default CButtonGroup;
