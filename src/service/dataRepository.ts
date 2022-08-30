import dayjs from 'dayjs';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy, where, arrayUnion, arrayRemove } from 'firebase/firestore';
import { title } from 'process';
import { useContext } from 'react';
import { NoteFormType, PieceType } from '../pages/note/types';
import { AuthContext } from './authContext';
import { dbService, incre } from './firebase';

class DataRepository {
  db: any;
  path: string;
  // currentUser: any;

  constructor() {
    this.db = dbService;
    this.path = 'pieces';
    // this.currentUser = useContext(AuthContext);
  }

  addPiece(title: string, desc: string, uuid: any, uid: any) {
    // 데이터 추가
    addDoc(collection(this.db, this.path), {
      title: title,
      desc: desc,

      createdAt: Date.now(),
      updatedAt: Date.now(),
      creatorId: uid,
      edges: [],
      nodes: [],
      article: {
        isFirst: true,
      },
    });
  }

  getPieces = async (onUpdate: any) => {
    // 데이터 받아오기
    const dbPieces = await getDocs(collection(this.db, this.path));
    dbPieces.forEach((doc) => {
      const pieceObj = {
        ...doc.data(),
        id: doc.id,
      };
      onUpdate((prev: any) => [...prev, pieceObj]);
    });
  };

  asyncPieces(onUpdate: any, uid: any) {
    const q = query(collection(this.db, this.path), where('creatorId', '==', uid), orderBy('createdAt', 'desc'));
    // 실시간 데이터 동기화
    onSnapshot(q, (snapshot) => {
      const pieceArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      onUpdate(pieceArray);
    });
  }

  getPiece(id: any, uid: any, onUpdate: any, onGraphUpdate: any) {
    const q = query(collection(this.db, this.path), where('creatorId', '==', uid), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      const pieceArray = snapshot.docs.filter((value) => value.id === id).map((doc) => ({ id: doc.id, ...doc.data() }));
      const noteArray = snapshot.docs.filter((value) => value.id === id).map((doc) => ({ ...doc.data() }));
      const nodes = noteArray.map((value: PieceType) => value.nodes);
      const edges = noteArray.map((value: PieceType) => value.edges);

      onUpdate(...pieceArray);
    });
  }

  deletePiece(id: any) {
    // 데이터 삭제
    return deleteDoc(doc(this.db, this.path, id));
  }

  updatePiece(id: any, params: { title: string; desc: string }) {
    // 데이터 수정
    return updateDoc(doc(this.db, this.path, id), {
      ...params,
      updatedAt: Date.now(),
    });
  }

  upsertNote(nodes: { id: string; label: string; createdAt: string }, edges: [{ id: string; from: number; to: number }], id: any, currentNote: NoteFormType[]) {
    return updateDoc(doc(this.db, this.path, id), {
      nodes: arrayUnion(nodes),
    });
  }

  updateNote = async (nodes: [{ id: string; label: string; createdAt: string }], id: any, nodes2: any) => {
    await updateDoc(doc(this.db, this.path, id), {
      nodes: arrayRemove(nodes2),
    });
    await updateDoc(doc(this.db, this.path, id), {
      nodes: arrayUnion(nodes),
    });
  };

  upsertConnection(edges: [{ id: string; from: number; to: number }], id: any) {
    return updateDoc(doc(this.db, this.path, id), {
      edges: arrayUnion(edges),
    });
  }

  updateConnection = async (edges: [{ id: string; from: number; to: number }], id: any, edges2: any) => {
    await updateDoc(doc(this.db, this.path, id), {
      edges: arrayRemove(edges2),
    });
    await updateDoc(doc(this.db, this.path, id), {
      edges: arrayUnion(edges),
    });
  };

  deleteNote = async (id: any, node: any, node2: any) => {
    await updateDoc(doc(this.db, this.path, id), {
      nodes: arrayRemove(node),
    });

    await updateDoc(doc(this.db, this.path, id), {
      edges: arrayRemove(node2),
    });
  };

  deleteConnection(id: any, node: any) {
    return updateDoc(doc(this.db, this.path, id), {
      edges: arrayRemove(node),
    });
  }

  addArticle(article: { title: string; desc?: string; content: string; id: any; isFirst: any }, id: any) {
    return updateDoc(doc(this.db, this.path, id), {
      article: { title: article.title, desc: article.desc, content: article.content, id: article.id, isFirst: false },
    });
  }

  updateArticle = (article: { title: string; desc?: string; content: string; id: any }, id: any) => {
    console.log(article);

    // return updateDoc(doc(this.db, this.path, id), {
    //   article: { title: article.title, desc: article.desc, content: article.content },
    // });
  };
}

export default DataRepository;
