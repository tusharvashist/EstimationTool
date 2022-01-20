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
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

it("renders estimation detail page", () => {
  const div = document.createElement("div");

  const history = createMemoryHistory();
  const state = { a: 123, b: 456 };
  history.push("/", state);

  ReactDOM.render(
    <Router history={history}>
      <EstimationDetail />
    </Router>,
    div
  );
});
