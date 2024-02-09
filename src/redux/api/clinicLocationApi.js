import { tagTypes } from "../tag-types"
import {baseApi} from "./baseApi"

const CLINIC_LOCATION_URL = '/location'

export const clinicLocationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createLocation: build.mutation({
            query: (data) => ({
                url: `${CLINIC_LOCATION_URL}`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.clinicLocation]
        }),
        getAllLocation: build.query({
            query: () => ({
                url: `${CLINIC_LOCATION_URL}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.clinicLocation]
        }),
        getLocation: build.query({
            query: (id) => ({
                url: `${CLINIC_LOCATION_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.clinicLocation]
        }),
        deleteLocation: build.mutation({
            query: (id) => ({
                url: `${CLINIC_LOCATION_URL}/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.clinicLocation]
        }),
        updateLocation: build.mutation({
            query: ({ data, id }) => ({
                url: `${CLINIC_LOCATION_URL}/update/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.clinicLocation]
        })
    })
})

export const { useCreateLocationMutation, useGetAllLocationQuery, useGetLocationQuery, useDeleteLocationMutation, useUpdateLocationMutation } = clinicLocationApi
