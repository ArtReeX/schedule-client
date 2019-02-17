// imports
import React from "react";
import { View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import CHeader from "./components/Header";
import CSetting from "./components/Setting";
import CInfoString from "./components/InfoString";
import CButtonGroup from "./components/ButtonGroup";
import CSchedule from "./components/Schedule";

const testData = [
  {
    name: "Физкультура",
    teacher: "Драгнев А.Г.",
    room: 115,
    timeStart: 1550390400,
    timeEnd: 1550395200
  },
  {
    name: "Базы данных",
    teacher: "Капустин А.В.",
    room: 256,
    timeStart: 1550395800,
    timeEnd: 1550400600
  },
  {
    name: "Экономика",
    teacher: "Суворова А.В.",
    room: 351,
    timeStart: 1550401200,
    timeEnd: 1550406000
  },
  {
    name: "Экономика предприятия",
    teacher: "Суворова А.В.",
    room: 351,
    timeStart: 1550406600,
    timeEnd: 1550411400
  },
  {
    name: "WEB-программирование",
    teacher: "Суворова А.В.",
    room: 351,
    timeStart: 1550412000,
    timeEnd: 1550416800
  }
];

// classes
export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <CHeader />
        <CSetting />
        <View nativeID="content">
          <CInfoString discipline="Физкультура" />
          <CButtonGroup />
          <CSchedule list={testData} />
        </View>
      </ThemeProvider>
    );
  }
}
