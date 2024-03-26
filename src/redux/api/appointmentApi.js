import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const APPOINTMENT_URL = '/app'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // create appointment
        createAppointment: build.mutation({
            query: (data) => ({
                url: APPOINTMENT_URL,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        // update appointment with data
        updateAppointment: build.mutation({
            query: (data ) => ({
                url: APPOINTMENT_URL,
                method: 'PUT',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        // get all patient appointments
        getPatientAppointments: build.query({
            query: () => ({
                url: APPOINTMENT_URL,
                method: 'GET',
            }),
            providesTags: [tagTypes.appointments]
        }),
        // delet single appointment with id string /app?id={id}
        deleteSingleAppointment: build.query({
            query: (id) => ({
                url: `${APPOINTMENT_URL}?id=${id}`,
                method: 'DELETE',
            }),
            providesTags: [tagTypes.appointments]
        }),
        // update appointment status using paramters id and status values: UnCheckIn, Ongoing, Archived
        updateAppointmentStatus: build.mutation({
            query: (params) => ({
                url: `${APPOINTMENT_URL}/status`,
                method: 'PUT',    
                params: params
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        // update appointment service
        updateAppointmentService: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/service`,
                method: 'PUT',      
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        // update appointment schedule
        updateAppointmentSchedule: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/reschedule`,
                method: 'PUT', 
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        // update appointment arrival status with params id and status values : OnTime, Late, NoShow, Cancel
        updateAppointmentArrival: build.mutation({
            query: (params) => ({
                url: `${APPOINTMENT_URL}/arrival`,
                method: 'PUT',
                params: params
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        //  get appointment timetable with start and finish time
        getAppointmentTimetable: build.query({
            query: (arg) => ({
                url: `${APPOINTMENT_URL}/timetable`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.appointments]
        }), 

        // apis for test and future use only
        getAppointmentedPaymentInfo: build.query({
            query: (id) => ({
                url: `${APPOINTMENT_URL}/patient-payment-info/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorAppointments: build.query({
            query: (arg) => ({
                url: `${APPOINTMENT_URL}/doctor`,
                method: 'GET',
                params: arg
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorPatients: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/patients`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getPatientInvoices: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/invoices`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorInvoices: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/invoices`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        })
    })
})

export const { 
    useGetDoctorAppointmentsQuery,
    useGetPatientAppointmentsQuery,
    useGetDoctorPatientsQuery,
    useCreateAppointmentMutation,
    useGetSingleAppointmentQuery,
    useGetAppointmentedPaymentInfoQuery,
    useGetPatientInvoicesQuery,
    useGetDoctorInvoicesQuery,
    useUpdateAppointmentMutation,
    useUpdateAppointmentServiceMutation,
    useUpdateAppointmentScheduleMutation,
    useUpdateAppointmentStatusMutation,
    useUpdateAppointmentArrivalMutation,
    useGetAppointmentTimetableQuery
} = appointmentApi;