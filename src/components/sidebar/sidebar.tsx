import "./sidebar.css";
import Profile from "../profile/profile";
import Messages from "../messages/messages";
import Friends from "../friends/friends";
import Users from "../users/users";

export default function Sidebar({
  content,
  profile,
}: {
  content: string;
  profile: any;
}) {
  const renderSidebar = () => {
    switch (content) {
      case "profile":
        return <Profile profile={profile} />;
      case "messages":
        return <Messages />;
      case "friends":
        return <Friends />;
      case "users":
        return <Users />;
    }
  };

  return <div className="sidebar__container">{renderSidebar()}</div>;
}
