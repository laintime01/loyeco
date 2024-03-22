import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get user info api
        getUserInfo: build.query({
            query: () => ({
                url: '/profile',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            providesTags: [tagTypes.user]
        }),
        // update user info api with userDTO
        updateUserInfo: build.mutation({
            query: (data) => ({
                url: '/profile',
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.user]
        }),
        // update user password api with string oldPass and newPass
        updateUserPassword: build.mutation({
            query: (data) => ({
                url: '/password',
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.user]
        }),
        // update avatar with fileName string
        updateAvatar: build.mutation({
            query: (data) => ({
                url: '/avatar',
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.user]
        }),
        
        // upload avatar with file object
        uploadAvatar: build.mutation({
            query: (data) => ({
                url: '/upload',
                method: 'POST',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.user]
        }),
        // get avatar with fileName string /avarar/{fileName}
        getAvatar: build.query({
            query: (fileName) => ({
                url: `/avatar/${fileName}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            providesTags: [tagTypes.user]
        }),
        // google login with token string
        googleLogin: build.mutation({
            query: (data) => ({
                url: '/google',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.user]
        }),

    }), 
})

export const { useGetUserInfoQuery, useUpdateUserInfoMutation, useUpdateUserPasswordMutation, useUpdateAvatarMutation, useUploadAvatarMutation, useGetAvatarQuery, useGoogleLoginMutation } = userApi
