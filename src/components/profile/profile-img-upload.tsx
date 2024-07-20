import { useRef } from "react";
import { uploadProfile } from "../../api/user";

export default function ProfileImgUpload({ id, getUserProfile }) {
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

    let response = await uploadProfile(id, formData);
    if (response?.success) {
      getUserProfile(id);
    }
  }

  return (
    <div className="profile-upload" onClick={handleImageClick}>
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
