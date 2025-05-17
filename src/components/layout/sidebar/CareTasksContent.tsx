
import React from 'react';
import { AlertTriangle, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

export const CareTasksContent: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-xl text-gray-900 flex items-center">
          <AlertTriangle className="mr-2 text-amber-500" size={20} />
          Care Tasks
        </h3>
        <Button variant="outline" size="sm" className="text-blue-600">
          View All
        </Button>
      </div>
      
      <div className="bg-white rounded-lg mb-6 shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <h4 className="font-medium">CCM Progress</h4>
            </div>
            <div className="text-right">
              <span className="font-medium">0/20 min</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <span className="flex items-center">
                <Check size={16} className="text-green-500 mr-1" />
                Requirements: Patient Consent
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Check size={16} className="text-green-500 mr-1" />
                2+ Chronic Conditions
              </span>
            </div>
            <div className="flex justify-end text-sm text-blue-600">
              20 min needed
            </div>
          </div>
        </div>
      </div>
      
      {/* Medication Task */}
      <div className="bg-white rounded-lg p-5 mb-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
          <Badge className="bg-yellow-50 text-yellow-800 border border-yellow-200 hover:bg-yellow-100">
            Medication
          </Badge>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Missed Medications This Week (2 doses of Lisinopril)
        </h3>
        
        <div className="mb-4">
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            AI Insight
          </Badge>
          <p className="text-gray-600 mt-2">
            Flagged by Adherence Agent — 11% drop in last 30 days
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-50 text-blue-600 border border-blue-200">
            99490
          </Badge>
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            5 min
          </div>
          <Badge className="bg-green-50 text-green-600 border border-green-200">
            Billable
          </Badge>
        </div>
      </div>
      
      {/* Mental Health Task */}
      <div className="bg-white rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-pink-300"></div>
          <Badge className="bg-pink-50 text-pink-800 border border-pink-200 hover:bg-pink-100">
            Mental-health
          </Badge>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          PHQ-9 Score Increased from 8 to 13
        </h3>
        
        <div className="mb-4">
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            AI Insight
          </Badge>
          <p className="text-gray-600 mt-2">
            Flagged by AI from Apr 3 call — mentions job stress
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-50 text-blue-600 border border-blue-200">
            99484
          </Badge>
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            10 min
          </div>
          <Badge className="bg-green-50 text-green-600 border border-green-200">
            Billable
          </Badge>
        </div>
      </div>
    </div>
  );
};
