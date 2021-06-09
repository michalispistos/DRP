import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import NavBar from "../NavBar"

afterEach(cleanup); 

const links = [
    { text: 'Home', location: "/"},
    { text: 'Post a Project', location: "/post"},
];


// Checks if navbar goes to link 
it("sends all links to correct page", () => {
    test.each(links, () => {
        (link) => 
        render(<NavBar />);
        const linkDom = screen.getByText(link.text); 
        expect(linkDom).toHaveAttribute("href", link.location);
    });
});
