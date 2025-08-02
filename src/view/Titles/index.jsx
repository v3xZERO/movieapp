import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { selectHasTitlesList } from "../../store/selectors";

import TitlesList from "./components/TitlesList";
import Upload from "./components/Upload";
import SearchButton from "./components/SearchButton";
import PageTitle from "../components/PageTitle";
import LanguageSelect from "./components/LanguageSelect";

const Titles = () => {
	const hasTitlesList = useSelector(selectHasTitlesList);

	return (
		<Box class="page-wrapper">
			{hasTitlesList ? <PageTitle title="Imported Movie Titles" /> : null}
			{hasTitlesList ? <TitlesList /> : <Upload />}
			<SearchButton /> <LanguageSelect />
		</Box>
	)
};

export default Titles;
