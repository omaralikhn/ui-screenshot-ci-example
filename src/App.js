import React from 'react'
import {
  Avatar,
  Box,
  Chip,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import { agentChat, blueprintDetails } from './fixtures'

const theme = createTheme({
  palette: {
    background: { default: '#edf2f7', paper: '#ffffff' },
    primary: { main: '#195fb8' },
    text: { primary: '#172b4d', secondary: '#52637d' },
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
})

export function App() {
  const content = window.location.pathname.startsWith('/blueprints') ? <BlueprintDetails /> : <AgentChat />

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  )
}

function AgentChat() {
  return (
    <Box data-testid="agent-chat-region" sx={{ bgcolor: '#edf2f7', minHeight: 920, p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ maxWidth: 1360, mx: 'auto' }}>
        <Paper aria-label="Agent conversation" component="main" elevation={0} sx={{ border: '1px solid #dbe5f0', flex: 1, overflow: 'hidden' }}>
          <Box sx={{ alignItems: 'center', bgcolor: '#10233f', color: 'white', display: 'flex', px: 3, py: 2 }}>
            <SmartToyOutlinedIcon sx={{ mr: 1.5 }} />
            <Box>
              <Typography fontWeight={700} variant="h6">Agent investigation</Typography>
              <Typography color="#c9d8ec" variant="body2">{agentChat.caseNumber}</Typography>
            </Box>
            <Chip label="In progress" size="small" sx={{ bgcolor: '#dbeafe', color: '#133e76', ml: 'auto' }} />
          </Box>

          <Stack spacing={2.5} sx={{ p: 3 }}>
            <Message author="Alex Morgan" avatar="AM" tone="#e8f0fe">
              Investigate the suspicious endpoint activity and prepare a case if the evidence supports escalation.
            </Message>

            <Message author="Investigation agent" avatar="AI" tone="#dff3ec">
              <Typography color="text.primary" variant="body1">I found endpoint activity that needs review.</Typography>
              <Paper elevation={0} sx={{ bgcolor: '#f6f8fb', border: '1px solid #dce5ef', mt: 1.5, p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ExpandMoreIcon color="primary" />
                  <Typography fontWeight={700}>Reasoning</Typography>
                  <Chip label="Expanded" size="small" variant="outlined" />
                </Stack>
                <Typography color="text.secondary" sx={{ lineHeight: 1.6, mt: 1 }} variant="body2">
                  {agentChat.reasoning}
                </Typography>
              </Paper>

              <ToolCard expanded tool={agentChat.tools[0]} />
              <ToolCard tool={agentChat.tools[1]} />
            </Message>
          </Stack>
        </Paper>

        <Paper aria-label="Investigation plan" elevation={0} sx={{ border: '1px solid #dbe5f0', flexBasis: 335, height: 'fit-content', p: 2.5 }}>
          <Typography fontWeight={700} variant="h6">Investigation plan</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">Three steps keep this response auditable.</Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            {agentChat.plan.map((step) => (
              <ListItem alignItems="flex-start" disableGutters key={step.title} sx={{ gap: 1.25, py: 1 }}>
                {step.state === 'Complete' ? <CheckCircleOutlineIcon color="success" fontSize="small" /> : <CircleOutlinedIcon color="primary" fontSize="small" />}
                <ListItemText primary={step.title} secondary={step.state} primaryTypographyProps={{ fontWeight: 500, variant: 'body2' }} secondaryTypographyProps={{ color: step.state === 'In progress' ? 'primary' : 'text.secondary', variant: 'caption' }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Stack>
    </Box>
  )
}

function BlueprintDetails() {
  return (
    <Box data-testid="blueprint-details-region" sx={{ bgcolor: '#edf2f7', minHeight: 920, p: 3 }}>
      <Box sx={{ maxWidth: 1120, mx: 'auto' }}>
        <Typography color="text.secondary" variant="body2">Blueprints / {blueprintDetails.name}</Typography>
        <Paper component="main" elevation={0} sx={{ border: '1px solid #dbe5f0', mt: 2, p: 4 }}>
          <Stack alignItems="flex-start" direction="row" justifyContent="space-between">
            <Box>
              <Typography fontWeight={700} variant="h4">{blueprintDetails.name}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }} variant="body1">{blueprintDetails.summary}</Typography>
            </Box>
            <Chip color="warning" label={blueprintDetails.status} />
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={5}>
            <Detail label="Owner" value={blueprintDetails.owner} />
            <Detail label="Last reviewed" value="2026-11-05" />
            <Detail label="Response mode" value="Guided investigation" />
          </Stack>
          <Typography fontWeight={700} sx={{ mt: 4 }} variant="h6">Workflow steps</Typography>
          <Stack spacing={1.5} sx={{ mt: 1.5 }}>
            {blueprintDetails.steps.map((step, index) => (
              <Paper elevation={0} key={step} sx={{ alignItems: 'center', bgcolor: '#f6f8fb', border: '1px solid #dce5ef', display: 'flex', p: 2 }}>
                <Avatar sx={{ bgcolor: '#dbeafe', color: '#174ea6', fontSize: 14, height: 28, mr: 1.5, width: 28 }}>{index + 1}</Avatar>
                <Typography fontWeight={500} variant="body2">{step}</Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

function Detail({ label, value }) {
  return (
    <Box>
      <Typography color="text.secondary" variant="caption">{label}</Typography>
      <Typography fontWeight={500} sx={{ mt: 0.25 }} variant="body2">{value}</Typography>
    </Box>
  )
}

function Message({ author, avatar, children, tone }) {
  return (
    <Stack alignItems="flex-start" direction="row" spacing={1.5}>
      <Avatar sx={{ bgcolor: tone, color: '#1d4b7a', fontSize: 13, fontWeight: 700, height: 34, width: 34 }}>{avatar}</Avatar>
      <Box sx={{ maxWidth: '90%' }}>
        <Typography color="text.secondary" display="block" fontWeight={700} variant="caption">{author}</Typography>
        {children}
      </Box>
    </Stack>
  )
}

function ToolCard({ expanded = false, tool }) {
  return (
    <Paper elevation={0} sx={{ bgcolor: expanded ? '#fbfcfe' : '#ffffff', border: '1px solid #dce5ef', mt: 1.5, overflow: 'hidden' }}>
      <Box sx={{ alignItems: 'center', display: 'flex', px: 2, py: 1.25 }}>
        <ExpandMoreIcon color="primary" sx={{ mr: 1, transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
        <Typography fontWeight={700} variant="body2">Tool: {tool.name}</Typography>
        <Chip label={expanded ? 'Expanded' : 'Collapsed'} size="small" sx={{ ml: 'auto' }} variant="outlined" />
      </Box>
      {expanded && (
        <Box sx={{ borderTop: '1px solid #dce5ef', px: 2, py: 1.5 }}>
          <Typography color="text.secondary" variant="caption">Input</Typography>
          <pre>{tool.input}</pre>
          <Typography color="text.secondary" sx={{ display: 'block', mt: 1.5 }} variant="caption">Result</Typography>
          <Typography variant="body2">{tool.output}</Typography>
        </Box>
      )}
    </Paper>
  )
}
