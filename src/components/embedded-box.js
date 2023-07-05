import styled from 'styled-components';

const Box = styled.div`
  width: 30%;
  height: 50%;
  background: white;
  border: 10px;
  padding: 20px;
  outline: 3px solid black;
  margin: 70px auto;

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

export default function EmbeddedBox({
  setShowEmBox,
  setEmbed,
  embed,
  addEmbedded,
}) {
  return (
    <Background>
      <Box>
        <div>
          <h2>請貼上 EmbeddedCode </h2>
          <textarea
            placeholder='貼上 embedded-code 字串'
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
          />
          <button
            onClick={() => {
              setShowEmBox(false);
              addEmbedded(embed, setEmbed);
            }}
          >
            確定
          </button>
        </div>
      </Box>
    </Background>
  );
}
