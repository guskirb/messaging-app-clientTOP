import Modal from "../modal/modal";
import { Chatroom } from "../../types/types";
import { editChatroomName } from "../../api/messages";
import { FormEvent, useState } from "react";

type NameModalProps = {
  setShowModal: any;
  chatroom: Chatroom;
  chatroomRefetch: any;
  setChatroom: any;
};

export default function NameModal({
  setShowModal,
  chatroom,
  chatroomRefetch,
  setChatroom,
}: NameModalProps) {
  const [chatName, setChatName] = useState(chatroom.name);

  async function onClickEditName(
    e: FormEvent<HTMLFormElement> & {
      target: any;
    }
  ) {
    e.preventDefault();
    setShowModal(false);
    let response = await editChatroomName(chatroom._id, {
      name: chatName,
    });
    
    if (response.success) {
      chatroomRefetch();
      setChatroom(response.chatroom);
    }
  }

  return (
    <Modal setShowModal={setShowModal} title={"Rename Chat"}>
      <form
        action=""
        method="POST"
        className="edit-name-form"
        onSubmit={onClickEditName}
      >
        <input
          type="text"
          name=""
          id=""
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </Modal>
  );
}
