import React from 'react';
import  ReactDOM  from 'react-dom';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import EditPopup from "../editPopup";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import ProjectForm from '../projectForm';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EditPopup/>, div);
})

it("renders editPopup correctly", () => {
    let wrapper = shallow(<EditPopup trigger={true}/>);
    expect(wrapper.containsMatchingElement(<ProjectForm></ProjectForm>)).toEqual(true); 
    wrapper = shallow(<EditPopup trigger={false}/>);
    expect(wrapper.containsMatchingElement(<ProjectForm></ProjectForm>)).toEqual(false); 
    
})

