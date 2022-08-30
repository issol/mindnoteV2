import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WriteArticlePresenter from './write-article-presenter';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef } from 'react';
import { AuthContext } from '../../service/authContext';
import { ArticleInfoType, GraphType, PieceType } from '../note/types';
import { v4 as uuidv4 } from 'uuid';

const WriteArticleContainer = ({ dataRepository }: any) => {
  const location = useLocation();
  const pieceId = location?.pathname.slice(16, 36);
  const navigate = useNavigate();

  const [pieceInfo, setPieceInfo] = useState<PieceType>(null);
  const [graph, setGraph] = useState<GraphType>({
    nodes: [{ id: 'empty', label: '', createdAt: '' }],
    edges: [{ id: 'empty', from: '', to: '', reason: '' }],
  });

  const [articleInfo, setArticleInfo] = useState<ArticleInfoType>({
    id: '',
    title: '',
    desc: '',
    content: '',
    isFirst: true,
  });

  const [noteInfo, setNoteInfo] = useState([]);

  const editorRef: any = useRef();
  const userInfo = useContext(AuthContext);

  const onClickSaveButton = async () => {
    const editorInstance: any = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    console.log(articleInfo);

    if (articleInfo.isFirst) {
      await dataRepository.addArticle({ title: articleInfo.title, desc: articleInfo.desc, content: content, id: uuidv4(), isFirst: false }, pieceId);
    } else {
      await dataRepository.updateArticle({ title: articleInfo.title, desc: articleInfo.desc, content: content }, pieceId);
    }

    editorInstance.reset();
    setArticleInfo(null);
    navigate('/mindnote');
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleInfo((originData) => ({ ...originData, title: event.target.value }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleInfo((originData) => ({ ...originData, desc: event.target.value }));
  };

  useEffect(() => {
    dataRepository.getPiece(pieceId, userInfo.uid, setPieceInfo, setGraph);
  }, [pieceId]);

  useEffect(() => {
    if (pieceInfo !== null) {
      const editorInstance: any = editorRef.current.getInstance();
      editorInstance.setMarkdown(pieceInfo?.article?.content);
      console.log(pieceInfo.article);

      setArticleInfo(pieceInfo.article);

      const edgesTo = pieceInfo.nodes.filter((value) => pieceInfo.edges.map((value) => value.to).includes(value.id));
      const edgesFrom = pieceInfo.nodes.filter((value) => pieceInfo.edges.map((value) => value.from).includes(value.id));
      const res = pieceInfo.edges.map((value, index) => ({
        reason: value.reason,
        toNote: edgesTo[index].label,
        fromNote: edgesFrom[index].label,
      }));
      setNoteInfo(res);
      console.log(res);

      // const res = {
      //   toNote: edgesTo.label,
      //   fromNote: edgesFrom.label,
      //   reason :
      // };

      // const res = {
      //   nodes: pieceInfo.nodes,

      //   edges: pieceInfo.edges,
      // };
      // // setGraph(res);
    }
  }, [pieceInfo]);

  return (
    <WriteArticlePresenter
      editorRef={editorRef}
      onClickSaveButton={onClickSaveButton}
      articleInfo={articleInfo}
      handleSubjectChange={handleSubjectChange}
      handleDescriptionChange={handleDescriptionChange}
      graph={graph}
      noteInfo={noteInfo}
    />
  );
};

export default WriteArticleContainer;
