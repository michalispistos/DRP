import React from 'react';
import Home from './components/home/home';
import Post from './components/post/post';
import Navbar from './components/common/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    render () {
        return (
            <Router>
             <Navbar />
             <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/post' component={ Post }></Route>
             </Switch>
            </Router>
        );
    };
}

export default App;