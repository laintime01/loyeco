import React, { useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Modal, Input, Row, Select, Collapse} from 'antd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);


const Appointments = () => {
    const [visible, setVisible] = useState(false);
    const [newEventModalVisible, setNewEventModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedSlot, setSelectedSlot] = useState({});
    const [appointmentData, setAppointmentData] = useState({appointmentContent: ''});

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');

    const [endDate, setEndDate] = useState(new Date());
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    const { Option } = Select;
    const { Panel } = Collapse;



    // fake service data
    const serviceOptions = [
        "Initial Appointment-60mins",
        "Follow-up Appointment-30mins",
        "Follow-up Appointment-60mins",
      ];

    // gender options
    const genderOptions = [
        "Male",
        "Female",
        "Other"
    ];

    // Add Patient Modal
    const AddPatientModal = ({ visible, handleClose }) => {
        const monthOptions = Array.from({length: 12}, (_, i) => i + 1);
        const dayOptions = Array.from({length: 31}, (_, i) => i + 1);
        const yearOptions = Array.from({length: 121}, (_, i) => 1900 + i).reverse();
        
        return (
            <Modal title="Add New Patient" open={visible} onCancel={handleClose}>
            <Form layout="vertical">
                {/* name */}
                <Row className='mb-3'>
                    <Col style={{marginRight:"5px"}}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstname} onChange={(e) => setStartDate(e.target.value)} />
                    </Col> 
                    <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastname} onChange={(e) => setStartDate(e.target.value)} />
                    </Col>
                </Row>

                {/*email input and data of birth select  */}
                <Row className='mb-3'>
                    <Col style={{marginRight:"5px"}}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setStartDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Label>Date of Birth</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control as="select" value={month} onChange={(e) => setStartDate(e.target.value)}>
                                    <option value="">Month</option>
                                    {monthOptions.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control as="select" value={day} onChange={(e) => setStartDate(e.target.value)}>
                                    <option value="">Day</option>
                                    {dayOptions.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control as="select" value={year} onChange={(e) => setStartDate(e.target.value)}>
                                    <option value="">Year</option>
                                    {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
                {/* a show more button that will expand the modal when click */}
                <Row className='mb-3'>
                    <Col>
                        <Collapse>
                        <Panel header="Show More" key="1">
                            {/* gender select and phone input on same Row*/}
                            <Row className='mb-3'>
                                <Col style={{marginRight:"3px"}}>
                                <Form.Group controlId="formPatientGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select aria-label="Gender select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>

                            {/* address and city */}
                            <Row className='mb-3'>
                                <Col style={{marginRight:"5px"}} xs={8}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                                <Col xs={3}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                            {/* postal, province and country on same row margin 5px */}
                            <Row className='mb-3'>
                                <Col style={{marginRight:"5px"}}>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                                <Col style={{marginRight:"5px"}}>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                                <Col>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                        </Panel>
                        </Collapse>
                    </Col>
                </Row>
                
            </Form>
            </Modal>
        );
        };
      

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

    // handle on click of add new patient button
    const handleAddPatient = () => {
        setShowAddPatientModal(true);
        console.log('Add New Patient Button Clicked');
    }

    // Log the showAddPatientModal value
    useEffect(() => {
        console.log('showAddPatientModal Value:', showAddPatientModal);
    }, [showAddPatientModal]);


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
            <Modal title="Appointment Details" open={visible} onCancel={handleCancel}>
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
            <Modal title="Book an Appointment" open={newEventModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                            <Button variant="link" onClick={handleAddPatient} >Add New Patient +</Button>
                            <AddPatientModal visible={showAddPatientModal} handleClose={() => setShowAddPatientModal(false)} />

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
