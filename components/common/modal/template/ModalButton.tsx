interface ModalButtonProps {
  children?: React.ReactNode;
  twStyle?: string;
}

export default function ModalButton({ children, twStyle }: ModalButtonProps) {
  return <div className={`${twStyle ?? ''}`}>{children}</div>;
}
