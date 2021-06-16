import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Login from "../login"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CreatableSelect from 'react-select/creatable';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><Login/></BrowserRouter>, div);
})


