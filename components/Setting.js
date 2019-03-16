import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Picker, AsyncStorage } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import { getGroups } from "../services/requests";

class CSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interface: { settingVisible: false },
      settings: {
        groupId: this.props.store.settings.groupId
      },
      groups: []
    };
    this.renderGroups = this.renderGroups.bind(this);
  }

  componentDidMount() {
    getGroups().then(({ data }) => {
      AsyncStorage.getItem("groupId", (error, groupId) => {
        if (error && data[0]) {
          groupId = data[0].id;
        }

        this.setState({
          ...this.state,
          settings: {
            ...this.state.settings,
            groupId: Number(groupId)
          },
          groups: data.sort((groupOne, groupTwo) => {
            return groupOne.shortName > groupTwo.shortName;
          })
        });

        this.props.updateGroup(groupId);
        this.props.updateSchedule();
      });
    });
  }

  renderGroups(groups) {
    return groups.map(({ id, shortName, course }, index) => (
      <Picker.Item label={`${course}-${shortName}`} value={id} key={id} />
    ));
  }

  render() {
    return (
      <View>
        <Button
          icon={
            <Icon
              name="settings"
              color="white"
              iconStyle={{ marginRight: "5%" }}
              size={20}
            />
          }
          title={
            this.state.interface.settingVisible ? "ЗАКРЫТЬ" : "ВЫБРАТЬ ГРУППУ"
          }
          titleStyle={{ fontSize: 11 }}
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
                settingVisible: !this.state.interface.settingVisible
              }
            });
          }}
        />
        <View
          nativeID="setting"
          style={{
            display: this.state.interface.settingVisible ? "flex" : "none"
          }}
        >
          <Card>
            <View nativeID="group">
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Группа
              </Text>
              <Picker
                selectedValue={this.state.settings.groupId}
                onValueChange={itemValue => {
                  AsyncStorage.setItem(
                    "groupId",
                    JSON.stringify(itemValue),
                    () => {
                      this.setState({
                        ...this.state,
                        settings: {
                          ...this.state.settings,
                          groupId: itemValue
                        }
                      });
                      this.props.updateGroup(itemValue);
                      this.props.updateSchedule();
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

CSetting.propTypes = {
  updateSchedule: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired
};

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({
    updateGroup: groupId => {
      dispatchEvent({ type: "UPDATE_GROUP", groupId });
    }
  })
)(CSetting);
