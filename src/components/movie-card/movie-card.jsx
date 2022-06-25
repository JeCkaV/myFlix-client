import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import heartEmpty from '../../img/heart-empty.png';
import heartFull from '../../img/heart-full.png';

//importing stylesheet
import './movie-card.scss';

//Basic display of movies that are rendered on MainView
export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: '',
      favoriteMovies: [],
      favorited: '',
    };
  }

  addFavMovie(mid) {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .post(
        `https://radiant-depths-97196.herokuapp.com/users/${userName}/favorites/${mid}`,
        '',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeFavMovie(mid) {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://radiant-depths-97196.herokuapp.com/users/${userName}/favorites/${mid}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.setState({
      favorited: this.props.isFavorite,
      movieId: this.props.movie._id,
      favoriteMovies: this.props.favorites,
    });
  }

  render() {
    const { movie, isFavorite, favorites } = this.props;
    console.log("Movie Image path", movie.ImagePath)
    return (
      <Card className="movie-card custom-movie-card">
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
        <Card.Body className="card-body-list">
          <div>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </div>
          <Link to={`/movies/${movie._id}`}>
            <Button>Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//setting up default values for the MovieCard properties
//ensuring values are strings and required
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};