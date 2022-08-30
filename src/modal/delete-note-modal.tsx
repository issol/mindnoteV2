import React from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

const DeleteNoteModal = ({ deleteNoteModalShow, handleDeleteNote, hideDeleteNoteModal }: any) => {
  const createModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    pr: 6,
    pl: 6,
    pt: 3,
    pb: 3,
    boxShadow: 24,
    borderRadius: 4,
    outline: 'none',
  };
  return (
    <Modal open={deleteNoteModalShow} onClose={hideDeleteNoteModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block text-center'>
          <span className='d-inline-block d-lg-block h2 mb-lg-6 me-3'>Are you sure to delete this note?</span>
        </div>

        <div className='d-flex gap-5'>
          <button className='btn btn-secondary w-full mt-5' onClick={hideDeleteNoteModal}>
            Cancel
          </button>
          <button
            className='btn btn-primary w-full mt-5'
            onClick={() => {
              handleDeleteNote();
            }}
            autoFocus
          >
            Ok
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteNoteModal;
