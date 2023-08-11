import React from "react";
import ReactModal, { Styles } from "react-modal";
import "./shared-component-styles/modal.css"
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const customStyles: Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

// ReactModal.setAppElement('#modals');

const Modal = ({ isOpen, onClose, children }: React.PropsWithChildren<ModalProps>) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      //       className=" ReactModal__Content"
      //       overlayClassName="modal-overlay"
      ariaHideApp={false}
      // appElement={typeof window !== 'undefined' ? document.getElementById('__next')! : undefined}
      style={customStyles}
    >
      {children as any}
    </ReactModal>
  );
};

export default Modal;
