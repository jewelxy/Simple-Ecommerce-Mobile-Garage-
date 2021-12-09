import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './UserContext.js';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home.js';
import NotFound from './components/NotFound/NotFound.js';
import Orders from './components/Orders/Orders.js';
import Admin from './components/Admin/Admin.js';
import Login from './components/Login/Login.js';
import Profile from './components/Profile/Profile.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';
import Checkout from './components/Checkout/Checkout.js';
import ComingSoon from './components/ComingSoon/ComingSoon.js';

function App() {
  const [user, setUser] = useState({ isLoggedIn: false });

  return (
    <UserProvider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route path="/admin"></Route>
          <Route path="*">
            <Header />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/checkout/:id">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/deals">
            <ComingSoon page="Deals" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
