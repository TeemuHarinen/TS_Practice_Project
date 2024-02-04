/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { NewEntry } from '../types/types';
import toNewPatientEntry
 from '../utils/utils';
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('patients fetched');
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('id:', req.params.id);
  console.log('entry:', req.body);
  try {
    const newEntry: NewEntry = toNewPatientEntry(req.body);
    const newObj = patientService.addEntryToPatient(req.params.id, newEntry);
    
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
  res.send(req.body);
});

export default router;