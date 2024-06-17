import { Box, Typography } from '@mui/material';

type ListTabProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export const ListTab = (props: ListTabProps) => {
  const { children, isActive, onClick } = props;

  return (
    <Box
      alignContent={'center'}
      justifyContent={'center'}
      sx={{
        width: 'auto',
        height: 50,
        margin: 2,
        marginLeft: 1,
        marginRight: 1,
        padding: 1,
        borderRadius: 5,
        border: '2px solid',
        borderColor: '#666',
        bgcolor: isActive ? 'primary.main' : '#fff',
        '&:hover': {
          bgcolor: isActive ? 'primary.dark' : '#ccc',
        },
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Typography variant="h6" textAlign={'center'}>
        {children}
      </Typography>
    </Box>
  );
};
