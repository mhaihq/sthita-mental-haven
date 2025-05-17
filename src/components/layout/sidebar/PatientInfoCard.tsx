
import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
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
    <div className="bg-[#F2FCE2] px-4 py-3 border-b border-gray-200">
      {/* Patient Name and Age */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2 text-[#1E4D36]" />
          <span className="font-medium text-gray-800">{patientData.name}</span>
        </div>
        <Badge variant="outline" className="text-xs bg-white border-[#1E4D36] text-[#1E4D36]">
          {patientAge} y/o
        </Badge>
      </div>
      
      {/* Last Contact */}
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <Clock className="w-3 h-3 mr-1" />
        <span>Last contact: {lastContactedFormatted}</span>
      </div>
      
      {/* Conditions Pills */}
      <div className="flex flex-wrap gap-1">
        {medicalConditions.slice(0, 3).map((condition, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="text-xs py-0 bg-white text-[#1E4D36] border-[#1E4D36]"
          >
            {condition}
          </Badge>
        ))}
        {medicalConditions.length > 3 && (
          <Badge variant="outline" className="text-xs py-0 bg-white text-[#1E4D36] border-[#1E4D36]">
            +{medicalConditions.length - 3} more
          </Badge>
        )}
      </div>
    </div>
  );
};
