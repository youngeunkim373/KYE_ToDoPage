import { useRef } from 'react';

import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function AddBoard() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={style.wrapper}
      onSubmit={console.log}>
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