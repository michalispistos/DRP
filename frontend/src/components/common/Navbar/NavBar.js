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
            <div className="topbar">
                <Link to="/" className="logo-link"><h1 className="logo-first">PROJECT:</h1><h1 className="logo-second">GO</h1></Link>
                <ul className="navigation">
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to="/find"><li>Find</li></NavLink>
                    <NavLink to="/post"><li>Post</li></NavLink>
                    {!this.props.user && <NavLink to="/login"><li>Login</li></NavLink>}
                    {this.props.user && <NavLink to="/myProjects"><li>My Projects</li></NavLink>}
                    {this.props.user && <NavLink to={`/profileInfo/${this.props.user.username}`}><li>My Profile</li></NavLink>}
                    {this.props.user && <NavLink to="/myMessages"><li>My Messages</li></NavLink>}
                    {this.props.user && <NavLink to="/" onClick={(e) => this.handleLogout(e)}><li>Logout</li></NavLink>}
                    
                </ul>
            </div>
        )
    }
}

export default withRouter(NavBar);
