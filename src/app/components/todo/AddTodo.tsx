import { useRef } from 'react';

import { useTodoContext } from '@/app/context/TodoContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function AddTodo() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addItem } = useTodoContext();

  const handleAddItem = (content: string) => {
    if (!inputRef.current?.value) return;

    addItem(content);
    inputRef.current.value = '';
  };

  return (
    <div className={style.wrapper}>
      <Input ref={inputRef} placeholder={'할 일을 입력해주세요'} />
      <Button onClick={() => handleAddItem(inputRef.current?.value ?? '')}>ADD</Button>
    </div>
  );
}

const style = {
  wrapper: 'max-w-[500px] flex gap-2',
};