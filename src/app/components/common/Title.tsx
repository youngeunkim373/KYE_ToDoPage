interface Props {
  content: string;
}

export function Title({ content }: Props) {
  return (
    <h1 className={style}>
      {content}
    </h1>
  );
}

const style = `
  text-3xl font-semibold
  text-left
`;