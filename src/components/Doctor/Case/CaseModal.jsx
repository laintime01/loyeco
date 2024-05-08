import React, { useState } from 'react';
import { Modal, Form, Select, Input, Row, Col } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

// Mock data for options in select
const chiefComplaintOptions = [
    { label: 'Pain', value: 'pain' },
    { label: 'Difficulty Breathing', value: 'difficulty_breathing' },
    { label: 'Changes in Vision', value: 'changes_in_vision' },
    { label: 'Symptoms of Infection', value: 'symptoms_of_infection' },
    { label: 'Other', value: 'other' }
];
const differentialDiagnosisOptions = {
    pain: ['Acute Appendicitis', 'Pulmonary Embolism', 'Gastric Ulcer'],
    difficulty_breathing: ['Asthma', 'COPD Exacerbation', 'Pneumothorax'],
    changes_in_vision: ['Glaucoma', 'Macular Degeneration', 'Diabetic Retinopathy'],
    symptoms_of_infection: ['Sepsis', 'Cellulitis', 'Urinary Tract Infection'],
    other: ['Other Conditions']
};

const CaseModal = ({ isVisible, onClose, onSubmit }) => {
    const [chiefComplaintOption, setChiefComplaintOption] = useState('');
    const [differentialOptions, setDifferentialOptions] = useState([]);  // Ensure state for options is set correctly
    const [differentialOption, setDifferentialOption] = useState('');   // State for the selected option
    const [inputValue, setInputValue] = useState('');
    const [text, setText] = useState('');

    const handleChiefComplaintChange = value => {
        setChiefComplaintOption(value);
        setDifferentialOptions(differentialDiagnosisOptions[value] || []);
        setDifferentialOption('');  // Reset selected differential diagnosis
        setText('');  // Reset the text
    };

    const handleDifferentialChange = value => {
        setDifferentialOption(value);
        generateText(value);  // Generate text based on new selection
    };

    const generateText = (value) => {
        if (chiefComplaintOption && value) {
            setText(`Generated text based on ${chiefComplaintOption} and ${value}.`);
        }
    };

    const handleTextChange = e => {
        setText(e.target.value);
    }

    return (
        <Modal title="Add New Case" open={isVisible} onCancel={onClose} onOk={onSubmit} width={800}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Chief Complaint">
                            <Select value={chiefComplaintOption} onChange={handleChiefComplaintChange}>
                                {chiefComplaintOptions.map(option => (
                                    <Option key={option.value} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Differential Diagnosis">
                            <Select value={differentialOption} onChange={handleDifferentialChange} placeholder="Select a diagnosis">
                                {differentialOptions.map(option => (
                                    <Option key={option} value={option}>{option}</Option>
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
            </Form>
        </Modal>
    );
};

export default CaseModal;
