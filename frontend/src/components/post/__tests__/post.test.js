import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Post from "../post"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Popup from "../popup";
import CreatableSelect from 'react-select/creatable';


configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Post/>, div);
})

