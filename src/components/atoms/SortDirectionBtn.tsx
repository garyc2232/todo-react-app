import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  selectIsAsc,
  setIsAsc,
} from '../../features/sortOption/sortOptionSlice';
import { SortDirection } from '../../types/sortOption.type';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export const SortDirectionBtn = () => {
  const isAsc = useAppSelector(selectIsAsc);
  const dispatch = useAppDispatch();

  const handleOptionChange = (
    _: React.MouseEvent<HTMLElement>,
    option: SortDirection,
  ) => {
    dispatch(setIsAsc(option === 'asc'));
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={isAsc ? 'asc' : 'desc'}
      exclusive
      onChange={handleOptionChange}
    >
      <ToggleButton value={'asc'} key={'asc'} size="small">
        <ArrowDropUpIcon />
      </ToggleButton>
      <ToggleButton value={'desc'} key={'asc'} size="small">
        <ArrowDropDownIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
