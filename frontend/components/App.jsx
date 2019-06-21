import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ModalRoute, ModalContainer } from 'react-router-modal';
import About from './about/About';
import AppBar from './appbar/AppBar';
import Cards from './cards/Cards';
import NotFound from './notfound/NotFound';
import Project from './project/Project';
import './App.scss';

class App extends React.Component {
  render() {
    const pathName = window.location.pathname;
    const homePath = '/';
    const aboutPath = '/about';
    const projectPath = new RegExp(/^\/project\/\d+$/);
    const correctPath = pathName === homePath
      || pathName === aboutPath
      || projectPath.test(pathName);

    return (
      <BrowserRouter>
        <div className="App">
          <Helmet>
            <title>Genesis Mallorca Obtera</title>
            <meta name="description" content="A mobile friendly, minimal, modern, and performance focused react page." />
          </Helmet>

          <AppBar />
          <Cards />
          <ModalRoute path={aboutPath} parentPath={homePath} component={About} />
          <ModalRoute path="/project/:id" parentPath={homePath} component={Project} />
          {!correctPath
            && <ModalRoute path={pathName} parentPath={homePath} component={NotFound} />
          }
          <ModalContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
