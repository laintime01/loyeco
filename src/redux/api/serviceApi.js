import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const SER_URL = '/service'

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all services
        getAllServices: build.query({
            query: () => ({
                url: SER_URL,
                method: 'GET'
            }),
            providesTags: [tagTypes.service]
        }),
        // create service
        createService: build.mutation({
            query: (data) => ({
                url: SER_URL,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.service]
        }),
        // update service with id
        updateService: build.mutation({
            query: (data) => ({
                url: SER_URL,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: [tagTypes.service]
        }),
        // delete service
        deleteService: build.mutation({
            query: (id) => ({
                url: `${SER_URL}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.service]
        }),
        // service status pass id and status values : On Off boolean
        serviceStatus: build.mutation({
            query: (data) => ({
                url: `${SER_URL}/status`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: [tagTypes.service]
        }),
    }),
})

export const {
    useGetAllServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useServiceStatusMutation,
} = serviceApi