
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import { populationTasksData, PopulationTask } from '@/data/populationTasksData';

const TaskRow: React.FC<{ task: PopulationTask }> = ({ task }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'needs-review': return 'bg-orange-100 text-orange-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'needs-qhp': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'needs-review': return 'Needs Review';
      case 'in-progress': return 'In Progress';
      case 'needs-qhp': return 'Needs QHP';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[#1E4D36]">{task.title}</span>
          <span className="text-xs text-gray-600">{task.description}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <User size={12} />
          <span>{task.patientName}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
          {formatStatus(task.status)}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock size={12} />
          <span>{task.estimatedTime}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm text-gray-600">{task.dueDate}</span>
      </TableCell>
      <TableCell>
        {task.assignedTo && (
          <span className="text-sm text-blue-600">{task.assignedTo}</span>
        )}
      </TableCell>
      <TableCell>
        <Button size="sm" className="h-6 px-2 text-xs bg-[#1E4D36] hover:bg-[#2A6349]">
          <ArrowRight size={12} className="mr-1" />
          Take Action
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const TaskQueueContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return populationTasksData.filter(task => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Time filter
      let matchesTime = true;
      if (timeFilter !== 'all') {
        const estimatedMinutes = parseInt(task.estimatedTime);
        switch (timeFilter) {
          case 'quick':
            matchesTime = estimatedMinutes <= 15;
            break;
          case 'medium':
            matchesTime = estimatedMinutes > 15 && estimatedMinutes <= 30;
            break;
          case 'long':
            matchesTime = estimatedMinutes > 30;
            break;
        }
      }

      // Risk filter (using priority as risk indicator)
      let matchesRisk = true;
      if (riskFilter !== 'all') {
        matchesRisk = task.priority.toLowerCase() === riskFilter;
      }

      return matchesSearch && matchesTime && matchesRisk;
    });
  }, [searchTerm, timeFilter, riskFilter, populationTasksData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1E4D36]">Population Task Queue</h2>
        <Badge variant="outline" className="text-xs">
          {filteredTasks.length} of {populationTasksData.length} Tasks
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-[#1E4D36] flex items-center gap-2">
            <Filter size={16} />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search tasks, patients, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-0">
              <label className="text-xs text-gray-600 mb-1 block">Time Required</label>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4D36]"
              >
                <option value="all">All Times</option>
                <option value="quick">Quick (≤15 min)</option>
                <option value="medium">Medium (16-30 min)</option>
                <option value="long">Long (>30 min)</option>
              </select>
            </div>

            <div className="flex-1 min-w-0">
              <label className="text-xs text-gray-600 mb-1 block">Risk Level</label>
              <select 
                value={riskFilter} 
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4D36]"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto medical-scrollbar">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Task</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Patient</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Priority</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Status</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Time</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Due Date</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Assigned To</TableHead>
                  <TableHead className="text-xs font-medium text-[#1E4D36]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map(task => (
                  <TaskRow key={task.id} task={task} />
                ))}
                {filteredTasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <p className="text-sm text-gray-500">
                        {searchTerm || timeFilter !== 'all' || riskFilter !== 'all' 
                          ? 'No tasks match your current filters' 
                          : 'No tasks available'
                        }
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
