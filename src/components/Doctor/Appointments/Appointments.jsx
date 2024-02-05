import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Modal, Input } from 'antd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

const Appointments = () => {
    const [visible, setVisible] = useState(false);
    const [newEventModalVisible, setNewEventModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedSlot, setSelectedSlot] = useState({});
    const [appointmentData, setAppointmentData] = useState({
        patient: "",
        appointmentContent: "",
        note: ""
    });

    const [events, setEvents] = useState([
        {
            id: 1,
            start: new Date(2024, 2, 5, 9, 0, 0),
            end: new Date(2024, 2, 5, 10, 0, 0),
            title: 'Appointment for Mr. X',
            content: 'meeting with Mr. X for his regular checkup.'
        },
        {
            id: 2,
            start: new Date(2024, 1, 6, 11, 0, 0),
            end: new Date(2024, 1, 6, 13, 0, 0),
            title: 'Appointment for Mr. Zhou',
            content: 'meeting with Miss Zhou for her checkup.'
        },
        // more mock events
        {
            id: 3,
            start: new Date(2024, 1, 11, 13, 0, 0),
            end: new Date(2024, 1, 11, 15, 0, 0),
            title: 'Appointment for Mrs. Wang',
            content: 'meeting with Wang for cancer regular checkup.'
        }
    ]);

    const handleSelectSlot = slotInfo => {
        setSelectedSlot(slotInfo);
        setNewEventModalVisible(true);
    }

    const handleSelectEvent = event => {
        setSelectedEvent(event);
        setVisible(true);
    }

    const handleOk = () => {
        if (!selectedSlot.start) return;
        const newEvent = {
            id: events.length + 1,
            title: `Appointment for ${appointmentData.patient}`,
            start: selectedSlot.start,
            end: selectedSlot.end,
            content: appointmentData.appointmentContent,
            note: appointmentData.note,
            allDay: false
        };
        setEvents([...events, newEvent]);
        setAppointmentData({
            patient: "",
            appointmentContent: "",
            content: appointmentData.appointmentContent,
            note: ""
        });
        setNewEventModalVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
        setNewEventModalVisible(false);
    };

    const handleInputChange = e => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        });
    };

    // Drag and Resize Event Handlers
    const onEventDrop = ({ event, start, end }) => {
        const idx = events.indexOf(event);
        let updatedEvent = { ...event, start, end };

        let nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        setEvents(nextEvents);
    };

    const onEventResize = ({ event, start, end }) => {
        const idx = events.indexOf(event);
        let updatedEvent = { ...event, start, end };

        let nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        setEvents(nextEvents);
    };

    return (
        <DashboardLayout>
             <DraggableCalendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={events}
                style={{ height: "80vh" }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable={true}
                selectable={true}
            />

            {/* Event Detail Modal */}
            <Modal title="Appointment Details" visible={visible} onCancel={handleCancel}>
                <p>
                    <strong>Day:</strong> {selectedEvent.start && moment(selectedEvent.start).format('YYYY-MM-DD')}
                </p>
                <p>
                    <strong>Time:</strong> {selectedEvent.start && `${moment(selectedEvent.start).format('HH:mm')} - ${moment(selectedEvent.end).format('HH:mm')}`}
                </p>
                <p>
                    <strong>Patient:</strong> {selectedEvent.title?.split('for ')[1]}                
                </p>
                <p>
                    <strong>Appointment Content:</strong> {selectedEvent.content}
                </p>
                <p>
                    <strong>Note:</strong> {selectedEvent.note}
                </p>
            </Modal>

            {/* New Evenet Modal */}
            <Modal title="Book an Appointment" visible={newEventModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    <strong>Day:</strong> {selectedSlot.start && moment(selectedSlot.start).format('YYYY-MM-DD')}
                </p>
                <p>
                    <strong>Time:</strong> {selectedSlot.start && `${moment(selectedSlot.start).format('HH:mm')} - ${moment(selectedSlot.end).format('HH:mm')}`}
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
