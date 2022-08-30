import React from 'react';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import './styles.scss';

const UpdateConnectionModal = ({ hideUpdateConnectionModal, updateConnectionModalShow, changeConnectionFormData, handleUpdateConnection, connectionFormData }: any) => {
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
    <Modal open={updateConnectionModalShow} onClose={hideUpdateConnectionModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block text-center'>
          <span className='d-inline-block d-lg-block h2 mb-lg-6 me-3'>Connection's reason</span>

          <textarea
            onChange={changeConnectionFormData}
            value={connectionFormData?.reason}
            maxLength={100}
            className={`form-control desc form-control-muted`}
            id='Connection'
            placeholder='I ate the apple yesterday... '
          />
        </div>

        <div className='d-flex gap-5'>
          <button className='btn btn-secondary w-full mt-5' onClick={hideUpdateConnectionModal}>
            Cancel
          </button>
          <button
            className='btn btn-primary w-full mt-5'
            onClick={() => {
              handleUpdateConnection();
            }}
          >
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateConnectionModal;
