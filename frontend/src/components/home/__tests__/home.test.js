import React from 'react';
import  ReactDOM  from 'react-dom';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Home from "../home";
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><Home/></BrowserRouter>, div);
})