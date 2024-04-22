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

// const flipStones = (board: number[][], turnColor: number, x: number, y: number) => {};

const Home = () => {
  const [turncolor, setturncolor] = useState(1);
  const [board, setboard] = useState([
    //空白0 白1 黒2 row=行 for 調べる
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 1, 2, 0, 0, 0],
    // [0, 0, 0, 2, 1, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 0, 0, 1, 2, 1],
    [0, 0, 0, 0, 2, 1, 2, 1],
    [0, 0, 0, 1, 2, 1, 2, 1],
    [0, 0, 2, 1, 2, 1, 2, 1],
    [0, 2, 1, 2, 1, 2, 1, 2],
  ]);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);

    let n = 0;
    let m = 0;

    //console.log(board[y][x])
    for (const direction of directions) {
      const yoko = direction[0];
      const tate = direction[1];
    }
    if (board[y][x] !== 0) return;
    //console.log(100);
    const newboard = structuredClone(board);

    while (n < 7) {
      //console.log(200);
      n++;
      if (board[y + n] !== undefined && board[y + n][x] === 2 / turncolor) {
        //console.log(300);
        if (board[y + 1 + n] !== undefined && board[y + 1 + n][x] === turncolor) {
          //console.log(400);
          newboard[y][x] = turncolor;
          while (n >= m) {
            //console.log(500);
            newboard[y + m][x] = turncolor;
            m++;
          }
          setturncolor(2 / turncolor);
          break;
        }
      } else {
        break;
      }
    }
    setboard(newboard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
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
