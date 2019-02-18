import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { View, ScrollView } from "react-native";
import CHeader from "./components/Header";
import CSetting from "./components/Setting";
import CInfoString from "./components/InfoString";
import CButtonGroup from "./components/ButtonGroup";
import CSchedule from "./components/Schedule";
import reducers from "./reducers";

const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CHeader />
        <ScrollView>
          <CSetting />
          <View nativeID="content">
            <CInfoString />
            <CButtonGroup />
            <CSchedule />
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

export default App;
