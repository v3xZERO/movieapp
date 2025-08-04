import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import MovieCard from '../MovieCard'

const SortableMovieCard = ({ movie }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: movie.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<MovieCard movie={movie} />
		</div>
	)
}

export default SortableMovieCard
