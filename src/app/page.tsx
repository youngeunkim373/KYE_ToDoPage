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
