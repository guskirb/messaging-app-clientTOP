import { ReactNode } from "react";
import "./modal.css";

interface Props {
  children?: ReactNode;
  setShowModal: any;
  title: string;
}

export default function Modal({ children, setShowModal, title }: Props) {
  function closeModal(e: React.MouseEvent) {
    if (
      (e.target as Element).className !== "modal__background" &&
      (e.target as Element).className !== "modal__button"
    ) {
      return;
    }
    setShowModal(false);
  }

  return (
    <div className="modal__background" onClick={closeModal}>
      <div className="modal__container">
        <div className="modal__upper">
          <h2>{title}</h2>
          <button className="modal__button" onClick={closeModal}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
