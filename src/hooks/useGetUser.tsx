import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";

const getUser = async () => {
  return axios
    .get("/users/me")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export default function useGetUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  
  return {
    user,
    isLoading,
  };
}
