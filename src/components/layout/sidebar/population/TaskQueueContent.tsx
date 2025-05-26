
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import { populationTasksData, PopulationTask } from '@/data/populationTasksData';
import { useNavigate } from 'react-router-dom';

const TaskRow: React.FC<{ task: PopulationTask }> = ({ task }) => {
  const navigate = useNavigate();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleTakeAction = () => {
    if (task.patientId === 'P100592') {
      navigate(`/patient/${task.patientId}`);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-3">
        <div className="space-y-1">
          <div className="font-medium text-sm text-[#1E4D36]">{task.title}</div>
          <div className="text-xs text-gray-600">{task.description}</div>
        </div>
      </td>
      <td className="p-3">
        <div className="text-sm text-gray-700">{task.patientName}</div>
        <div className="text-xs text-gray-500">ID: {task.patientId}</div>
      </td>
      <td className="p-3">
        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </Badge>
      </td>
      <td className="p-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={12} />
          <span>{task.estimatedTime}</span>
        </div>
      </td>
      <td className="p-3">
        <Badge variant="outline" className="text-xs">
          {task.status.replace('-', ' ')}
        </Badge>
      </td>
      <td className="p-3">
        <div className="text-xs text-gray-600">{task.dueDate}</div>
      </td>
      <td className="p-3">
        <Button 
          size="sm" 
          className="h-6 px-2 text-xs bg-[#1E4D36] hover:bg-[#2A6349]"
          onClick={handleTakeAction}
        >
          <ArrowRight size={12} className="mr-1" />
          Take Action
        </Button>
      </td>
    </tr>
  );
};

export const TaskQueueContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const filteredTasks = populationTasksData.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    const matchesTime = timeFilter === 'all' || 
      (timeFilter === 'overdue' && new Date(task.dueDate) < new Date()) ||
      (timeFilter === 'today' && task.dueDate === new Date().toISOString().split('T')[0]) ||
      (timeFilter === 'week' && new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesPriority && matchesTime;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1E4D36]">Population Task Queue</h2>
        <Badge variant="outline" className="text-xs">
          {filteredTasks.length} of {populationTasksData.length} Tasks
        </Badge>
      </div>
      
      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks, patients, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32 text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32 text-xs">
              <SelectValue placeholder="Due Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="today">Due Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tasks Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Task</th>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
        
        {filteredTasks.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Filter className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No tasks match your current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
