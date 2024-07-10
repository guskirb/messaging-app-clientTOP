import { useState } from "react";
import Nav from "../../components/nav/nav";
import Sidebar from "../../components/sidebar/sidebar";
import "./home.css";

export default function Home() {
  const [sidebar, setSidebar] = useState("profile");

  return (
    <div className="home__container">
      <Nav setSidebar={setSidebar} />
      <Sidebar content={sidebar} />
    </div>
  );
}
