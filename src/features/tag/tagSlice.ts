import { createSlice } from '@reduxjs/toolkit';
import { fetchTagAsync } from './tagAction';
import { Tag } from '../../types/tag.type';


type TagState = {
    tags: Tag[],
}

const initialState: TagState = {
    tags: []
}
export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTagAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.tags = action.payload;
            })

    },
    selectors: {
        selectTags: (state) => state.tags
    }
});

export const { } = tagSlice.actions;
export const { selectTags } = tagSlice.selectors;
export default tagSlice.reducer;