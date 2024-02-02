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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("65b5cf279c1df765cee613af");

    const handleDelete = async () => {
        try {
            await deletePatient(patientToDelete).unwrap();
            toast.success('Delete Patient Successful');
            refetch();
        } catch (err) {
            console.error('Failed to delete the patient: ', err);
        } finally {
            handleCloseDeleteModal();
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
                        {/* ...Add patient modal code */}
                    </Modal>
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
                                            <Button variant="warning" className="deleteButton" onClick={() => handleShowDeleteModal(item._id)}>
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
