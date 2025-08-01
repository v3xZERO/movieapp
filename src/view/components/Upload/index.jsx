import React, { useState } from "react";
import { Box, Button, FormHelperText, Typography } from "@mui/material";

import './styles.css';
import { useDispatch, useSelector } from "react-redux";
import { setTitlesListFromText } from "../../../store/titlesSlice";
import { selectTitlesList } from "../../../store/selectors";

const Upload = () => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const list = useSelector(selectTitlesList);
    const hasUploadedList = list.length;

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
        dispatch(setTitlesListFromText(text));
      } catch (err) {
        console.error(err);
        setError('Failed to read the file');
      }
    };

    const uploadInput = () => (
      <>
        <Typography variant="h6">Upload titles List (.txt)</Typography>
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
      </>
    )

  return (
    <Box class="upload-wrapper">
      {!hasUploadedList && uploadInput()}
    </Box>
  );
}

export default Upload;