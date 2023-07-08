import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const customStyles = {
       overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
       content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         padding: 0
       },
     };

// ReactModal.setAppElement('#modals');

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
//       className=" ReactModal__Content"
//       overlayClassName="modal-overlay"
       ariaHideApp={false}
// appElement={typeof window !== 'undefined' ? document.getElementById('__next')! : undefined}
      style={customStyles as any}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
