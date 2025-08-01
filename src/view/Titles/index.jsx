import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { selectHasTitlesList } from "../../store/selectors";

import TitlesList from "./components/TitlesList";
import Upload from "./components/Upload";
import SearchButton from "./components/SearchButton";

import './styles.css';

const Titles = () => {
    const hasTitlesList = useSelector(selectHasTitlesList);
    
    return (
        <Box class="upload-wrapper">
            {hasTitlesList ? <TitlesList /> : <Upload />}
            <SearchButton />
        </Box>
    )
}

export default Titles;
