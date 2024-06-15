import { styled } from 'styled-components';
import './globals.css';
import { useState } from 'react';
import { randomLetters } from './letters';
import Progress from './components/Progress';

const Box = styled.div`
  min-width: 360px;
  background-color: #7C7C7C;
  width: 100%;
  max-width: 570px;
  border-radius: 6px;
  padding: 16px;
  min-height: 109px;
`;

const Wrapper = styled.main`
  padding: 4em;
  background: #1A181B;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled.main`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #6320EE;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: ease 0.3s;
  font-size: 16px;

  &:hover {
    background-color: #540ae8;
  }
`;

const ResetButton = styled.button`
  background-color: #ff5151;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: ease 0.3s;
  font-size: 16px;
  margin-left: 8px;

  &:hover {
    background-color: #f93f3f;
  }
`;

const LetterList = styled.ul`
  list-style: none;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const LetterListItem = styled.li`
  width: 50px;
  height: 50px;
  background-color: #6320EE;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  &.letterActive {
    background-color: #7DDF64;
  }
`;

let handleKeyUp = (e: KeyboardEvent) => { };

function App() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [letters, setLetters] = useState<string[] | null>(null);
  const [percent, setPercent] = useState(100);

  const startGame = () => {
    setGameIsRunning(true);

    const randLetters = randomLetters();
    setLetters(randLetters);

    document.addEventListener('keyup', handleKeyUp = function (e) {
      const letterIndex = document.querySelectorAll('.letterActive').length;
      const currentLetter = randLetters[letterIndex];

      if (currentLetter == e.key.toUpperCase()) {
        const letterBox = document.querySelector(`#${currentLetter}-${letterIndex}`);
        letterBox?.classList.add('letterActive');

      } else {
        document.removeEventListener('keyup', handleKeyUp);
        loseGame();
        return;
      }

      if ((letterIndex + 1) == randLetters.length) {
        winGame();
        document.removeEventListener('keyup', handleKeyUp);
        return;
      }
    });

    // Timer
    gameTimer();
  }


  const gameTimer = (seconds = 10) => {
    let secondsCount = seconds;

    setInterval(() => {
      secondsCount--;
      const resultPercent = (100 * secondsCount) / seconds;

      if (resultPercent <= 0) {
        loseGame();
        return;
      }

      setPercent(resultPercent);
    }, 1000);
  }

  const resetGame = () => {
    setGameIsRunning(false);
    setLetters(null);
    setPercent(100);

    // Limpa todos os intervals
    const intervalId = setInterval(() => { }, 2000);

    for (let index = 0; index <= intervalId; index++) {
      clearInterval(index);
    }

    document.removeEventListener('keyup', handleKeyUp);
  }

  const winGame = () => {
    resetGame();
    alert('Parabéns, voce venceu!');
  }

  const loseGame = () => {
    resetGame();
    alert('Você perdeu!');
  }

  return (
    <Wrapper>
      <h1>Minigame - de A a Z</h1>
      {!gameIsRunning ? (<Button onClick={startGame}>Iniciar</Button>) : <ResetButton style={{ marginLeft: '8px' }} onClick={resetGame}>Reiniciar</ResetButton>}

      <Box>
        <LetterList>
          {(letters && gameIsRunning) ? (
            <div style={{ gap: '8px' }}>
              <ListWrapper >
                {letters.map((item, index) => (
                  <LetterListItem key={`${item}-${index}`} id={`${item}-${index}`}>{item}</LetterListItem>
                ))}
              </ListWrapper>

              <Progress percent={percent} />
            </div>

          ) : (
            <>
              <LetterListItem>?</LetterListItem>
              <LetterListItem>?</LetterListItem>
              <LetterListItem>?</LetterListItem>
              <LetterListItem>?</LetterListItem>
              <LetterListItem>?</LetterListItem>
              <LetterListItem>?</LetterListItem>
            </>
          )}
        </LetterList>
      </Box>


    </Wrapper>
  )
}

export default App
