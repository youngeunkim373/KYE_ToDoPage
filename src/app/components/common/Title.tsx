interface Props {
  content: string;
  className?: string;
}

export function Title({ content, className = '' }: Props) {
  return (
    <p className={`${style} ${className}`}>
      {content}
    </p>
  );
}

const style = `
  text-2xl font-semibold text-left
`;