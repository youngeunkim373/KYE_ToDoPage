'use client';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { TodoItem, TodoStatus } from '../components/todo/todo.interface';

// @ts-expect-error: known issue
const TodoContext = createContext<ReturnType<typeof useTodo>>(null);

const useTodo = () => {
  const [list, setList] = useState<Record<TodoStatus, TodoItem[]>>({
    'TODO': [],
    'INPROGRESS': [],
    'DONE': [],
  });

  const getList = () => {
    const storedList = localStorage.getItem('list');
    if (storedList) setList(JSON.parse(storedList));
  };

  const addItem = (content: TodoItem['content']) => {
    const item: TodoItem = {
      id: Date.now(),
      content,
    };

    setList((prev) => {
      const newList = { ...prev, 'TODO': [...prev.TODO, item] };
      localStorage.setItem('list', JSON.stringify(newList));
      return newList;
    });
  };

  const removeItem = ({ id, status }: {
    id: TodoItem['id'],
    status: TodoStatus,
  }) => {
    setList((prev) => {
      const newList = { ...prev, [status]: prev[status].filter((v) => v.id !== id) };
      localStorage.setItem('list', JSON.stringify(newList));
      return newList;
    });
  };

  const onDragEndReorderItems = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceId = source.droppableId as TodoStatus;
    const destinationId = destination.droppableId as TodoStatus;

    setList((prev) => {
      const newList = { ...prev };
      const [removed] = newList[sourceId].splice(source.index, 1);
      newList[destinationId].splice(destination.index, 0, removed);

      localStorage.setItem('list', JSON.stringify(newList));
      return newList;
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return {
    list,
    addItem,
    removeItem,
    onDragEndReorderItems,
  };
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoContextProvider = ({ children }: PropsWithChildren) => {
  const value = useTodo();
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
