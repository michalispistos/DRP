import React from 'react';
import Home from './components/home/home'
import Find from './components/find/find';
import Post from './components/post/post';
import ProjectInfo from './components/find/projectInfo';
import ErrorPage from './components/error'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/common/Navbar/NavBar';

class App extends React.Component {
    render () {
        return (
            <Router className="app">
            <NavBar />
            <div className="content">
             <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/find' exact component={ Find } />
                <Route path='/post' component={ Post }></Route>
                <Route path='/projectInfo/:id' component={ ProjectInfo }></Route>
                <Route path='/404' component={ ErrorPage }></Route>
                <Redirect to='/404'></Redirect>
             </Switch>
             </div>
            </Router>
        );
    };
}

export default App;