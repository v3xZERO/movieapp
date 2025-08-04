import { useDispatch, useSelector } from "react-redux";

import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { selectTitlesList } from "../../../../store/selectors";
import { toggleTitleChecked } from "../../../../store/titlesSlice";

import './styles.css';

const TitlesList = () => {
	const titles = useSelector(selectTitlesList); // state.titles.list

	const dispatch = useDispatch();

	const handleToggle = (index) => () => {
		dispatch(toggleTitleChecked(index))
	};

	if (!titles.length) return null;

	return (
		<Box class="titles-content content-wrapper">
			<List class="titles-list">
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
