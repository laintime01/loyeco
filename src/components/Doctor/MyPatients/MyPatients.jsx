import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetAllPatientsQuery, useDeletePatientMutation, useCreatePatientMutation, useUpdatePatientMutation } from '../../../redux/api/patientApi';
import { Button, Table, InputGroup, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import './style.css';

const MyPatients = () => {
    // Existing states and handlers...
    const { data, isLoading, isError, refetch } = useGetAllPatientsQuery();
    const [deletePatient] = useDeletePatientMutation();
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [userId, setUserId] = useState("65b5cf279c1df765cee613af");

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
            await createPatient({firstname, lastname, phone, gender,userId}).unwrap();
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

    const handleSaveClick = async () => {
        try {
            await updatePatient({id: selectedPatient._id, data: selectedPatient}).unwrap();
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

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (id) => {
        setPatientToDelete(id);
        setShowDeleteModal(true);
    }

    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button variant="secondary" className="addButton" onClick={handleShow}>ADD</Button>
                        <InputGroup className="mb-3 d-flex justify-content-center" style={{ marginLeft: "40px",marginRight:"100px" }}>
                            <Form.Control
                            placeholder="Please enter patient name or email to search"
                            aria-label="Please enter patient name or email to search"
                            aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                            Search
                            </Button>
                        </InputGroup>
                    </div>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Patient</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formPatientFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formPatientLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formPatientPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formPatientGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select aria-label="Gender select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="formPatientUserId" className="d-none">
                                    <Form.Control type="text" defaultValue={userId}/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleAddPatient}>
                                Confirm
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Close
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
                    {!isLoading && isError && <div>Something Went Wrong !</div>}
                    {!isLoading && !isError && data?.length === 0 && <div>Empty</div>}
                    {!isLoading && !isError && data?.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>LastVisit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id} onClick={() => handlePatientClick(item)}>
                                        <td>{item.lastname}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.lastVisit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Patient Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {isEditing ? (
                                // Render the form for editing the patient info
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={selectedPatient?.firstname} 
                                            onChange={(e) => setSelectedPatient({ ...selectedPatient, firstname: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={selectedPatient?.lastname} 
                                            onChange={(e) => setSelectedPatient({ ...selectedPatient, lastname: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select 
                                            value={selectedPatient?.gender} 
                                            onChange={(e) => setSelectedPatient({ ...selectedPatient, gender: e.target.value })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={selectedPatient?.phone} 
                                            onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })}
                                        />
                                    </Form.Group>
                                </Form>
                            
                            ) : (
                                // Render the patient info
                                <div>
                                    <p>Patient ID: {selectedPatient?._id}</p>
                                    <p>First Name: {selectedPatient?.firstname}</p>
                                    <p>Last Name: {selectedPatient?.lastname}</p>
                                    <p>Phone: {selectedPatient?.phone}</p>
                                    <p>Gender: {selectedPatient?.gender}</p>
                                    <p>Last Visit: {selectedPatient?.lastVisit}</p>
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
                            <Button variant="danger" onClick={() => handleShowDeleteModal(selectedPatient?._id)}>Delete</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyPatients;
