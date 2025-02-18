'use client';
import { DropResult } from '@hello-pangea/dnd';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BoardProps } from '../components/board/board.interface';
import { TodoItemProps } from '../components/todo/todo.interface';
import { reorderInSameList } from '../utils/dragAndDropUtils';

const TodoContext = createContext<ReturnType<typeof useTodo> | null>(null);

const saveStorage = (list: BoardProps[]) => {
  localStorage.setItem('list', JSON.stringify(list));
};

const useTodo = () => {
  const [list, setList] = useState<BoardProps[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<BoardProps | null>(null);

  /* -------------------- Common -------------------- */
  const saveList = (list: BoardProps[]) => {
    setList(list);
    saveStorage(list);
  };

  const saveSelectedBoard = (list: BoardProps[]) => {
    const updatedBoard = list.find(board => board.id === selectedBoard?.id);
    if (updatedBoard) setSelectedBoard(updatedBoard);
  };

  const initializeList = () => {
    saveList([]);
    setSelectedBoard(null);
    localStorage.removeItem('list');
  };

  const changeSelectedBoard = (list: BoardProps[], id?: BoardProps['id']) => {
    if (!id) return setSelectedBoard(null);
    const newSelectedBoard = list.find(board => board.id === id);
    if (newSelectedBoard) setSelectedBoard(newSelectedBoard);
  };

  /* -------------------- Board -------------------- */
  const getList = () => {
    try {
      const storedList = localStorage.getItem('list');

      if (storedList) {
        const parsedList = JSON.parse(storedList);

        if (parsedList.length === 0) {
          initializeList();
        }

        setList(parsedList);
        changeSelectedBoard(parsedList, parsedList[0].id);
      }
    } catch (error) {
      console.error('Failed to parse list:', error);
      initializeList();
    };
  };

  const addBoard = (title: BoardProps['title']) => {
    const newBoard: BoardProps = {
      id: uuidv4(),
      title,
      items: [],
    };

    const newList = [...list, newBoard];
    saveList(newList);
    changeSelectedBoard(newList, newBoard.id);
  };

  const editBoard = ({ id, title }: {
    id: BoardProps['id'],
    title: BoardProps['title'],
  }) => {
    const newList = list.map(board => board.id === id ? { ...board, title } : board);
    saveList(newList);
    changeSelectedBoard(newList, id);
  };

  const removeBoard = (id: BoardProps['id']) => {
    const newList = Array.from(list).filter(board => board.id !== id);
    saveList(newList);
    changeSelectedBoard(newList, newList[0]?.id);
  };

  /* -------------------- Todo -------------------- */
  const addTodo = (content: TodoItemProps['content']) => {
    const newTodo: TodoItemProps = {
      id: uuidv4(),
      content,
      status: false,
    };

    const newList = list.map(
      board => board.id === selectedBoard?.id
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
    const newList = list.map(board => {
      if (board.id === selectedBoard?.id) {
        return {
          ...board,
          items: board.items.map(todo => todo.id === id ? { ...todo, content } : todo),
        };
      } else {
        return board;
      }
    }
    );
    saveList(newList);
    saveSelectedBoard(newList);
  };

  const removeTodo = (id: TodoItemProps['id']) => {
    const newList = list.map(board =>
      board.id === selectedBoard?.id
        ? { ...board, items: board.items.filter(todo => todo.id !== id) }
        : board
    );
    saveList(newList);
    saveSelectedBoard(newList);
  };

  /* -------------------- drag & drop -------------------- */
  const reorderOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, combine } = result;

    const isSourceBoard = source.droppableId.includes('board-');
    const isDestinationBoard = destination && destination?.droppableId.includes('board-');

    // Todo -> Board
    if (combine?.droppableId.includes('board-')) {
      const selectedTodo = selectedBoard?.items.find(todo => todo.id === draggableId);

      if (selectedTodo) {
        const newList = list.map(board => {
          if (combine.droppableId.includes(board.id)) {
            return { ...board, items: [...board.items, selectedTodo] };
          } else if (board.id === source.droppableId) {
            return { ...board, items: board.items.filter(todo => todo.id !== draggableId) };
          } else {
            return board;
          }
        });

        saveList(newList);
        saveSelectedBoard(newList);
      }
    }
    // Board 내에서 이동
    else if (isSourceBoard && isDestinationBoard) {
      reorderBoard(source.index, destination.index);
    }
    // Todo 내에서 이동
    else if (!isSourceBoard && !isDestinationBoard) {
      if (destination) {
        reorderTodo(source.index, destination.index);
      }
    }

  };

  const reorderBoard = (startIndex: number, endIndex: number) => {
    const newList = reorderInSameList<BoardProps>({ list, startIndex, endIndex });
    saveList(newList);
  }

  const reorderTodo = (startIndex: number, endIndex: number) => {
    if (!selectedBoard) return;

    const newBoard = reorderInSameList({
      list: selectedBoard.items,
      startIndex,
      endIndex,
    });

    const newList = list.map(board => (
      board.id === selectedBoard.id
        ? { ...board, items: newBoard }
        : board
    ));

    saveList(newList);
    saveSelectedBoard(newList);
  }

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
    addTodo,
    editTodo,
    removeTodo,
    reorderOnDragEnd,
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
