import React from 'react';
import { Modal, List } from 'antd';

// mock data for case history
const caseHistoryData = [
    {
        date: '2024-03-01',
        chiefComplaint: 'Patient had a fever',
        differentialDiagnosis: 'Patient had a cough and sore throat',
    },
    {
        date: '2024-03-02',
        chiefComplaint: 'Patient had a pain',
        differentialDiagnosis: 'Patient had a pain in the chest',
    },
    {
        date: '2024-03-03',
        chiefComplaint: 'Patient had a headache',
        differentialDiagnosis: 'Patient had a headache and dizziness',
    },
    {
        date: '2024-03-04',
        chiefComplaint: 'Patient had a cough',
        differentialDiagnosis: 'Patient had a cough and fever',
    },
    {
        date: '2024-03-05',
        chiefComplaint: 'Patient had a sore throat',
        differentialDiagnosis: 'Patient had a sore throat and cough',
    },

];

const CaseHistory = ({ isVisible, onClose }) => {
    return (
        <Modal
            title="Case History"
            open={isVisible}
            onCancel={onClose}
            width={800}
        >
            <List
                itemLayout="horizontal"
                dataSource={caseHistoryData}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.date}
                            description={`${item.chiefComplaint} - ${item.differentialDiagnosis}`}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default CaseHistory;
