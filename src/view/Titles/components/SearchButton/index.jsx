import { Button } from "@mui/material"
import { useSelector } from "react-redux";
import { selectHasTitlesList } from "../../../../store/selectors";

const SearchButton = () => {
    const hasTitlesList = useSelector(selectHasTitlesList);
    return (<Button variant="contained" disabled={!hasTitlesList}>Search</Button>)
}

export default SearchButton;
