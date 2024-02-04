import { NewPatientEntry, Gender, NewEntry } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing string');
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }

  if ('name' in object &&
      'dateOfBirth' in object && 
      'gender' in object &&
      'occupation' in object &&
      'ssn' in object ) {

      const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        ssn: parseString(object.ssn),
        entries: []
      };

    return newEntry;
  }
  throw new Error('Incorrect or missing object');
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }

  if ('type' in object &&
      'date' in object && 
      'specialist' in object ) {

      const newEntry: NewEntry = {
        type: parseString(object.type),
        date: parseDate(object.date),
        specialist: parseString(object.specialist)
      };

    return newEntry;
  }
  throw new Error('Incorrect or missing object');
};

export default toNewPatientEntry;