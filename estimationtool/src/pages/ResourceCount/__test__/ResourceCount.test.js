import React, { createElement, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ResourceCount from "../ResourceCount";
import "jest-canvas-mock";
import store from "../../../Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

it("should renders resource count popup", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ResourceCount />
      </PersistGate>
    </Provider>,
    div
  );
});
