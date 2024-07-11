import useAuth from "../../hooks/useAuth";

export default function Friends() {
  const { auth }: any = useAuth();
  console.log(auth);
  
  return (
    <h2>Friends</h2>
  )
}
