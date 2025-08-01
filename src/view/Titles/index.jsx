import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { selectHasTitlesList } from "../../store/selectors";

import TitlesList from "./components/TitlesList";
import Upload from "./components/Upload";
import SearchButton from "./components/SearchButton";

const Titles = () => {
    const hasTitlesList = useSelector(selectHasTitlesList);
    
    return (
        <Box class="page-wrapper">
            {hasTitlesList ? <TitlesList /> : <Upload />}
            <SearchButton />
        </Box>
    )
}

export default Titles;
