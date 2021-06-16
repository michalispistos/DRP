import React from 'react';
import  ReactDOM  from 'react-dom';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import ProjectForm from '../projectForm';

configure({adapter: new Adapter()});

afterEach(cleanup);

const project = {name:"name",description:"description",leader:"leader",email:"email",tags:[],members:[],looking_for:"lf",
duration:"duration",location:"location",paid:false,amount_to_be_paid:0,image_filepath:"default.jpg"}

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProjectForm project={project}/>, div);
})


