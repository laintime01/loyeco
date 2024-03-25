import React, { useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Modal, Input, Select, Collapse} from 'antd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaUserInjured, FaUser, FaTools, FaBroadcastTower, FaNutritionix, FaDatabase, FaTimesCircle, FaUserTimes, FaExpand, FaNotesMedical } from 'react-icons/fa';
import {useCreatePatientMutation, useGetAllPatientsQuery} from '../../../redux/api/patientApi';
import { useGetAllServicesQuery ,useCreateServiceMutation} from '../../../redux/api/serviceApi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import toast from 'react-hot-toast';

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

    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    const { Option } = Select;
    const { Panel } = Collapse;

    const [createPatient] = useCreatePatientMutation();

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

    const serviceOptions = useGetAllServicesQuery().data?.map(service => service.name) || [];
    const [createService] = useCreateServiceMutation();

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

        const handleAddPatient = async(e) => {
            e.preventDefault();
            try {
                await createPatient(user);
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
                                            <Form.Control type="text" placeholder='Enter phone number' name="phone" value={user.phone} onChange={handleInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col style={{ marginRight: "5px" }} xs={8}>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" placeholder='Enter Address' value={user.address} onChange={handleInputChange} />
                                        </Col>
                                        <Col>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" placeholder='Enter City' name="city" value={user.city} onChange={handleInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col style={{ marginRight: "5px" }}>
                                            <Form.Label>Province</Form.Label>
                                            <Form.Control type="text" name="province" placeholder='Enter Province' value={user.province} onChange={handleInputChange} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control type="text" name="country" placeholder='Enter Country' value={user.country} onChange={handleInputChange} />
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
            start: new Date(2024, 2, 28, 9, 0, 0),
            end: new Date(2024, 2, 28, 11, 0, 0),
            title: 'Appointment for Mr Yock Zhang',
            content: 'meeting with Mr Yock Zhang for his regular checkup.',
            service: '泰式按摩-60mins',
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
            start: new Date(2024, 2, 28, 11, 0, 0),
            end: new Date(2024, 2, 28, 14, 0, 0),
            title: 'Appointment for Yu Guan',
            content: 'meeting with Yu Guan for her checkup.',
            service: '物理按摩-30mins',
            clinicName: 'yaya clinic',
            note: 'Please remind her to bring her medical report.',
            patientEmail: 'york@hotmail.com',
            patientPhone: '123-456-7890',
            clinicAddress: '1234, 5th Avenue, New York, NY 10001',
            historyDate: '2022-03-08',

        }
    ]);

    const handleSelectSlot = slotInfo => {
        const start = moment(slotInfo.start);
        const end = moment(slotInfo.end);

        setStartDate(start.format('YYYY-MM-DD'));
        setStartTime(start.format('HH:mm'));
        setEndTime(end.format('HH:mm'));

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

    const [showAddService, setShowAddService] = useState(false);

    // handle on click of add new patient button
    const handleAddPatient = () => {
        setShowAddPatientModal(true);
    }

    const handleAddService = () => {
        setShowAddService(true);
    }

    const [service, setService] = useState({
        name: '',
        duration: '',
        rate: '',
        taxRate: '',
        active: true
    });

    const handleCancelServiceModal = () => {
        setShowAddService(false);
    };

    const handleServiceOk = async (e) => {
        e.preventDefault();
        try {
            await createService(service);
            toast.success('Service added successfully');
            setShowAddService(false);
        }
        catch (error) {
            toast.error('Failed to add service');
        }
    };

    const handleServiceInputChange = (e) => {
            const { name, value } = e.target;
            setService({ ...service, [name]: value });
        };

    const [showEditReminderModal, setShowEditReminderModal] = useState(false);
    const [showEditDateTimeModal, setShowEditDateTimeModal] = useState(false);
    const [reminder, setReminder] = useState(selectedEvent.note);
    const [day, setDay] = useState(selectedEvent.start && moment(selectedEvent.start).format('YYYY-MM-DD'));
    const [timeStart, setTimeStart] = useState(selectedEvent.start && moment(selectedEvent.start).format('HH:mm'));
    const [timeEnd, setTimeEnd] = useState(selectedEvent.end && moment(selectedEvent.end).format('HH:mm'));

    const handleEditReminder = () => {
        // Update the reminder
        setSelectedEvent({ ...selectedEvent, note: reminder });
        setShowEditReminderModal(false);
        toast.success('Reminder updated successfully');
    }
    const handleEditDateTime = () => {
        // Update the reminder
        setSelectedEvent({ ...selectedEvent, start: new Date(day + 'T' + timeStart), end: new Date(day + 'T' + timeEnd) });
        setShowEditDateTimeModal(false);
        toast.success('Date and Time updated successfully');
    }

    const [selectedAction, setSelectedAction] = useState('');

    const handleRadioChange = (e) => {
        setSelectedAction(e.target.value);
    };

    const handleConfirm = () => {
        if (selectedAction) {
            toast.success('Action confirmed');
            // Add your logic here to handle the selected action
        } else {
            toast.error('Please select an action');
        }
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
                min={minTime} // Set the min time
                max={maxTime} // Set the max time
                timeslots={4} // Divide hour into 4 slots of 15 minutes each
            />

            {/*  编辑 Reminder 的模态框 */}
            

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
                        <Button onClick={() => setShowEditReminderModal(true)} variant="light" style={{border:"1px solid", marginRight:"5px"}}>Edit</Button>
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
                        <Button onClick={handleAddService} variant="light" style={{border:"1px solid", marginRight:"5px"}}>Add +</Button>
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
                        <Button onClick={() => setShowEditDateTimeModal(true)} variant="light" style={{border:"1px solid", marginRight:"5px"}}>Edit</Button>
                    </Col>
                </Row>

                <h5>Actions</h5>
                <hr />
                {/* Action includes Arrive,Late, Reschedule, NoShow and Cancel. all buttons*/}
                <Row className='mb-3'>
                    <Form as={Row}>
                        <Col className='d-flex  mr-3' xs={10}>
                            <Form.Check
                                type="radio"
                                label="Arrive"
                                value="Arrive"
                                checked={selectedAction === 'Arrive'}
                                onChange={handleRadioChange}
                                className='me-3'
                            />
                            <Form.Check
                                type="radio"
                                label="Late"
                                value="Late"
                                checked={selectedAction === 'Late'}
                                onChange={handleRadioChange}
                                className='me-3'
                            />
                            <Form.Check
                                type="radio"
                                label="Reschedule"
                                value="Reschedule"
                                checked={selectedAction === 'Reschedule'}
                                onChange={handleRadioChange}
                                className='me-3'
                            />
                            <Form.Check
                                type="radio"
                                label="No Show"
                                value="No Show"
                                checked={selectedAction === 'No Show'}
                                onChange={handleRadioChange}
                                className='me-3'
                            />
                            <Form.Check
                                type="radio"
                                label="Cancel"
                                value="Cancel"
                                checked={selectedAction === 'Cancel'}
                                onChange={handleRadioChange}
                                className='me-3'
                            />
                        </Col>
                        <Col  xs={2} >
                            <Button variant="light" onClick={handleConfirm} style={{border:"1px solid", marginLeft:"20px"}}>Confirm</Button>
                        </Col>
                    </Form>
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
                            <Option value="">Select Service</Option>
                            {serviceOptions.map((service) => (
                                <Option key={service} value={service.toLowerCase().replace(/\s+/g, '')}>
                                    {service}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    {/* add service plain button  */}
                    <Col>
                        <Button onClick={handleAddService} variant="light" style={{marginTop: '30px',marginLeft:'10px'}}>Add Service +</Button>
                    </Col>
                </Row>
                
            </Modal>

            {/* add service modal*/}
            <Modal title="Add New Service" open={showAddService} onHide={() => setShowAddService(false)} onOk={handleServiceOk} onCancel={handleCancelServiceModal} destroyOnClose={true}>
                <Form>
                    <Row className='mb-3'>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter service name" name="name" value={service.name} onChange={handleServiceInputChange} />
                        </Col>
                        <Col>
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control type="number" placeholder="Enter duration" name="duration" value={service.duration} onChange={handleServiceInputChange} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Form.Label>Rate</Form.Label>
                            <Form.Control type="number" placeholder="Enter rate" name="rate" value={service.rate} onChange={handleServiceInputChange} />
                        </Col>
                        <Col>
                            <Form.Label>Tax Rate (%)</Form.Label>
                            <Form.Control type="number" placeholder="Enter tax rate" name="taxRate" value={service.taxRate} onChange={handleServiceInputChange} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Form.Check 
                                type="checkbox" 
                                label="Active" 
                                name="active" 
                                checked={service.active} 
                                onChange={(e) => setService({ ...service, active: e.target.checked })} 
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal>
            {/* Edit reminder modal */}
            <Modal title="Edit Reminder" open={showEditReminderModal} onHide={() => setShowEditReminderModal(false)} onOk={handleEditReminder} onCancel={()=>setShowEditReminderModal(false)} destroyOnClose={true}>
                <Form>
                    <Row className='mb-3'>
                            <Form.Control type="text" placeholder="Enter service name" name="name" value="Please remind him to bring his medical report." onChange={handleServiceInputChange} />            
                    </Row>
                </Form>
             </Modal>
             {/* Edit date and time modal using Datapicker and timePicker */}
                <Modal title="Edit Date and Time" open={showEditDateTimeModal} onHide={() => setShowEditDateTimeModal(false)} onOk={handleEditDateTime} onCancel={()=>setShowEditDateTimeModal(false)} destroyOnClose={true}>
                    <Form>
                        <Row className='mb-3'>
                            <Col className='mr-3'>
                                <Form.Label> <FaDatabase/> Date</Form.Label>
                                <Form.Control type="date" value={day} onChange={(e) => setDay(e.target.value)} />
                            </Col> 
                        </Row>
                        <Row className='mb-3 no-gutters'>
                            <Col xs={5} >
                                <Form.Label><FaUserTimes/> Start Time</Form.Label>
                                <Form.Control type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
                            </Col>
                            {/* add Col xs=2 */}
                            <Col xs={2}>
                            </Col>
                            <Col xs={5}>
                                <Form.Label><FaExpand/> End Time</Form.Label>
                                <Form.Control type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
                            </Col>
                        </Row>
                    </Form>
                </Modal>


        </DashboardLayout>
    )
}

export default Appointments;
