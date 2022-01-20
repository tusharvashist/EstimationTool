import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "jest-canvas-mock";

it("should render App", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        a
        <App />
      </PersistGate>
    </Provider>,
    div
  );
});
