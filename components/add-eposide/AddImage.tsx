import { useState } from "react";
import Icon from "../common/Icon";
import ImageUploader from "../uploaders/ImageUploader";
import ImageIcon from "@assets/icons/image.svg";
import Image from "next/image";
import { UploadedImage } from "@/types/episode.types";

export default function AddImage() {
  const [images, setImages] = useState<UploadedImage[] | null>(null);
  return (
    <>
      <div className="w-full flex">
        <span className="text-3xl font-extralight text-primary pl-17 text-right">
          {images ? images.length : 0}/5
        </span>
      </div>

      <div className="flex items-start gap-4 pl-25.5">
        <Icon src={ImageIcon} size="m" content="에피소드 사진" />

        <div className="flex w-fit gap-2 overflow-y-scroll pr-12">
          {images ? (
            <>
              {images.map((image, index) => (
                <Image
                  width={106}
                  height={106}
                  src={image.preview}
                  className="size-26.5 object-cover shrink-0 border border-primary"
                  key={index}
                  alt={image.name}
                />
              ))}
            </>
          ) : null}
          <ImageUploader images={images} setImages={setImages} />
        </div>
      </div>
    </>
  );
}
