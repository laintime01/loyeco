import React, { useState } from 'react';
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Form, Button, Modal, Table, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { 
    useGetAllLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation,
    useLocationStatusMutation
} from '../../../redux/api/locationApi';

const LocationSetting = () => {
    const { data, isLoading, isError, refetch} = useGetAllLocationsQuery();
    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [newLocation, setNewLocation] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phone: '',
        email: '',
        status: '',
        province: ''
    });
    const [createLocation] = useCreateLocationMutation();
    const [updateLocation] = useUpdateLocationMutation();
    const [deleteLocation] = useDeleteLocationMutation();

    const handleSave = async () => {
        try {
            await createLocation(newLocation).unwrap();
            setShowModal(false);
            toast.success('Location Added Successfully');
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLocation({ ...newLocation, [name]: value });
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setSelectedLocation({ ...selectedLocation, [name]: value });
    };

    const handleRowClick = (location) => {
        setSelectedLocation(location);
        setShowLocationModal(true);
    }

    const handleEdit = async () => {
        console.log(selectedLocation);
        try {
            await updateLocation(selectedLocation).unwrap();
            setShowLocationModal(false);
            toast.success('Location Updated Successfully');
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteLocation(selectedLocation.id).unwrap();
            setShowLocationModal(false);
            toast.success('Location Deleted Successfully');
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded p-2" style={{ background: '#f8f9fa' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button variant="secondary" className='addButton' onClick={() => setShowModal(true)}>Add</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Postal Code</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Province</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data?.length > 0) ? (
                            data.map((location) => (
                                <tr key={location.id} onClick={() => handleRowClick(location)}>
                                    <td>{location.name}</td>
                                    <td>{location.address}</td>
                                    <td>{location.city}</td>
                                    <td>{location.province}</td>
                                    <td>{location.postalCode}</td>
                                    <td>{location.country}</td>
                                    <td>{location.phone}</td>
                                    <td>{location.email}</td>
                                    <td>{location.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>

            {/* Add Location Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {Object.entries(newLocation).map(([key, value]) => (
                                key === 'status' ? (
                                    <Form.Group as={Row} className="mb-3" key={key}>
                                        <Form.Label column sm="4" className="text-right">
                                            Status:
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Select name={key} value={value} onChange={handleChange}>
                                                <option>Select Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">InActive</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                ) : (
                                    <Form.Group as={Row} className="mb-3" key={key}>
                                        <Form.Label column sm="4" className="text-right">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" name={key} value={value} onChange={handleChange} />
                                        </Col>
                                    </Form.Group>
                                )
                            ))}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Location Modal */}
                <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Location Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedLocation && (
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Name:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="name" value={selectedLocation.name} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Address:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="address" value={selectedLocation.address} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        City:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="city" value={selectedLocation.city} onChange={handleLocationChange} />
                                    </Col>       
                                </Form.Group>
                                {/* province */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Province:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="province" value={selectedLocation.province} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>

                                {/* postcode */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Postal Code:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="postalCode" value={selectedLocation.postalCode} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Country:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="country" value={selectedLocation.country} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Phone:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="phone" value={selectedLocation.phone} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Email:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="email" value={selectedLocation.email} onChange={handleLocationChange} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4" className="text-right">
                                        Status:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Select name="status" value={selectedLocation.status} onChange={handleLocationChange}>
                                            <option>Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">InActive</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                
                            </Form>
                        )}
                    </Modal.Body>
                    {/* delete button on the left */}
                    <Modal.Footer className="d-flex justify-content-between">
                        <div>
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        </div>
                        <div>
                            <Button variant="secondary" style={{marginRight:"10px"}} onClick={() => setShowLocationModal(false)}>Close</Button>
                            <Button variant="success" onClick={handleEdit}>Save</Button>
                        </div>
                    </Modal.Footer>

                </Modal>
        </DashboardLayout>
    );
}




export default LocationSetting;
