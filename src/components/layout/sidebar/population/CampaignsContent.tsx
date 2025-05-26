
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Plus, Users, Calendar, CheckCircle, ChevronDown, Eye, Edit, Pause } from 'lucide-react';

export const CampaignsContent: React.FC = () => {
  const stats = [
    {
      title: 'Total Campaigns',
      value: '6',
      subtitle: 'this month',
      icon: Megaphone,
      color: 'text-purple-600'
    },
    {
      title: 'Patients Reached',
      value: '1,230',
      subtitle: 'this month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Tasks Created',
      value: '148',
      subtitle: 'this month',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Completion',
      value: '87%',
      subtitle: 'average rate',
      icon: CheckCircle,
      color: 'text-orange-600'
    }
  ];

  const recommendedCampaigns = [
    {
      title: 'PHQ-9 Kickoff',
      category: 'Behavioral Health',
      priority: 'High priority',
      priorityColor: 'bg-red-100 text-red-800',
      description: 'Voice with SMS fallback',
      patients: '312 patients',
      startDate: '5/15/2025',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Fall Risk Assessment',
      category: 'Preventive Care',
      priority: 'Medium priority',
      priorityColor: 'bg-yellow-100 text-yellow-800',
      description: 'Voice with SMS fallback',
      patients: '540 patients',
      startDate: '5/22/2025',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Medication Adherence',
      category: 'Medication Management',
      priority: 'High priority',
      priorityColor: 'bg-red-100 text-red-800',
      description: 'Voice with SMS fallback',
      patients: '118 patients',
      startDate: '5/10/2025',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const activeCampaigns = [
    {
      title: 'PHQ-9 Kickoff',
      category: 'Behavioral Health',
      status: 'In Progress',
      statusColor: 'bg-green-100 text-green-800',
      priority: 'High priority',
      priorityColor: 'bg-red-100 text-red-800',
      description: 'Voice with SMS fallback',
      reached: '221 of 312 reached',
      startDate: '5/15/2025',
      completion: 71
    }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone size={20} className="text-purple-600" />
          <h1 className="text-lg font-semibold text-[#1E4D36]">Campaigns</h1>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus size={16} />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon size={20} className={stat.color} />
                <div>
                  <p className="text-xs text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <h2 className="font-medium text-gray-900">Recommended Campaigns</h2>
            <Badge variant="outline" className="text-xs">3</Badge>
            <Badge className="text-xs bg-orange-100 text-orange-800 ml-2">Quick Launch</Badge>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {recommendedCampaigns.map((campaign, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs bg-purple-100 text-purple-800">{campaign.category}</Badge>
                    <Badge className="text-xs bg-gray-100 text-gray-800">{campaign.category}</Badge>
                    <Badge className="text-xs bg-yellow-100 text-yellow-800">Recommended</Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                  
                  <Badge className={`text-xs ${campaign.priorityColor}`}>
                    {campaign.priority}
                  </Badge>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border"></div>
                      <span>{campaign.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Ready to contact {campaign.patients}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Started: {campaign.startDate}</span>
                    </div>
                  </div>
                  
                  <Button className={`w-full text-white ${campaign.buttonColor}`}>
                    <Plus size={14} />
                    Launch Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h2 className="font-medium text-gray-900">Active Campaigns</h2>
            <Badge variant="outline" className="text-xs">1</Badge>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeCampaigns.map((campaign, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs bg-purple-100 text-purple-800">{campaign.category}</Badge>
                    <Badge className="text-xs bg-gray-100 text-gray-800">{campaign.category}</Badge>
                    <Badge className={`text-xs ${campaign.statusColor}`}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                  
                  <Badge className={`text-xs ${campaign.priorityColor}`}>
                    {campaign.priority}
                  </Badge>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border"></div>
                      <span>{campaign.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>{campaign.reached}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Started: {campaign.startDate}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Completion:</span>
                      <span>{campaign.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${campaign.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye size={14} />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit size={14} />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pause size={14} />
                      Pause
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
