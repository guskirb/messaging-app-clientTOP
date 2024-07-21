import { ChangeEvent, useRef } from "react";
import { uploadProfile } from "../../api/user";

type ProfileImgUploadProps = {
  id: string;
  getUserProfile: any;
};

export default function ProfileImgUpload({
  id,
  getUserProfile,
}: ProfileImgUploadProps) {
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
