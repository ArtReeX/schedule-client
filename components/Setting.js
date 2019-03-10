import React from "react";
import { connect } from "react-redux";
import { View, Picker, AsyncStorage } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";

class CSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interface: { settingVisible: false },
      params: {
        groupID: 0
      }
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("groupID", (error, groupID) => {
      if (!error)
        this.setState({
          ...this.state,
          params: {
            ...this.state.params,
            groupID
          }
        });
    });
  }
  render() {
    const style = { textAlign: "center", fontWeight: "bold" };
    const { settingVisible } = this.state.interface;
    const { groupID } = this.state.params;
    return (
      <View>
        <Button
          icon={
            <Icon
              name="settings"
              color="white"
              iconStyle={{ marginRight: "5%" }}
            />
          }
          title={settingVisible ? "СКРЫТЬ НАСТРОЙКИ" : "ПОКАЗАТЬ НАСТРОЙКИ"}
          containerStyle={{ alignContent: "center" }}
          buttonStyle={{
            marginLeft: "10%",
            marginRight: "10%",
            backgroundColor: "#808080"
          }}
          onPress={() => {
            const { params } = this.state;
            this.setState({
              ...this.state,
              interface: {
                ...this.state.interface,
                settingVisible: !settingVisible
              }
            });
          }}
        />
        <View
          nativeID="setting"
          style={{ display: settingVisible ? "block" : "none" }}
        >
          <Card>
            <View nativeID="group">
              <Text style={style}>Группа</Text>
              <Picker
                selectedValue={groupID}
                onValueChange={itemValue => {
                  AsyncStorage.setItem("groupID", itemValue, () => {
                    const { params } = this.state;
                    this.setState({
                      ...this.state,
                      params: {
                        ...this.state.params,
                        groupID: itemValue
                      }
                    });
                    this.props.updateGroup(params.groupID);
                  });
                }}
              >
                <Picker.Item label="Программная инженерия" value="0" />
                <Picker.Item
                  label="Информационная и вычислительная техника"
                  value="1"
                />
              </Picker>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({
    updateGroup: groupID => {
      dispatchEvent({ type: "UPDATE_GROUP", groupID });
    }
  })
)(CSetting);
