interface ButtonProps {
  isDisabled?: boolean;
  children: React.ReactNode;
  onClickFunc?: () => void;
  isBottomBtn?: boolean;
  buttonType?: ButtonStyleType;
}

export type ButtonStyleType = 'PRIMARY' | 'TETIARY';

export default function Button({
  children,
  onClickFunc,
  isDisabled = false,
  isBottomBtn = false,
  buttonType = 'PRIMARY',
}: ButtonProps) {
  const style: Record<ButtonStyleType, string> = {
    PRIMARY:
      'border-primary  bg-primary text-white active:bg-primary-accent disabled:text-primary/50  disabled:border-2 disabled:border-dashed disabled:border-primary',
    TETIARY:
      'bg-white border-gray-200 text-default active:bg-gray-400 disabled:text-gray-50 disabled:bg-gray-100',
  };
  return (
    <button
      disabled={isDisabled}
      onClick={onClickFunc}
      className={`${isBottomBtn ? 'fixed bottom-0' : ''} ${style[buttonType]}  border-2  py-4 w-full cursor-pointer disabled:bg-white  disabled:cursor-default`}
    >
      {children}
    </button>
  );
}
