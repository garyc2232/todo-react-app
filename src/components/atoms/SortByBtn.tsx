import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  selectSortBy,
  setSortBy,
} from '../../features/sortOption/sortOptionSlice';
import { SortOption } from '../../types/sortOption.type';

const SORT_OPTIONS: SortOption[] = [
  'id',
  'name',
  'status',
  'dueDate',
  'priority',
];

export const SortByBtn = () => {
  const selectedSortOption = useAppSelector(selectSortBy);
  const dispatch = useAppDispatch();

  const handleOptionChange = (
    event: React.MouseEvent<HTMLElement>,
    option: SortOption,
  ) => {
    dispatch(setSortBy(option));
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedSortOption}
      exclusive
      onChange={handleOptionChange}
    >
      {SORT_OPTIONS.map((option) => (
        <ToggleButton value={option} key={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
