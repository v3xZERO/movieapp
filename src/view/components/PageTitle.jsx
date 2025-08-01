import { Box, Typography } from "@mui/material";

const PageTitle = (props) => {
	const { title } = props;
	return (
		<Box class="title-wrapper">
			<Typography variant="h5" className="title-wrapper">
				{title}
			</Typography>
		</Box>
	);
};

export default PageTitle;
