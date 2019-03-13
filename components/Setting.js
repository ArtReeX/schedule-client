import React from "react";
import { connect } from "react-redux";
import { View, Picker, AsyncStorage } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import { getGroups, getSchedule } from "../services/requests";

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
          groups: [
            { name: "GroupOne", id: 1 },
            { name: "GroupTwo", id: 2 },
            { name: "GroupThree", id: 3 },
            { name: "GroupFour", id: 4 }
          ]
        });
      });
  }

  renderGroups(groups = this.groups) {
    return groups.map((group, index) => (
      <Picker.Item
        label={group.name}
        value={JSON.stringify(group.id)}
        key={group.id}
      />
    ));
  }

  render() {
    const { settingVisible } = this.state.interface;
    const { day, groupID } = this.state.settings;

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
          style={{
            display: settingVisible ? "flex" : "none"
          }}
        >
          <Card>
            <View nativeID="group">
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Группа
              </Text>
              <Picker
                selectedValue={groupID}
                onValueChange={itemValue => {
                  const {
                    updateGroup,
                    updateSchedule,
                    enableLoader,
                    disableLoader
                  } = this.props;

                  AsyncStorage.setItem("groupID", itemValue, () => {
                    this.setState({
                      ...this.state,
                      settings: {
                        ...this.state.settings,
                        groupID: itemValue
                      }
                    });
                    updateGroup(this.state.groupID);
                  });

                  enableLoader();
                  getSchedule(day, groupID).then(response => {
                    updateSchedule(response);
                    disableLoader();
                  });
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
    },
    updateSchedule: schedule => {
      dispatchEvent({ type: "UPDATE_SCHEDULE", schedule });
    },
    enableLoader: () => {
      dispatchEvent({ type: "ENABLE_LOADER" });
    },
    disableLoader: () => {
      dispatchEvent({ type: "DISABLE_LOADER" });
    }
  })
)(CSetting);
