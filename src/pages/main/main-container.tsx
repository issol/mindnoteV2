import React, { useContext } from 'react';
import { useState } from 'react';
import MainPresenter from './main-presenter';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatePieceValidation } from '../../service/yup';
import { dbService, storage } from '../../service/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';
import { AuthContext } from '../../service/authContext';
import { useNavigate } from 'react-router-dom';

type PieceType = {
  title: string;
  desc: string;
};

const MainContainer = ({ dataRepository }: any) => {
  const [createPieceModalShow, setCreatePieceModalShow] = useState(false);
  const [deletePieceModalShow, setDeletePieceModalShow] = useState(false);
  const [isCreatePieceFormFilled, setIsCreatePieceFormFilled] = useState(false);
  const [uniqueId, setUniqueId] = useState(uuidv4());
  const [pieces, setPieces] = useState([]);
  const [pieceIdForDelete, setPieceIdForDelete] = useState(null);
  const navigate = useNavigate();

  const userInfo = useContext(AuthContext);

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<PieceType>({
    resolver: yupResolver(CreatePieceValidation),
  });

  const onSubmitCreatePiece: SubmitHandler<PieceType> = async (data) => {
    try {
      if (userInfo !== null) {
        await dataRepository.addPiece(data.title, data.desc, uniqueId, userInfo.uid);
        hideCreatePieceModal();
      }
    } catch (e) {}
  };

  const handleCreatePieceModal = () => {
    setCreatePieceModalShow(true);
  };

  const hideCreatePieceModal = () => {
    setCreatePieceModalShow(false);
    reset({ title: undefined, desc: undefined });
  };

  const hideDeletePieceModal = () => {
    setDeletePieceModalShow(false);
  };

  const onClickDeletePiece = (e: any, id: any) => {
    e.stopPropagation();
    setPieceIdForDelete(id);
    setDeletePieceModalShow(true);
  };

  const deletePiece = async (id: any) => {
    await dataRepository.deletePiece(id);
    setDeletePieceModalShow(false);
  };

  const onClickPiece = (e: any, id: any) => {
    console.log(id);

    e.stopPropagation();
    navigate(`notes/${id}`);
  };

  useEffect(() => {
    dataRepository.asyncPieces(setPieces, userInfo.uid);
  }, [dataRepository]);

  return (
    <MainPresenter
      hideCreatePieceModal={hideCreatePieceModal}
      handleCreatePieceModal={handleCreatePieceModal}
      createPieceModalShow={createPieceModalShow}
      handleSubmit={handleSubmit}
      onSubmitCreatePiece={onSubmitCreatePiece}
      control={control}
      isCreatePieceFormFilled={isCreatePieceFormFilled}
      errors={errors}
      pieces={pieces}
      onClickDeletePiece={onClickDeletePiece}
      deletePiece={deletePiece}
      deletePieceModalShow={deletePieceModalShow}
      pieceIdForDelete={pieceIdForDelete}
      hideDeletePieceModal={hideDeletePieceModal}
      onClickPiece={onClickPiece}
    />
  );
};

export default MainContainer;
