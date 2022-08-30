import React from 'react';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import '../pages/auth/signin/styles.scss';

const SignUpCompleteModal = ({ hideSignUpCompleteModal, completeMessage, signUpError, signupCompleteModalShow }: any) => {
  const createModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    p: 4,
    boxShadow: 24,
    borderRadius: 4,
    outline: 'none',
  };
  return (
    <Modal open={signupCompleteModalShow} onClose={hideSignUpCompleteModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block text-center'>
          <span className='d-inline-block d-lg-block h1 mb-lg-6 me-3'>🎉 Welcome Mind Note 🎉</span>
          <h1 className='ls-tight font-bolder h2'>Nice to see you!</h1>

          <div>
            <button className='btn btn-primary w-full mt-5' onClick={hideSignUpCompleteModal}>
              Go SignIn!
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SignUpCompleteModal;
