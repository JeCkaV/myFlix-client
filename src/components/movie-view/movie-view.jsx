import React , {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { CardGroup, Card, ListGroup, ListGroupItem, Button, Row, Col, Image, Stack, Spinner } from 'react-bootstrap';
import { Link, useParams, useNavigate, useLocation} from "react-router-dom";

import './movie-view.scss';

//showing details once MovieCard is clicked
export function MovieView(props) {
		
  const baseURL = 'https://radiant-depths-97196.herokuapp.com//';
      
  //Destructuring the params Object
  const {navigate} = useNavigate();
  const {movie_id} = useParams();
  const accessToken = localStorage.getItem('token');
  const activeUser = localStorage.getItem('user');

  //Initializing movie and user obj
  const [user, setUser] = useState('');
  const [movie, setMovie] = useState('');	

  const [director, setDirector ] = useState('');
  const [genres, setGenres] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getMissingData(activeUser)
  },[])		

  async function getMissingData(activeUser) {
    axios.all([
          axios(baseURL + 'users/' + activeUser,{ headers: { Authorization: `Bearer ${accessToken}`} } ),
          axios(baseURL + 'movies/' + movie_id,{ headers: { Authorization: `Bearer ${accessToken}`} } ),
          axios(baseURL + 'directors/',{ headers: { Authorization: `Bearer ${accessToken}`} } ),
          axios(baseURL + 'genres/', { headers: { Authorization: `Bearer ${accessToken}`} } )
          ])
            .then(axios.spread((userData, movieData, directorsData, genresData) => {
              setUser(userData.data)
              setMovie(movieData.data)
              let movieDirector = {
                Name: directorsData.data.find(dir => dir._id === movieData.data.Director).Name,
                _id: directorsData.data.find(dir => dir._id === movieData.data.Director)._id
              };
              let movieGenres = [];
              movieData.data.Genre.forEach((g, i) => {
                movieGenres.push(genresData.data.find(gen => gen._id === g));
              })
              //If already favourite show only remove link
              if (userData.data.FavoriteMovies.includes(movie_id)) setIsFavourite(true)

              setDirector(movieDirector)
              setGenres(movieGenres)
            }))
            .catch(error => console.error(error))
            .finally(() => {
              setLoading(false)
            })												
  }

  const isFeatured = (val) => {
    if (movie != '') { 
      if (val) 		return <strong>Available</strong>;
      else			return 'Not Available';
    }
  }

  const addFavouriteMovie = () => {
    //The put method in Axios serialize the 2nd parameter as JSON string !!! IMPORTANT
    axios.put(baseURL + 'users/' + activeUser + '/favs/'+ movie._id, {} , { headers: { Authorization: `Bearer ${accessToken}`} } )
    .then(response => {
            console.log(response.data);
            setIsFavourite(true)
            })
          .catch(error => {
            console.log(error);
            setError(error);
          })
  }

  const removeFavouriteMovie = (e) => {
    let movieToRemove = ([e.target.id]);
    axios.delete(baseURL+'users/'+ activeUser +'/favs/'+ movie_id, { headers: { Authorization: `Bearer ${accessToken}`} })
      .then(response => {
        console.log(response.data);
          setIsFavourite(false)
        })
      .catch(error => {
        console.log(error);
        setError(error);
      })
  }

  //While data is not fetched, show spinner
  if (loading) {
    return <Row className="justify-content-center my-5">
          <div className="h3 text-muted text-center">Data is loading
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
  
  <Row className="justify-content-center my-5">
      <Col md={6}> 
          <div className="h3 text-muted text-center">{movie.Title}</div>
            
            <div className="p-1 m-1 h6 text-muted text-center">
                <p>({ 
                  genres.map((g, i) => (i!=0) ? <>, <Link className="std-link" key={g._id} to={`/genres/${g._id}`}>{g.Name}</Link></> : <Link className="std-link" key={g._id} to={`/genres/${g._id}`}>{g.Name}</Link>)
                  })</p>
            </div>

            <div className="p-4 m-3 h5 text-muted text-center">
              <p>Directed by <Link className="std-link" to={`../directors/${director._id}`}>{(director) && director.Name}</Link></p>
              &nbsp;
              <p>{movie.Description}</p>
            </div>    

           <Stack gap={2} className="d-flex justify-content-center align-items-center">
                  <div>Actors</div><div className="bg-light border p-2 m-3 px-3">
                    { movie.Actors.map((actor, i) => (i!=0) ? ', '+actor : actor)}
                  </div>
          </Stack> 
          <Stack gap={2} className="d-flex justify-content-center align-items-center">
          <div>Available in Theathers</div><div className="bg-light border p-2 m-3 px-3">{isFeatured(movie.Featured)}</div>
          </Stack>
          <Stack gap={3} className="col-md-5 text-center mx-auto">
                  <>{(!isFavourite) && <Button variant="link text-muted" onClick={addFavouriteMovie}>Add to favourites</Button>}</>
                  <>{(isFavourite) && <Button variant="link text-muted" onClick={removeFavouriteMovie}>Remove from Favourites</Button>}</>
          </Stack>
          <Stack gap={2} className="col-md-5 mx-auto text-center m-4 p-2">
                  <Button variant="secondary" onClick={() => { navigate('/') }}>Back to all movies</Button>     
          </Stack>
      </Col>

  <Col md={5}> 
        <Image className="poster" src={movie.ImagePath} crossOrigin="anonymous"/>
      </Col>
  </Row>
  
  </>
  )

}
