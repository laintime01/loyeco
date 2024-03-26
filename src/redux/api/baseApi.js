import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypeList } from '../tag-types'
import { axiosBaseQuery } from '../../helpers/axios/axiosBaseQuery'
import { getBaseUrl } from '../../helpers/config/envConfig'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: "http://loyeco.com:12121/api" }),
    endpoints: () => ({}),
    tagTypes: tagTypeList
})