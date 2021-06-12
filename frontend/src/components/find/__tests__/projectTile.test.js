import React, { Component } from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ProjectTile from "../projectTile"
import renderer from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom'

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><ProjectTile ></ProjectTile></BrowserRouter>, div);
})

it("renders projectTile correctly", () => {
    const {getByTestId} = render(<BrowserRouter><ProjectTile name = "title" lookingFor = "lookingFor"/></BrowserRouter>);
    expect(getByTestId('projectTile')).toHaveTextContent("title");
    expect(getByTestId('projectTile')).toHaveTextContent("lookingFor");
    expect(getByTestId('projectTile')).toHaveStyle(`backgroundImage: linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(images/default.jpg)`)
})
