import React from 'react';
import  ReactDOM  from 'react-dom';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ConfirmationPopup from "../confirmationPopup";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ConfirmationPopup/>, div);
})

it("renders confirmationPopup correctly", () => {
    let wrapper = shallow(<ConfirmationPopup trigger={true}><h3>Hello</h3></ConfirmationPopup>);
    expect(wrapper.containsMatchingElement(
        <div>
        <h3>Hello</h3>
        <div> 
        <button>Confirm</button><br/>
        <button>Cancel</button>
        </div> 
        </div>
    )).toEqual(true); 
    wrapper = shallow(<ConfirmationPopup trigger={false}/>);
    expect(wrapper.containsMatchingElement(<div>
        <h3>Hello</h3>
        <div> 
        <button>Confirm</button><br/>
        <button>Cancel</button>
        </div> 
        </div>)).toEqual(false); 
});