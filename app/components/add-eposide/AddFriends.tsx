import Icon from '@components/common/Icon';
import { MateIcon, AddIcon } from '@assets/icons';

export default function AddFriends() {
  const onClickAddBtn = () => {
    // 1. 친구 찾기 모달 열기
  };

  return (
    <>
      <div className="w-full">
        <span className="text-3xl font-extralight text-primary pl-26 text-right">0</span>
      </div>

      <div className="w-full flex items-start gap-4 pl-25.5">
        <Icon src={MateIcon} size="m" content="에피소드 친구" />
        <div
          onClick={onClickAddBtn}
          className="size-17 bg-primary flex justify-center items-center rounded-full cursor-pointer"
        >
          <Icon src={AddIcon} size="m" content="친구 추가하기" />
        </div>
      </div>
    </>
  );
}
