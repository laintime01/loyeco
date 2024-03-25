import React, { useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Modal, Input, Row, Select, Collapse} from 'antd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { FaEnvelope, FaPhone, FaUserInjured, FaUser, FaTools, FaBroadcastTower, FaNutritionix, FaDatabase, FaTimesCircle, FaUserTimes, FaExpand, FaNotesMedical } from 'react-icons/fa';
import {useCreatePatientMutation, useGetAllPatientsQuery} from '../../../redux/api/patientApi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import toast from 'react-hot-toast';
import { set } from 'react-hook-form';

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

// min time and max time for the calendar
const minTime = new Date();
minTime.setHours(9, 0, 0);
const maxTime = new Date();
maxTime.setHours(22, 0, 0);

// custom time gutter for the calendar




const Appointments = () => {
    const [visible, setVisible] = useState(false);
    const [newEventModalVisible, setNewEventModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedSlot, setSelectedSlot] = useState({});
    const [appointmentData, setAppointmentData] = useState({
        patient: '',
        note: '',
        appointmentContent: ''
    });
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [endDate, setEndDate] = useState(new Date());
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    const { Option } = Select;
    const { Panel } = Collapse;

    const [createPatient] = useCreatePatientMutation();

    const [patientName, setPatientName] = useState('');
    const [patientOptions, setPatientOptions] = useState([]);
    const { data: patients } = useGetAllPatientsQuery();

    useEffect(() => {
        if (patients) {
            setPatientOptions(patients.map(patient => ({
                label: patient.firstName + ' ' + patient.lastName,
                value: patient.patientId
            })));
        }
    }, [patients]);
    
    const handleSelectNameChange = (event) => {
        const value = event.target.value;
        console.log(value);
        setAppointmentData({ ...appointmentData, patient: value });
    };

    

    // fake service data
    const serviceOptions = [
        "Initial Appointment-60mins",
        "Follow-up Appointment-30mins",
        "Follow-up Appointment-60mins",
      ];

    const AddPatientModal = ({ visible, handleClose }) => {
        const [user, setUser] = useState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            address: '',
            city: '',
            province: '',
            country: ''
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value });
        };

        const handleReset = () => {
            setUser({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                Address:'',
                City:'',
                Province:'',
                Country:''
            });
        };

        const handleAddModalClose = () => {
            handleReset();
            setShowAddPatientModal(false);
        };

        const handleAddPatient = (e) => {
            e.preventDefault();
            try {
                createPatient(user);
                toast.success('Patient added successfully');
                handleAddModalClose();
            }catch (error) {
                toast.error('Failed to add patient');
            }
        };

        return (
            <Modal title="Add New Patient" open={visible} onCancel={handleClose} onOk={handleAddPatient} destroyOnClose={true}>  
                <Form layout="vertical">
                    <Row className='mb-3'>
                        <Col style={{ marginRight: "5px" }}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" name="firstName" value={user.firstName} onChange={handleInputChange} />
                        </Col> 
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" name="lastName" value={user.lastName} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col style={{ marginRight: "5px" }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleInputChange} />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Collapse>
                                <Panel header="Show More" key="1">
                                    <Row className='mb-3'>
                                        <Col style={{ marginRight: "3px" }}>
                                            <Form.Group controlId="formPatientGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select aria-label="Gender select" name="gender" value={user.gender} onChange={handleInputChange}>
                                                    <option value="">Select Gender</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="UNKNOWN">UNKNOWN</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="text" name="phone" value={user.phone} onChange={handleInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col style={{ marginRight: "5px" }} xs={8}>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" value={user.address} onChange={handleInputChange} />
                                        </Col>
                                        <Col>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" name="city" value={user.city} onChange={handleInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col style={{ marginRight: "5px" }}>
                                            <Form.Label>Province</Form.Label>
                                            <Form.Control type="text" name="province" value={user.province} onChange={handleInputChange} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control type="text" name="country" value={user.country} onChange={handleInputChange} />
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
            patient: 'John Doe',    
            start: new Date(2024, 2, 8, 9, 0, 0),
            end: new Date(2024, 2, 8, 11, 0, 0),
            title: 'Appointment for Mr Yock Zhang',
            content: 'meeting with Mr Yock Zhang for his regular checkup.',
            service: 'Initial Appointment-60mins',
            clinicName: 'york clinic',
            note: 'Please remind him to bring his medical report.',
            patientEmail: 'John@gmail.com',
            patientPhone: '123-456-7890',
            clinicAddress: '1234, 5th Avenue, New York, NY 10001',
            historyDate: '2023-03-08',   
        },
        {
            id: 2,
            patient: 'Yu Guan',
            start: new Date(2024, 2, 9, 11, 0, 0),
            end: new Date(2024, 2, 9, 14, 0, 0),
            title: 'Appointment for Yu Guan',
            content: 'meeting with Yu Guan for her checkup.',
            service: 'Follow-up Appointment-30mins',
            clinicName: 'yaya clinic',
            note: 'Please remind her to bring her medical report.',
            patientEmail: 'york@hotmail.com',
            patientPhone: '123-456-7890',
            clinicAddress: '1234, 5th Avenue, New York, NY 10001',
            historyDate: '2022-03-08',

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
    }

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
                min={minTime} // Set the min time
                max={maxTime} // Set the max time
                timeslots={4} // Divide hour into 4 slots of 15 minutes each
            />

            {/* Event Detail Modal */}
            <Modal title="Appointment Details" open={visible} onCancel={handleCancel} width={800}>
                {/* draw a line to seprate */}
                <h5>Patient Info</h5>
                <hr />
                {/* patient*/}
                <Row className='mb-3'>
                    <p>
                        <strong><FaUserInjured/> Patient:</strong> {selectedEvent.title?.split('for ')[1]}                
                    </p>
                </Row>
                {/* patient email and phone on same row margin 5px*/}
                <Row className='mb-3'>
                    <Col>
                        <p>
                            <strong><FaEnvelope/> Email:</strong> {selectedEvent.patientEmail}
                        </p>
                    </Col>
                    <Col>
                        <p>
                            <strong><FaPhone/> Phone:</strong> {selectedEvent.patientPhone}
                        </p>
                    </Col>
                </Row>
                {/* reminder with in textarea with a edit icon on the right side*/}
                <Row className='mb-3'>
                    <Col>
                        <p>
                            <strong><FaNotesMedical/> Reminder:</strong> {selectedEvent.note}
                        </p>
                    </Col>
                    <Col xs={2} className="offset-4">
                        <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Edit</Button>
                    </Col>
                </Row>
                {/* draw a line to seprate */}
                <h5>Appointment Info</h5>
                <hr />
                {/* service with add service button on the right*/}
                <Row className='mt-3 mb-3'>
                    <Col>
                    <p>
                        <strong><FaTools/> Service:</strong> {selectedEvent.service}
                    </p>
                    </Col>
                    <Col xs={2} className="offset-4">
                        <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Add +</Button>
                    </Col>
                </Row>
                
                {/* date and time on same row edit button on the right*/}
                <Row className='mb-3'>
                    <Col>
                        <p>
                            <strong>Day:</strong> {selectedEvent.start && moment(selectedEvent.start).format('YYYY-MM-DD')}
                        </p>
                    </Col>
                    <Col>
                        <p>
                            <strong>Time:</strong> {selectedEvent.start && `${moment(selectedEvent.start).format('HH:mm')} - ${moment(selectedEvent.end).format('HH:mm')}`}
                        </p>
                    </Col>
                    <Col xs={2} className="offset-4">
                        <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Edit</Button>
                    </Col>
                </Row>

                <h5>Actions</h5>
                <hr />
                {/* Action includes Arrive,Late, Reschedule, NoShow and Cancel. all buttons*/}
                <Row className='mb-3'>
                    <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Arrive</Button>  
                    <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Late</Button>
                    <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Reschedule</Button>
                    <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>No Show</Button>
                    <Button variant="light" style={{border:"1px solid", marginRight:"5px"}}>Cancel</Button>
                </Row>
                
                <h5>History</h5>
                <hr />
                {/* patient history with time, service and arrive status*/}
                <Row className='mb-3'>
                    {/* history date and time */}
                    <Col>
                        <p>
                            {selectedEvent.historyDate || 'Not Available'}
                        </p>
                    </Col>
                    {/* service */}
                    <Col>
                        <p>
                            {selectedEvent.service || 'Not Available'}
                        </p>
                    </Col>
                    {/* arrive status */}
                    <Col>
                        <p>
                            Arrive OnTime
                        </p>
                    </Col>

                </Row>
            </Modal>

            {/* New Evenet Modal */}
            <Modal title="Book an Appointment" open={newEventModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {/* patient name input and addd new patient button */}
                <Row className='mb-3 mt-4'>
                    <Col>
                        <Row>
                            <Col span={8}>
                                <p style={{ marginBottom: '7px' }}><FaUserInjured/> Patient</p>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        list="patient-list"
                                        value={appointmentData.patient}
                                        onChange={(e) => setAppointmentData({ ...appointmentData, patient: e.target.value })}
                                        placeholder="Existing Patient..."
                                    />
                                    <datalist id="patient-list">
                                        {patientOptions.map((option, index) => (
                                            <option key={index} value={option.label} />
                                        ))}
                                    </datalist>
                                </Form.Group>
                            </Col>
                            <Col span={4}>
                                <Button variant="light" style={{marginTop:'30px', marginLeft:'10px'}} onClick={handleAddPatient}>Add New Patient +</Button>
                                <AddPatientModal visible={showAddPatientModal} handleClose={() => setShowAddPatientModal(false)} />
                            </Col>
                        </Row>
                    </Col>
                </Row>


                {/* Date and time in same row */}
                <Row className='mb-3'>
                    <Col className='mr-3'>
                        <Form.Label> <FaDatabase/> Date</Form.Label>
                        <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Col> 
                </Row>
                <Row className='mb-3 no-gutters'>
                    <Col xs={5} >
                        <Form.Label><FaUserTimes/> Start Time</Form.Label>
                        <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </Col>
                    {/* add Col xs=2 */}
                    <Col xs={2}>
                    </Col>
                    <Col xs={5}>
                        <Form.Label><FaExpand/> End Time</Form.Label>
                        <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </Col>
                </Row>

                
                {/* Reminder */}
                <Row>
                    <Col>
                        <p style={{ marginBottom: '7px' }}><FaNotesMedical/> Reminder</p>
                        <Input.TextArea
                            placeholder="Note"
                            name="note"
                            value={appointmentData.note}
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </Col>
                </Row>

                {/* select service using antd select*/}
                <Row className='mb-3 mt-4'>
                    <Col>
                        <p style={{ marginBottom: '7px' }}><FaNutritionix/> Service</p>
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
                    {/* add service plain button  */}
                    <Col>
                        <Button variant="light" style={{marginTop: '30px',marginLeft:'10px'}}>Add Service +</Button>
                    </Col>
                </Row>
                
            </Modal>
        </DashboardLayout>
    )
}

export default Appointments;
