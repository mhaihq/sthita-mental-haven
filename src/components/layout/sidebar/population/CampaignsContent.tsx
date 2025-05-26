
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Calendar, Users, Target } from 'lucide-react';

export const CampaignsContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-[#1E4D36] mb-2">Campaigns</h2>
        <p className="text-sm text-gray-600 mb-6">
          Population health campaigns and outreach programs will be available here.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar size={16} />
              Scheduled Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Create and manage automated outreach campaigns for medication reminders, wellness checks, and preventive care.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users size={16} />
              Target Populations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Define patient cohorts based on diagnosis, risk factors, or treatment outcomes for targeted interventions.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Target size={16} />
              Campaign Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Track engagement rates, response times, and health outcomes from your population health initiatives.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
