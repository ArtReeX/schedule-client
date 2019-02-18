import React from "react";
import { ButtonGroup } from "react-native-elements";

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
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.updateSchedule}
        selectedIndex={selectedIndex}
        buttons={["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]}
        containerStyle={{ height: 40 }}
      />
    );
  }
}

export default CButtonGroup;
