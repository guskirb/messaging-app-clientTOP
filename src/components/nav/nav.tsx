import { logOut } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import "./nav.css";

type NavProps = {
  sidebar: string;
  setSidebar: any;
  setProfile: any;
};

export default function Nav({ sidebar, setSidebar, setProfile }: NavProps) {
  const { setAuth, auth }: any = useAuth();

  return (
    <div className="nav__container">
      <div className="logo" onClick={() => setSidebar("chatrooms")}></div>
      <div className={"nav-middle"}>
        <div
          className={
            sidebar === "profile"
              ? "profile-button nav-button active"
              : "profile-button nav-button"
          }
          onClick={() => {
            setSidebar("profile");
            setProfile(auth);
          }}
        ></div>
        <div
          className={
            sidebar === "chatrooms"
              ? "chatrooms-button nav-button active"
              : "chatrooms-button nav-button"
          }
          onClick={() => setSidebar("chatrooms")}
        ></div>
        <div
          className={
            sidebar === "friends"
              ? "friends-button nav-button active"
              : "friends-button nav-button"
          }
          onClick={() => setSidebar("friends")}
        ></div>
        <div
          className={
            sidebar === "users"
              ? "users-button nav-button active"
              : "users-button nav-button"
          }
          onClick={() => setSidebar("users")}
        ></div>
      </div>
      <div className="nav-lower">
        <div
          className="sign-out-button nav-button"
          onClick={() => {
            logOut();
            setAuth(null);
          }}
        ></div>
        <img
          className="nav__profile-img"
          src={auth?.user?.image}
          alt=""
          onClick={() => {
            setSidebar("profile");
            setProfile(auth);
          }}
        />
      </div>
    </div>
  );
}
