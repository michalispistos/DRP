import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ProjectTileGrid from "../projectTileGrid";
import Filters from "../filters";
import Home from "../home"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Home/>, div);
})

it("renders home page correctly", () => {
    const {getByTestId} = render(<Home/>);
    expect(getByTestId('home')).toHaveTextContent("All Projects");
    expect(getByTestId('home')).toHaveTextContent("Filters:");
    const wrapper = shallow(<Home/>);
    expect(wrapper.containsMatchingElement(<Filters/>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<ProjectTileGrid />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<Select />)).toEqual(true);
})

