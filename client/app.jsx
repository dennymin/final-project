import React from 'react';
import { Container } from '@material-ui/core';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
// import NewWorkoutForm from './pages/new-workout';
import NewMealForm from './pages/new-meal';
// import AppDrawer from './components/drawer-component';
import Header from './components/header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  // renderPage() {
  //   const { route } = this.state;
  //   if (route.path === '') {
  //     return <Home />;
  //   }
  //   if (route.path === 'app/new/workout') {
  //     const productId = route.params.get('productId');
  //     return <NewWorkoutForm productId={productId} />;
  //   }
  // }

  render() {
    return (
      <>
        <Container>
          <Header />
          <NewMealForm />
        </Container>
        <Home />
      </>
    );
  }
}
