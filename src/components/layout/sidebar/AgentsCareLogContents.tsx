
import React from 'react';

interface AgentsContentProps {
  type: 'agents' | 'careLog';
}

export const AgentsCareLogContents: React.FC<AgentsContentProps> = ({ type }) => {
  if (type === 'agents') {
    return (
      <div>
        <h3 className="font-medium text-xl text-gray-900 mb-4">AI Agents</h3>
        <p className="text-gray-600">Agents content will be displayed here.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-xl text-gray-900 mb-4">Care Log</h3>
      <p className="text-gray-600">Care log and history will be displayed here.</p>
    </div>
  );
};
