import { describe, it } from 'node:test';
import { expect, test } from 'vitest';
import { ModalState, closeModal, modalSlice, openModal } from './modalSlice';

describe('modalSlice', () => {
  const initialState: ModalState = {
    isOpen: false,
    Body: null,
  };
  test('reducer', () => {
    it('should open modal', () => {
      const MockReactNode = () => <div>test </div>;
      const state = modalSlice.reducer(
        initialState,
        openModal({ Body: <MockReactNode /> }),
      );
      expect(state.isOpen).toBeTruthy();
    });

    it('should close modal', () => {
      const state = modalSlice.reducer(initialState, closeModal());
      expect(state.isOpen).toBeFalsy();
    });
  });
});
