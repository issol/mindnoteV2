import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SignupPresenter from './signup-presenter';
import { SignUpValidation } from '../../../service/yup';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../../service/firebase';

type SignUpType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupContainer = ({ hideSignUpModal, signupModalShow, signupCompleteModalShow, handleSignUpCompleteModal, hideSignUpCompleteModal }: any) => {
  const [isSignupFormFilled, setIsSignupFormFilled] = useState(false);
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<SignUpType>({
    resolver: yupResolver(SignUpValidation),
  });

  const onSubmitSignUp: SubmitHandler<SignUpType> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        hideSignUpModal();
        handleSignUpCompleteModal(data.email);
        reset({ email: undefined, password: undefined, passwordConfirm: undefined });
      })
      .catch((e) => {
        hideSignUpModal();
        handleSignUpCompleteModal();
        reset({ email: undefined, password: undefined, passwordConfirm: undefined });
      });
    // dispatch
  };

  useEffect(() => {
    const subscription = watch((value) =>
      !!value.password && value.password !== '' && !!value.passwordConfirm && value.passwordConfirm !== '' && !!value.email && value.email !== ''
        ? setIsSignupFormFilled(true)
        : setIsSignupFormFilled(false)
    );

    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <SignupPresenter
      hideSignUpModal={hideSignUpModal}
      signupModalShow={signupModalShow}
      handleSubmit={handleSubmit}
      onSubmitSignUp={onSubmitSignUp}
      control={control}
      isSignupFormFilled={isSignupFormFilled}
      errors={errors}
    />
  );
};

export default SignupContainer;
