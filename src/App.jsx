import React, { useContext, useReducer } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
 import AboutUs from './components/AboutUs/AboutUs';
import Developer from './components/Developer/Developer';
import Guests from './components/Guests/Guests';
import Contact from './components/Contact/Contact';
import Sponsors from './components/Sponsors/Sponsors';
import Error404 from './components/Error404/Error404';
import Store from './store/store';
import rootReducer from './reducers/rootReducer';
import Categories from './components/Events/Categories';
import Onboard from './components/utils/Onboard';
import NotAuth from './components/utils/NotAuth';
// import ProtectedRoute from './components/utils/ProtectedRoute';
import Event from './components/Events/Event';
import Events from './components/Events/Events';
import Dashboard from './components/utils/Dashboard';

const App = () => {
  const initState = useContext(Store);
  const [state, dispatch] = useReducer(rootReducer, initState);
  console.log(state);
  return (
    <>
      <Store.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/categories' component={Categories} />
            <Route path='/categories/:category/:event' component={Event} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/categories/:category' component={Events} />
            <Route path='/aboutus' component={AboutUs} />
            <Route exact path='/' component={HomePage} />
            <Route path='/guestlectures' component={Guests} />

            <Route path='/contact' component={Contact} />
            <Route path='/onboard' component={Onboard} />
            
            <Route path='/sponsors' component={Sponsors} />
            <Route path='/developers' component={Developer} />
            <Route path='/notauthorized' component={NotAuth} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </Store.Provider>
    </>
  );
};

export default App;
