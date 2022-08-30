import './App.css';

import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './service/authContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/auth/signin';
import Layout from './common/layout/layout';
import Main from './pages/main';
import Articles from './pages/articles';
import Note from './pages/note';
import WriteArticle from './pages/write-article';

function App({ dataRepository }: any) {
  const userInfo = useContext(AuthContext);

  return (
    <div className='App'>
      <Routes>
        <Route path='/*' element={userInfo === null ? <Navigate replace to='/signin' /> : <Navigate replace to='/mindnote' />} />
        {userInfo !== null ? (
          <>
            <Route path='/mindnote/*' element={<Layout />}>
              <Route index element={<Main dataRepository={dataRepository} />} />
              <Route path='articles' element={<Articles />} />
              <Route path='notes/:id' element={<Note dataRepository={dataRepository} />} />
              <Route path='notes/:id/write-article' element={<WriteArticle dataRepository={dataRepository} />} />
            </Route>
          </>
        ) : (
          <>
            <Route path='/signin' element={<Signin />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
