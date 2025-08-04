import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import { selectHasTitlesList } from "../../../../store/selectors";
import { fetchAllMoviesData } from "../../../../store/moviesSlice";

import LanguageSelect from "./components/LanguageSelect";

import './styles.css';

const TitlesMenu = () => {
	const dispatch = useDispatch();

	const hasTitlesList = useSelector(selectHasTitlesList);

	const handleSearch = () => {
		dispatch(fetchAllMoviesData());
	}

	return (
		<Box class="titles-menu">
			<LanguageSelect />
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

export default TitlesMenu;
