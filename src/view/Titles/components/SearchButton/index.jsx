import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectHasTitlesList } from "../../../../store/selectors";
import { fetchAllMoviesData } from "../../../../store/moviesSlice";

const SearchButton = () => {
	const dispatch = useDispatch();

	const hasTitlesList = useSelector(selectHasTitlesList);

	const handleSearch = () => {
		dispatch(fetchAllMoviesData());
	}

	return (
		<Box class="button-wrapper">
			<Button
				variant="contained"
				disabled={!hasTitlesList}
				onClick={handleSearch}
			>
				Search
			</Button>
		</Box>
	)
}

export default SearchButton;
