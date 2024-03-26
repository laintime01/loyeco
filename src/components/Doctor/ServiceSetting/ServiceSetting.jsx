import React, { useState, useEffect } from 'react';
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Form, Button, Modal, Table, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useGetAllServicesQuery,
         useCreateServiceMutation,
         useUpdateServiceMutation,
         useDeleteServiceMutation,
         useServiceStatusMutation, } from '../../../redux/api/serviceApi';

const ServiceSetting = () => {
    const { data, isLoading, isError, refetch} = useGetAllServicesQuery();
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState({});//[service, setService
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [newService, setNewService] = useState({
        name: '',
        active: '',
        duration: '',
        rate: '',
        taxRate: ''
    });
    const [createService] = useCreateServiceMutation();
    const [updateService] = useUpdateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();

    // service 保存
    const handleSave = async () => {
        console.log(newService);
        // save new service
        try{
            await createService(newService).unwrap();
            setShowModal(false);
            toast.success('Add Patient Successful');
            refetch();
        }catch(error){
            console.log(error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;
    
        // 根据字段名转换类型
        if (name === 'active' || name === 'duration' || name === 'taxRate') {
            updatedValue = parseInt(value, 10) || 0; // 转换为整数，如果转换失败则默认为 0
        } else if (name === 'rate') {
            updatedValue = parseFloat(value) || 0.00; // 转换为小数，如果转换失败则默认为 0.0
        }
        setNewService({ ...newService, [name]: updatedValue });
    };
    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setSelectedService({ ...selectedService, [name]: value });
    };
    

    const handleRowClick = (service) => {
        setSelectedService(service);
        setShowServiceModal(true);
    }

    // 编辑service逻辑
    const handleEdit = async () => {
        try {
            await updateService(selectedService).unwrap();
            setShowServiceModal(false);
            toast.success('Update Service Successful');
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    // 删除service逻辑
    const handleDelete = async () => {
        try {
            await deleteService(selectedService.typeId).unwrap();
            setShowServiceModal(false);
            toast.success('Delete Service Successful');
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
                {!isLoading && isError && <div>Loading...</div>}
                {!isLoading && !isError && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active</th>
                                <th>Duration</th>
                                <th>Rate</th>
                                <th>Tax Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((service) => (
                                    <tr key={service.typeId} onClick={() => handleRowClick(service)}>
                                        <td>{service.name}</td>
                                        <td>{service.active === true ? 'Yes' : service.active === false ? 'No' : 'N/A'}</td>
                                        <td>{service.duration != null ? service.duration : 'N/A'}</td>
                                        <td>{service.rate}</td>
                                        <td>{service.taxRate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
        {/* 新增service modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {Object.entries(newService).map(([key, value], index) => {
                        if (key === 'active') {
                            return (
                                <Form.Group as={Row} className="mb-3" key={key}>
                                    <Form.Label column sm="4" className="text-right">
                                        Active:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Select name={key} value={value} onChange={handleChange}>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            );
                        } else if (key === 'duration') {
                            return (
                                <Form.Group as={Row} className="mb-3" key={key}>
                                    <Form.Label column sm="4" className="text-right">
                                        Duration:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Select name={key} value={value} onChange={handleChange}>
                                            <option value="15">15 mins</option>
                                            <option value="30">30 mins</option>
                                            <option value="45">45 mins</option>
                                            <option value="60">60 mins</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            );
                        } else {
                            return (
                                <Form.Group as={Row} className="mb-3" key={key}>
                                    <Form.Label column sm="4" className="text-right">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name={key} value={value} onChange={handleChange} />
                                    </Col>
                                </Form.Group>
                            );
                        }
                    })}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>

        {/* 编辑service Modal */}
        <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Service Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {selectedService && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={selectedService.name} onChange={handleServiceChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Active</Form.Label>
                                <Form.Select name="active" value={selectedService.active} onChange={handleServiceChange}>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Duration</Form.Label>
                                <Form.Select name="duration" value={selectedService.duration} onChange={handleServiceChange}>
                                    <option value="15">15 mins</option>
                                    <option value="30">30 mins</option>
                                    <option value="45">45 mins</option>
                                    <option value="60">60 mins</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Rate</Form.Label>
                                <Form.Control type="text" name="rate" value={selectedService.rate} onChange={handleServiceChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tax Rate</Form.Label>
                                <Form.Control type="text" name="taxRate" value={selectedService.taxRate} onChange={handleServiceChange} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowServiceModal(false)}>Close</Button>
                {/* <Button variant="primary" onClick={handleEdit}>Edit</Button> */}
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>

            </div>

        </DashboardLayout>
    );
}


export default ServiceSetting;