import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const avatarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAvatar: build.query({
            query: (fileName) => ({
                url: `/avatar`,
                method: 'PUT',
                data: fileName
            }),
            providesTags: [tagTypes.avatar]
        }),
        uploadAvatar: build.mutation({
            query: (params) => ({
                url: `/upload`,
                method: 'POST',
                params: params
            }),
            invalidatesTags: [tagTypes.avatar]
        }),
        getAvatarByName: build.query({
            query: (fileName) => ({
                url: `/avatar/${fileName}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.avatar]
        }),
    })
})

export const { useGetAvatarQuery, useUploadAvatarMutation, useGetAvatarByNameQuery } = avatarApi