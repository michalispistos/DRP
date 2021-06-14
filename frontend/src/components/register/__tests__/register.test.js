import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Register from "../register"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CreatableSelect from 'react-select/creatable';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><Register/></BrowserRouter>, div);
})

it("renders register page correctly", () => {
    const {getByTestId} = render(<BrowserRouter><Register/></BrowserRouter>);
    expect(getByTestId('register')).toHaveTextContent("Register");
    const wrapper = shallow(<Register/>);
    expect(wrapper.containsMatchingElement(<form>
        <label>Username: </label><br/>
        <input/>
        <br/>
        <label>Email: </label><br/>
        <input/>
        <br/>
        <label>First Name: </label><br/>
        <input/>
        <br/>
        <label>Last Name: </label><br/>
        <input/>
        <br/>
        <label>Bio (optional): </label><br/>
        <textarea/>
        <br/>
        <label>Degree: </label><br/>
        <input/>
        <br/>
        <label>Degree Level: </label><br/>
        <select>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
        </select>
        <br/>
        <label>Password: </label><br/>
        <input/>
        <br/>
        <button>Register</button>
        <label>Already have an account?</label><br/>
        <br/>
        <div>
            <Link to="/login">Login</Link>
        </div>
    </form>)).toEqual(true);
})




