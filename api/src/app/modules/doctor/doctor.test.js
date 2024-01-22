const express = require('express');
const router = express.Router();

const DoctorRouter = express.Router();

// Mock data
let doctors = [
  { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Jones', specialty: 'Neurology' }
];

// GET - Retrieve all doctors
DoctorRouter.get('/', (req, res) => {
  res.json(doctors);
});

// POST - Add new doctor
DoctorRouter.post('/', (req, res) => {
  const newDoctor = req.body;
  doctors.push(newDoctor);
  res.json(newDoctor);
});

// PUT - Update a doctor
DoctorRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedDoctor = req.body;
  doctors = doctors.map(doctor => doctor.id === id ? updatedDoctor : doctor);
  res.json(updatedDoctor);
});

// DELETE - Remove a doctor
DoctorRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  doctors = doctors.filter(doctor => doctor.id !== id);
  res.json({ message: 'Doctor removed' });
});

router.use('/doctor', DoctorRouter);

module.exports = router;
