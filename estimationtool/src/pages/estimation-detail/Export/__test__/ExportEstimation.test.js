import { ExportEstimationPopup } from "../ExportEstimation";
import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { toBeEnabled, toBeDisabled } from "@testing-library/jest-dom";

import store from "../../../../Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route } from "react-router-dom";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

beforeEach(() => {
  let openExport = true;
  const openExportEstimation = () => {
    openExport = true;
  };

  const closeExportEstimation = () => {
    openExport = false;
  };
  const exportFun = () => {};

  render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ExportEstimationPopup
            openExport={openExport}
            openExportEstimation={openExportEstimation}
            closeExportEstimation={closeExportEstimation}
            title="Export Estimation"
            oktitle="Generate"
            cancelTitle="Cancel"
            exportFun={exportFun}
          />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
});

it("check Estimation Detail checkbox is enabled", () => {
  expect(
    screen.getByRole("checkbox", { name: /Estimation Details/i })
  ).toBeEnabled();
  expect(
    screen.getByRole("checkbox", { name: /Estimation Details/i })
  ).toBeChecked();
  screen.getByRole("");
});

it("check Estimation Detail checkbox is enabled", () => {
  expect(
    screen.getByRole("checkbox", { name: /Estimation Details/i })
  ).toBeEnabled();
  expect(
    screen.getByRole("checkbox", { name: /Estimation Details/i })
  ).toBeChecked();
});
