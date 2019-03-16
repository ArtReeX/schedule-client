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
        groupId: 0
      },
      groups: []
    };
    this.renderGroups = this.renderGroups.bind(this);
  }

  componentDidMount() {
    const { updateGroup } = this.props;

    getGroups().then(({ data }) => {
      AsyncStorage.getItem("groupId", (error, groupId) => {
        if (!error) {
          this.setState({
            ...this.state,
            settings: {
              ...this.state.settings,
              groupId
            },
            groups: data.sort((groupOne, groupTwo) => {
              return groupOne.shortName > groupTwo.shortName;
            })
          });
          updateGroup(groupId);
        }
      });
    });
  }

  renderGroups(groups) {
    return groups.map(({ id, shortName, course }, index) => (
      <Picker.Item
        label={`${course}-${shortName}`}
        value={JSON.stringify(id)}
        key={id}
      />
    ));
  }

  render() {
    const { settingVisible } = this.state.interface;
    const { groupId } = this.state.settings;
    const { date } = this.props.store.settings;

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
                selectedValue={groupId}
                onValueChange={itemValue => {
                  const {
                    updateGroup,
                    updateSchedule,
                    enableLoader,
                    disableLoader
                  } = this.props;

                  AsyncStorage.setItem("groupId", itemValue, () => {
                    this.setState({
                      ...this.state,
                      settings: {
                        ...this.state.settings,
                        groupId: itemValue
                      }
                    });
                    updateGroup(groupId);
                  });

                  enableLoader();
                  getSchedule(date, groupId).then(({ data: { lessons } }) => {
                    updateSchedule(lessons);
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
    updateGroup: groupId => {
      dispatchEvent({ type: "UPDATE_GROUP", groupId });
    },
    updateSchedule: lessons => {
      dispatchEvent({ type: "UPDATE_SCHEDULE", lessons });
    },
    enableLoader: () => {
      dispatchEvent({ type: "ENABLE_LOADER" });
    },
    disableLoader: () => {
      dispatchEvent({ type: "DISABLE_LOADER" });
    }
  })
)(CSetting);
