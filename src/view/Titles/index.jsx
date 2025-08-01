import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { selectHasTitlesList, selectSelectedTitlesList } from "../../store/selectors";

import TitlesList from "./components/TitlesList";
import Upload from "./components/Upload";

import './styles.css';
import SearchButton from "./components/SearchButton";

const Titles = () => {
    const hasTitlesList = useSelector(selectHasTitlesList);
    const selectedTitles = useSelector(selectSelectedTitlesList)

    console.log(selectedTitles);
    
    return (
        <Box class="upload-wrapper">
            {hasTitlesList ? <TitlesList /> : <Upload />}
            <SearchButton />
        </Box>
    )
}

export default Titles;
