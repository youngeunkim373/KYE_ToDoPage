import { useRef } from 'react';

import { useTodoContext } from '@/app/context/TodoContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function AddBoard() {
  const { addBoard } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const boardTitle = formData.get('boardTitle');

    if (boardTitle) {
      addBoard(boardTitle.toString());
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form
      className={style.wrapper}
      onSubmit={handleSubmit}>
      <Input
        name={'boardTitle'}
        className={style.input}
        ref={inputRef}
        placeholder={'목록을 입력해주세요'} />
      <Button type={'submit'}>
        +
      </Button>
    </form>
  );
}

const style = {
  wrapper: 'max-w-[500px] flex gap-2',
  input: '',
};