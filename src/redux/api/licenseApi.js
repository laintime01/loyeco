import {baseApi} from "./baseApi";
import { tagTypes } from "../tag-types";


const LIC_URL = '/license'

export const licenseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get license types
        getLicenseTypes: build.query({
            query: () => ({
                url: `${LIC_URL}/types`,
                method: 'GET',
            }),
            providesTags: [tagTypes.license]
        }),

        // create license 
        createLicense: build.mutation({
            query: (params) => ({
                url: LIC_URL,
                method: 'POST',
                params: params,
            }),
            invalidatesTags: [tagTypes.license]
        }),
        // delete license
        deleteLicense: build.mutation({
            query: (id) => ({
                url: `${LIC_URL}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.license]
        }),        

    })            
})

export const { useGetLicenseTypesQuery, useCreateLicenseMutation, useDeleteLicenseMutation } = licenseApi
