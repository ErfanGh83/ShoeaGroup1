import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5173";

export const useUserData = (userId: number | null) => {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: async () => {
        if (!userId) throw new Error("No user ID provided");
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
      },
      enabled: !!userId,
      onError: () => {
        toast.error("Failed to fetch user data");
      },
    });
  };
  

  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ userId, data }: { userId: number; data: any }) => {
        const response = await axios.put(`${API_URL}/users/${userId}`, data);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        toast.success("User data updated!");
      },
      onError: () => {
        toast.error("Failed to update user data.");
      },
    });
  };
  