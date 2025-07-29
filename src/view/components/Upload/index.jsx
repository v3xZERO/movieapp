import React, { useState } from "react";
import { Box, Button, FormHelperText, Typography } from "@mui/material";

import './styles.css';
import { useDispatch } from "react-redux";
import { setMovieListFromText } from "../../../store/movieSlice";

const Upload = () => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleFileChange = async (e) => {
      setError('');
      const file = e.target.files[0];
      if (!file) return;

      if (file.type !== 'text/plain') {
        setError('Please upload a valid .txt file');
        return;
      }

      try {
        const text = await file.text();
        dispatch(setMovieListFromText(text));
      } catch (err) {
        console.error(err);
        setError('Failed to read the file');
      }
    };

  return (
    <Box class="upload-wrapper">
      <Typography variant="h6">Upload Movie List (.txt)</Typography>
      
      <input
        accept=".txt"
        style={{ display: 'none' }}
        id="upload-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}

export default Upload;