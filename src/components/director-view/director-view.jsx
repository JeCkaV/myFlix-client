import React , {useState, useEffect} from 'react';
import { MovieCard} from '../movie-card/movie-card';
import { Button, Row, Col, Spinner, ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

import './director-view.scss';

export function DirectorView(props) {

  const { director } = props;
  console.log(director)

  if (!director) {
    return <><h3>Loading..</h3></>
  }

return (
  <>  
      <Row className="justify-content-center my-4">
          <ListGroup>
            <ListGroup.Item className="h3 justify-content-center">{director.Name}</ListGroup.Item>
            <ListGroup.Item className="h6 text-muted">{director.Bio}</ListGroup.Item>
          </ListGroup>
      </Row>
      <ListGroup horizontal>
          <Row> 
              <Col>
                <ListGroup>
                    <ListGroup.Item className="h6 text-muted">Movies from {director.Name}</ListGroup.Item>
                </ListGroup>
              </Col>
          </Row>
          <Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">{(directorMovies) ? directorMovies.map(movie => 
                (<Col md={3} key={movie._id}><MovieCard md={8} movieData={movie} /></Col>)) : <Col md={3}>There are no movies of this director</Col>}
          </Row>
      </ListGroup>
  </>
)
}

DirectorView.propTypes = {
director: PropTypes.shape({
  Name: PropTypes.string.isRequired,
}).isRequired
};