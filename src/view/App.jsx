import { useDispatch, useSelector } from "react-redux";

import { selectHasMoviesList } from "../store/selectors";
import Titles from "./Titles";
import Movies from "./Movies";

import "./styles.css";
import { useEffect } from "react";
import { loadLanguages } from "../store/metaSlice";

const App = () => {
	const hasMoviesList = useSelector(selectHasMoviesList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLanguages());
	}, []);

	return (
		<div className="app-wrapper">
			<div className="app">
				{hasMoviesList ? <Movies /> : <Titles />}
			</div>
		</div>
	);
}

export default App;
