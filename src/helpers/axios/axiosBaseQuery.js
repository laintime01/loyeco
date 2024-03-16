import { instance } from './axiosInstance';

export const axiosBaseQuery = () =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await instance({
                url,
                method,
                data,
                params,
                headers: headers
            })
            return result
        } catch (axiosError) {
            const err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }
