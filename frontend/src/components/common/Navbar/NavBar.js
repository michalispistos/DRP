import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <div class="topbar">
                <Link to="/" class="logo-link"><h1 class="logo-first">DRP</h1><h1 class="logo-second">12</h1></Link>
                <ul class="navigation">
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to="/find"><li>Find</li></NavLink>
                    <NavLink to="/post"><li>Post</li></NavLink>
                </ul>
            </div>
        )
    }
}
