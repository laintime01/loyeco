import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PASSWORD_URL = '/password';

export const passwordApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updatePassword: build.mutation({
            query: (params) => ({
                url: `${PASSWORD_URL}`,
                method: 'PUT',
                params: params
            }),
            invalidatesTags: [tagTypes.password]
        }),
    })
})

export const { useUpdatePasswordMutation } = passwordApi

