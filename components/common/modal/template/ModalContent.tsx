interface ModalContentProps {
  children?: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  return <div>{children}</div>;
}
