
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PopulationSidebar } from '@/components/layout/PopulationSidebar';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Population Sidebar */}
      <PopulationSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Healthcare Population Management
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Manage patient populations, track care tasks, and monitor health outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
