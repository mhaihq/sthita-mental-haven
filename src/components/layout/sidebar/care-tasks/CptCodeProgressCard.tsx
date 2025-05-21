
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CptCodeInfo } from './types';

interface CptCodeProgressCardProps {
  cptCode: string;
  cptCodeInfo: CptCodeInfo;
  completedMinutes: number;
  totalRequiredMinutes: number;
  className?: string; // Added className as an optional prop
}

export const CptCodeProgressCard: React.FC<CptCodeProgressCardProps> = ({ 
  cptCode, 
  cptCodeInfo, 
  completedMinutes, 
  totalRequiredMinutes,
  className = '' // Default to empty string if not provided
}) => {
  // Check if cptCodeInfo is defined before accessing properties
  if (!cptCodeInfo) {
    return null; // Don't render anything if data is missing
  }
  
  const progressPercentage = (completedMinutes / totalRequiredMinutes) * 100;
  const remainingMinutes = totalRequiredMinutes - completedMinutes;
  
  return (
    <div className={`p-3 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className={cptCode === '99490' ? "bg-blue-50 text-blue-600 border-blue-100 font-mono" : "bg-purple-50 text-purple-600 border-purple-100 font-mono"}>
              {cptCode}
            </Badge>
            <h5 className="font-medium">{cptCodeInfo.description}</h5>
          </div>
          <p className="text-xs text-gray-600">Required: {totalRequiredMinutes} min/month</p>
        </div>
        <p className="font-medium">
          {completedMinutes}/{totalRequiredMinutes} min
        </p>
      </div>
      
      <div className="mt-2">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
        <span>{cptCodeInfo.rateInfo}</span>
        <span>{remainingMinutes} min remaining</span>
      </div>
    </div>
  );
};
