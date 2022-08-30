import React from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar/sidebar';
import { Link, Routes, Route, Outlet } from 'react-router-dom';

import './styles.scss';

interface Props {
  children: React.ReactNode;
}

const Layout = () => {
  return (
    <div className='d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary'>
      <Sidebar />
      <div className='h-screen flex-grow-1 overflow-y-lg-auto position-relative'>
        <Outlet />
      </div>
    </div>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Layout;
