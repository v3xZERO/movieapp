import { useSelector } from "react-redux";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';

import { selectMoviesList } from "../../../store/selectors";

import './styles.css'

const MoviesList = () => {
	const movies = useSelector(selectMoviesList);
	const trailerIcon = (key) => (
		<a
			href={`https://www.youtube.com/watch?v=${key}`}
			target="_blank"
			rel="noopener noreferrer"
			className="trailer-link"
		>
			<YouTubeIcon fontSize="small" />
		</a>
	)

	return (
			<Box class="content-wrapper">
				<Box class="movies-list">
					{movies.map((movie) => (
						<Card key={movie.id} className="movie-card">
							<CardMedia
								component="img"
								className="movie-poster"
								image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
							/>
							<CardContent className="movie-content">
								<Typography variant="h6">{movie.title}</Typography>
								<Typography variant="body2" className="movie-details">
									<strong>Release Date</strong> {movie.release_date}
									<strong> | Runtime:</strong> {movie.runtime}
									<strong> | Rating:</strong> {movie.rating}
									<strong> | Trailer:{' '}</strong> {trailerIcon(movie.trailer_key)}
								</Typography>
								<Typography variant="body2">
									<strong>Director(s):</strong> {movie.directors.join(', ')}
								</Typography>
								<Typography variant="body2">
									<strong>Actors:</strong> {movie.actors.join(', ')}
								</Typography>
								<Typography variant="body2">{movie.overview}</Typography>
								<Typography variant="body2" className="rating-and-trailer">

								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			</Box>
	);
};

export default MoviesList;