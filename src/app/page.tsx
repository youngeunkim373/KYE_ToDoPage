'use client';
import { DragDropContext } from '@hello-pangea/dnd';
import { Board } from './components/board/Board';
import { TodoBoard } from './components/todo/TodoBoard';
import { useTodoContext } from './context/TodoContext';

export default function Home() {
  const { selectedBoard, reorderOnDragEnd } = useTodoContext();

  return (
    <DragDropContext onDragEnd={reorderOnDragEnd}>
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
          `}
          {...selectedBoard} />
      </main >
    </DragDropContext>
  );
}
const style = {
  main: `
    w-full max-w-screen min-w-[320px] min-h-screen
    grid grid-cols-[minmax(200px,1fr)_minmax(200px,3fr)]

  `,
  wrapper: {
    common: 'max-w-full flex flex-col gap-4 px-4 py-20',
    board: 'bg-gray-50 sm:px-4',
    todo: 'sm:px-8',
  }
};
