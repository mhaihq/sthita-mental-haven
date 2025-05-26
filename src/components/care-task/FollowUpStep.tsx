
import React from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export const FollowUpStep: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 text-green-500" size={20} />
          Follow-up Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-blue-800 flex items-center">
              <Calendar className="mr-2" size={16} /> Follow-up plan
            </h3>
            <Badge className="bg-green-100 text-green-700">Scheduled</Badge>
          </div>
          
          <p className="my-3 text-gray-700">I've scheduled a follow-up for <strong>Apr 10</strong>. Who should handle this call?</p>
          
          <div className="flex gap-3 mb-4">
            <Button className="bg-purple-600 hover:bg-purple-700">
              AI Assistant
            </Button>
            <Button variant="outline">
              Myself
            </Button>
            <Button variant="outline">
              Escalate
            </Button>
            <div className="flex-grow"></div>
            <Button variant="ghost" className="ml-auto">
              Change Date
            </Button>
          </div>
          
          <div className="bg-blue-100 p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-blue-800">
                <MessageSquare size={16} className="mr-1" />
                <span className="font-medium">For that call, I'll cover these topics:</span>
              </div>
              <Badge className="bg-blue-200 text-blue-800">2 selected</Badge>
            </div>
            
            <div className="space-y-2 pl-2">
              {[
                { id: 'check-med', label: 'Check medication adherence', checked: true },
                { id: 'side-effects', label: 'Ask about side effects', checked: true },
                { id: 'daily', label: 'Review daily medication routine', checked: false },
                { id: 'refills', label: 'Check if refills are needed', checked: false },
              ].map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox id={`followup-${item.id}`} defaultChecked={item.checked} />
                  <label htmlFor={`followup-${item.id}`} className="text-sm text-gray-700">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <label className="text-sm text-gray-700">Want me to add anything else?</label>
              <div className="flex mt-1">
                <Input placeholder="Add a custom topic..." className="bg-white" />
                <Button className="ml-2">Add</Button>
              </div>
            </div>

            <div className="mt-4 p-2 bg-white rounded border border-blue-200">
              <div className="flex items-center text-sm text-blue-800">
                <MessageSquare size={14} className="mr-1" /> 
                AI will call on Apr 10 and cover 2 selected topics: 
                <span className="font-medium ml-1">
                  Check medication adherence, Ask about side effects
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
