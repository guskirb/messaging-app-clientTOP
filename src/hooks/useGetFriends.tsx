import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../api/user";

export default function useGetFriends() {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  return {
    users,
    isLoading,
    refetch,
  };
}
