import useAuth from "../../hooks/useAuth";
import "./profile.css";

export default function Profile() {
  const { auth }: any = useAuth();

  return (
    <div className="profile__container">
      <img className="profile-img" src={auth.user.image} alt="" />
      <h2>{auth.user.username}</h2>
    </div>
  );
}
