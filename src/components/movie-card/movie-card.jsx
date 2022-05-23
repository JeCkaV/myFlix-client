import React from 'react';

import PropTypes from 'prop-types';

// Display of movies rendered on the MainView
export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div className="movie-card"onClick={() => {
          onMovieClick(movie);
        }}>
        {movie.Title}
      </div>
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

   onMovieClick: PropTypes.func.isRequired,
};