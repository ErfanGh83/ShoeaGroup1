import { AxiosResponse } from "axios"
import { HTTP, HTTPPrivate } from "../services/http.service"
import { CartItem, User } from "../types/types"



export interface ILoginApiParams {
    username: string
    password: string
}

interface ILoginApiResponse {
    message: string
    accessToken: string
    username: string
}

export const refreshToken = async (): Promise<AxiosResponse<ILoginApiResponse>> => {
    return HTTP.post('/auth/refresh')
}

export const signUp = async (data: User): Promise<AxiosResponse<string>> => {
    return HTTP.post('/auth/register', data)
}

export const loginApi = async (data: ILoginApiParams): Promise<AxiosResponse<ILoginApiResponse>> => {
    return HTTP.post('/auth/login', data)
}

export const logout = async (): Promise<User> => {
    const { data } = await HTTP.post<User>(`/auth/logout`);
    return data;
};

interface IWhoAmIApiResponse {
    username: string
    id: number
}

export const whoAmIApi = async (): Promise<AxiosResponse<IWhoAmIApiResponse>> =>
     { return HTTPPrivate.get('/auth/whoami') }