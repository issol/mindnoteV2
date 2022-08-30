import React from 'react';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import '../signin/styles.scss';
import { Controller } from 'react-hook-form';

const SignupPresenter = ({ hideSignUpModal, signupModalShow, handleSubmit, onSubmitSignUp, control, isSignupFormFilled, errors }: any) => {
  const createModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    boxShadow: 24,
    borderRadius: 4,
    outline: 'none',
  };
  return (
    <Modal open={signupModalShow} onClose={hideSignUpModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={createModalStyle}>
        <div className='mt-10 mt-lg-5 mb-6 d-flex align-items-center d-lg-block'>
          <span className='d-inline-block d-lg-block h1 mb-lg-6 me-3'>Welcome 👋</span>
          {/* <h1 className='ls-tight font-bolder h2'>Nice to see you!</h1> */}
        </div>
        <form onSubmit={handleSubmit(onSubmitSignUp)}>
          <div className='mb-5'>
            <label className='form-label' htmlFor='email'>
              Email address
            </label>
            <Controller
              render={({ field }) => <input {...field} type='email' className={`form-control ${errors.email ? 'is-invalid' : 'form-control-muted'}`} id='email' placeholder='abcd@gmail.com' />}
              name='email'
              control={control}
            />
          </div>
          <div className='mb-5'>
            <label className='form-label' htmlFor='password'>
              Password
            </label>
            <Controller
              render={({ field }) => <input {...field} type='password' className='form-control form-control-muted' id='password' placeholder='********' />}
              name='password'
              control={control}
            />
          </div>
          <div className='mb-5'>
            <label className='form-label' htmlFor='password'>
              Confirm Password
            </label>
            <Controller
              render={({ field }) => <input {...field} type='password' className='form-control form-control-muted' id='passwordConfirm' placeholder='********' />}
              name='passwordConfirm'
              control={control}
            />
          </div>
          <div className='mb-5'></div>
          <div>
            <input type='submit' className='btn btn-primary w-full' value='Sign up'></input>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default SignupPresenter;
