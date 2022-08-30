import React from 'react';
import Graph from 'react-graph-vis';
import { ContextMenuProps, EventType, graphDefaultVisualOptions, GraphType, ManiPulationType } from './types';
import { Menu, Item, ContextMenuParams, TriggerEvent } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import styled, { css } from 'styled-components';
import { MENU_ID } from './note-container';
import './styles.css';
import NoteModal from '../../modal/note-modal';
import { Suspense } from 'react';
import ConnectionModal from '../../modal/connection-modal';
import UpdateNoteModal from '../../modal/update-note-modal';
import UpdateConnectionModal from '../../modal/update-connection-modal';
import DeleteNoteModal from '../../modal/delete-note-modal';
import DeleteConnectionModal from '../../modal/delete-connection-modal';

type Props = {
  visProps: {
    events: EventType;
    graph: any;
    manipulation: ManiPulationType;
  };

  setContextShow: any;
  setPoints: any;
  contextShow: any;
  points: any;
  isExistSelectedNote: any;
  noteModalShow: boolean;
  hideNoteModal: () => void;
  handleNoteModal: () => void;
  changeNoteFormData: any;
  handleCreateNote: any;
  pieceInfo: any;
  version: any;
  connectionModalShow: any;
  changeConnectionFormData: any;
  handleCreateConnection: any;
  hideConnectionModal: any;
  noteFormData: any;
  updateNoteModalShow: any;
  updateConnectionModalShow: any;

  hideUpdateNoteModal: any;

  hideUpdateConnectionModal: any;
  handleUpdateNote: any;
  handleUpdateConnection: any;
  onClickDeleteNote: any;
  handleDeleteNote: any;
  hideDeleteNoteModal: any;
  deleteNoteModalShow: any;
  connectionFormData: any;
  deleteConnectionModalShow: any;
  hideDeleteConnectionModal: any;
  handleDeleteConnection: any;
  onClickCreateArticle: any;
};

const NotePresenter = ({
  visProps,

  pieceInfo,
  setContextShow,
  setPoints,
  contextShow,
  points,
  isExistSelectedNote,
  noteModalShow,
  hideNoteModal,
  handleNoteModal,
  changeNoteFormData,
  handleCreateNote,
  version,
  connectionModalShow,
  changeConnectionFormData,
  handleCreateConnection,
  hideConnectionModal,
  noteFormData,
  updateNoteModalShow,
  updateConnectionModalShow,

  hideUpdateNoteModal,

  hideUpdateConnectionModal,
  handleUpdateNote,
  handleUpdateConnection,
  onClickDeleteNote,
  handleDeleteNote,
  hideDeleteNoteModal,
  deleteNoteModalShow,
  connectionFormData,
  deleteConnectionModalShow,
  hideDeleteConnectionModal,
  handleDeleteConnection,
  onClickCreateArticle,
}: Props) => {
  return (
    <>
      <NoteModal hideNoteModal={hideNoteModal} noteModalShow={noteModalShow} handleCreateNote={handleCreateNote} changeNoteFormData={changeNoteFormData} noteFormData={noteFormData} />
      <ConnectionModal
        hideConnectionModal={hideConnectionModal}
        connectionModalShow={connectionModalShow}
        changeConnectionFormData={changeConnectionFormData}
        handleCreateConnection={handleCreateConnection}
      />
      <UpdateNoteModal
        hideUpdateNoteModal={hideUpdateNoteModal}
        updateNoteModalShow={updateNoteModalShow}
        handleUpdateNote={handleUpdateNote}
        changeNoteFormData={changeNoteFormData}
        noteFormData={noteFormData}
      />
      <UpdateConnectionModal
        hideUpdateConnectionModal={hideUpdateConnectionModal}
        updateConnectionModalShow={updateConnectionModalShow}
        changeConnectionFormData={changeConnectionFormData}
        handleUpdateConnection={handleUpdateConnection}
        connectionFormData={connectionFormData}
      />
      <DeleteNoteModal deleteNoteModalShow={deleteNoteModalShow} handleDeleteNote={handleDeleteNote} hideDeleteNoteModal={hideDeleteNoteModal} />
      <DeleteConnectionModal deleteConnectionModalShow={deleteConnectionModalShow} hideDeleteConnectionModal={hideDeleteConnectionModal} handleDeleteConnection={handleDeleteConnection} />
      <header className='bg-surface-primary border-bottom pt-6 pb-6 position-sticky top-0 header'>
        <div className='container-fluid'>
          <div className='mb-npx'>
            <div className='row align-items-center'>
              <div className='col-sm-6 col-12 mb-4 mb-sm-0'>
                <h1 className='h2 mb-0 ls-tight text-start'>Note</h1>
              </div>

              <div className='col-sm-6 col-12 text-sm-end'>
                <div className='mx-n1'>
                  <button className='btn d-inline-flex btn-sm btn-primary mx-1' onClick={onClickCreateArticle}>
                    <span className=' pe-2'>
                      <i className='bi bi-plus'></i>
                    </span>
                    <span>Write Article</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className='py-6 bg-surface-secondary'>
        <div className='container-fluid'>
          <NoteGraphContainer
            onContextMenu={(e) => {
              console.log('Context Menu Opened');
              e.preventDefault();
              setContextShow(true);
              console.log(e.pageX);
              console.log(e.pageY);
              setPoints({ x: e.pageX - 270, y: e.pageY });
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Graph key={version} graph={visProps.graph} options={{ ...graphDefaultVisualOptions, manipulation: visProps.manipulation }} events={visProps.events} />
            </Suspense>
          </NoteGraphContainer>
          <Menu id={MENU_ID}>
            <Item id='1'>노트추가</Item>

            {/* {noteProps.isExistSelectedNote ? (
              <>
                <Item onClick={noteProps.getSelectedNoteInfo}>노트수정</Item>
                <Item onClick={() => noteProps.handleDeleteNote(noteProps.selectedNoteId)}>노트삭제</Item>
              </>
            ) : (
              <></>
            )} */}

            <Item disabled>Disabled</Item>
          </Menu>
          {contextShow && (
            <ContextMenu top={points.y} left={points.x}>
              <ul className='scale-105-hover'>
                {isExistSelectedNote ? (
                  <>
                    <li>Update</li>
                    <li onClick={onClickDeleteNote}>Delete</li>
                  </>
                ) : (
                  <li onClick={handleNoteModal}>Add Note</li>
                )}
              </ul>
            </ContextMenu>
          )}
        </div>
      </main>
    </>
  );
};

const NoteGraphContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ffebb5;
  background-color: #ffffff;
  opacity: 0.8;
  border-radius: 16px;
  box-shadow: inset 0 0 8px #deb13a;
`;

export const ContextMenu = styled.div<ContextMenuProps>`
  border-radius: 8px;
  box-sizing: border-box;
  position: absolute;
  width: 180px;
  background-color: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    list-style-type: none;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
  }
  ul li {
    padding: 18px 12px;
    border-radius: 4px;
  }
  ul li:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;
export default NotePresenter;
