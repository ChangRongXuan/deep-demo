import { getProject, types } from '@theatre/core';
import studio from '@theatre/studio';
import state from './state.json';

//這樣寫是讓編輯器只有在 dev 環境會出現
if (process.env.NODE_ENV === 'development') {
  studio.initialize();
}

// console.log(state);

const proj = getProject('first project', { state });
// const proj = core.getProject('first project');
const sheet = proj.sheet('scene');

studio.ui.hide(); //隱藏編輯按鈕
//studio.ui.restore(). //回復編輯按鈕

//sheet 的控制參數，從新整理仍會保留
//key 只能輸入數字英文，必須用英文開頭，可以是 nested
//對應是 box.value
const box = sheet.object('box', {
  position: {
    x: 0,
    y: 0,
  },
});

window.box = box;
window.sheet = sheet;

//sheet.sequence -> 是一個 object
//sheet.sequence.play() -> 執行播放
//sheet.sequence.play({rate:4}) -> 以 4 倍速播放
//sheet.sequence.play({rate:8, range: [0,2], iterationCount: 2}) -> 以 8 倍速播放，從 0-2 秒，重複播放 2 次
//sheet.sequence.position -> 目前所在的秒數
//sheet.sequence.position = 5 -> 目前所在位置秒數改設在 5

//box.onValuesChange((newValue) => {console.log(newValue)})

//一個棱形點 = keyframe

const div = document.createElement('div');

div.style.cssText = `
  position: absolute;
  width: 100px;
  height: 100px;
  background: #EEE;
`;

document.body.appendChild(div);

box.onValuesChange((newValue) => {
  div.style.left = newValue.position.x + 'px';
  div.style.top = newValue.position.y + 'px';
});

div.addEventListener('click', () => {
  sheet.sequence.play({ rate: 2, range: [0, 10], iterationCount: 3 });
});

const box2 = sheet.object('types test', {
  number: types.number(0, {
    range: [0, 100],
    nudgeMultiplier: 10,
    label: 'horizontal',
  }),
  string: types.string('this is a string'),
  boolean: types.boolean(true, { label: 'check' }),
  //下拉式選單
  light_mode: types.stringLiteral(
    'green',
    {
      green: 'Green',
      red: 'Red',
      yellow: 'Yellow',
    },
    { as: 'switch' }
  ),
  rotation: types.compound({
    x: types.number(0, { range: [-2, 2] }),
    y: types.number(0, { range: [-2, 2] }),
    z: types.number(0, { range: [-2, 2] }),
  }),

  color: {
    r: types.number(0, { range: [-2, 2] }),
    g: types.number(0, { range: [-2, 2] }),
    b: types.number(0, { range: [-2, 2] }),
  },
});
