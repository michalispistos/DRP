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


it("renders post page correctly", () => {
    const {getByTestId} = render(<Post/>);
    expect(getByTestId('post')).toHaveTextContent("Post a Project");
    const wrapper = shallow(<Post/>);
    expect(wrapper.containsMatchingElement(<form>
    <label>Project title:</label><br/><input/><br/>
    Choose Image:<br/><input/><br/>
    <label>Project description:</label><br/><textarea/><br/>
    <label>Leader name:</label><br/><input/><br/>
    <label>Leader email:</label><br/><input/><br/>
    <label>Members (optional):</label><br/><ul/><div><input/><button>ADD</button><br/></div>
    <label>People we are looking for:</label><br/><textarea/><br/>
    <label>Tags (optional):</label><br/>
    <CreatableSelect/>
    <label>Duration:</label><br/><input/><br/>
    <label>Location:</label><br/><input/><br/>
    <label/>Paid<input/><br/>Amount to be paid : <input/>
    <button>POST</button>
    <Popup><h3>Post submitted</h3></Popup>    
    </form>)).toEqual(true);
})

