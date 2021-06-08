import React from 'react';
import Home from './components/home/home';
import Post from './components/post/post';
import Navbar from './components/common/Navbar/Navbar';
import ProjectInfo from './components/home/projectInfo';
import ErrorPage from './components/error'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    render () {
        return (
            <Router>
             <Navbar />
             <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/post' component={ Post }></Route>
                <Route path='/projectInfo/:id' component={ ProjectInfo }></Route>
                <Route path='/404' component={ ErrorPage }></Route>
                <Redirect to='/404'></Redirect>
             </Switch>
            </Router>
        );
    };
}

export default App;