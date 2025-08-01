import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTitlesList } from "../../../../store/selectors";
import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { toggleTitleChecked } from "../../../../store/titlesSlice";

const TitlesList = () => {
	const titles = useSelector(selectTitlesList); // state.titles.list

    const dispatch = useDispatch();

	const handleToggle = (index) => () => {
        dispatch(toggleTitleChecked(index))
	};

	if (!titles.length) {
		return (
			<Typography variant="body1" mt={3}>
				No titles loaded yet.
			</Typography>
		);
	}

	return (
		<Box mt={3}>
			<Typography variant="h5">Your Movie Titles</Typography>
			<List dense>
				{titles.map((title, index) => (
					<ListItem
						key={index}
						button
						onClick={handleToggle(index)}
						divider
					>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={title.checked}
								tabIndex={-1}
								disableRipple
							/>
						</ListItemIcon>
						<ListItemText primary={title.text} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default TitlesList;
