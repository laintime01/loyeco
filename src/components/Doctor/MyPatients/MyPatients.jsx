import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetAllPatientsQuery, useDeletePatientMutation, useCreatePatientMutation } from '../../../redux/api/patientApi';
import { Button, Table, InputGroup, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import './style.css';

const MyPatients = () => {
    const { data, isLoading, isError, refetch } = useGetAllPatientsQuery();
    const [deletePatient] = useDeletePatientMutation();
    const [createPatient] = useCreatePatientMutation();
    const [showModal, setShowModal] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("65b5cf279c1df765cee613af");
    
    const handleDelete = async (id) => {
        try {
            await deletePatient(id).unwrap();
            toast.success('Delete Patient Successful');
            refetch();
        } catch (err) {
            console.error('Failed to delete the patient: ', err);
        }
    };

    const handleAddPatient = async () => {
        try {
            await createPatient({firstname, lastname, email, userId}).unwrap();
            handleClose();
            toast.success('Add Patient Successful');
            refetch();
        } catch(err) {
            console.error('Failed to add the patient: ', err);
        }
    };
    
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button variant="secondary" className="addButton" onClick={handleShow}>ADD Patient</Button>
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
                                <Form.Group controlId="formPatientEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
                    {!isLoading && isError && <div>Something Went Wrong !</div>}
                    {!isLoading && !isError && data?.length === 0 && <div>Empty</div>}
                    {!isLoading && !isError && data?.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.lastname}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <Button variant="success"  className="updateButton">Update</Button>
                                            <Button variant="warning" className="deleteButton" onClick={() => handleDelete(item.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyPatients;
