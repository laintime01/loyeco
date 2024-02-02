import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetAllPatientsQuery, useDeletePatientMutation } from '../../../redux/api/patientApi';
import { Link } from 'react-router-dom';
import { Button, Table, InputGroup, Form } from 'react-bootstrap';
import './style.css';

const MyPatients = () => {
    const { data, isLoading, isError } = useGetAllPatientsQuery();
    const [deletePatient] = useDeletePatientMutation();
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleDelete = async (id) => {
        try {
            await deletePatient(id).unwrap();
        } catch (err) {
            console.error('Failed to delete the patient: ', err);
        }
    };

    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button variant="secondary" className="addButton">ADD Patient</Button>
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
                    {!isLoading && isError && <div>Something Went Wrong !</div>}
                    {!isLoading && !isError && data?.length === 0 && <div>Empty</div>}
                    {!isLoading && !isError && data?.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item._id}</td>
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
