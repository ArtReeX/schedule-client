import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import CContent from "./components/Content";

const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CContent />
      </Provider>
    );
  }
}

export default App;
