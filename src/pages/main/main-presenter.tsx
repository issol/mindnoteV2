import dayjs from 'dayjs';
import React from 'react';

import NoImage from '../../common/assets/no-image.png';
import CreatePieceModal from '../../modal/create-piece-modal';
import DeletePieceModal from '../../modal/delete-piece-modal';

import './styles.scss';

const MainPresenter = ({
  hideCreatePieceModal,
  handleCreatePieceModal,
  createPieceModalShow,
  handleSubmit,
  onSubmitCreatePiece,
  control,
  isCreatePieceFormFilled,
  errors,
  pieces,
  onClickDeletePiece,
  deletePiece,
  deletePieceModalShow,
  pieceIdForDelete,
  hideDeletePieceModal,
  onClickPiece,
}: any) => {
  return (
    <>
      <CreatePieceModal
        hideCreatePieceModal={hideCreatePieceModal}
        createPieceModalShow={createPieceModalShow}
        handleSubmit={handleSubmit}
        onSubmitCreatePiece={onSubmitCreatePiece}
        control={control}
        errors={errors}
      />

      <DeletePieceModal deleteModalShow={deletePieceModalShow} deletePiece={deletePiece} pieceIdForDelete={pieceIdForDelete} hideDeletePieceModal={hideDeletePieceModal} />
      <header className='bg-surface-primary border-bottom pt-6 pb-6 position-sticky top-0 header'>
        <div className='container-fluid'>
          <div className='mb-npx'>
            <div className='row align-items-center'>
              <div className='col-sm-6 col-12 mb-4 mb-sm-0'>
                <h1 className='h2 mb-0 ls-tight text-start'>
                  <i className='bi bi-puzzle mx-2'></i>PIECES OF MIND
                </h1>
              </div>

              <div className='col-sm-6 col-12 text-sm-end'>
                <div className='mx-n1'>
                  <button className='btn d-inline-flex btn-sm btn-primary mx-1' onClick={handleCreatePieceModal}>
                    <span className=' pe-2'>
                      <i className='bi bi-plus'></i>
                    </span>
                    <span>Create Piece</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className='py-6 bg-surface-secondary'>
        <div className='container-fluid'>
          <div className='row g-6 mb-6'>
            {pieces.map((value: any) => {
              return (
                <div className='col-xl-3 col-sm-6 col-12' onClick={(e) => onClickPiece(e, value.id)}>
                  <div className='card shadow border-0'>
                    <div className='card'>
                      <div className='p-2 position-relative'>
                        <img alt='...' src={NoImage} className='card-img' />
                        <button
                          className='btn btn-square btn-white rounded-circle position-absolute top-4 end-4 transform scale-105-hover w-5 h-5'
                          onClick={(e) => {
                            onClickDeletePiece(e, value.id);
                          }}
                        >
                          <i className='bi bi-x'></i>
                        </button>
                      </div>

                      <div className='card-body'>
                        <h3 className='h3 mb-1'>{value.title}</h3>

                        <div className='d-block text-muted text-sm font-semibold'>{dayjs(value.createdAt).format('MMM DD HH:mm:ss, YYYY')}</div>
                        <p className='mt-4 mb-6'>{value.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPresenter;
