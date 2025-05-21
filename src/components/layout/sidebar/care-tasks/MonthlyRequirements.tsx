
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CptCodeProgressCard } from './CptCodeProgressCard';
import { CptCodeInfo } from './types';

interface MonthlyRequirementsProps {
  cptCodeInfo: Record<string, CptCodeInfo>;
  completedMinutes: Record<string, number>;
  totalRequiredMinutes: Record<string, number>;
}

export const MonthlyRequirements: React.FC<MonthlyRequirementsProps> = ({ 
  cptCodeInfo, 
  completedMinutes, 
  totalRequiredMinutes 
}) => {
  // Get available CPT codes from the data
  const cptCodes = Object.keys(cptCodeInfo || {});
  
  // If no data, don't render anything
  if (!cptCodes.length) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {/* Time tracking section at the top */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-lg">Time Requirements</h4>
        <Badge className="bg-blue-50 text-blue-600 border-blue-100">
          April 2025
        </Badge>
      </div>
      
      {/* Progress tracking cards */}
      <div className="space-y-4">
        {cptCodes.map(cptCode => (
          <CptCodeProgressCard 
            key={cptCode}
            cptCode={cptCode}
            cptCodeInfo={cptCodeInfo[cptCode]}
            completedMinutes={completedMinutes[cptCode] || 0}
            totalRequiredMinutes={totalRequiredMinutes[cptCode] || 0}
          />
        ))}
      </div>
    </div>
  );
};
