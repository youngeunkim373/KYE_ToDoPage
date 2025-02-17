'use client';
import { DropResult } from '@hello-pangea/dnd';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BoardProps } from '../components/board/board.interface';
import { TodoItemProps } from '../components/todo/todo.interface';
import { reorderInSameList } from '../utils/dragAndDropUtils';

const TodoContext = createContext<ReturnType<typeof useTodo> | null>(null);

const initialList: BoardProps[] = [{ id: 'TODO', title: 'To do', items: [] }];

const saveStorage = (list: BoardProps[]) => {
  localStorage.setItem('list', JSON.stringify(list));
};


const useTodo = () => {
  const [list, setList] = useState<BoardProps[]>(initialList);
  const [selectedBoard, setSelectedBoard] = useState<BoardProps>(initialList[0]);

  /* -------------------- Common -------------------- */
  const saveList = (list: BoardProps[]) => {
    setList(list);
    saveStorage(list);
  };

  const saveSelectedBoard = (list: BoardProps[]) => {
    const updatedBoard = list.find(board => board.id === selectedBoard.id);
    if (updatedBoard) setSelectedBoard(updatedBoard);
  };

  /* -------------------- Board -------------------- */
  const getList = () => {
    try {
      const storedList = localStorage.getItem('list');

      if (storedList) {
        const parsedList = JSON.parse(storedList);
        setList(parsedList);
        setSelectedBoard(parsedList[0]);
      }
    } catch (error) {
      console.error('Failed to parse list:', error);
      saveList(initialList);
    };
  };

  const changeSelectedBoard = (id: BoardProps['id']) => {
    const newSelectedBoard = list.find(board => board.id === id);
    if (newSelectedBoard) setSelectedBoard(newSelectedBoard);
  };

  const addBoard = (title: BoardProps['title']) => {
    const newBoard: BoardProps = {
      id: uuidv4(),
      title,
      items: [],
    };

    const newList = [...list, newBoard];
    saveList(newList);
  };

  const editBoard = ({ id, title }: {
    id: BoardProps['id'],
    title: BoardProps['title'],
  }) => {
    const newList = list.map(board => board.id === id ? { ...board, title } : board);
    saveList(newList);
    changeSelectedBoard(id);
  };

  const removeBoard = (id: BoardProps['id']) => {
    const newList = Array.from(list).filter(board => board.id !== id);
    saveList(newList);
  };

  const reorderBoardOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (destination) {
      const newList = reorderInSameList({
        list,
        startIndex: source.index,
        endIndex: destination.index
      });

      saveList(newList);
    }
  };

  /* -------------------- Todo -------------------- */
  const addTodo = (content: TodoItemProps['content']) => {
    const newTodo: TodoItemProps = {
      id: uuidv4(),
      content,
      status: false,
    };

    const newList = list.map(
      board => board.id === selectedBoard.id
        ? { ...board, items: [...board.items, newTodo] }
        : board
    );
    saveList(newList);
    saveSelectedBoard(newList);
  };

  const editTodo = ({ id, content }: {
    id: TodoItemProps['id'],
    content: TodoItemProps['content'],
  }) => {
    const newList = list.map(board =>
      board.id === selectedBoard.id
        ? {
          ...board,
          items: board.items.map(todo =>
            todo.id === id
              ? { ...todo, content }
              : todo
          ),
        }
        : board
    );
    saveList(newList);
    saveSelectedBoard(newList);
  };

  const removeTodo = (id: TodoItemProps['id']) => {
    const newList = list.map(board =>
      board.id === selectedBoard.id
        ? { ...board, items: board.items.filter(todo => todo.id !== id) }
        : board
    );
    saveList(newList);
    saveSelectedBoard(newList);
  };

  const reorderTodoOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    console.log(result)
    if (source.droppableId === destination.droppableId) {
      const newBoard = reorderInSameList({
        list: selectedBoard.items,
        startIndex: source.index,
        endIndex: destination.index
      });

      const newList = list.map(board => (
        board.id === selectedBoard.id
          ? { ...board, items: newBoard }
          : board
      ));

      saveList(newList);
      saveSelectedBoard(newList);
    } else {
      console.log('달라잉')
    }
  };


  useEffect(() => {
    getList();
  }, []);

  return {
    list,
    selectedBoard,
    changeSelectedBoard,
    addBoard,
    editBoard,
    removeBoard,
    reorderBoardOnDragEnd,
    addTodo,
    editTodo,
    removeTodo,
    reorderTodoOnDragEnd,
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
