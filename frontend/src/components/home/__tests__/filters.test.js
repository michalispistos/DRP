import React from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ProjectTileGrid from "../projectTileGrid";
import Filters from "../filters";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import { Multiselect } from 'multiselect-react-dropdown';

configure({adapter: new Adapter()});

afterEach(cleanup);

const tag_options = [
    { key: "Healthcare", cat: "Topic" },
    { key: "Covid-19", cat: "Topic" },
    { key: "Finance", cat: "Topic" },
    { key: "Marketing", cat: "Topic" },
    { key: "Climate Change", cat: "Topic" },
    { key: "Graphic Design", cat: "Topic" },
    { key: "Film", cat: "Topic" },
    { key: "Sports", cat: "Topic" },
    { key: "Programming", cat: "Topic" },
    { key: "Music", cat: "Topic" },
    { key: "Artificial Intelligence", cat: "Topic" },

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
    { key: "Academic Project", cat: "Project Type"},];


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Filters/>, div);
})