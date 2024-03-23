import React, { useState } from 'react';
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Form, Button, Modal, Table, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {
    useGetLicenseTypesQuery, useCreateLicenseMutation, useDeleteLicenseMutation
} from '../../../redux/api/licenseApi';
import { set } from 'react-hook-form';

const LicenseSetting = () => {
    const { data, isLoading, isError, refetch } = useGetLicenseTypesQuery();
    const typeOptions = data?.map((type) => ({ value: type.id, label: type.name }));
    const [showModal, setShowModal] = useState(false);
    const [selectedLicense, setSelectedLicense] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);

    const [newLicense, setNewLicense] = useState({
        name: '',
        suffix: ''
    });
    const [createLicense] = useCreateLicenseMutation();
    const [deleteLicense] = useDeleteLicenseMutation();
    
    const handleAddLicense = () => {
        setSelectedLicense({});
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await createLicense(newLicense).unwrap();
            setShowModal(false);
            toast.success('License Added Successfully');
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLicense({ ...newLicense, [name]: value });
    };

    const handleLicenseChange = (e) => {
        const { name, value } = e.target;
        setSelectedLicense({ ...selectedLicense, [name]: value });
    };

    const handleRowClick = (license) => {
        setSelectedLicense(license);
        setShowEditModal(true);
    };

    // for future use
    const handleEdit = async () => {
        
        console.log(selectedLicense);
    };

    const handleDelete = async () => {
        try {
            await deleteLicense(selectedLicense.id).unwrap();
            setShowModal(false);
            toast.success('License Deleted Successfully');
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded p-2" style={{ background: '#f8f9fa' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button variant="secondary" onClick={handleAddLicense}>Add License</Button>
                </div>
                {!isLoading && isError && <div>Loading...</div>}
                {!isLoading && !isError && data?.length === 0 && <div>Empty</div>}
                {!isLoading && !isError && data?.length > 0 && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Suffix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((license) => (
                                <tr key={license.id} onClick={() => handleRowClick(license)}>
                                    <td>{license.id}</td>
                                    <td>{license.name}</td>
                                    <td>{license.suffix !== null ? license.suffix : "NULL"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Add License Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New License</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4" className="text-right">License ID:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    name="licenseId"
                                    value={newLicense.licenseId}
                                    onChange={(e) => setNewLicense({ ...newLicense, licenseId: e.target.value })}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4" className="text-right">Type ID:</Form.Label>
                            <Col sm="8">
                                {/* an dropdown select with typeOption inside as newLicense.typeId value */}
                                <Form.Control
                                    as="select"
                                    name="typeId"
                                    value={newLicense.typeId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Type</option>
                                    {typeOptions?.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit/Delete License Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit License</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4" className="text-right">License ID:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    name="licenseId"
                                    value={selectedLicense.licenseId}
                                    onChange={(e) => setSelectedLicense({ ...selectedLicense, licenseId: e.target.value })}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4" className="text-right">Type ID:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    name="typeId"
                                    value={selectedLicense.typeId}
                                    onChange={(e) => setSelectedLicense({ ...selectedLicense, typeId: e.target.value })}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>


            </div>
        </DashboardLayout>
    );
};

export default LicenseSetting;
