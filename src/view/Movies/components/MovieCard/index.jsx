import { useDispatch } from "react-redux";

import { Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";

import YouTubeIcon from '@mui/icons-material/YouTube';
import DeleteIcon from '@mui/icons-material/Delete';

import { removeMovie } from "../../../../store/moviesSlice";

import './styles.css';

const MovieCard = (props) => {
  const {
    id,
    poster_path,
    title,
    release_date,
    runtime,
    rating,
    trailer_key,
    overview,
    actors,
    directors
  } = props.movie;

  const dispatch = useDispatch();
  const isSingleDirector = directors.length === 1;

  const trailerIcon = () => (
    <a
      href={`https://www.youtube.com/watch?v=${trailer_key}`}
      target="_blank"
      rel="noopener noreferrer"
      className="trailer-link"
    >
      <YouTubeIcon fontSize="small" />
    </a>
	)

  const titleRow = () => (
    <div className="movie-title-row">
      <Typography variant="h6">{title}</Typography>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => dispatch(removeMovie(id))}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <Card key={id} className="movie-card">
      <CardMedia
        component="img"
        className="movie-poster"
        image={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
      />
      <CardContent className="movie-content">
        {titleRow()}
        <Typography variant="body2" className="movie-details">
          <strong>Release Date</strong> {release_date}
          <strong> | Runtime:</strong> {runtime}
          <strong> | Rating:</strong> {rating}
          <strong> | Trailer:{' '}</strong> {trailerIcon()}
        </Typography>
        <Typography variant="body2">
          <strong>{`Director${isSingleDirector ? '' : 's'}`}:</strong> {directors.join(', ')}
        </Typography>
        <Typography variant="body2">
          <strong>Actors:</strong> {actors.join(', ')}
        </Typography>
        <Typography variant="body2" className="movie-overview">{overview}</Typography>
        <Typography variant="body2" className="rating-and-trailer">

        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;