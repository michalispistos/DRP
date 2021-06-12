import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Popup from "../popup"

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Popup/>, div);
})

it("renders popup correctly", () => {
    let wrapper = shallow(<Popup trigger={true}><h3>Children</h3></Popup>);
    expect(wrapper.containsMatchingElement(<div><h3>Children</h3><button variant="danger" type="button">Close</button></div>)).toEqual(true);
    wrapper = shallow(<Popup trigger={false}><h3>Children</h3></Popup>);
    expect(wrapper.containsMatchingElement(<div><h3>Children</h3><button variant="danger" type="button">Close</button></div>)).toEqual(false);
})