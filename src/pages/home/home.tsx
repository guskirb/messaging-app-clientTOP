import { useState } from "react";
import Nav from "../../components/nav/nav";
import Sidebar from "../../components/sidebar/sidebar";
import useSetProfile from "../../hooks/useSetProfile";
import "./home.css";

export default function Home() {
  const {profile, setProfile} = useSetProfile();
  const [sidebar, setSidebar] = useState("profile");

  return (
    <div className="home__container">
      <Nav sidebar={sidebar} setSidebar={setSidebar} setProfile={setProfile} />
      <Sidebar content={sidebar} profile={profile} />
    </div>
  );
}
