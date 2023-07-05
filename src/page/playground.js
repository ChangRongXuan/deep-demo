import studio from '@theatre/studio';
import { getProject, types } from '@theatre/core';
import { useState } from 'react';
import EmbeddedCode from '../embedded';
import styled from 'styled-components';
import EmbeddedBox from '../components/embedded-box';
import FontBox from '../components/font-box';
import ReactDOM from 'react-dom';
import Font from '../components/font';

const Buttons = styled.div`
  position: fixed;
  padding: 30px;
  bottom: 0;
  left: 0;
  background: pink;
  z-index: 10000;
`;

const AddButton = styled.div`
  padding: 5px;
  outline: 3px solid black;
  background: white;
  color: black;
  cursor: pointer;
  font-size: 14px;
  margin: 20px auto;

  &:hover {
    cursor: pointer;
  }
`;

export default function PlayPage() {
  studio.initialize();

  const project = getProject('deepfake demo');
  const sheet = project.sheet('Scene', 'default');

  const addBox = (name = '', content = '') => {
    const box = sheet.object(`${name}`, {
      position: {
        x: 0,
        y: 0,
      },
      bgColor: types.string('#ffffff'),
    });

    const div = document.createElement('div');

    div.style.cssText = `
      position: absolute;
      width: 300px;
      height: 20px;
      background: white;
      outline: 3px solid black;
      z-index: 10000;
      padding: 20px;
    `;

    div.textContent = `${content}`;

    document.body.appendChild(div);

    box.onValuesChange((newValue) => {
      div.style.left = newValue.position.x + 'px';
      div.style.top = newValue.position.y + 'px';
      div.style.backgroundColor = newValue.bgColor;
    });
  };

  const addFont = (name = '', content = '') => {
    const box = sheet.object(`${name}`, {
      position: {
        x: 0,
        y: 0,
      },
      size: types.string('50px'),
      color: types.string('#000000'),
    });

    const div = document.createElement('div');

    div.style.cssText = `
      font-size: 50px;
      position: absolute;
      color: black;
      z-index: 10000000;
    `;

    div.textContent = `${content}`;

    document.body.appendChild(div);

    box.onValuesChange((newValue) => {
      div.style.left = newValue.position.x + 'px';
      div.style.top = newValue.position.y + 'px';
      div.style.fontSize = newValue.size;
      div.style.color = newValue.color;
    });
  };

  const addEmbedded = (embed, setEmbed) => {
    const embedded = sheet.object('embedded', {
      position: {
        x: 0,
        y: 0,
      },
    });

    const div = document.createElement('div');

    div.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100vh;
      background: white;
    `;

    document.body.appendChild(div);

    embedded.onValuesChange((newValue) => {
      div.style.left = newValue.position.x + 'px';
      div.style.top = newValue.position.y + 'px';
    });

    ReactDOM.render(<EmbeddedCode embed={embed} setEmbed={setEmbed} />, div);
  };

  const [showEmBox, setShowEmBox] = useState(false);
  const [showFontBox, setShowFontBox] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [embed, setEmbed] = useState('');
  const [font, setFont] = useState('');
  const [pureFont, setPureFont] = useState('');
  const [boxName, setBoxName] = useState('box');
  const [pureFontName, setPureFontName] = useState('font');

  return (
    <>
      {showEmBox && (
        <EmbeddedBox
          setShowEmBox={setShowEmBox}
          setEmbed={setEmbed}
          embed={embed}
          addEmbedded={addEmbedded}
        />
      )}

      {showFontBox && (
        <FontBox
          setShowFontBox={setShowFontBox}
          setFont={setFont}
          font={font}
          setBoxName={setBoxName}
          boxName={boxName}
          addBox={addBox}
        />
      )}

      {showFont && (
        <Font
          setShowFont={setShowFont}
          setPureFont={setPureFont}
          pureFont={pureFont}
          setPureFontName={setPureFontName}
          pureFontName={pureFontName}
          addFont={addFont}
        />
      )}

      <Buttons>
        <AddButton
          className='add-embedded-box'
          onClick={() => {
            setShowEmBox(true);
          }}
        >
          新增embedded
        </AddButton>
        <AddButton
          className='add-font-box'
          onClick={() => {
            setShowFontBox(true);
          }}
        >
          新增文字框
        </AddButton>
        <AddButton
          className='add-font'
          onClick={() => {
            setShowFont(true);
          }}
        >
          新增文字標題
        </AddButton>
      </Buttons>
    </>
  );
}
