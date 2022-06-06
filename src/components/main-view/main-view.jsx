import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { Router, Row, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/


// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() {
    super();

    // #3 movies state removed from here
    this.state = {
      user: null
    };
  }
  //This will be executed after loading the page
  componentDidMount() 
  { axios
    .get('https://radiant-depths-97196.herokuapp.com/movies')
    .then(response => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //fetch movies from API
  getMovies(token) {
       const response =  await axios.get('https://radiant-depths-97196.herokuapp.com/movies', {
       headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {

        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
      console.log("OnLoggedIn...");
      setUser(authData.user.Username);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      setLoading(false)

    }

    render() {

      // #5 movies is extracted from this.props rather than from the this.state
      let { movies } = this.props;
      let { user } = this.state;
  
      return (
        <Router>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              // #6
              return <MoviesList movies={movies}/>;
            }} />
            {/* The rest of routes */}
          </Row>
        </Router>
            );
    }
  }
  
  // #7
  let mapStateToProps = state => {
    return { movies: state.movies }
  }
  
  // #8
  export default connect(mapStateToProps, { setMovies } )(MainView);