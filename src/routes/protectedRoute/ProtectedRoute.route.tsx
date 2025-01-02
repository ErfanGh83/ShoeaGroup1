import { FC, ReactElement } from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router";
import { whoAmIApi } from "../../api/auth.api";





export const ProtectedRoute: FC = (): ReactElement => {


    const { isSuccess, isLoading } = useQuery({
        queryKey: "whoAmI",
        queryFn: () => whoAmIApi(),
    })


    return isLoading ? <div>loading ...</div> : (isSuccess ? <Outlet /> : <Navigate to={"/login"} />)


}