import { Dialog, DialogContent, Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../features/store";
import React, { ReactElement } from "react";
import { closeModal } from "../../features/modal/modalSlice";
import { TransitionProps } from "@mui/material/transitions";

type ModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    children: ReactElement;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const Modal = () => {
    const { isOpen, Body } = useAppSelector(
        (state) => state.modal
    );
    const dispatch = useAppDispatch();
    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(closeModal())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogContent>
                {Body}
            </DialogContent>
        </Dialog>
    );
};
