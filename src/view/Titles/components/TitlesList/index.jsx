import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTitlesList } from "../../../../store/selectors";
import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

const TitlesList = () => {
	const titles = useSelector(selectTitlesList); // state.titles.list
	const [checked, setChecked] = useState([]);

	const handleToggle = (index) => () => {
		const currentIndex = checked.indexOf(index);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(index);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
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
								checked={checked.indexOf(index) !== -1}
								tabIndex={-1}
								disableRipple
							/>
						</ListItemIcon>
						<ListItemText primary={title} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default TitlesList;
