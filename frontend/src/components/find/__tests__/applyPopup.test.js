import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ApplyPopup from "../applyPopup"
import { BrowserRouter } from 'react-router-dom'

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ApplyPopup/>, div);
})

