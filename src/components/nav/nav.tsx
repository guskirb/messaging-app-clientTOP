import useAuth from "../../hooks/useAuth";
import "./nav.css";

export default function Nav({ setSidebar }: { setSidebar: any }) {
  const { auth }: any = useAuth();

  return (
    <div className="nav__container">
      <div className="logo"></div>
      <div className="nav-middle">
        <div
          className="profile-button nav-button"
          onClick={() => setSidebar("profile")}
        ></div>
        <div
          className="message-button nav-button"
          onClick={() => setSidebar("messages")}
        ></div>
        <div
          className="friends-button nav-button"
          onClick={() => setSidebar("friends")}
        ></div>
      </div>
      <div className="nav-lower">
        <div className="settings-button nav-button"></div>
        <img className="nav__profile-img" src={auth.user.image} alt="" />
      </div>
    </div>
  );
}
