import React, { useState } from "react";
import { Box, Button, FormHelperText, Typography } from "@mui/material";

import './styles.css';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'text/plain') {
      console.log(selected)
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid .txt file');
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

      {file && <Typography mt={2}>Selected: {file.name}</Typography>}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}

export default Upload;