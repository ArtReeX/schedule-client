import React from "react";
import { View, Picker, AsyncStorage } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";

class CSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingVisible: false,
      level: "bachelor",
      institute: "ifmit",
      course: 1,
      group: "pi"
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("level", (error, level) => {
      if (!error) this.setState({ level });
    });
    AsyncStorage.getItem("institute", (error, institute) => {
      if (!error) this.setState({ institute });
    });
    AsyncStorage.getItem("course", (error, course) => {
      if (!error) this.setState({ course });
    });
    AsyncStorage.getItem("group", (error, group) => {
      if (!error) this.setState({ group });
    });
  }
  render() {
    const style = { textAlign: "center", fontWeight: "bold" };
    const { settingVisible } = this.state;
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
            this.setState({ settingVisible: !settingVisible });
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
                selectedValue={this.state.level}
                onValueChange={itemValue => {
                  AsyncStorage.setItem(
                    "level",
                    itemValue,
                    this.setState({ level: itemValue })
                  );
                }}
              >
                <Picker.Item label="Бакалавр" value="bachelor" />
                <Picker.Item label="Магистр" value="master" />
              </Picker>
            </View>
            <View nativeID="institute">
              <Text style={style}>Институт</Text>
              <Picker
                selectedValue={this.state.institute}
                onValueChange={itemValue => {
                  AsyncStorage.setItem(
                    "institute",
                    itemValue,
                    this.setState({ institute: itemValue })
                  );
                }}
              >
                <Picker.Item label="ИФМИТ" value="ifmit" />
                <Picker.Item label="ФИЗВОЗП" value="fizwozp" />
              </Picker>
            </View>
            <View nativeID="course">
              <Text style={style}>Курс</Text>
              <Picker
                selectedValue={this.state.course}
                onValueChange={itemValue =>
                  AsyncStorage.setItem(
                    "course",
                    itemValue,
                    this.setState({ course: itemValue })
                  )
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
                selectedValue={this.state.group}
                onValueChange={itemValue => {
                  AsyncStorage.setItem(
                    "group",
                    itemValue,
                    this.setState({ group: itemValue })
                  );
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

export default CSetting;
