import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';

//MUI
import { makeStyles } from '@material-ui/core/styles';

//Pages
import Navigation from './layout/Navigation';
import { styles } from './util/theme';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import TwoDThreeD from './pages/TwoDThreeD';
import Videos from './pages/Videos';
import SocialMedia from './pages/SocialMedia';
import Content from './pages/Content';
import MisionVision from './pages/MisionVision';
import Admin from './pages/Admin';
import Login from './pages/Login';
import CreateContent from './pages/CreateContent';
import EditContent from './pages/EditContent';
import ContentState from './context/content/ContentState';
import ContactUsMessages from './pages/ContactUsMessages';

axios.defaults.baseURL =
  'https://us-central1-dream-pictures-ca.cloudfunctions.net/api';

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();

  return (
    <Scrollbars style={{ height: '100vh' }}>
      <ContentState>
        <Router>
          <Navigation />
          <main className={classes.content}>
            <Switch>
              <Route exact path='/2d3d' component={TwoDThreeD} />
              <Route exact path='/admin' component={Admin} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/missions-visions' component={MisionVision} />
              <Route exact path='/videos' component={Videos} />
              {/* <Route exact path='/social-media' component={SocialMedia} /> ------------ */}
              <Route exact path='/social-media' component={Home} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/edit-content' component={EditContent} />
              <Route exact path='/content/:contentId' component={Content} />
              <Route exact path='/create-content' component={CreateContent} />
              <Route exact path='/messages' component={ContactUsMessages} />
              <Route exact path='/' component={Home} />
              <Redirect to='/' />
            </Switch>
          </main>
        </Router>
      </ContentState>
    </Scrollbars>
  );
}

export default App;
