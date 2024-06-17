import { Box, Grid, Stack, Typography } from '@mui/material';
import { Todo, TodoStatus } from '../../types/todo.type';

import { TextLabel } from '../atoms/TextLabel';
import { formatDate } from '../../utils/dateUtil';
import { PriorityLabel } from '../atoms/PriorityLabel';
import useResponsiveView from '../../utils/customHook/useResponsiveView';
import { useAppDispatch } from '../../features/store';
import { UpdateTodoForm } from '../organisms/UpdateTodoForm';
import { openModal } from '../../features/modal/modalSlice';
export type TodoItemProps = { tags: string[] } & Omit<Todo, 'tags'>;

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

const desktopViewMapping = {
  name: 2,
  priority: 1,
  description: 2,
  tags: 3,
  dueDate: 3,
};

const mobileViewMapping = {
  name: 6,
  priority: 0,
  description: 0,
  tags: 4,
  dueDate: 0,
};

export const TodoItem = (props: TodoItemProps) => {
  const { priority, name, status, description, tags, dueDate } = props;
  const numberOfTagsLimit = 2;
  const truncatedTags = tags.slice(0, numberOfTagsLimit);
  const { isMobileView } = useResponsiveView();
  const viewMapping = isMobileView ? mobileViewMapping : desktopViewMapping;
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(openModal({ Body: <UpdateTodoForm {...props} /> }));
  };

  return (
    <Box
      alignContent={'center'}
      justifyContent={'center'}
      sx={{
        width: 'auto',
        height: 50,
        marginBottom: 2,
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
      onClick={onClick}
    >
      <Grid container direction="row">
        <Grid item xs={viewMapping.name}>
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
            {name}
          </Typography>
        </Grid>

        {!isMobileView && (
          <Grid item xs={viewMapping.priority}>
            <PriorityLabel number={priority}>{priority}</PriorityLabel>
          </Grid>
        )}

        {!isMobileView && (
          <Grid item xs={viewMapping.description}>
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
        )}
        <Grid item xs={viewMapping.tags}>
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
        {!isMobileView && (
          <Grid item xs={viewMapping.dueDate}>
            <Typography variant="subtitle1" textAlign={'center'}>
              {formatDate(dueDate)}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
