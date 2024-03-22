import {baseApi} from "./baseApi";
import { tagTypes } from "../tag-types";


const LIC_URL = '/license'

export const licenseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get license types
        getLicenseTypes: build.query({
            query: () => ({
                url: LIC_URL,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            providesTags: [tagTypes.license]
        }),

        // create license 
        createLicense: build.mutation({
            query: (params) => ({
                url: LIC_URL,
                method: 'POST',
                params: params,
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.license]
        }),
        // delete license
        deleteLicense: build.mutation({
            query: (id) => ({
                url: `${LIC_URL}/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer admin@123.com'
                },
            }),
            invalidatesTags: [tagTypes.license]
        }),        

    })            
})

export const { useGetLicenseTypesQuery, useCreateLicenseMutation, useDeleteLicenseMutation } = licenseApi
