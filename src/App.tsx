import FilterPart from './components/FilterPart/FilterPart';
import LabelPart from './components/LabelPart/LabelPart';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/part1"><FilterPart/></Route>
          <Route exact path="/part2"><LabelPart/></Route>
          <Route>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
