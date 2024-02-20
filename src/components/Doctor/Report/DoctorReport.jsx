import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './DoctorReport.css';

const SymptomSelector = ({ symptoms, selectedSymptoms, onSymptomSelect }) => {
    return (
        <div className="component-container">
            <h2>Select Symptoms</h2>
            {symptoms.map(symptom => (
                <Form.Check 
                    key={symptom}
                    type='checkbox'
                    id={`check-${symptom}`}
                    label={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => onSymptomSelect(symptom)}
                />
            ))}
        </div>
    );
};

const ReportDraft = ({ selectedSymptoms }) => {
    return (
        <div className="component-container">
            <h2>Report Draft</h2>
            {selectedSymptoms.map(symptom => (
                <p key={symptom}>The patient shows signs of {symptom}.</p>
            ))}
        </div>
    );
}

const ReportEditor = ({ report, onReportChange }) => {
    return (
        <div className="component-container">
            <h2>Edit Report</h2>
            <Form.Control as="textarea" value={report} onChange={(e) => onReportChange(e.target.value)} style={{ height: '200px' }} />
        </div>
    );
}

const ReportGenerator = () => {
    const [symptoms, setSymptoms] = useState(['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Body aches', 'Headache', 'Loss of taste or smell', 'Sore throat', 'Congestion or runny nose', 'Nausea or vomiting', 'Diarrhea']);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [report, setReport] = useState('');

    const handleSymptomSelect = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    useEffect(() => {
        setReport(selectedSymptoms.map(symptom => `The patient shows signs of ${symptom}.`).join('\n'));
    }, [selectedSymptoms]);

    return (
        <div>
            <SymptomSelector symptoms={symptoms} selectedSymptoms={selectedSymptoms} onSymptomSelect={handleSymptomSelect} />
            <ReportDraft selectedSymptoms={selectedSymptoms} />
            <ReportEditor report={report} onReportChange={setReport} />
            <Button variant="primary" onClick={() => window.print()}>Print Report</Button>
        </div>
    );
}

const DoctorReport = () => {
    return (
        <Container>
            <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
            <Row className="justify-content-center mb-5">
                <Col>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Issue</Form.Label>
                            <Form.Control as="select" custom>
                                <option>Shoulder Pain</option>
                                <option>Arm Pain</option>
                                <option>Leg Pain</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Treatment</Form.Label>
                            <Form.Control as="select" custom>
                                <option>Massage</option>
                                <option>Physiotherapy</option>
                                <option>Acupuncture</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Duration</Form.Label>
                            <Form.Control as="select" custom>
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>2 hours</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Therapist</Form.Label>
                            <Form.Control as="select" custom>
                                <option>Therapist A</option>
                                <option>Therapist B</option>
                                <option>Therapist C</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <ReportGenerator />
        </Container>
    )
}

export default DoctorReport;
