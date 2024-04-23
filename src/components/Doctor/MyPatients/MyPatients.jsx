import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetAllPatientsQuery, useDeletePatientMutation, useCreatePatientMutation, useUpdatePatientMutation, useSearchPatientQuery } from '../../../redux/api/patientApi';
import { Button, Table, InputGroup, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faChild, faDice, faPeace, faCamera, faAddressCard, faBacon, faBahai, faHeart, faFire, faHandHolding, faAddressBook, faCity, faBuilding, faCode, faAt, faMap, faFemale, faHeading, faUserTie, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { FaAddressBook, FaAddressCard, FaContao, FaUser,FaPhone, FaEnvelope, FaDice,FaChild, FaPeace,FaCamera, FaBahai, FaBacon, FaFire, FaNimblr} from 'react-icons/fa';

const MyPatients = () => {
    // search related
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(null);
    // Existing states and handlers...
    const { data, isLoading, isError, refetch } = useGetAllPatientsQuery();
    const [deletePatient] = useDeletePatientMutation();
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const searchPatient = useSearchPatientQuery(search);
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [emergencyContactName, setEmergencyContactName] = useState("");
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
    const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");
    const [familyDoctorName, setFamilyDoctorName] = useState("");
    const [familyDoctorPhone, setFamilyDoctorPhone] = useState("");


    // New states for patient detail modal and edit functionality
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // handle delete patient
    const handleDelete = async () => {
        try {
            await deletePatient(patientToDelete).unwrap();
            toast.success('Delete Patient Successful');
            setShowDetailModal(false);
            refetch();
        } catch (err) {
            toast.error('Failed to delete the patient');
            console.error('Failed to delete the patient: ', err);
        } finally {
            handleCloseDeleteModal();
            setShowDetailModal(false);
        }
    };

    const handleAddPatient = async () => {
        try {
            await createPatient({firstName, lastName, phone, email,gender,preferredName,occupation,
                emergencyContactName,emergencyContactPhone, emergencyContactRelationship,
                address,city,province,postal,country,familyDoctorName,familyDoctorPhone
            }).unwrap();
            handleClose();
            toast.success('Add Patient Successful');
            refetch();
        } catch(err) {
            console.error('Failed to add the patient: ', err);
        }
    };

    // New handlers for patient detail modal and edit functionality
    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        setShowDetailModal(true);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    // clear the add patient modal form
    const clearAddPatientForm = () => {
        setFirstname("");
        setLastname("");
        setPhone("");
        setEmail("");
        setGender("");
        setPreferredName("");
        setOccupation("");
        setEmergencyContactName("");
        setEmergencyContactRelationship("");
        setEmergencyContactPhone("");
        setAddress("");
        setCity("");
        setProvince("");
        setPostal("");
        setCountry("");
        setFamilyDoctorName("");
        setFamilyDoctorPhone("");
    };

    const handleSaveClick = async () => {
        try {
            await updatePatient(selectedPatient).unwrap();
            clearAddPatientForm();
            toast.success('Update Patient Successful');
            refetch();
        } catch(err) {
            toast.error('Failed to update the patient');
            console.error('Failed to update the patient: ', err);
        }
    
        // After saving, close the editing mode
        setIsEditing(false);
        //close the modal
        handleCloseDetailModal();
    };

    const handleCloseDetailModal = () => {
        setSelectedPatient(null);
        setShowDetailModal(false);
        setIsEditing(false);
    };

    const handleClose = () => {
        clearAddPatientForm();
        setShowModal(false);

    }
    const handleShow = () => setShowModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (id) => {
        setPatientToDelete(id);
        setShowDeleteModal(true);
    }

    // on successful search, rerender the patient list to the search result
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Set the search result to the patient list
            const result = await searchPatient.data;
            if (result && result.length > 0) {
                setSearchData(result);
            }else{
                toast.error('No patient found');
            }
        }
        catch(err) {
            console.error('Failed to search the patient: ', err);
        }
    };

    const dataList = searchData !== null? searchData : data;

    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button variant="secondary" className="addButton" onClick={handleShow}>ADD</Button>
                        {/* add a clear button that clear the search result and refetch all patient */}
                        <Button variant="secondary" className="addButton" onClick={() => {setSearchData(null); refetch()}}>CLEAR</Button>
                        <InputGroup className="mb-3 d-flex justify-content-center" style={{ marginLeft: "40px",marginRight:"100px" }}>
                            <Form.Control
                            placeholder="Please enter patient name or email to search"
                            aria-label="Please enter patient name or email to search"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            />
                            <Button 
                            variant="outline-secondary" 
                            id="button-addon2"
                            onClick={handleSearch}
                            >
                            Search
                            </Button>
                        </InputGroup>
                    </div>
                    <Modal show={showModal} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Patient</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPatientFirstName">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstname(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formPatientLastName">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastname(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPatientPhone">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                                                <Form.Control type="text" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formPatientEmail">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPreferredName">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faHeart} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter preferred name" value={preferredName} onChange={(e) => setPreferredName(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formOccupation">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faDice} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPatientGender">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faChild} /></InputGroup.Text>
                                            <Form.Select aria-label="Gender select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                <option value="">Select Gender</option>
                                                <option value="MALE">MALE</option>
                                                <option value="FEMALE">FEMALE</option>
                                                <option value="UNKNOWN">UNKNOWN</option>
                                            </Form.Select>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    {/* emergencyContactName */}
                                    <Col>
                                        <Form.Group controlId="formEmergencyContactName">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faFire} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter emergency contact name" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formEmergencyContactRelationship">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUserPlus} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter emergency contact relationship" value={emergencyContactRelationship} onChange={(e) => setEmergencyContactRelationship(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formEmergencyContactPhone">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter emergency contact phone" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPatientAddress">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faAddressBook} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formPatientCity">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faBuilding} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPatientProvince">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faCity} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter province" value={province} onChange={(e) => setProvince(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formPatientPostal">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faAt} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter postal" value={postal} onChange={(e) => setPostal(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formPatientCountry">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faMap} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formFamilyDoctorName">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUserTie} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter family doctor name" value={familyDoctorName} onChange={(e) => setFamilyDoctorName(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="formFamilyDoctorPhone">
                                            <InputGroup>
                                                <InputGroup.Text><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter family doctor phone" value={familyDoctorPhone} onChange={(e) => setFamilyDoctorPhone(e.target.value)}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleAddPatient}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    {/* confirm delete modal */}
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this patient?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleDelete}>
                                Confirm
                            </Button>
                            <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* use searchDate if its not null otherwise use data */}
                    {!isLoading && isError && <div>Loading...</div>}
                    {!isLoading && !isError && dataList?.length === 0 && <div>Empty</div>}
                    {!isLoading && !isError && dataList?.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Preferred Name</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>VisitStatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.map((item) => (
                                    <tr key={item.id} onClick={() => handlePatientClick(item)}>
                                        <td>{item.lastName}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.preferredName}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.visitStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {/* Edit Modal */}
                    <Modal show={showDetailModal} onHide={handleCloseDetailModal} dialogClassName="modal-lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Patient Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {isEditing ? (
                                            <Form>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>First Name</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaUser /></InputGroup.Text>
                                                                <Form.Control 
                                                                    type="text" 
                                                                    value={selectedPatient?.firstName} 
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, firstName: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Last Name</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaUser /></InputGroup.Text>
                                                                <Form.Control 
                                                                    type="text" 
                                                                    value={selectedPatient?.lastName} 
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Phone</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaPhone /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.phone}  
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Email</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="email"
                                                                    value={selectedPatient?.email}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {/* preferred name and gender */}
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Preferred Name</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaDice /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.preferredName}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, preferredName: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Gender</Form.Label>
                                                                <Form.Select
                                                                    value={selectedPatient?.gender}
                                                                    onChange={(e)=> setSelectedPatient({...selectedPatient, gender:e.target.value})}
                                                                    >
                                                                    <option value="">Select Gender</option>
                                                                    <option value="MALE">MALE</option>
                                                                    <option value="FEMALE">FEMALE</option>
                                                                    <option value="UNKNOWN">UNKNOWN</option>                       
                                                                    </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {/* address and city */}
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Address</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaAddressCard /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.address}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>City</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaAddressCard /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.city}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, city: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {/* province and postal */}
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Province/State</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaAddressCard /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.province}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, province: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Postal Code</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaAddressCard /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.postal}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, postal: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {/* country and family doctor name */}
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Country</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaBahai /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.country}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, country: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Family Doctor Name</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaBacon /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.familyDoctorName}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, familyDoctorName: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                        
                                                {/* emergency contact name and phone */}
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Emergency Contact Name</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaPeace /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.emergencyContactName}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, emergencyContactName: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Emergency Contact Phone</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaPhone /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.emergencyContactPhone}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, emergencyContactPhone: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {/* emergency contact relationship */}
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Emergency Contact Relationship</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text><FaCamera /></InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={selectedPatient?.emergencyContactRelationship}
                                                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, emergencyContactRelationship: e.target.value })}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Row>



                                                
                                            </Form>
                                                
                                                ) : (
                                                    // Render the patient info
                                                    <div>
                                                        <Card bg="light" className="mb-4">
                                                            <Card.Header as="h5">Patient Details</Card.Header>
                                                            <Card.Body>
                                                                <Card.Text>
                                                                    <strong>Patient ID:</strong> {selectedPatient?.id}
                                                                </Card.Text>
                                                                <Row className="mb-3">
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>First Name:</strong> {selectedPatient?.firstName}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Last Name:</strong> {selectedPatient?.lastName}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Phone:</strong> {selectedPatient?.phone}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Gender:</strong> {selectedPatient?.gender}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mb-3'>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Email:</strong> {selectedPatient?.email}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>VisitStatus:</strong> {selectedPatient?.visitStatus}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                        {/* patient address and emergency infos*/}
                                                        <Card bg="light" className="mb-3">
                                                            <Card.Header as="h5">Patient Address and Emergency Infos</Card.Header>
                                                            <Card.Body>
                                                                <Row className="mb-3">
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Address:</strong> {selectedPatient?.address}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>City:</strong> {selectedPatient?.city}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Province/State:</strong> {selectedPatient?.province}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Postal Code:</strong> {selectedPatient?.postal}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                            
                                                                <Row className="mb-3">
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Emergency Contact Name:</strong> {selectedPatient?.emergencyContactName}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Emergency Contact Phone:</strong> {selectedPatient?.emergencyContactPhone}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Card.Text>
                                                                            <strong>Emergency Contact Relationship:</strong> {selectedPatient?.emergencyContactRelationship}
                                                                </Card.Text>

                                                            </Card.Body>

                                                        </Card>

                                                        {/* family doctor and visit status */}
                                                        <Card bg="light" className="mb-4">
                                                            <Card.Header as="h5" className='mt-3'>Family Doctor and Visit Infos</Card.Header>
                                                            <Card.Body>
                                                                <Row className="mb-3">
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Family Doctor Name:</strong> {selectedPatient?.familyDoctorName}
                                                                        </Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>
                                                                            <strong>Family Doctor Phone:</strong> {selectedPatient?.familyDoctorPhone}
                                                                        </Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Card.Text>
                                                                    <strong>VisitStatus:</strong> {selectedPatient?.visitStatus}
                                                                </Card.Text>


                                                               
                                                            </Card.Body>
                                                        </Card>
                                                    </div>

                                                )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <div style={{display:'flex',justifyContent:'space-between', width:'100%'}}>
                                                {isEditing ? (
                                                    <Button variant="success" onClick={handleSaveClick}>Save</Button>
                                                ) : (
                                                    <>
                                                    <Button variant="primary" onClick={handleEditClick}>Edit</Button></>
                                                )}
                                                <Button variant="danger" onClick={() => handleShowDeleteModal(selectedPatient?.id)}>Delete</Button>
                                                </div>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            </DashboardLayout>
                        );
};

export default MyPatients;
