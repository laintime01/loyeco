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
    const [disableOk, setDisableOk] = useState(true);

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
        if (isVisible) {
            if (firstLevelChartOptions) {
                const firstOptions = firstLevelChartOptions.map(option => ({
                    label: option.name,
                    value: option.id
                }));
                setFirstLevelOptions(firstOptions);
            }
            if (selectedFirstLevel && secondLevelChartOptions) {
                const secondOptions = secondLevelChartOptions.map(option => ({
                    label: option.name,
                    value: option.id
                }));
                setSecondLevelOptions(secondOptions);
            }
            if (selectedSecondLevel && thirdLevelChartOptions) {
                const thirdOptions = thirdLevelChartOptions.map(option => ({
                    label: option.name,
                    value: option.id
                }));
                setThirdLevelOptions(thirdOptions);
            }
        } else {
            resetState();
        }
    }, [isVisible, firstLevelChartOptions, secondLevelChartOptions, thirdLevelChartOptions]);

    useEffect(() => {
        setDisableOk(text.trim() === '');
    }, [text]);

    const resetState = () => {
        setSelectedFirstLevel(null);
        setSelectedSecondLevel(null);
        setSelectedThirdLevel(null);
        setFirstLevelOptions([]);
        setSecondLevelOptions([]);
        setThirdLevelOptions([]);
        setSelectedFirstLabel('');
        setSelectedSecondLabel('');
        setSelectedThirdLabel('');
        setText('');
        setInputValue('');
        setDisableOk(true);
    };

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
        generateText(selectedFirstLabel, selectedOption ? selectedOption.label : '');
    };

    const handleThirdLevelChange = value => {
        const selectedOption = thirdLevelOptions.find(option => option.value === value);
        setSelectedThirdLevel(value);
        setSelectedThirdLabel(selectedOption ? selectedOption.label : '');
        generateText(selectedFirstLabel, selectedSecondLabel, selectedOption ? selectedOption.label : '');
    };

    const generateText = (firstLabel, secondLabel, thirdLabel = '') => {
        if (firstLabel && secondLabel) {
            const note = `Generated text based on First Level: ${firstLabel}, Second Level: ${secondLabel}${thirdLabel ? `, and Third Level: ${thirdLabel}` : ''}.`;
            setText(note);
        }
    };

    const handleTextChange = e => {
        setText(e.target.value);
    };

    const handleClose = () => {
        resetState();
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const handleSubmit = () => {
        const chart = `${appointmentPatient} patient ${selectedFirstLabel} ${selectedSecondLabel} ${selectedThirdLabel || ''} level case`.trim();
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
        <Modal
            title="Add New Case"
            open={isVisible}
            onCancel={handleClose}
            onOk={handleSubmit}
            width={800}
            okButtonProps={{ disabled: disableOk }}
        >
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
