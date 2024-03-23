import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const LOC_URL = '/location'

export const locationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all locations
        getAllLocations: build.query({
            query: () => ({
                url: LOC_URL,
                method: 'GET',
            }),
            providesTags: [tagTypes.location]  
        }),
        // create location
        createLocation: build.mutation({
            query: (data) => ({
                url: LOC_URL,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.location]
        }),
        // update location
        updateLocation: build.mutation({
            query: (data) => ({
                url: LOC_URL,
                method: 'PUT',
                data: data
            }),
            invalidatesTags: [tagTypes.location]
        }),
        // delete location
        deleteLocation: build.mutation({
            query: (id) => ({
                url: `${LOC_URL}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.location]
        }),
        // location status pass id and status values : Active, Inactive
        locationStatus: build.mutation({
            query: (data) => ({
                url: `${LOC_URL}/status`,
                method: 'PUT',
                data: data
    }),
    
    overrideExisting: false,
})
    })
})

export const {
    useGetAllLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation,
    useLocationStatusMutation
} = locationApi
