// ServiceType Schema
const serviceTypeSchema = new Schema({
    clinicId: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    editable: {
        type: Boolean,
        default: false
    },
    length: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    taxRate: Number,
    visitChartTemplateType: {
        type: String,
        enum: ['NoTemplate', 'SystemVisitChartTemplate', 'CustomVisitChartTemplate'],
        default: 'NoTemplate'
    },
    visitChartTemplateId: {
        type: Schema.Types.ObjectId,
        ref: 'VisitChartTemplate'
    }
});

// Exporting the ServiceType model
module.exports = mongoose.model('ServiceType', serviceTypeSchema);
