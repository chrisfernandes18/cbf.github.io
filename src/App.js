import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'; 
import Home from './Home.js';
import Photos from './Photos.js';  
import Projects from './Projects.js';
import Thumbnail from './Thumbnail.js';
import './App.css';
import facebookIcon from './assets/icons/facebook-icon.svg';
import instagramIcon from './assets/icons/instagram-icon.png';
import githubIcon from './assets/icons/github-icon.svg';
import linkedinIcon from './assets/icons/linkedin-icon.svg';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <div className="navigation">
            <Link to="/" className="item">Home</Link>
            <Link to="/projects" className="item">Projects</Link>
            <Link to="/photos" className="item">Photos</Link>
        </div>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/photos" component={Photos} />
        </Switch>

        <div className="container">
          <ul className="footer">
            <Thumbnail
              image={facebookIcon}
              link="https://www.facebook.com/christian.bjerre.fernandes"
              width={50}
              height={50}
              altText="Facebook Icon"
              aClass="footer-element"
            />
            <Thumbnail
              image={instagramIcon}
              link="https://www.instagram.com/chrispoof/"
              width={50}
              height={50}
              altText="Instagram Icon"
              aClass="footer-element"
            />
            <Thumbnail
              image={githubIcon}
              link="https://github.com/chrisfernandes18"
              width={50}
              height={50}
              altText="Github Icon"
              aClass="footer-element"
            />
            <Thumbnail
              image={linkedinIcon}
              link="https://www.linkedin.com/in/christian-bjerre-fernandes/"
              idth={50}
              height={50}
              altText="LinkedIn Icon"
              aClass="footer-element"
              />
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
