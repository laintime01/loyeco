import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Modal, Input, Row, Select} from 'antd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

function AddPatientModal({ show, handleClose }) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name *</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
  
              <Form.Group as={Col}>
                <Form.Label>Last Name *</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Form.Row>
  
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
  
              <Form.Group as={Col}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Row>
                  <Col><Form.Control as="select">{/* Options for Year */}</Form.Control></Col>
                  <Col><Form.Control as="select">{/* Options for Month */}</Form.Control></Col>
                  <Col><Form.Control as="select">{/* Options for Day */}</Form.Control></Col>
                </Form.Row>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const Appointments = () => {
    const [visible, setVisible] = useState(false);
    const [newEventModalVisible, setNewEventModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedSlot, setSelectedSlot] = useState({});
    const [appointmentData, setAppointmentData] = useState({appointmentContent: ''});

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [endDate, setEndDate] = useState(new Date());
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    const { Option } = Select;


    // fake service data
    const serviceOptions = [
        "Initial Appointment-60mins",
        "Follow-up Appointment-30mins",
        "Follow-up Appointment-60mins",
      ];
      

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
        },
        {
            id: 4,
            start: new Date(2024, 2, 13, 15, 0, 0),
            end: new Date(2024, 2, 13, 17, 0, 0),
            title: 'Appointment for Mrs. Wang',
            content: 'meeting with Wang for cancer regular checkup.'
        },
        {
            id: 5,
            start: new Date(2024, 2, 19, 9, 0, 0),
            end: new Date(2024, 2, 19, 10, 0, 0),
            title: 'Appointment for Mr. Wong',
            content: 'meeting with Mr. X for his regular checkup.'
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

    const handleSelectChange = (value) => {
        setAppointmentData(prevState => ({
            ...prevState,
            appointmentContent: value
        }));
    }

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
                {/* patient name input and addd new patient button */}
                <Row className='mb-3 mt-4'>
                    <Col style={{ marginRight: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '20px' }}>
                                <p style={{ marginBottom: '7px' }}>Patient</p>
                                <Input
                                    name="patient"
                                    value={appointmentData.patient}
                                    onChange={handleInputChange}
                                    placeholder='Existing Patient...'
                                />
                            </div>
                            <Button variant="link" onClick={() => setShowAddPatientModal(true)}>Add New Patient +</Button>
                        </div>
                    </Col>
                </Row>


                {/* select service using antd selec*/}
                <Row className='mb-3 mt-4'>
                    <Col>
                        <p style={{ marginBottom: '7px' }}>Service</p>
                        <Select 
                            style={{ width: 300 }} 
                            onChange={handleSelectChange} 
                            name="appointmentContent" 
                            value={appointmentData.appointmentContent || ''}  // Here
                        >
                            <Option value="">Initial Appointment-30mins</Option>
                            {serviceOptions.map((service) => (
                                <Option key={service} value={service.toLowerCase().replace(/\s+/g, '')}>
                                    {service}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                {/* Date and time in same row */}
                <Row className='mb-3'>
                    <Col className='mr-3'>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Col> 
                </Row>
                <Row className='mb-3 no-gutters'>
                    <Col xs={5} >
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </Col>
                    {/* add Col xs=2 */}
                    <Col xs={2}>
                    </Col>
                    <Col xs={5}>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </Col>
                </Row>

                
                {/* Note */}
                <Row>
                    <Col>
                        <p style={{ marginBottom: '7px' }}>Note</p>
                        <Input.TextArea
                            placeholder="Note"
                            name="note"
                            value={appointmentData.note}
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </Col>
                </Row>
                
            </Modal>
        </DashboardLayout>
    )
}

export default Appointments;
