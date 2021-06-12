import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ProjectTileGrid from "../projectTileGrid"
import ProjectTile from "../projectTile"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProjectTileGrid projects={[]}></ProjectTileGrid>, div);
})

it("renders projectTile correctly", () => {
    const {getByTestId} = render(<ProjectTileGrid projects={[]}/>);
    const wrapper = shallow(<ProjectTileGrid projects={[{title:"t1",lookingFor:"l1"}]}/>);
    expect(wrapper.containsMatchingElement(<ProjectTile />)).toEqual(true);
})


