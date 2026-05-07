interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  items: { label: string; onClick: () => void }[];
}

export default function ContextMenu({ position, onClose, items }: ContextMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <ul
        className="fixed z-50 bg-white shadow-lg min-w-32 border border-gray-100"
        style={{ top: position.y, left: position.x }}
      >
        {items.map((item) => (
          <li
            key={item.label}
            className="active:bg-primary cursor-pointer active:text-white py-1 px-2 "
            onClick={item.onClick}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </>
  );
}
