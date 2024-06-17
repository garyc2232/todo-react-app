import { Box, Grid, Stack, Typography } from '@mui/material';
import { Todo, TodoStatus } from '../../types/todo.type';

import { TextLabel } from '../atoms/TextLabel';
import { formatDate } from '../../utils/dateUtil';
import { PriorityLabel } from '../atoms/PriorityLabel';
type TodoItemProps = {} & Todo;

const statusBgColor = (status: TodoStatus) => {
  switch (status) {
    case TodoStatus.NOT_STARTED:
      return '#fff';
    case TodoStatus.IN_PROGRESS:
      return 'lightblue';
    case TodoStatus.COMPLETED:
      return 'green';
  }
};

export const TodoItem = (props: TodoItemProps) => {
  const { priority, name, status, description, tags, dueDate } = props;
  const numberOfTagsLimit = 2;
  const truncatedTags = tags.slice(0, numberOfTagsLimit);
  return (
    <Box
      alignContent={'center'}
      justifyContent={'center'}
      sx={{
        width: 'auto',
        height: 50,
        margin: 2,
        padding: 1,
        borderRadius: 5,
        border: '2px solid',
        borderColor: '#666',
        bgcolor: statusBgColor(status),
        '&:hover': {
          borderColor: 'red',
        },
        cursor: 'pointer',
      }}
      // onClick={onClick}
    >
      <Grid container direction="row">
        <Grid item xs={2}>
          <Typography variant="h6" textAlign={'center'}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <PriorityLabel number={priority}>{priority}</PriorityLabel>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            textAlign={'center'}
            sx={{
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {description}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems="center">
            <Stack direction="row" spacing={2}>
              {truncatedTags.map((tag, idx) => (
                <TextLabel key={idx} variant="elevation">
                  {tag}
                </TextLabel>
              ))}
              {tags.length > numberOfTagsLimit && (
                <TextLabel variant="elevation">...</TextLabel>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" textAlign={'center'}>
            {formatDate(dueDate)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
