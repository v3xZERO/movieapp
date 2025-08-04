import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';


import { selectMoviesFilteredByGenre } from "../../../../store/selectors";
import { reorderMovies, updateMovie } from "../../../../store/moviesSlice";

import MovieCard from "../MovieCard";
import MovieSearch from "../MovieSearch";
import EditMovieModal from "../EditMovieModal";

import './styles.css'

const MoviesList = () => {
	const dispatch = useDispatch()
	const movies = useSelector(selectMoviesFilteredByGenre)
	const [selectedMovie, setSelectedMovie] = useState(null);

	// Sort the array by current order field before rendering
	const sortedMovies = [...movies].sort((a, b) => a.order - b.order)

	const sensors = useSensors(useSensor(PointerSensor))

	const handleDragEnd = (event) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const oldIndex = sortedMovies.findIndex((m) => m.id === active.id)
		const newIndex = sortedMovies.findIndex((m) => m.id === over.id)

		const newOrder = arrayMove(sortedMovies, oldIndex, newIndex).map((m, index) => ({ ...m, order: index }))

		dispatch(reorderMovies(newOrder));
	}

	 const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = (updatedMovie) => {
    dispatch(updateMovie(updatedMovie));
  };

	return (
		<Box className="content-wrapper">
			<MovieSearch />
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis]}
			>
				<SortableContext
					items={sortedMovies.map((m) => m.id)}
					strategy={verticalListSortingStrategy}
				>
					<Box className="movies-list">
						{sortedMovies.map((movie) => (
							<MovieCard key={movie.id} movie={movie} onEdit={handleEdit}/>
						))}
					</Box>
				</SortableContext>
			</DndContext>
			<EditMovieModal
        open={!!selectedMovie}
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onSave={handleSave}
      />
		</Box>
	)
}

export default MoviesList;