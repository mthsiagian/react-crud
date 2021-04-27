import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ContactList from './views/homeScreen';
import Contact from './views/contact';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={"/"} exact component={ContactList}></Route>
        <Route path={"/contact/:id"} exact component={Contact}></Route>
        <Redirect to={"/"}/>
      </Switch>
      test
    </div>
  );
}

export default App;
