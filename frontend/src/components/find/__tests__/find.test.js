import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ProjectTileGrid from "../projectTileGrid";
import Filters from "../filters";
import Find from "../find"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Find/>, div);
})

it("renders find page correctly", () => {
    const {getByTestId} = render(<Find/>);

    expect(getByTestId('find')).toHaveTextContent("Find");
    const wrapper = shallow(<Find/>);
    expect(wrapper.containsMatchingElement(<Filters/>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<ProjectTileGrid />)).toEqual(true);
    /*
    expect(wrapper.containsMatchingElement( <div>
    <h1>Find</h1>
    <form><input/></form>
    </div>)).toEqual(true); 
    */
    
})

