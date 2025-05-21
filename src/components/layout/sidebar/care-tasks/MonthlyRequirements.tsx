
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
  return (
    <Card className="bg-white rounded-lg shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-lg">Monthly Requirements</h4>
          <Badge className="bg-blue-50 text-blue-600 border-blue-100">
            April 2025
          </Badge>
        </div>
        
        <div className="space-y-4">
          {/* 99490 - CCM */}
          <CptCodeProgressCard 
            cptCode="99490"
            cptCodeInfo={cptCodeInfo['99490']}
            completedMinutes={completedMinutes['99490']}
            totalRequiredMinutes={totalRequiredMinutes['99490']}
          />
          
          {/* 99484 - BHI */}
          <CptCodeProgressCard 
            cptCode="99484"
            cptCodeInfo={cptCodeInfo['99484']}
            completedMinutes={completedMinutes['99484']}
            totalRequiredMinutes={totalRequiredMinutes['99484']}
          />
        </div>
      </CardContent>
    </Card>
  );
};
