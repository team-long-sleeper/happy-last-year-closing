interface ButtonProps {
  isDisabled?: boolean;
  children: React.ReactNode;
  onClickFunc?: () => void;
  isBottomBtn?: boolean;
}

export default function PrimaryButton({
  children,
  onClickFunc,
  isDisabled = false,
  isBottomBtn = false,
}: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClickFunc}
      className={`${isBottomBtn ? 'fixed bottom-0' : ''}  border-2 border-primary  bg-primary py-4 w-full text-white active:bg-primary-accent cursor-pointer disabled:bg-white disabled:text-primary/50 disabled:border-2 disabled:border-dashed disabled:border-primary disabled:cursor-default`}
    >
      {children}
    </button>
  );
}
