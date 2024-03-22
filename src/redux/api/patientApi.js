import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const PAT_URL = '/patient'

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // search patient by keyword
        searchPatient: build.query({
            query: (keyword) => ({
                url: `${PAT_URL}/search?keyword=${keyword}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            providesTags: [tagTypes.patient]
        }),
        // get patient by id
        getPatient: build.query({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        // update patient by id
        updatePatient: build.mutation({
            query: (data) => ({
                url: PAT_URL,
                method: 'PUT',
                data: data,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.patient]
        }),
        // get all patients
        getAllPatients: build.query({
            query: () => ({
                url: PAT_URL,
                method: 'GET',
                // add header Authorization Bearer admin@123.com
             

            }),
            providesTags: [tagTypes.patient]
        }),
        // create patient
        createPatient: build.mutation({
            query: (data) => ({
                url: PAT_URL,
                method: 'POST',
                data: data,
                // add header Authorization Bearer admin@123.com
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
        }),
        // delete patient by id
        deletePatient: build.mutation({
            query: (id) => ({
                url: `${PAT_URL}?id=${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
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
    useDeletePatientMutation,
    useSearchPatientQuery,
} = patientApi