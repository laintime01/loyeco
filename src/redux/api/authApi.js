import { setUserInfo } from "../../utils/local-storage";
import { baseApi } from "./baseApi"

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // userLogin
        userLogin: build.mutation({
            query: (loginData) => {
                return {
                    url: `/login`,
                    method: 'POST',
                    data: loginData,
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = (await queryFulfilled).data;
                    setUserInfo({ accessToken: result.accessToken });
                } catch (error) {
                }
            },
        }),
        // userSignUp
        doctorSignUp: build.mutation({
            query: (data) => {
                return {
                    url: `/doctor`,
                    method: 'POST',
                    data,
                };
            },
        }),
    })
})



export const { useUserLoginMutation, useDoctorSignUpMutation } = authApi