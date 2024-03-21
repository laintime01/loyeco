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
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            providesTags: [tagTypes.location]  
        }),
        // create location
        createLocation: build.mutation({
            query: (data) => ({
                url: LOC_URL,
                method: 'POST',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'  
                },
            }),
            invalidatesTags: [tagTypes.location]
        }),
        // update location
        updateLocation: build.mutation({
            query: (data) => ({
                url: LOC_URL,
                method: 'PUT',
                data: data,
                headers: {
                    Authorization:'Bearer adimn@123.com'
                },
            }),
            invalidatesTags: [tagTypes.location]
        }),
        // delete location
        deleteLocation: build.mutation({
            query: (id) => ({
                url: `${LOC_URL}/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.location]
        }),
        // location status pass id and status values : Active, Inactive
        locationStatus: build.mutation({
            query: (data) => ({
                url: `${LOC_URL}/status`,
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
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
