import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Post from "../post"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Popup from "../popup";
import Button from 'react-bootstrap/Button';
import { Multiselect } from 'multiselect-react-dropdown';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Post/>, div);
})

const tag_options = [{ key: "Healthcare", cat: "Topic" },
{ key: "Finance", cat: "Topic" },
{ key: "Marketing", cat: "Topic" },
{ key: "Climate Change", cat: "Topic" },
{ key: "Graphic Design", cat: "Topic" },
{ key: "Film", cat: "Topic" },
{ key: "Sports", cat: "Topic" },
{ key: "Programming", cat: "Topic" },
{ key: "Music", cat: "Topic" },

{ key: "Biology", cat: "Subject" },
{ key: "Chemistry", cat: "Subject" },
{ key: "Physics", cat: "Subject" },
{ key: "Maths", cat: "Subject" },
{ key: "Economics", cat: "Subject" },
{ key: "Geography", cat: "Subject" },
{ key: "History", cat: "Subject" },
{ key: "Law", cat: "Subject" },
{ key: "Computer Science", cat: "Subject" },

{ key: "Startup", cat: "Project Type" },
{ key: "Side Project", cat: "Project Type"},
{ key: "Academic Project", cat: "Project Type"}
]



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
    <label>Members (optional):</label><br/><ul/><input/><Button>Add member</Button><br/>
    <label>People we are looking for:</label><br/><textarea/><br/>
    <label>Tags (optional):</label><br/>
    Tags for filtering
    <Multiselect 
        options = {tag_options}
            showCheckbox = {true}
            groupBy = "cat"
            displayValue = "key"
    />  
    <ul/><input/><Button>Add custom tag</Button><br/>
    <label>Duration:</label><br/><input/><br/>
    <label>Location:</label><br/><input/><br/>
    <label/>Paid<input/><br/>Amount to be paid:<input/>
    <Button variant="success" type="submit">Post</Button>
    <Popup><h3>Post submitted</h3></Popup>    
    </form>)).toEqual(true);
})

