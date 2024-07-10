import useAuth from "../../hooks/useAuth";
import "./nav.css";

export default function Nav() {
  const { auth }: any = useAuth();

  return (
    <div className="nav__container">
      <div className="logo"></div>
      <div className="nav-middle">
        <div className="profile-button nav-button"></div>
        <div className="message-button nav-button"></div>
        <div className="friends-button nav-button"></div>
      </div>
      <div className="nav-lower">
        <div className="settings-button nav-button"></div>
        <img className="profile-img" src={auth.user.image} alt="" />
      </div>
    </div>
  );
}
