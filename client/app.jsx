import React from 'react';
import { Container } from '@material-ui/core';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import NewWorkoutForm from './pages/new-workout';
import NewMealForm from './pages/new-meal';
import TempDrawer from './components/temp-drawer';
import YourWorkouts from './pages/your-workouts';
import YourMeals from './pages/your-meals';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

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

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'app/your/workouts') {
      return (
        <YourWorkouts/>
      );
    }
    if (route.path === 'app/your/meals') {
      return (
        <YourMeals />
      );
    }
    if (route.path === 'app/new/workout') {
      return (
          <NewWorkoutForm />
      );
    }
    if (route.path === 'app/new/meal') {
      return (
          <NewMealForm />
      );
    }
  }

  render() {
    const theme = createTheme({
      overrides: {
        MuiAccordion: {
          root: {
            backgroundColor: '#F0F5F9',
            width: '100%'
          }
        },
        MuiAccordionSummary: {
          root: {
            fontWeight: '500'
          }
        },
        MuiAccordionDetails: {
          root: {
            backgroundColor: '#e8e8e8',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: '#C9D6DF',
              textDecoration: 'none'
            }
          }
        },
        MuiDrawer: {
          paper: {
            backgroundColor: '#C9D6DF'
          }
        },
        MuiDropzoneArea: {
          root: {
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: 160,
            border: '1px hidden',
            borderBottom: '1px solid #888484',
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: '#e8e8e8'
          },
          textContainer: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'column'
          },
          text: {
            marginTop: 15,
            marginBottom: 5,
            fontSize: 'small',
            color: 'rgb(100, 100, 100)'
          },
          icon: {
            width: 70,
            height: 30,
            marginBottom: 0,
            color: 'rgb(100, 100, 100)'
          }
        },
        MuiDropzonePreviewList: {
          root: {
            display: 'flex',
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center'
          },
          imageContainer: {
            display: 'inline',
            padding: '4px !important'
          },
          image: {
            maxWidth: 80,
            maxHeight: 80,
            objectFit: 'cover',
            boxShadow: 'none',
            padding: 4,
            borderRadius: 5
          }
        },
        MuiDropzoneSnackbar: {
          successAlert: {
            display: 'none'
          }
        }
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <Container className='container-gutter'>
          <TempDrawer />
          { this.renderPage() }
        </Container>
      </ThemeProvider>
    );
  }
}
