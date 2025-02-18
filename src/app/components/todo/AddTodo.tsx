import { useRef } from 'react';

import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function AddTodo() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className={style.wrapper}>
      <Input
        name={'todoContent'}
        className={style.input}
        ref={inputRef}
        placeholder={'할 일을 입력해주세요'} />
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