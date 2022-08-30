import React from 'react';
import '../styles.scss';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth } from '../../../service/firebase';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <nav className='navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg lnb' id='navbarVertical'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler ms-n2'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#sidebarCollapse'
          aria-controls='sidebarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <a className='navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0' href='#'>
          <span className='d-inline-block d-lg-block h1 mb-lg-6 me-3'>Mind Note</span>
        </a>

        <div className='navbar-user d-lg-none'>
          <div className='dropdown'>
            <a href='#' id='sidebarAvatar' role='button' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              <div className='avatar-parent-child'>
                <img
                  alt='Image Placeholder'
                  src='https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                  className='avatar avatar- rounded-circle'
                />
                <span className='avatar-child avatar-badge bg-success'></span>
              </div>
            </a>

            <div className='dropdown-menu dropdown-menu-end' aria-labelledby='sidebarAvatar'>
              <a href='#' className='dropdown-item'>
                Profile
              </a>
              <a href='#' className='dropdown-item'>
                Settings
              </a>
              <a href='#' className='dropdown-item'>
                Billing
              </a>
              <hr className='dropdown-divider' />
              <a href='#' className='dropdown-item'>
                Logout
              </a>
            </div>
          </div>
        </div>

        <div className='collapse navbar-collapse' id='sidebarCollapse'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <div className='nav-link cursor-pointer mb-lg-6 me-3' onClick={() => navigate('/mindnote')}>
                <i className='bi bi-house'></i>
                <span className='d-inline-block d-lg-block h4'>Pieces of Mind</span>
              </div>
            </li>
            <li className='nav-item'>
              <div className='nav-link cursor-pointer mb-lg-6 me-3' onClick={() => navigate('/mindnote/articles')}>
                <i className='bi bi-bar-chart'></i>
                <span className='d-inline-block d-lg-block h4'>Articles</span>
              </div>
            </li>
          </ul>

          <hr className='navbar-divider my-5 opacity-20' />

          <div className='mt-auto'></div>

          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <i className='bi bi-person-square'></i> Account
              </a>
            </li>
            <li className='nav-item'>
              <div className='nav-link cursor-pointer' onClick={() => signOut(auth).then(() => navigate('/', { replace: true }))}>
                <i className='bi bi-box-arrow-left'></i> Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
