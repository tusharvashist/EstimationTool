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

import Enzyme, { shallow, render as enzymeRender, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

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

describe("All check boxes should be enabled and working", () => {
  it("check Estimation Detail checkbox is enabled", () => {
    expect(
      screen.getByRole("checkbox", { name: /Estimation Details/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("checkbox", { name: /Estimation Details/i })
    ).toBeChecked();
  });

  it("check Estimation Summary checkbox is enabled", () => {
    expect(
      screen.getByRole("checkbox", { name: /Estimation Summary/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("checkbox", { name: /Estimation Summary/i })
    ).not.toBeChecked();
  });

  it("check Resource Count checkbox is enabled", () => {
    expect(
      screen.getByRole("checkbox", { name: /Resource Count/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("checkbox", { name: /Resource Count/i })
    ).not.toBeChecked();
  });

  it("check Resource Planning checkbox is enabled", () => {
    expect(
      screen.getByRole("checkbox", { name: /Resource Planning/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("checkbox", { name: /Resource Planning/i })
    ).not.toBeChecked();
  });

  it("check Resource Timeline checkbox is enabled", () => {
    expect(
      screen.getByRole("checkbox", { name: /Resource Timeline/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("checkbox", { name: /Resource Timeline/i })
    ).not.toBeChecked();
  });
});

describe("snapshot testing", () => {
  it("genrate snapshot of Export estimation", () => {
    let openExport = true;
    const openExportEstimation = () => {
      openExport = true;
    };

    const closeExportEstimation = () => {
      openExport = false;
    };
    const exportFun = () => {};

    const wrapper = shallow(
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ExportEstimationPopup />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("Test methods after mount", () => {
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ExportEstimationPopup />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );

  wrapper.instance().expect(wrapper.instance().callAPI()).toHaveBeenCalled();
});
