import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

type ModalState = {
    isOpen: boolean;
    Body?: ReactNode | null;
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        Body: null,
    } as ModalState,
    reducers: {
        openModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
            state.isOpen = true;
            state.Body = action.payload.Body;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.Body = null;
        },
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
