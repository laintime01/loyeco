import React, { useState, useEffect } from 'react';
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Form, Button, Modal, Table, Row, Col } from 'react-bootstrap';

const LocationSetting = () => {
    const [locations, setLocations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newLocation, setNewLocation] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phone: '',
        email: '',
        status: 'Active',
        id: 0,
        province: ''
    });

    // Fetch locations from backend
    useEffect(() => {
        // Replace this with your actual fetch call
        const fetchLocations = async () => {
            const response = await fetch('http:/loyeco.com:12121/api/location');
            const data = await response.json();
            setLocations(data);
        };
        fetchLocations();
    }, []);

    const handleAddLocation = () => {
        // Logic to add new location
        // You may need to send a POST request to your backend
        console.log(newLocation);
        setShowModal(false);
    };

    const handleChange = (e) => {
        setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
    };

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
                        {locations.map((location) => (
                            <tr key={location.id}>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                                <td>{location.city}</td>
                                <td>{location.country}</td>
                                <td>{location.postalCode}</td>
                                <td>{location.phone}</td>
                                <td>{location.email}</td>
                                <td>{location.status}</td>
                                <td>{location.province}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.entries(newLocation).map(([key, value], index) => (
                            key !== 'id' && key !== 'status' && (
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
                    <Button variant="primary" onClick={handleAddLocation}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

        </DashboardLayout>
    );
}

export default LocationSetting;
