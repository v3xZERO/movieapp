import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';

const EditMovieModal = ({ open, onClose, movie, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    release_date: '',
    runtime: '',
    rating: '',
    overview: '',
    directors: '',
    actors: '',
    genres: ''
  });

  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title,
        release_date: movie.release_date,
        runtime: movie.runtime,
        rating: movie.rating,
        overview: movie.overview,
        directors: movie.directors.join(', '),
        actors: movie.actors.join(', '),
        genres: movie.genres.join(', ')
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave({
      ...movie,
      ...form,
      directors: form.directors.split(',').map((d) => d.trim()),
      actors: form.actors.split(',').map((a) => a.trim()),
      genres: form.genres.split(',').map((g) => g.trim())
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <TextField name="title" label="Title" fullWidth margin="dense" value={form.title} onChange={handleChange} />
        <TextField name="release_date" label="Release Date" fullWidth margin="dense" value={form.release_date} onChange={handleChange} />
        <TextField name="runtime" label="Runtime" fullWidth margin="dense" value={form.runtime} onChange={handleChange} />
        <TextField name="rating" label="Rating" fullWidth margin="dense" value={form.rating} onChange={handleChange} />
        <TextField name="overview" label="Overview" fullWidth multiline rows={3} margin="dense" value={form.overview} onChange={handleChange} />
        <TextField name="directors" label="Directors (comma-separated)" fullWidth margin="dense" value={form.directors} onChange={handleChange} />
        <TextField name="actors" label="Actors (comma-separated)" fullWidth margin="dense" value={form.actors} onChange={handleChange} />
        <TextField name="genres" label="Genres (comma-separated)" fullWidth margin="dense" value={form.genres} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMovieModal;
