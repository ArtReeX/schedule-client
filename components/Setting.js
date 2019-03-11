import React from "react";
import { connect } from "react-redux";
import { View, Picker, AsyncStorage } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import { getGroups } from "../requests";

class CSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interface: { settingVisible: false },
      settings: {
        groupID: 0
      },
      groups: []
    };
    this.renderGroups = this.renderGroups.bind(this);
  }

  componentDidMount() {
    getGroups()
      .then(groups => {
        AsyncStorage.getItem("groupID", (error, groupID) => {
          if (!error)
            this.setState({
              ...this.state,
              settings: {
                ...this.state.settings,
                groupID
              },
              groups
            });
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          groups: [{ name: "test1", id: 1 }, { name: "test2", id: 13 }]
        });
        console.log(this.state);
      });
  }

  renderGroups(groups = this.groups) {
    return groups.map((group, index) => (
      <Picker.Item label={group.name} value={group.id} key={group.id} />
    ));
  }

  render() {
    const { settingVisible } = this.state.interface;
    const { groupID } = this.state.settings;

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
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Группа
              </Text>
              <Picker
                selectedValue={groupID}
                onValueChange={itemValue => {
                  AsyncStorage.setItem(
                    "groupID",
                    JSON.stringify(itemValue),
                    () => {
                      this.setState({
                        ...this.state,
                        settings: {
                          ...this.state.settings,
                          groupID: itemValue
                        }
                      });
                      this.props.updateGroup(this.state.groupID);
                    }
                  );
                }}
              >
                {this.renderGroups(this.state.groups)}
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
