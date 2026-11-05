export const agentChat = {
  caseNumber: 'CASE-2026-0142',
  title: 'Investigate suspicious endpoint behavior',
  reasoning:
    'The endpoint executed a newly observed PowerShell command shortly after an external connection. I will validate the evidence and create a case with the supporting events.',
  tools: [
    {
      name: 'search_events',
      input: 'host.name: FIN-WS-044 AND process.name: powershell.exe',
      output: '12 matching events found. First execution: 09:42 UTC.',
    },
    {
      name: 'create_case',
      input: 'Create an investigation case from the selected evidence.',
    },
  ],
  plan: [
    { title: 'Review endpoint evidence', state: 'Complete' },
    { title: 'Create investigation case', state: 'In progress' },
    { title: 'Notify the case owner', state: 'Pending' },
  ],
}

export const blueprintDetails = {
  name: 'Endpoint investigation',
  status: 'Draft',
  owner: 'Example analyst',
  summary:
    'Collect evidence for suspicious endpoint behavior and prepare a structured investigation case.',
  steps: ['Search endpoint events', 'Assess suspicious process activity', 'Create and assign a case'],
}
