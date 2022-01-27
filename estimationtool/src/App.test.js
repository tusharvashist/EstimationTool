import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "jest-canvas-mock";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

it("should render App", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    div
  );
});
