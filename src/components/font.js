import styled from 'styled-components';

const Box = styled.div`
  width: 30%;
  height: 50%;
  background: white;
  border: 10px;
  padding: 20px;
  outline: 3px solid black;
  margin: 70px auto;

  input {
    width: 20%;
    margin-bottom: 20px;
  }

  textarea {
    width: 90%;
    height: 200px;
  }

  button {
    padding: 5px;
    background: black;
    color: white;
    outline: none;
    cursor: pointer;
    margin-top: 10px;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
  opacity: 0.85;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;

export default function Font({
  setShowFont,
  setPureFont,
  pureFont,
  setPureFontName,
  pureFontName,
  addFont,
}) {
  return (
    <Background>
      <Box>
        <div>
          <h2>請填入物件代號＋文字內容 </h2>

          <span>物件代號(勿與之前的重複）：</span>
          <input
            placeholder='文字名稱，中英文數字皆可'
            value={pureFontName}
            onChange={(e) => setPureFontName(e.target.value)}
          />

          <textarea
            placeholder='文字內容'
            value={pureFont}
            onChange={(e) => setPureFont(e.target.value)}
          />

          <button
            onClick={() => {
              setShowFont(false);
              addFont(pureFontName, pureFont);
            }}
          >
            確定
          </button>
        </div>
      </Box>
    </Background>
  );
}
