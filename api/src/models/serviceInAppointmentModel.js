// ServiceInAppointment Schema
const serviceInAppointmentSchema = new Schema({
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    serviceTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceType',
        required: true
    },
    visitChart: String
});

// Exporting the ServiceInAppointment model
module.exports = mongoose.model('ServiceInAppointment', serviceInAppointmentSchema);
