import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  selectSortBy,
  setSortBy,
} from '../../features/sortOption/sortOptionSlice';
import { SortOption } from '../../types/sortOption.type';
import useResponsiveView from '../../utils/customHook/useResponsiveView';

const SORT_OPTIONS: SortOption[] = [
  'id',
  'name',
  'status',
  'dueDate',
  'priority',
];

export const SortByComponent = () => {
  const selectedSortOption = useAppSelector(selectSortBy);
  const dispatch = useAppDispatch();
  const handleOptionChange = (event: SelectChangeEvent<SortOption>) => {
    dispatch(setSortBy(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="SortBy">SortBy</InputLabel>
      <Select
        labelId="SortBy"
        id="SortBy"
        value={selectedSortOption}
        label="Status"
        onChange={handleOptionChange}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
