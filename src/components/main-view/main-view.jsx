import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router} from "react-router-dom";
import { MainView } from '../main-view/main-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import { BrowserRouter as Router,  Routes, Routenpm} from "react-router-dom";
import { NavigationbarView } from '../navigationbar-view/navigationbar-view';

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
      setUser(authData.user.Username)
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      setLoading(false)

    }

  //fetch movies from API
  async function getMovies(token) {
       const response =  await axios.get('https://radiant-depths-97196.herokuapp.com/movies', {
       headers: { Authorization: `Bearer ${token}`}
      })
      setMovies(response.data)
      setLoading(false);
    }

 //If data is not fetched, show spinner
  if ((user) && (loading)) {
    return <Row className="justify-content-center my-5">
          <div className="h3 text-muted text-center">Loading Movies...
            &nbsp;<Spinner animation="border" variant="secondary" role="status" />
          </div>
        </Row>		
   }

  if (error) {
    return <Row className="justify-content-center my-5">
      <p>There was an error loading your data!</p>
      </Row>
  }

  return (
  <>
      <>
          <Router>
              <NavigationbarView />
              <Routes>
              <Route
                  path="/"
                  element={<>
                    {(!user) ? <><Col><LoginView onLoggedIn={(user) => onLoggedIn(user)} /></Col></> :
                    <><Row className="main-view justify-content-md-evenly m-0 p-5 align-items-start">{movies.map((m) => (<Col md={3} key={m._id}><MovieCard md={8} key={m._id} movieData={m} /></Col>))}</Row></>}
                  </>}/>
                      <Route path="/movies/:movie_id" element={<MovieView />} /> 

                      {/* <Route path="/register" element={
                              (user) ? <Redirect to="/" /> : <RegistrationView />
                            } /> */}

                      <Route path="directors/:director_id" element={
                              (!user) ? <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
                              : <DirectorView />
                            }/>

                      <Route path="genres/:genre_id" element={
                            (!user) ? <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
                            : <GenreView />
                            } />

                      {/* <Route path="favourites" element={
                            (!user) ? <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
                            : <FavouritesView />
                            } /> */}

                      <Route path='profile' element={
                            (!user) ? <LoginView onLoggedIn={user => onLoggedIn(user)} />
                            : <ProfileView />
                             } />

                      <Route path='register' element={<RegistrationView />} />

                              {/*<Route path="profile" element={<ProfileView user={user} />} />
                      <Route path="favourites" element={<FavouritesView user={user} />} />
                      <Route path="directors/:director_id" element={<DirectorView user={user}/>} />
                      <Route path="genres/:genre_id" element={<GenreView user={user}/>} />  */}
              </Routes>
          </Router>
          </> 
  </>  
)
}

