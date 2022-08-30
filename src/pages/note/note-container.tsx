import React, { useContext, useMemo, useState } from 'react';
import { useEffect } from 'react';
import NotePresenter from './note-presenter';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConnectionFormType, EdgeDataType, GraphType, NoteFormType, PieceType, SelectedNodeType } from './types';
export const MENU_ID = 'menu_id';

import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../service/authContext';
import { useWindowWidth } from '@react-hook/window-size';

const NoteContainer = ({ dataRepository }: any) => {
  const location = useLocation();
  const pieceId = location?.pathname.slice(16);
  const userInfo = useContext(AuthContext);
  const windowWidth = useWindowWidth();
  const update = 0;
  const navigate = useNavigate();

  const [noteModalShow, setNoteModalShow] = useState(false);
  const [connectionModalShow, setConnectionModalShow] = useState(false);
  const [updateNoteModalShow, setUpdateNoteModalShow] = useState(false);
  const [updateConnectionModalShow, setUpdateConnectionModalShow] = useState(false);
  const [deleteNoteModalShow, setDeleteNoteModalShow] = useState(false);
  const [deleteConnectionModalShow, setDeleteConeectionModalShow] = useState(false);

  const [pieceInfo, setPieceInfo] = useState<PieceType>(null);
  const [graph, setGraph] = useState<GraphType>({
    nodes: [{ id: 'empty', label: '', createdAt: '' }],
    edges: [{ id: 'empty', from: '', to: '', reason: '' }],
  });
  const version = useMemo(uuidv4, [graph, update, windowWidth]);
  const [contextShow, setContextShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [noteFormData, setNoteFormData] = useState<NoteFormType>(null);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [selectedConnectionId, setSelectedConnectionId] = useState('');
  const [connectionInfo, setConnectionInfo] = useState({ leftNote: '', rightNote: '' });
  const [connectionFormData, setConnectionFormData] = useState<ConnectionFormType>(null);

  const isExistSelectedNote = useMemo(() => selectedNoteId !== '', [selectedNoteId]);

  const handleNoteModal = () => {
    setNoteModalShow(true);
  };

  const hideNoteModal = () => {
    setNoteFormData(null);
    setNoteModalShow(false);
  };

  const handleConnectionModal = () => {
    setConnectionModalShow(true);
  };

  const hideConnectionModal = () => {
    setConnectionModalShow(false);
    setConnectionFormData(null);
  };

  const handleUpdateNoteModal = () => {
    setUpdateNoteModalShow(true);
  };

  const hideUpdateNoteModal = () => {
    setNoteFormData(null);
    setUpdateNoteModalShow(false);
  };

  const handleUpdateConnectionModal = () => {
    setUpdateConnectionModalShow(true);
  };

  const hideUpdateConnectionModal = () => {
    setUpdateConnectionModalShow(false);
    setConnectionFormData(null);
  };

  const handleDeleteNoteModal = () => {
    setDeleteNoteModalShow(true);
  };

  const hideDeleteNoteModal = () => {
    setDeleteNoteModalShow(false);
  };

  const handleDeleteConnectionModal = () => {
    setDeleteConeectionModalShow(true);
  };

  const hideDeleteConnectionModal = () => {
    setDeleteConeectionModalShow(false);
  };

  const changeNoteFormData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteFormData((originValue) => ({ ...originValue, label: event.target.value }));
  };

  const changeConnectionFormData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConnectionFormData((originData) => ({ ...originData, reason: event.target.value }));
  };

  const handleCreateNote = async () => {
    await dataRepository.upsertNote({ id: uuidv4(), label: noteFormData.label, createdAt: Date.now() }, connectionFormData, pieceId, graph.nodes);
    hideNoteModal();
  };

  const handleCreateConnection = async () => {
    await dataRepository.upsertConnection({ id: uuidv4(), reason: connectionFormData.reason, from: connectionInfo.leftNote, to: connectionInfo.rightNote }, pieceId);
    hideConnectionModal();
  };

  const handleUpdateNote = async () => {
    const res1 = graph.nodes.filter((value: NoteFormType) => value.id === selectedNoteId);
    const res = graph.nodes.filter((value: NoteFormType) => value.id === selectedNoteId).map((value) => ({ ...value, label: noteFormData.label }));

    await dataRepository.updateNote(...res, pieceId, ...res1);

    hideUpdateNoteModal();
  };

  const handleUpdateConnection = async () => {
    const res = graph.edges.filter((value: ConnectionFormType) => value.id === selectedConnectionId);
    const res1 = graph.edges
      .filter((value: ConnectionFormType) => value.id === selectedConnectionId)
      .map((value) => ({ ...value, from: connectionFormData.from, to: connectionFormData.to, reason: connectionFormData.reason }));

    await dataRepository.updateConnection(...res1, pieceId, ...res);

    hideUpdateConnectionModal();
  };

  const handleDeleteNote = async () => {
    const res = graph.nodes.filter((value: NoteFormType) => value.id === selectedNoteId);
    const res2 = graph.edges.filter((value: ConnectionFormType) => value.from === selectedNoteId || value.to === selectedNoteId);
    await dataRepository.deleteNote(pieceId, ...res, ...res2);
    hideDeleteNoteModal();
  };

  const handleDeleteConnection = async () => {
    const res = graph.edges.filter((value: ConnectionFormType) => value.id === selectedConnectionId);

    await dataRepository.deleteConnection(pieceId, ...res);
    hideDeleteConnectionModal();
  };

  const onClickDeleteNote = () => {
    handleDeleteNoteModal();
  };

  const onClickCreateArticle = () => {
    navigate(`write-article`);
  };

  const events = {
    doubleClick: (event: any) => {
      const { nodes, edges } = event;

      if (nodes.length !== 0) {
        setSelectedNoteId(nodes[0]);
        const selectedNoteId = nodes[0];
        const foundNote = pieceInfo.nodes.find((note) => note.id === selectedNoteId);

        setNoteFormData(foundNote);

        handleUpdateNoteModal();
      } else if (edges.length !== 0) {
        setSelectedConnectionId(edges[0]);
        const selectedConnectionId = edges[0];

        const foundConnection = pieceInfo.edges.find((connection) => connection.id === selectedConnectionId);

        setConnectionFormData(foundConnection);
        handleUpdateConnectionModal();
      }
    },
    selectNode: (event: any) => {
      const { nodes } = event;

      setSelectedNoteId(nodes[0]);
    },
    selectEdge: (event: any) => {
      const { edges } = event;
      setSelectedConnectionId(edges[0]);
    },
    deselectEdge: () => {
      setSelectedConnectionId('');
    },

    deselectNode: () => {
      setSelectedNoteId('');
    },
  };
  const manipulation = {
    enabled: true,
    initiallyActive: true,

    deleteNode: (nodeData: SelectedNodeType, _callback: any) => {
      handleDeleteNote();
    },

    addEdge: (edgeData: EdgeDataType, _callback: any) => {
      setConnectionInfo({ leftNote: edgeData.from, rightNote: edgeData.to });
      setConnectionModalShow(true);
    },
    editEdge: (edgeData: EdgeDataType, _callback: any) => {
      setSelectedConnectionId(edgeData.id);
      const foundConnection = pieceInfo.edges.find((connection) => connection.id === edgeData.id);

      setConnectionFormData(() => ({ ...foundConnection, from: edgeData.from, to: edgeData.to }));
      handleUpdateConnectionModal();
    },
    deleteEdge: async (edgeData: SelectedNodeType, _callback: any) => {
      handleDeleteConnectionModal();
    },
  };

  useEffect(() => {
    dataRepository.getPiece(pieceId, userInfo.uid, setPieceInfo, setGraph);
  }, [pieceId]);

  useEffect(() => {
    const handleClick = () => setContextShow(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (pieceInfo !== null) {
      const res = {
        // nodes: !!pieceInfo.nodes && pieceInfo.nodes.length > 0 && pieceInfo.nodes,
        nodes: pieceInfo.nodes,
        // edges: !!pieceInfo.edges && pieceInfo.edges.length > 0 ? pieceInfo.edges : [{ id: 'empty', from: '', to: '', reason: '' }],
        edges: pieceInfo.edges,
      };
      setGraph(res);
    }
  }, [pieceInfo]);

  return (
    <NotePresenter
      visProps={{ events, graph, manipulation }}
      setContextShow={setContextShow}
      setPoints={setPoints}
      contextShow={contextShow}
      points={points}
      pieceInfo={pieceInfo}
      isExistSelectedNote={isExistSelectedNote}
      hideNoteModal={hideNoteModal}
      noteModalShow={noteModalShow}
      handleNoteModal={handleNoteModal}
      changeNoteFormData={changeNoteFormData}
      handleCreateNote={handleCreateNote}
      version={version}
      connectionModalShow={connectionModalShow}
      changeConnectionFormData={changeConnectionFormData}
      handleCreateConnection={handleCreateConnection}
      hideConnectionModal={hideConnectionModal}
      noteFormData={noteFormData}
      updateNoteModalShow={updateNoteModalShow}
      updateConnectionModalShow={updateConnectionModalShow}
      hideUpdateNoteModal={hideUpdateNoteModal}
      hideUpdateConnectionModal={hideUpdateConnectionModal}
      handleUpdateNote={handleUpdateNote}
      handleUpdateConnection={handleUpdateConnection}
      onClickDeleteNote={onClickDeleteNote}
      handleDeleteNote={handleDeleteNote}
      hideDeleteNoteModal={hideDeleteNoteModal}
      deleteNoteModalShow={deleteNoteModalShow}
      connectionFormData={connectionFormData}
      deleteConnectionModalShow={deleteConnectionModalShow}
      hideDeleteConnectionModal={hideDeleteConnectionModal}
      handleDeleteConnection={handleDeleteConnection}
      onClickCreateArticle={onClickCreateArticle}
    />
  );
};

export default NoteContainer;
