
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Activity, AlertCircle } from 'lucide-react';

export const InsightsContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-[#1E4D36] mb-2">Population Insights</h2>
        <p className="text-sm text-gray-600 mb-6">
          Advanced analytics and insights for population health management.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp size={16} />
              Health Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Identify patterns in patient outcomes, medication adherence, and treatment effectiveness across populations.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Activity size={16} />
              Risk Stratification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              AI-powered risk scoring to identify patients at high risk for adverse outcomes or hospitalization.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertCircle size={16} />
              Quality Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Monitor quality indicators, adherence to clinical guidelines, and performance benchmarks.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
