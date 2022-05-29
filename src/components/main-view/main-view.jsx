import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { NavbarView } from "../navigationbar-view/navigationbar-view";

//getting array of movies from remote and displaying as a list
export function MainView(props) {

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(props.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        setUser(localStorage.getItem('user'));
      }
    getMovies(accessToken);
    },[user])

     /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
     function onLoggedIn(authData) {
      console.log("OnLoggedIn...");
      setUser(authData.user.Username);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      setLoading(false)

    }

  //fetch movies from API
  async function getMovies(token) {
       const response =  await axios.get('https://radiant-depths-97196.herokuapp.com/movies', {
       headers: { Authorization: `Bearer ${token}`},
      });
      setMovies(response.data)
      setLoading(false);
    }

 //If data is not fetched, show spinner
  if ((user) && (loading)) {
    return (
          <Row className="justify-content-center my-5">
             <div className="h3 text-muted text-center"> Loading Movies...&nbsp; 
             <Spinner animation="border" variant="secondary" role="status" />
          </div>
        </Row>
    );		
   }

  if (error) {
    return (
       <Row className="justify-content-center my-5">
      <p>There was an error loading your data!</p>
      </Row>
      );
  }

  return (
    <>
      <Router>
        <NavbarView />
        <Container>
          <Route
            path='/'
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view'></div>;
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
        </Container>
      </Router>
    </>
  );
}

