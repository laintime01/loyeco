import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROFILE_URL = '/profile'

export const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query: () => ({
                url: `${PROFILE_URL}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.profile]
        }),
        updateProfile: build.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}`,
                method: 'PUT',
                data: data
            }),
            invalidatesTags: [tagTypes.profile]
        }),
    })
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi