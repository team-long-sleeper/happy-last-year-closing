"use client";

import { useRouter } from "next/navigation";
import Icon from "../common/Icon";
import { ArrowBackIcon } from "@assets/icons";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center gap-5 px-5 py-10 text-primary">
      <Icon
        src={ArrowBackIcon}
        size="m"
        content="뒤로 가기"
        onClickFunc={() => router.back()}
      />{" "}
      {title}
    </div>
  );
}
