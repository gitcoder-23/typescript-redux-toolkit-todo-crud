import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import TodoList from './pages/TodoList';

function App() {
  return (
    <div className="container mt-3 mb-3">
      <div className="row full-row">
        <div className="col-12">
          <Router>
            <Switch>
              <Route exact path="/" component={TodoList} />
              {/* <Route exact path="/user/:id" component={Details} /> */}
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
