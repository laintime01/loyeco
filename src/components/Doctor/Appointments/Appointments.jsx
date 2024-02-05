import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Modal, Input, Button } from 'antd';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Appointments = () => {
    const [visible, setVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [appointmentData, setAppointmentData] = useState({
        patient: "",
        appointmentContent: "",
        note: ""
    });

    const events = [
        {
            id: 1,
            start: new Date(2024, 2, 5, 9, 0, 0),
            end: new Date(2024, 2, 5, 10, 0, 0),
            title: 'Appointment for Mr. X'
        },
        {
            id: 2,
            start: new Date(2024, 2, 6, 11, 0, 0),
            end: new Date(2024, 2, 6, 12, 0, 0),
            title: 'Appointment for Mrs. Y'
        },
        {
            id: 3,
            start: new Date(2024, 1, 7, 14, 0, 0),
            end: new Date(2024, 1, 7, 15, 0, 0),
            title: 'Appointment for Mr. Z'
        },
        {
            id: 4,
            start: new Date(2024, 1, 8, 16, 0, 0),
            end: new Date(2024, 1, 8, 17, 0, 0),
            title: 'Appointment for Ms. A'
        },
        {
            id: 5,
            start: new Date(2024, 1, 9, 10, 0, 0),
            end: new Date(2024, 1, 9, 12, 0, 0),
            title: 'Appointment for Mr. B'
        },
    ];
    

    const handleSelect = ({ start, end }) => {
        setSelectedEvent({ start, end });
        setVisible(true);
    }

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleInputChange = e => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <DashboardLayout>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={events}
                style={{ height: "80vh" }}
                onSelectEvent={event => handleSelect(event)}
            />

            <Modal title="Book an Appointment" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    <strong>Day:</strong> {moment(selectedEvent.start).format('YYYY-MM-DD')}
                </p>
                <p>
                    <strong>Time:</strong> {`${moment(selectedEvent.start).format('HH:mm')} - ${moment(selectedEvent.end).format('HH:mm')}`}
                </p>
                <Input
                    addonBefore="Patient"
                    name="patient"
                    value={appointmentData.patient}
                    onChange={handleInputChange}
                />
                <Input
                    addonBefore="Appointment Content"
                    name="appointmentContent"
                    value={appointmentData.appointmentContent}
                    onChange={handleInputChange}
                />
                <Input.TextArea
                    placeholder="Note"
                    name="note"
                    value={appointmentData.note}
                    onChange={handleInputChange}
                    rows={4}
                />
            </Modal>
        </DashboardLayout>
    )
}

export default Appointments;
