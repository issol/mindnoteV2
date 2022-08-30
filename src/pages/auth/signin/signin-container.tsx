import React from 'react';
import { useEffect } from 'react';
import LoginPresenter from './signin-presenter';
import { auth } from '../../../service/firebase';
import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SigninValidation } from '../../../service/yup';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';

type SignInType = {
  email: string;
  password: string;
};

const SigninContainer = () => {
  // var html = document.querySelector('#html');
  const navigate = useNavigate();
  // populateIframe(
  //   html,
  //   `https://dashboard.gloground.com/app/dashboards#/view/a733b080-a916-11ec-9e1e-d9e3435853bd?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15w,to:now))&_a=(query:(match_phrase:(locqcer.keyword:'jinsookkim@glocalizeinc.com')))&hide-filter-bar=true`,
  //   [
  //     ['platform-host', 'dev.gloground.com'],
  //     [
  //       'token',
  //       'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGprYm41MjNAbmF2ZXIuY29tIiwiaWQiOjc3MjA1fSwiaWF0IjoxNjUwNTkxNjI2LCJleHAiOjE2NTA1OTI1MjYsImlzcyI6InBpY2h1In0.OEbBr6Rayu66A2EFUSHZlZ4RDCB3ZnLecYU-h3dUZHJ5ahoI0hI4taSP-Iqrsdhdc-Jp3zO0BoiKxxeP-3L9ug',
  //     ],
  //   ]
  // );
  const [isSigninFormFilled, setIsSigninFormFilled] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [signupCompleteModalShow, setSignUpCompleteModalShow] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [completeMessage, setCompleteMessage] = useState<string>('');

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<SignInType>({
    resolver: yupResolver(SigninValidation),
  });

  const onSubmitSignIn: SubmitHandler<SignInType> = (data) => {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate('/mindnote', { replace: true });
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleSignUpModal = () => {
    setSignupModalShow(true);
  };

  const hideSignUpModal = () => {
    setSignupModalShow(false);
  };

  const handleSignUpCompleteModal = (isError: boolean, message: string = '') => {
    setSignUpError(isError);
    setCompleteMessage(message);
    setSignUpCompleteModalShow(true);
  };
  const hideSignUpCompleteModal = (email: string = '') => {
    setSignUpCompleteModalShow(false);
    if (!signUpError && email !== '') {
    }
  };

  function populateIframe(iframe: any, url: any, headers: any) {
    var xhr = new XMLHttpRequest();

    console.log(url);

    xhr.open('GET', url);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'blob';
    // headers.forEach(function (header: any) {
    //   xhr.setRequestHeader(header[0], header[1]);
    // });
    xhr.send();

    xhr.onerror = (error: any) => {
      console.log(error);
    };

    function handler() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          // this.response is a Blob, because we set responseType above
          iframe.src = URL.createObjectURL(xhr.response);
        } else {
          console.error('XHR failed', xhr);
        }
      }
    }
  }

  return (
    <LoginPresenter
      handleSignUpModal={handleSignUpModal}
      hideSignUpModal={hideSignUpModal}
      signupModalShow={signupModalShow}
      signupCompleteModalShow={signupCompleteModalShow}
      handleSignUpCompleteModal={handleSignUpCompleteModal}
      hideSignUpCompleteModal={hideSignUpCompleteModal}
      signUpError={signUpError}
      completeMessage={completeMessage}
      handleSubmit={handleSubmit}
      onSubmitSignIn={onSubmitSignIn}
      control={control}
      isSigninFormFilled={isSigninFormFilled}
      errors={errors}
    />
  );
};

export default SigninContainer;
