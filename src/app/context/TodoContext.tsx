'use client';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { TodoItemProps, TodoStatus } from '../components/todo/todo.interface';

const TodoContext = createContext<ReturnType<typeof useTodo> | null>(null);

const initialList = {
  'TODO': [],
  'INPROGRESS': [],
  'DONE': [],
};

const saveToStorage = (list: Record<TodoStatus, TodoItemProps[]>) => {
  localStorage.setItem('list', JSON.stringify(list));
};

const useTodo = () => {
  const [list, setList] = useState<Record<TodoStatus, TodoItemProps[]>>(initialList);

  const getList = () => {
    try {
      const storedList = localStorage.getItem('list');
      if (storedList) setList(JSON.parse(storedList));
    } catch (error) {
      console.error('Failed to parse list:', error);
      setList(initialList);
      localStorage.removeItem('list');
    }
  };

  const addItem = (content: TodoItemProps['content']) => {
    const item: TodoItemProps = {
      id: Date.now(),
      content,
    };

    setList((prev) => {
      const newList = { ...prev, 'TODO': [...prev.TODO, item] };
      saveToStorage(newList);
      return newList;
    });
  };

  const removeItem = ({ id, status }: {
    id: TodoItemProps['id'],
    status: TodoStatus,
  }) => {
    setList((prev) => {
      const newList = { ...prev, [status]: prev[status].filter((v) => v.id !== id) };
      saveToStorage(newList);
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

      saveToStorage(newList);
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
