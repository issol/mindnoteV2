import React from 'react';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import './styles.scss';
import { Controller } from 'react-hook-form';

const CreatePieceModal = ({ hideCreatePieceModal, createPieceModalShow, handleSubmit, onSubmitCreatePiece, errors, control }: any) => {
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
    <Modal open={createPieceModalShow} onClose={hideCreatePieceModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block text-center'>
          <span className='d-inline-block d-lg-block h2 mb-lg-6 me-3'>🧇 Create your pieces of mind!!</span>

          <form onSubmit={handleSubmit(onSubmitCreatePiece)} className='text-start w-full'>
            <div className='mb-5'>
              <label className='form-label ls-tight font-bolder h1' htmlFor='title'>
                Title
              </label>
              <Controller
                render={({ field }) => <input {...field} type='text' className={`form-control ${errors.email ? 'is-invalid' : 'form-control-muted'}`} id='title' placeholder='' />}
                name='title'
                control={control}
              />
            </div>
            <div className='mb-5'>
              <label className='form-label ls-tight font-bolder h1' htmlFor='email'>
                Desc
              </label>
              <Controller
                render={({ field }) => <textarea {...field} className={`form-control desc ${errors.email ? 'is-invalid' : 'form-control-muted'}`} id='desc' placeholder='' />}
                name='desc'
                control={control}
              />
            </div>

            <div className='mb-5'></div>
            <div>
              <input type='submit' className='btn btn-primary w-full mt-5' value='Create'></input>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default CreatePieceModal;
