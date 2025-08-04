import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { selectHasTitlesList } from "../../store/selectors";

import PageTitle from "../components/PageTitle";
import TitlesMenu from "./components/TitlesMenu";

import TitlesList from "./components/TitlesList";
import Upload from "./components/Upload";

const Titles = () => {
	const hasTitlesList = useSelector(selectHasTitlesList);

	return (
		<Box class="page-wrapper">
			{hasTitlesList ? <PageTitle title="Imported Movie Titles" /> : null}
			{hasTitlesList ? <TitlesList /> : <Upload />}
			<TitlesMenu />
		</Box>
	)
};

export default Titles;
