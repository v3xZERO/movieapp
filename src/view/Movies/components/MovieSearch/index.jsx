import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Autocomplete, TextField } from "@mui/material"

import { clearSearchQuery, fetchFullMovieById, searchMoviesThunk, setSearchQuery } from "../../../../store/moviesSlice"
import { selectSearchQuery, selectSearchResults } from "../../../../store/selectors"

import './styles.css';

const MovieSearch = () => {
	const dispatch = useDispatch()
	const options = useSelector(selectSearchResults)
  const query = useSelector(selectSearchQuery)
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (query.length <= 3) {
			setOpen(false)
			return
		}

		const timeoutId = setTimeout(() => {
			setLoading(true)
			dispatch(searchMoviesThunk(query)).finally(() => {
				setLoading(false)
				setOpen(true)
			})
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [query, dispatch])

	const handleSelect = (event, value) => {
    if (!value || !value.id) return
		dispatch(fetchFullMovieById(value.id))
		dispatch(clearSearchQuery());
		setOpen(false)
	}

	return (
		<Autocomplete
			open={open && options.length > 0}
			options={options}
			getOptionLabel={(option) => `${option.title} (${option.release_date})`}
			loading={loading}
			onChange={handleSelect}
			inputValue={query}
      value={null}
      clearOnBlur
      clearOnEscape
			onInputChange={(e, val) => dispatch(setSearchQuery(val))}
      className="movie-search"
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Movies"
					variant="outlined"
					fullWidth
				/>
			)}
		/>
	)
}

export default MovieSearch;
