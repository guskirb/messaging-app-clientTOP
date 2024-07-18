import { useRef } from "react";
import { postImgMessage } from "../../api/messages";

export default function ImageUpload({ chatroom, refetch, messageFetch }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleImageClick() {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }

  async function handleImageChange(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    
    let response = await postImgMessage(chatroom?._id, formData);
    if (response?.success) {
      refetch();
      messageFetch();
      e.target[0].value = "";
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
