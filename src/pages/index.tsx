import { useState } from 'react';
import styles from './index.module.css';
const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [1, 0],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];
const sum1 = [2, 2];
const Home = () => {
  const [turncolor, setturncolor] = useState(1);
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    console.log(board);
    // console.log(x, y);
    const newboard = structuredClone(board);

    console.log(board[y][x]);
    //const site = (board: number[][], turncolor:number) =>
    for (const direction of directions) {
      if (board[y][x] === 0) {
        if (
          board[y + direction[0]] !== undefined &&
          board[y + direction[0]][x + direction[1]] === 2 / turncolor
        ) {
          for (let n = 1; n < 7; n++) {
            if (
              board[y + direction[0] * n] !== undefined &&
              board[y + direction[0] * n][x + direction[1] * n] === turncolor
            ) {
              newboard[y][x] = turncolor;
              let m = 0;
              while (n > m) {
                m++;
                newboard[y + direction[0] * m][x + direction[1] * m] = turncolor;
              }
              setturncolor(2 / turncolor);
              setboard(newboard);
              break;
            } else if (
              board[y + direction[0] * n] !== undefined &&
              board[y + direction[0] * n][x + direction[1] * n] === 0
            )
              break;
          }
        }
      }
    }
    sum1.fill(0);
    for (let q = 0; q < 8; q++) {
      for (let w = 0; w < 8; w++) {
        const Coordinate = newboard[q][w];
        switch (Coordinate) {
          case 1:
            sum1[0] += 1;
            break;
          case 2:
            sum1[1] += 1;
            break;
        }
      }
    }
    console.log(sum1);
  };

  return (
    <div className={styles.container}>
      <div>
        黒の数{sum1[0]} 白の数{sum1[1]}
      </div>
      <div>{turncolor === 1 ? '黒' : '白'}のターンです</div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color === 3 && <div className={styles.candidate} />}
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
