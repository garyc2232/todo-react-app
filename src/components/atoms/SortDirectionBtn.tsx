import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../features/store";
import {
    selectIsAsc,
    selectSortBy,
    setIsAsc,
    setSortBy,
} from "../../features/sortOption/sortOptionSlice";
import { SortOption } from "../../types/sortOption.type";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export const SortDirectionBtn = () => {
    const isAsc = useAppSelector(selectIsAsc);
    const dispatch = useAppDispatch();

    const handleOptionChange = (
        event: React.MouseEvent<HTMLElement>,
        option: SortOption
    ) => {
        dispatch(setIsAsc(option === "asc"));
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={isAsc ? "asc" : "desc"}
            exclusive
            onChange={handleOptionChange}
        >
            <ToggleButton value={"desc"} key={"desc"}>
                <ArrowDropUpIcon />
            </ToggleButton>
            <ToggleButton value={"asc"} key={"asc"}>
                <ArrowDropDownIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
