import React, { Component } from 'react'
import AuthService from '../../../services/auth-service';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './navBar.css'

class NavBar extends Component {


    handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout();
        this.props.updateUser();
        this.props.history.push('/');
    }

    render() {
        return (
            <div class="topbar">
                <Link to="/" class="logo-link"><h1 class="logo-first">PROJECT:</h1><h1 class="logo-second">GO</h1></Link>
                <ul class="navigation">
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to="/find"><li>Find</li></NavLink>
                    {!this.props.user && <NavLink to="/login"><li>Login</li></NavLink>}
                    {this.props.user && <NavLink to="/post"><li>Post</li></NavLink>}
                    {this.props.user && <NavLink to="/myProjects"><li>My Projects</li></NavLink>}
                    {this.props.user && <NavLink to="/" onClick={(e) => this.handleLogout(e)}><li>Logout</li></NavLink>}
                    
                </ul>
            </div>
        )
    }
}

export default withRouter(NavBar);
