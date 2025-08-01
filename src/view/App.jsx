import { useSelector } from 'react-redux';

import { selectHasMoviesList } from '../store/selectors';
import Titles from './Titles';
import Movies from './Movies';

import './styles.css';

const App = () => {
	const hasMoviesList = useSelector(selectHasMoviesList);

	return (
		<div className="app-wrapper">
			<div className="app">
				{hasMoviesList ? <Movies /> : <Titles />}
			</div>
		</div>
	);
}

export default App;
