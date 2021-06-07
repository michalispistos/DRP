import React, { Component } from 'react';
import  ReactDOM  from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ProjectTile from "../projectTile"
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProjectTile ></ProjectTile>, div);
})

it("renders projectTile correctly", () => {
    const {getByTestId} = render(<ProjectTile title = "title" lookingFor = "lookingFor"/>);
    expect(getByTestId('projectTile')).toHaveTextContent("title");
    expect(getByTestId('projectTile')).toHaveTextContent("lookingFor");
    expect(getByTestId('projectTile')).toHaveStyle(`backgroundImage: linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(images/image1.jpeg)`)
})
