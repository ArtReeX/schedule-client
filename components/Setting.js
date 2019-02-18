import React from "react";
import { connect } from "react-redux";
import { View, Picker, AsyncStorage } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";

class CSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interface: { settingVisible: false },
      settings: {
        level: "bachelor",
        institute: "ifmit",
        course: 1,
        group: "pi"
      }
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("level", (error, level) => {
      if (!error)
        this.setState({
          ...this.state,
          settings: {
            ...this.state.settings,
            level
          }
        });
    });
    AsyncStorage.getItem("institute", (error, institute) => {
      if (!error)
        this.setState({
          ...this.state,
          settings: {
            ...this.state.settings,
            institute
          }
        });
    });
    AsyncStorage.getItem("course", (error, course) => {
      if (!error)
        this.setState({
          ...this.state,
          settings: {
            ...this.state.settings,
            course
          }
        });
    });
    AsyncStorage.getItem("group", (error, group) => {
      if (!error)
        this.setState({
          ...this.state,
          settings: {
            ...this.state.settings,
            group
          }
        });
    });
  }
  render() {
    const style = { textAlign: "center", fontWeight: "bold" };
    const { settingVisible } = this.state.interface;
    const { level, institute, course, group } = this.state.settings;
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
            const { settings } = this.state;
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
            <View nativeID="level">
              <Text style={style}>Степень</Text>
              <Picker
                selectedValue={level}
                onValueChange={itemValue => {
                  AsyncStorage.setItem("level", itemValue, () => {
                    const { settings } = this.state;
                    this.setState({
                      ...this.state,
                      settings: {
                        ...this.state.settings,
                        level: itemValue
                      }
                    });
                    this.props.updateSettings(settings);
                  });
                }}
              >
                <Picker.Item label="Бакалавр" value="bachelor" />
                <Picker.Item label="Магистр" value="master" />
              </Picker>
            </View>
            <View nativeID="institute">
              <Text style={style}>Институт</Text>
              <Picker
                selectedValue={institute}
                onValueChange={itemValue => {
                  AsyncStorage.setItem("institute", itemValue, () => {
                    const { settings } = this.state;
                    this.setState({
                      ...this.state,
                      settings: {
                        ...this.state.settings,
                        institute: itemValue
                      }
                    });
                    this.props.updateSettings(settings);
                  });
                }}
              >
                <Picker.Item label="ИФМИТ" value="ifmit" />
                <Picker.Item label="ФИЗВОЗП" value="fizwozp" />
              </Picker>
            </View>
            <View nativeID="course">
              <Text style={style}>Курс</Text>
              <Picker
                selectedValue={course}
                onValueChange={itemValue =>
                  AsyncStorage.setItem("course", itemValue, () => {
                    const { settings } = this.state;
                    this.setState({
                      ...this.state,
                      settings: {
                        ...this.state.settings,
                        course: itemValue
                      }
                    });
                    this.props.updateSettings(settings);
                  })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
              </Picker>
            </View>
            <View nativeID="group">
              <Text style={style}>Группа</Text>
              <Picker
                selectedValue={group}
                onValueChange={itemValue => {
                  AsyncStorage.setItem("group", itemValue, () => {
                    const { settings } = this.state;
                    this.setState({
                      ...this.state,
                      settings: {
                        ...this.state.settings,
                        group: itemValue
                      }
                    });
                    this.props.updateSettings(settings);
                  });
                }}
              >
                <Picker.Item label="Программная инженерия" value="pi" />
                <Picker.Item
                  label="Информационная и вычислительная техника"
                  value="ivt"
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
    updateSettings: settings => {
      dispatchEvent({ type: "UPDATE_SETTINGS", settings });
    }
  })
)(CSetting);
