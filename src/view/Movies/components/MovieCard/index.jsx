import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from '@dnd-kit/utilities'

import { removeMovie } from "../../../../store/moviesSlice";
import { selectSelectedGenre } from "../../../../store/selectors";

import './styles.css';

const MovieCard = ({ movie, onEdit }) => {
  const {
    id,
    poster_path,
    title,
    genres,
    release_date,
    runtime,
    rating,
    trailer_key,
    overview,
    actors,
    directors
  } = movie;

  const handleEditClick = () => {
    if (onEdit) onEdit(movie);
  };

  const selectedGenre = useSelector(selectSelectedGenre);

  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

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
      <div className="movie-card-buttons">
        <IconButton
          size="small"
          onClick={handleEditClick}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => dispatch(removeMovie(id))}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );

  const trailer = () => (
    <>
      <b> | Trailer:{' '}</b> {trailerIcon()}
    </>
  )

  const draggingIcon = () => (
    <IconButton
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label="drag"
        size="small"
        disableRipple
      >
        <DragIndicatorIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div ref={setNodeRef} style={style}>
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
            <b>Release Date</b> {release_date}
            <b> | Runtime:</b> {runtime}
            <b> | Rating:</b> {rating}
            {trailer_key && trailer()}
          </Typography>
          <Typography variant="body2">
            <b>Genres:</b> {genres.join(', ')}
          </Typography>
          <Typography variant="body2">
            <b>{`Director${isSingleDirector ? '' : 's'}`}:</b> {directors.join(', ')}
          </Typography>
          <Typography variant="body2">
            <b>Actors:</b> {actors.join(', ')}
          </Typography>
          <Typography variant="body2" className="movie-overview">{overview}</Typography>
          <Typography variant="body2" className="rating-and-trailer">

          </Typography>
        </CardContent>
        {!selectedGenre.length && draggingIcon()}
      </Card>
    </div>
  );
};

export default MovieCard;