import "./sidebar.css";
import Profile from "../profile/profile";
import Messages from "../messages/messages";
import Friends from "../friends/friends";

export default function Sidebar({ content }: { content: string }) {
  const renderSidebar = () => {
    switch (content) {
      case "profile":
        return <Profile />;
      case "messages":
        return <Messages />;
      case "friends":
        return <Friends />;
    }
  };

  return <div className="sidebar__container">{renderSidebar()}</div>;
}
