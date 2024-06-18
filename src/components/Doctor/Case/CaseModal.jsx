import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, Row, Col } from 'antd';
import { useGetAllChartServicesQuery, useGetChartServicesSubtypesQuery, useGetTempChartQuery } from '../../../redux/api/chartApi';

const { Option } = Select;
const { TextArea } = Input;

const CaseModal = ({ isVisible, onClose, onSubmit, appointmentId }) => {
    const [selectedFirstLevel, setSelectedFirstLevel] = useState(null);
    const [selectedSecondLevel, setSelectedSecondLevel] = useState(null);
    const [selectedThirdLevel, setSelectedThirdLevel] = useState(null);
    const [firstLevelOptions, setFirstLevelOptions] = useState([]);
    const [secondLevelOptions, setSecondLevelOptions] = useState([]);
    const [thirdLevelOptions, setThirdLevelOptions] = useState([]);
    const [text, setText] = useState('');
    const [inputValue, setInputValue] = useState('');

    const { data: firstLevelChartOptions } = useGetAllChartServicesQuery();
    const { data: secondLevelChartOptions } = useGetChartServicesSubtypesQuery(selectedFirstLevel, {
        skip: !selectedFirstLevel,
    });
    const { data: thirdLevelChartOptions } = useGetTempChartQuery(selectedSecondLevel, {
        skip: !selectedSecondLevel,
    });

    // handle first level options
    useEffect(() => {
        if (firstLevelChartOptions) {
            const firstOptions = firstLevelChartOptions.map(option => ({
                label: option.name,
                value: option.id
            }));
            setFirstLevelOptions(firstOptions);
        }
    }, [firstLevelChartOptions]);

    // handle second level options
    useEffect(() => {
        if (secondLevelChartOptions) {
            const secondOptions = secondLevelChartOptions.map(option => ({
                label: option.name,
                value: option.id
            }));
            setSecondLevelOptions(secondOptions);
        }
    }, [secondLevelChartOptions]);

    // handle third level options
    useEffect(() => {
        if (thirdLevelChartOptions) {
            const thirdOptions = thirdLevelChartOptions.map(option => ({
                label: option.name,
                value: option.id
            }));
            setThirdLevelOptions(thirdOptions);
        }
    }, [thirdLevelChartOptions]);

    const handleFirstLevelChange = value => {
        setSelectedFirstLevel(value);
        setSelectedSecondLevel(null); // Reset second level
        setSelectedThirdLevel(null); // Reset third level
        setSecondLevelOptions([]);
        setThirdLevelOptions([]);
        setText('');  // Reset the text
    };

    const handleSecondLevelChange = value => {
        setSelectedSecondLevel(value);
        setSelectedThirdLevel(null); // Reset third level
        setThirdLevelOptions([]);
        setText('');  // Reset the text
    };

    const handleThirdLevelChange = value => {
        setSelectedThirdLevel(value);
        generateText(value);  // Generate text based on new selection
    };

    const generateText = value => {
        if (selectedFirstLevel && selectedSecondLevel && value) {
            setText(`Generated text based on First Level: ${selectedFirstLevel}, Second Level: ${selectedSecondLevel}, and Third Level: ${value}.`);
        }
    };

    const handleTextChange = e => {
        setText(e.target.value);
    };

    const handleClose = () => {
        setSelectedFirstLevel(null);
        setSelectedSecondLevel(null);
        setSelectedThirdLevel(null);
        setFirstLevelOptions([]);
        setSecondLevelOptions([]);
        setThirdLevelOptions([]);
        setText('');
        setInputValue('');
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    return (
        <Modal title="Add New Case" open={isVisible} onCancel={handleClose} onOk={onSubmit} width={800}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="First Level Option">
                            <Select value={selectedFirstLevel} onChange={handleFirstLevelChange}>
                                {firstLevelOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Second Level Option">
                            <Select value={selectedSecondLevel} onChange={handleSecondLevelChange} disabled={!selectedFirstLevel}>
                                {secondLevelOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Third Level Option">
                            <Select value={selectedThirdLevel} onChange={handleThirdLevelChange} disabled={!selectedSecondLevel}>
                                {thirdLevelOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Addendum">
                            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Generated Text">
                            <TextArea value={text} onChange={handleTextChange} autoSize={{ minRows: 12, maxRows: 8 }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Appointment ID">
                            <span>{appointmentId}</span>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default CaseModal;
