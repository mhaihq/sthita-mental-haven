
import React from 'react';
import { BadgeAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PatientData } from '@/data/patientData';

interface PatientInfoCardProps {
  patientData: PatientData;
  patientAge: number;
  lastContactedFormatted: string;
  medicalConditions: string[];
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patientData,
  patientAge,
  lastContactedFormatted,
  medicalConditions
}) => {
  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <BadgeAlert className="w-5 h-5 mr-2 text-[#1E4D36]" />
        Patient Information
      </h3>
      <div className="space-y-2">
        <p className="flex justify-between">
          <span className="text-gray-500">Name:</span>
          <span className="font-medium">{patientData.name}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Age:</span>
          <span className="font-medium">{patientAge} years</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-500">Last Contact:</span>
          <span className="font-medium">{lastContactedFormatted}</span>
        </p>
      </div>
      <div className="mt-3">
        <p className="text-gray-500 mb-2">Conditions:</p>
        <div className="flex flex-wrap gap-2">
          {medicalConditions.map((condition, index) => (
            <Badge key={index} variant="outline" className="bg-[#E6F0EE] text-[#1E4D36] border-[#1E4D36]">
              {condition}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
