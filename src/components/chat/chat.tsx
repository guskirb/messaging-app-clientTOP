import ListChat from "./list-chat";
import { memo } from "react";
import "./chat.css";

export default memo(function Chat() {

  return (
    <div className="chat__container">
      <ListChat />
      <div className="input__container">
        <input type="text" placeholder="Enter Message..." />
        <button>enter</button>
      </div>
    </div>
  );
});
