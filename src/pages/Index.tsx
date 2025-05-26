
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { PopulationSidebar } from '@/components/layout/PopulationSidebar';

const Index = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'taskQueue' | 'patients' | 'campaigns' | 'billing' | 'insights'>(
    (tabParam as any) || 'taskQueue'
  );

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabParam && ['taskQueue', 'patients', 'campaigns', 'billing', 'insights'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Population Sidebar */}
      <PopulationSidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
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
