import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import TextPopup from "../textPopup"

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TextPopup/>, div);
})


it("renders popup correctly", () => {
    let wrapper = shallow(<TextPopup trigger={true}><h3>Children</h3></TextPopup>);
    expect(wrapper.containsMatchingElement(<div><input/><button type="button">Add</button><br/><button type="button" variant="danger">Close</button><h3>Children</h3></div>)).toEqual(true);
    wrapper = shallow(<TextPopup trigger={false}><h3>Children</h3></TextPopup>);
    expect(wrapper.containsMatchingElement(<div><input/><button type="button">Add</button><br/><button type="button" variant="danger">Close</button><h3>Children</h3></div>)).toEqual(false);
})
