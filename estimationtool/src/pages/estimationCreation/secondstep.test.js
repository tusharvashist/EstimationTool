import React from "react";
import ReactDOM from "react-dom";
import secondStep from "./SecondStep";
import "jest-canvas-mock";

// var SecondStep = new secondStep();

it("should render second step on clicking next button", () => {
  const div = document.createElement("div");
  ReactDOM.render(<secondStep />, div);
});

const req = {
  esttype: '61726950cad844f7794646ae',
estheaderid: '61e7b6dd46157b36fd4090fe'
}
const mockData = [
  {
    attributeCode: "DEV",
attributeName: ".net",
createdAt: "2021-10-26T10:46:35.857Z",
description: "name",
selected: false,
updatedAt: "2021-10-26T10:46:35.857Z",
__v: 0,
_id: "6177dc8bb6e42413fe1baf24",
  },
  {
    attributeCode: "DEV",
attributeName: "React js",
createdAt: "2021-10-27T08:01:08.071Z",
description: "name",
selected: true,
updatedAt: "2021-10-27T08:01:08.071Z",
__v: 0,
_id: "6179074418b7e2d3ec42ee19",
  }
];
describe('get all attribute', () => {
  test ('Checking Method mocks', () => {
    const method = require('./SecondStep');
    const mock = jest.fn().mockReturnValue('mocked name');
    method.getAttribute() = mock;
    // it('should return array list of attributes', () => {
    //     expect(method.getAttribute()).toBe(mockData);
    // });
const result = method.getAttribute();
console.log(result)
expect(result).toBe(mockData);
  })

});