import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import { selectGenres, selectSelectedGenre } from "../../../../../store/selectors";
import { clearGenre, setGenre } from "../../../../../store/moviesSlice";

const GenreSelect = () => {
  const genres = useSelector(selectGenres);
  const selectedGenre = useSelector(selectSelectedGenre);
  const dispatch = useDispatch();

  if (!genres) return null;

  const handleChange = (event) => {
    dispatch(setGenre(event.target.value));
  }

  const clearGenreButton = () => (
    <IconButton
        aria-label="delete"
        size="small"
        onClick={() => dispatch(clearGenre())}
        disableRipple
    >
      <ClearIcon fontSize="small" />
    </IconButton>
  )

  return (
    <Box className="genre-wrapper">
      <FormControl fullWidth className="genre-dropdown" variant="outlined" size="small">
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={selectedGenre}
          onChange={handleChange}
          label="Genre"
        >
          {genres.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!!selectedGenre.length && clearGenreButton()}
    </Box>
  );
};

export default GenreSelect;