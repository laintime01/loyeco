import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const PAT_URL = '/patient'

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatient: build.query({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        updatePatient: build.mutation({
            query: ({ data, id }) => ({
                url: `${PAT_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.patient]
        }),
        getAllPatients: build.query({
            query: () => ({
                url: PAT_URL,
                method: 'GET',
                // add header Authorization Bearer admin@123.com            
            }),
            providesTags: [tagTypes.patient]
        }),
        createPatient: build.mutation({
            query: (data) => ({
                url: PAT_URL,
                method: 'POST',
                data,
            }),
        }),
        deletePatient: build.mutation({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.patient]
        }),
        
    })
})

export const {
    useGetPatientQuery,
    useUpdatePatientMutation,
    useGetAllPatientsQuery,
    useCreatePatientMutation,
    useDeletePatientMutation
} = patientApi