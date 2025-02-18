'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BoardProps } from '../components/board/board.interface';

const TodoContext = createContext<ReturnType<typeof useTodo> | null>(null);

const saveStorage = (list: BoardProps[]) => {
  localStorage.setItem('list', JSON.stringify(list));
};

const useTodo = () => {
  const [list, setList] = useState<BoardProps[]>([]);

  /* -------------------- Common -------------------- */
  const saveList = (list: BoardProps[]) => {
    setList(list);
    saveStorage(list);
  };

  /* -------------------- Board -------------------- */
  const addBoard = (title: BoardProps['title']) => {
    const newBoard: BoardProps = {
      id: uuidv4(),
      title,
      items: [],
    };

    const newList = [...list, newBoard];

    saveList(newList);
  };

  return {
    list,
    addBoard,
  };
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }

  return context;
};

export const TodoContextProvider = ({ children }: PropsWithChildren) => {
  const value = useTodo();
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
