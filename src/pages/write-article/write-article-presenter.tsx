import React from 'react';
import Prism from 'prismjs';

import './styles.scss';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import TextareaAutosize from 'react-textarea-autosize';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import styled from 'styled-components';
import { pixelToRem } from '../../common/style';

const WriteArticlePresenter = ({ editorRef, onClickSaveButton, articleInfo, handleSubjectChange, handleDescriptionChange, graph, noteInfo }: any) => {
  return (
    <>
      <header className='bg-surface-primary border-bottom pt-6 pb-6 position-sticky top-0 header'>
        <div className='container-fluid'>
          <div className='mb-npx'>
            <div className='row align-items-center'>
              <div className='col-sm-6 col-12 mb-4 mb-sm-0'>
                <h1 className='h2 mb-0 ls-tight text-start'>Article</h1>
              </div>

              <div className='col-sm-6 col-12 text-sm-end'>
                <div className='mx-n1'>
                  <button className='btn d-inline-flex btn-sm btn-primary mx-1' onClick={onClickSaveButton}>
                    <span className=' pe-2'>
                      <i className='bi bi-plus'></i>
                    </span>
                    <span>Save Article</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className='py-6 bg-surface-secondary main overflow-auto'>
        <div className='container-fluid h-full'>
          <div className='d-flex gap-10 h-full'>
            <div className='d-flex flex-column gap-10 shadow border-1 card' style={{ border: '1px solid #cccccc', flex: 2 }}>
              <div style={{ flex: 1, boxSizing: 'border-box', padding: '20px 20px 0 20px' }}>
                <SubjectInput maxRows={2} maxLength={100} onChange={handleSubjectChange} placeholder='Input title.' value={articleInfo.title} />
                <SubjectLine />
                <DescriptionInput type='text' name='description' onChange={handleDescriptionChange} placeholder='(optional)Input description' value={articleInfo.desc} />
              </div>
              <div style={{ flex: 5 }}>
                <Editor previewStyle='vertical' plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]} height='100%' hideModeSwitch={true} ref={editorRef} />
              </div>
            </div>
            <div className='d-flex flex-column gap-10 shadow border-1 card' style={{ border: '1px solid #cccccc', flex: 1, padding: '20px', overflow: 'scroll' }}>
              {noteInfo.map((value) => {
                return (
                  <>
                    <div className='shadow border-2 br-2'>
                      <details>
                        <summary className='h3 mb-1 text-start' style={{ padding: '10px' }}>
                          {value.reason}
                        </summary>

                        <div className='d-flex h-full'>
                          <div className='card border-3 flex-1 text-start'>{value.fromNote}</div>

                          <div className='card border-3 flex-1 text-start'>{value.toNote}</div>
                        </div>
                      </details>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const SubjectInput = styled(TextareaAutosize)`
  outline: none;
  resize: none;
  width: 100%;
  display: block;

  line-height: 1.5;
  background-color: #fdfdfd;
  font-size: ${pixelToRem(40)};
  font-weight: bold;
`;

const SubjectLine = styled.div`
  background: rgb(73, 80, 87);
  height: 6px;
  width: 9rem;

  margin-bottom: 1rem;
  border-radius: 1px;
`;

const DescriptionInput = styled.input`
  width: 100%;
  background-color: #fdfdfd;
  font-size: ${pixelToRem(22)};
  outline: none;
`;

export default WriteArticlePresenter;
