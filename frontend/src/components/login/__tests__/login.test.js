import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Login from "../login"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CreatableSelect from 'react-select/creatable';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><Login/></BrowserRouter>, div);
})


it("renders login page correctly", () => {
    const {getByTestId} = render(<BrowserRouter><Login /></BrowserRouter>);
    expect(getByTestId('login')).toHaveTextContent("Login");
    const wrapper = shallow(<Login />);
    expect(wrapper.containsMatchingElement(<form>
        <label>
            <p>Username</p>
            <input/>
        </label>
        <label>
            <p>Password</p>
            <input/>
            <br/>
        </label>
            <button>Login</button>
            <h4>Don't have an account yet?</h4>
        <Link to="/register">Create An Account</Link>
    </form>)).toEqual(true);
})

