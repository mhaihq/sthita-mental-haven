
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, CreditCard, TrendingUp } from 'lucide-react';

export const BillingContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-[#1E4D36] mb-2">Billing Management</h2>
        <p className="text-sm text-gray-600 mb-6">
          Population-level billing analytics and revenue cycle management tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign size={16} />
              Revenue Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Track revenue trends, reimbursement rates, and billing performance across your patient population.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CreditCard size={16} />
              Claims Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Monitor claim submissions, denials, and appeals across all patients with automated workflows.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp size={16} />
              Financial Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Predict revenue based on treatment plans, seasonal patterns, and patient population trends.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
