import { tagTypes } from "../tag-types"
import baseApi from "./baseApi"

const CLINIC_URL = '/clinic'

export const clinicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getClinics: build.query({
            query: (arg) => ({
                url: `${CLINIC_URL}`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) =>{
                return {
                    clinics: response.data,
                    meta: response.meta
                }
            },
            providesTags: [tagTypes.clinic]
        }),
        getClinic: build.query({
            query: (id) => ({
                url: `${CLINIC_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.clinic]
        }),
        updateClinic: build.mutation({
            query: ({ data, id }) => ({
                url: `${CLINIC_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.clinic]
        })
    })
})

export const { useGetClinicsQuery, useGetClinicQuery, useUpdateClinicMutation } = clinicApi
    