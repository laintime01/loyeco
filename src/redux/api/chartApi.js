import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const CHA_URL = '/chart'

export const chartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all charts
        getAllCharts: build.query({
            query: () => ({
                url: CHA_URL,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            providesTags: [tagTypes.chart]
        }),
        // create chart
        createChart: build.mutation({
            query: (data) => ({
                url: CHA_URL,
                method: 'POST',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.chart]
        }),
        // update chart
        updateChart: build.mutation({
            query: (data) => ({
                url: CHA_URL,
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.chart]
        }),
        // delete chart
        deleteChart: build.mutation({
            query: (id) => ({
                url: `${CHA_URL}/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.chart]
        }),
        // chart status pass id and status values : Draft, Finalized
        chartStatus: build.mutation({
            query: (data) => ({
                url: `${CHA_URL}/status`,
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.chart]
        }),
    }),
})

export const {
    useGetAllChartsQuery,
    useCreateChartMutation,
    useUpdateChartMutation,
    useDeleteChartMutation,
    useChartStatusMutation,
} = chartApi
