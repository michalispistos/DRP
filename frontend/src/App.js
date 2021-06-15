import React from 'react';
import Home from './components/home/home'
import Find from './components/find/find';
import Post from './components/post/post';
import ProjectInfo from './components/find/projectInfo';
import Register from './components/register/register';
import Login from './components/login/login';
import ErrorPage from './components/error'
import MyProjects from './components/my-projects/my-projects'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/common/Navbar/NavBar';
import AuthService from './services/auth-service';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: AuthService.getUser(),
        }
    }

    updateUser = () => {
        this.setState({user: AuthService.getUser()});
    }

    render () {
        return (
            <Router className="app">
            <NavBar user={this.state.user} updateUser={this.updateUser} />
            <div className="content">
             <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/find' exact component={ Find } />
                <Route path='/post' component={ Post }></Route>
                <Route path='/projectInfo/:id' component={ ProjectInfo }></Route>
                <Route path='/404' component={ ErrorPage }></Route>
                <Route path='/login' render={(props) => <Login {...props} updateUser={this.updateUser}/>}></Route>
                <Route path='/register' component= { Register }></Route>
                <Route path='/myProjects' component= { MyProjects }></Route>
                <Redirect to='/404'></Redirect>
             </Switch>
             </div>
            </Router>
        );
    };
}

export default App;