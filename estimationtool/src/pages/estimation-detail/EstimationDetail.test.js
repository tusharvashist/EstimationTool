// describe("A suite is just a function", function () {
//   var a;

//   it("and so is a spec", function () {
//     a = true;

//     expect(a).toBe(true);
//   });
// });

import React from "react";
import ReactDOM from "react-dom";
import EstimationDetail from "./estimation-detail";
import reportWebVitals from "../../reportWebVitals";
import store from "../../Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "jest-canvas-mock";
import { BrowserRouter, Route } from "react-router-dom";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

it("renders estimation detail page", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Route
            exact
            location={{
              path: "/All-Clients/Microsoft/MicrosoftTeams/Estimation-Detail",
              state: { estId: "61e8f97d8481c1e1b6cd91ad" },
            }}
          >
            <EstimationDetail />
          </Route>
        </PersistGate>
      </Provider>
    </BrowserRouter>,
    div
  );
});
