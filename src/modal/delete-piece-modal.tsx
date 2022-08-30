import React from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

const DeletePieceModal = ({ deleteModalShow, deletePiece, pieceIdForDelete, hideDeletePieceModal }: any) => {
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
    <Modal open={deleteModalShow} onClose={hideDeletePieceModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block text-center'>
          <span className='d-inline-block d-lg-block h2 mb-lg-6 me-3'>Are you sure to delete this piece?</span>
        </div>

        <div className='d-flex gap-5'>
          <button className='btn btn-secondary w-full mt-5' onClick={hideDeletePieceModal}>
            Cancel
          </button>
          <button
            className='btn btn-primary w-full mt-5'
            onClick={() => {
              deletePiece(pieceIdForDelete);
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

export default DeletePieceModal;
