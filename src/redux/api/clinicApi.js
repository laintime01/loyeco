import { tagTypes } from "../tag-types"
import {baseApi} from "./baseApi"

const CLINIC_URL = '/clinic'

export const clinicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        //create clinic
        createClinic: build.mutation({
            query: (data) => ({
                url: `${CLINIC_URL}`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.clinic]
        }),
        getAllClinics: build.query({
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

export const { useCreateClinicMutation, useGetAllClinicsQuery, useGetClinicQuery, useUpdateClinicMutation } = clinicApi
