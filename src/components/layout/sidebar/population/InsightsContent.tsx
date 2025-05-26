
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  AlertTriangle,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

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
  const timeAllocationData = [
    { activity: 'Patient Calls', minutes: 180, percentage: 35 },
    { activity: 'Documentation', minutes: 120, percentage: 23 },
    { activity: 'Care Planning', minutes: 90, percentage: 17 },
    { activity: 'Provider Coordination', minutes: 75, percentage: 15 },
    { activity: 'Administrative', minutes: 50, percentage: 10 }
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

  const metrics = [
    {
      title: 'Avg Time per Patient',
      value: '42 min',
      change: '+5%',
      changeType: 'increase',
      icon: Clock,
      color: 'text-[#1E4D36]',
      bgColor: 'bg-[#EBF4F0]'
    },
    {
      title: 'Tasks Completed',
      value: '87%',
      change: '+12%',
      changeType: 'increase',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Care Goals Met',
      value: '78%',
      change: '+8%',
      changeType: 'increase',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Documentation Time',
      value: '23%',
      change: '-3%',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <BarChart3 size={48} className="mx-auto text-[#1E4D36] mb-4" />
        <h2 className="text-xl font-semibold text-[#1E4D36] mb-2">Care Coordination Insights</h2>
        <p className="text-sm text-gray-600">
          Analyze time allocation and efficiency patterns to optimize care delivery.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Allocation Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Time Allocation by Activity
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

        {/* Efficiency Trend */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Efficiency Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyTrendData}>
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#1E4D36" 
                    strokeWidth={3}
                    dot={{ fill: "#1E4D36", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Current Efficiency</span>
                <span className="font-bold text-[#1E4D36] text-lg">82%</span>
              </div>
              <Progress value={82} className="mt-2 h-2" />
              <p className="text-xs text-gray-500 mt-2">
                Efficiency improved by 10% over the last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Priority Distribution */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
            <Users className="h-5 w-5" />
            Task Priority Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
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
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Recommendations</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Strength</span>
                  </div>
                  <p className="text-xs text-green-700">
                    High task completion rate shows strong care coordination
                  </p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Opportunity</span>
                  </div>
                  <p className="text-xs text-orange-700">
                    Reduce documentation time by 5% to increase patient interaction
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Focus</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Prioritize high-risk patients to improve care outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
