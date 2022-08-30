import React from 'react';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import './styles.scss';

const NoteModal = ({ hideNoteModal, noteModalShow, changeNoteFormData, handleCreateNote, noteFormData }: any) => {
  const createModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
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
    <Modal open={noteModalShow} onClose={hideNoteModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block text-center'>
          <span className='d-inline-block d-lg-block h2 mb-lg-6 me-3'>🧇 Idea Note</span>
          <textarea
            onChange={changeNoteFormData}
            maxLength={100}
            className={`form-control desc form-control-muted`}
            id='note'
            placeholder='I ate the apple yesterday... '
            value={noteFormData?.label}
          />
        </div>

        <div className='d-flex gap-5'>
          <button className='btn btn-secondary w-full mt-5' onClick={hideNoteModal}>
            Cancel
          </button>
          <button
            className='btn btn-primary w-full mt-5'
            onClick={() => {
              handleCreateNote();
            }}
          >
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default NoteModal;
