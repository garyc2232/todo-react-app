import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';

export const FormPage = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const tags = [
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            rows={4}
            multiline
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Priority"
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              max: 10,
              min: 0,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Due Date" fullWidth margin="normal" />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>...</LocalizationProvider> */}
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags"
            options={tags}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
