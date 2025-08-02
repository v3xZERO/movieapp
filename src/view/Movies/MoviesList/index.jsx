import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { selectMoviesList } from "../../../store/selectors";
import MovieCard from "../components/MovieCard";

import './styles.css'

const MoviesList = () => {
	const movies = useSelector(selectMoviesList);

	return (
			<Box class="content-wrapper">
				<Box class="movies-list">
					{movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
				</Box>
			</Box>
	);
};

export default MoviesList;