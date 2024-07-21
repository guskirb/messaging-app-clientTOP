import { ChangeEvent, useRef } from "react";
import { postImgMessage } from "../../api/messages";
import { Chatroom } from "../../types/types";

type ImageUploadProps = {
  chatroom: Chatroom;
  chatroomRefetch: any;
  messageFetch: any;
};

export default function ImageUpload({
  chatroom,
  chatroomRefetch,
  messageFetch,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleImageClick() {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }

  async function handleImageChange(e: ChangeEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", (e.target as HTMLInputElement).files![0]);

    let response = await postImgMessage(chatroom._id, formData);
    if (response?.success) {
      chatroomRefetch();
      messageFetch();
    }
  }

  return (
    <div className="image-upload" onClick={handleImageClick}>
      <input
        type="file"
        name=""
        id=""
        ref={inputRef}
        onChange={handleImageChange}
        className="img-input"
      />
    </div>
  );
}
