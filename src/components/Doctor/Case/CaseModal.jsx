import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, Row, Col } from 'antd';
import { useGetAllChartServicesQuery, useGetChartServicesSubtypesQuery, useGetTempChartQuery } from '../../../redux/api/chartApi';

const { Option } = Select;
const { TextArea } = Input;

const CaseModal = ({ isVisible, onClose, onSubmit, appointmentId, appointmentPatient }) => {
    const [selectedFirstLevel, setSelectedFirstLevel] = useState(null);
    const [selectedSecondLevel, setSelectedSecondLevel] = useState(null);
    const [selectedThirdLevel, setSelectedThirdLevel] = useState(null);
    const [firstLevelOptions, setFirstLevelOptions] = useState([]);
    const [secondLevelOptions, setSecondLevelOptions] = useState([]);
    const [thirdLevelOptions, setThirdLevelOptions] = useState([]);
    const [text, setText] = useState('');
    const [inputValue, setInputValue] = useState('');

    const [selectedFirstLabel, setSelectedFirstLabel] = useState('');
    const [selectedSecondLabel, setSelectedSecondLabel] = useState('');
    const [selectedThirdLabel, setSelectedThirdLabel] = useState('');

    const { data: firstLevelChartOptions } = useGetAllChartServicesQuery();
    const { data: secondLevelChartOptions } = useGetChartServicesSubtypesQuery(selectedFirstLevel, {
        skip: !selectedFirstLevel,
    });
    const { data: thirdLevelChartOptions } = useGetTempChartQuery(selectedSecondLevel, {
        skip: !selectedSecondLevel,
    });

    useEffect(() => {
        if (firstLevelChartOptions) {
            const firstOptions = firstLevelChartOptions.map(option => ({
                label: option.name,
                value: option.id
            }));
            setFirstLevelOptions(firstOptions);
        }
    }, [firstLevelChartOptions]);

    useEffect(() => {
        if (secondLevelChartOptions) {
            const secondOptions = secondLevelChartOptions.map(option => ({
                label: option.name,
                value: option.id
            }));
            setSecondLevelOptions(secondOptions);
        }
    }, [secondLevelChartOptions]);

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
        const selectedOption = firstLevelOptions.find(option => option.value === value);
        setSelectedFirstLevel(value);
        setSelectedFirstLabel(selectedOption ? selectedOption.label : '');
        setSelectedSecondLevel(null);
        setSelectedThirdLevel(null);
        setSecondLevelOptions([]);
        setThirdLevelOptions([]);
        setText('');
    };

    const handleSecondLevelChange = value => {
        const selectedOption = secondLevelOptions.find(option => option.value === value);
        setSelectedSecondLevel(value);
        setSelectedSecondLabel(selectedOption ? selectedOption.label : '');
        setSelectedThirdLevel(null);
        setThirdLevelOptions([]);
        setText('');
    };

    const handleThirdLevelChange = value => {
        const selectedOption = thirdLevelOptions.find(option => option.value === value);
        setSelectedThirdLevel(value);
        setSelectedThirdLabel(selectedOption ? selectedOption.label : '');
        generateText(selectedOption ? selectedOption.label : '');
    };

    const generateText = label => {
        if (selectedFirstLabel && selectedSecondLabel && label) {
            setText(`Generated text based on First Level: ${selectedFirstLabel}, Second Level: ${selectedSecondLabel}, and Third Level: ${label}.`);
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

    const handleSubmit = () => {
        const chart = `${appointmentPatient} patient ${selectedFirstLabel} ${selectedSecondLabel} ${selectedThirdLabel} level case`;
        const caseData = {
            appointmentId: appointmentId,
            chart: chart,
            generalNote: text,
        };
        if (typeof onSubmit === 'function') {
            onSubmit(caseData);
        }
        handleClose();
    };

    return (
        <Modal title="Add New Case" open={isVisible} onCancel={handleClose} onOk={handleSubmit} width={800}>
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
