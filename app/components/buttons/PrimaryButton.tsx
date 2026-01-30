interface ButtonProps {
  content: string;
  onClickFunc?: () => void;
}

export default function PrimaryButton({ content, onClickFunc }: ButtonProps) {
  return (
    <button
      onClick={onClickFunc}
      className="fixed bottom-0 bg-primary py-4 w-dvw text-white active:bg-primary-accent cursor-pointer"
    >
      {content}
    </button>
  );
}
