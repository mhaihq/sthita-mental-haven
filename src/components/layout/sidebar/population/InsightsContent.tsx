
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle2,
  Activity,
  Calendar,
  Eye,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';

const chartConfig = {
  timeSpent: {
    label: "Time Spent",
    color: "#1E4D36",
  },
  efficiency: {
    label: "Efficiency",
    color: "#2A6349",
  },
  completed: {
    label: "Completed",
    color: "#1E4D36",
  },
  pending: {
    label: "Pending", 
    color: "#E6F0EE",
  }
};

export const InsightsContent: React.FC = () => {
  const enrollmentTrendData = [
    { week: 'Week 1', enrolled: 12 },
    { week: 'Week 2', enrolled: 18 },
    { week: 'Week 3', enrolled: 15 },
    { week: 'Week 4', enrolled: 21 },
    { week: 'Week 5', enrolled: 25 },
    { week: 'Week 6', enrolled: 30 }
  ];

  const timeAllocationData = [
    { activity: 'Patient Calls', minutes: 25, percentage: 35 },
    { activity: 'Documentation', minutes: 18, percentage: 25 },
    { activity: 'Care Planning', minutes: 14, percentage: 20 },
    { activity: 'Provider Coordination', minutes: 11, percentage: 15 },
    { activity: 'Administrative', minutes: 4, percentage: 5 }
  ];

  const efficiencyTrendData = [
    { week: 'Week 1', efficiency: 72, tasksCompleted: 45 },
    { week: 'Week 2', efficiency: 78, tasksCompleted: 52 },
    { week: 'Week 3', efficiency: 85, tasksCompleted: 58 },
    { week: 'Week 4', efficiency: 82, tasksCompleted: 55 }
  ];

  const pieData = [
    { name: 'High Priority', value: 35, color: '#1E4D36' },
    { name: 'Medium Priority', value: 45, color: '#2A6349' },
    { name: 'Low Priority', value: 20, color: '#E6F0EE' }
  ];

  return (
    <div className="space-y-6">
      {/* Header - Left Aligned */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Care Coordination Velocity Tracker</h2>
        </div>
        <p className="text-sm text-gray-600">
          Track your patient care progress against target population
        </p>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
            <Eye className="h-4 w-4 mr-1" />
            View Patient List
          </Button>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
            <Calendar className="h-4 w-4 mr-1" />
            Change Date Range
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-sm text-blue-700 mb-1">Patients engaged this week</div>
            <div className="text-3xl font-bold text-blue-800 mb-1">5</div>
            <div className="flex items-center">
              <span className="text-xs text-green-600 font-medium">↑ 25%</span>
            </div>
            <div className="text-xs text-blue-600 mt-1">Total: 15 this month</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="text-sm text-purple-700 mb-1">Care target</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold text-purple-800">80%</span>
              <span className="text-sm text-purple-600">complete</span>
            </div>
            <Progress value={80} className="h-2 mb-1" />
            <div className="text-xs text-purple-600">4 of 5 target patients</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-sm text-green-700 mb-1">Engagement rate</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold text-green-800">90%</span>
              <span className="text-sm text-green-600">response</span>
            </div>
            <div className="text-xs text-green-600">9 of 10 patients contacted</div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Trend Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Patient Engagement Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrendData}>
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="enrolled" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Hello Dr. Martinez</h3>
            <Badge className="bg-green-100 text-green-800 border-green-300">Great week!</Badge>
          </div>
          <p className="text-gray-700 mb-4">
            This week, you supported <strong>5 patients</strong>, completed <strong>8 care goals</strong>, and logged <strong>22 minutes</strong> of thoughtful, efficient care. <span className="text-blue-600 font-medium">That's 15% more time than last week.</span>
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Patients Supported</div>
                <div className="text-xl font-bold text-gray-900">5</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Goals Completed</div>
                <div className="text-xl font-bold text-gray-900">8</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-sm text-gray-600">Time Logged</div>
                <div className="text-xl font-bold text-gray-900">22 min</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-sm text-gray-600">AI Edits</div>
                <div className="text-xl font-bold text-gray-900">3</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Allocation Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Average Time per Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeAllocationData}>
                  <XAxis 
                    dataKey="activity" 
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="minutes" fill="#1E4D36" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {timeAllocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.activity}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.minutes} min</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Priority Distribution */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
              <Target className="h-5 w-5" />
              Task Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
