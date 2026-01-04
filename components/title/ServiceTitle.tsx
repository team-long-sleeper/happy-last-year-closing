interface TitleProps {
  titleColor: 'text-primary' | 'text-white';
}

export default function ServiceTitle({ titleColor }: TitleProps) {
  return (
    <div
      className={`px-5 flex justify-between w-full  ${titleColor} text-4xl font-extralight transform-all duration-300 ease-in-out`}
    >
      <div className="-rotate-10 -translate-y-4">happy</div>
      <div className="">last</div>
      <div className="rotate-4 translate-y-3">year</div>
      <div className="-rotate-6">closing!</div>
    </div>
  );
}
