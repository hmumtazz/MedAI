
import { SAMPLE_FHIR } from '@backend/data/patientData';
import { FileData } from '@/types';

export const loadSampleFHIRData = (): FileData => {
  const jsonString = JSON.stringify(SAMPLE_FHIR, null, 2);
  const bytes = new TextEncoder().encode(jsonString);
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  const base64 = btoa(binString);

  return {
    name: "Sarah_Martinez_FHIR.json",
    type: "application/json",
    base64: base64
  };
};
