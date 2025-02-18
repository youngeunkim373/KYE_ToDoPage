'use client';
import { Board } from './components/board/Board';
import { TodoBoard } from './components/todo/TodoBoard';

export default function Home() {
  return (
    <main className={style.main}>
      <Board
        className={`
          ${style.wrapper.common} 
          ${style.wrapper.board}
        `} />

      <TodoBoard
        className={`
          ${style.wrapper.common} 
          ${style.wrapper.todo}
        `} />
    </main >
  );
}

const style = {
  main: `
    min-w-[320px] max-w-[900px] min-h-screen
    flex items-stretch
    mx-auto
  `,
  wrapper: {
    common: 'flex flex-col gap-4 px-4 py-20',
    board: 'flex-2 bg-gray-50 mx-auto sm:px-4',
    todo: 'flex-1  sm:px-8',
  }
};
