import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const CHA_URL = '/chart'

export const chartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all charts
        getAllCharts: build.query({
            query: (params) => ({
                url: CHA_URL,
                method: 'GET',
                params: params

            }),
            providesTags: [tagTypes.chart]
        }),
        // create chart
        createChart: build.mutation({
            query: (data) => ({
                url: CHA_URL,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.chart]
        }),
        // update chart
        updateChart: build.mutation({
            query: (data) => ({
                url: CHA_URL,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: [tagTypes.chart]
        }),
        // get all chart services
        getAllChartServices: build.query({
            query: () => ({
                url: `${CHA_URL}/services`,
                method: 'GET',
            }),
            providesTags: [tagTypes.chart]
        }),
        // get chart services subtyes
        getChartServicesSubtypes: build.query({
            query: (params) => ({
                url: `${CHA_URL}/subtype`,
                method: 'GET',
                params: params
            }),
            providesTags: [tagTypes.chart]
        }),
        // get temp chart by subtype id
        getTempChart: build.query({
            query: (subtype_id) => ({
                url: `${CHA_URL}/temp`,
                method: 'GET',
                params: { id: subtype_id }
            }),
            providesTags: [tagTypes.chart]
        }),
        // chart status pass id and status values : Draft, Finalized
        chartStatus: build.mutation({
            query: (params) => ({
                url: `${CHA_URL}/status`,
                method: 'PUT',
                params: params,
            }),
            invalidatesTags: [tagTypes.chart]
        }),
    }),
})

export const {
    useGetAllChartsQuery,
    useCreateChartMutation,
    useUpdateChartMutation,
    useChartStatusMutation,
    useGetAllChartServicesQuery,
    useGetChartServicesSubtypesQuery,
    useGetTempChartQuery,
} = chartApi
