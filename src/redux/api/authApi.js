import { setUserInfo } from "../../utils/local-storage";
import { baseApi } from "./baseApi"

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // userLogin
        userLogin: build.mutation({
            query: (loginParams) => {
                return {
                    url: '/login',
                    method: 'POST',
                    params: loginParams,
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = (await queryFulfilled).data;
                    if (result) {
                        sessionStorage.setItem("accessToken", result);
                    }
                } catch (error) {
                }
            },
        }),
        // userSignUp
        SignUp: build.mutation({
            query: (data) => {
                return {
                    url: '/signup',
                    method: 'POST',
                    data,
                };
            },
        }),
    })
})



export const { useUserLoginMutation, useSignUpMutation } = authApi