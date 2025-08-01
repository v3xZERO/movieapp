import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { selectHasTitlesList } from "../../../../store/selectors";
import { fetchAllMoviesData } from "../../../../store/moviesSlice";

const SearchButton = () => {
    const dispatch = useDispatch();

    const hasTitlesList = useSelector(selectHasTitlesList);
    
    const handleSearch = () => {
        dispatch(fetchAllMoviesData())
    }
    
    return (<Button variant="contained" disabled={!hasTitlesList} onClick={handleSearch}>Search</Button>)
}

export default SearchButton;
