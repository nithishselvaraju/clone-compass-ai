
// ==================== COMPONENT 6: TOOL STUDIO PAGE ====================
import React, { useState } from 'react';
import {
    Paper, Typography, Grid, TextField, Button, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Card, CardContent, FormControl, InputLabel,
    Select, MenuItem, Tabs, Tab, Box
} from '@mui/material';
import {
    Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
    AutoFixHigh as AutoFixHighIcon
} from '@mui/icons-material';

export const ToolStudioPage = ({ industry = 'Insurance' }) => {
    const [tools, setTools] = useState([
        {
            id: 1,
            name: 'get_policy_details',
            description: 'Fetch policy expiry, nominee, premium amount',
            type: 'sql',
            sql: 'SELECT policy_number, expiry_date, nominee_name, premium_amount, due_date FROM policies WHERE policy_number = {{policy_number}}',
            parameters: [{ name: 'policy_number', type: 'string', required: true }]
        }
    ]);

    const [newTool, setNewTool] = useState({
        name: '',
        description: '',
        type: 'sql',
        sql: '',
        parameters: []
    });

    const industryTemplates = {
        Insurance: [
            { name: 'policy_lookup', desc: 'Lookup policy details' },
            { name: 'claim_submission', desc: 'Submit new claim' }
        ],
        Banking: [
            { name: 'balance_check', desc: 'Check account balance' },
            { name: 'transaction_history', desc: 'Get transaction history' }
        ]
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoFixHighIcon /> Tool Studio
            </Typography>

            <Tabs value={0} sx={{ mb: 4 }}>
                <Tab label="Existing Tools" />
                <Tab label="Industry Templates" />
                <Tab label="Create New Tool" />
            </Tabs>

            <Grid container spacing={3}>
                {/* Tools List */}
                <Grid item xs={12} md={8}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tool Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tools.map(tool => (
                                    <TableRow key={tool.id} hover>
                                        <TableCell>{tool.name}</TableCell>
                                        <TableCell>{tool.description}</TableCell>
                                        <TableCell>
                                            <Chip label={tool.type} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Templates */}
                <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                            {industry} Templates
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {(industryTemplates[industry] || []).map(template => (
                                <Chip
                                    key={template.name}
                                    label={template.desc}
                                    onClick={() => setNewTool({
                                        ...newTool,
                                        name: template.name,
                                        description: template.desc
                                    })}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Create Tool Form */}
            <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Create New Tool</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Tool Name"
                            value={newTool.name}
                            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Tool Type</InputLabel>
                            <Select
                                value={newTool.type}
                                label="Tool Type"
                                onChange={(e) => setNewTool({ ...newTool, type: e.target.value })}
                            >
                                <MenuItem value="sql">SQL Query</MenuItem>
                                <MenuItem value="api">API Call</MenuItem>
                                <MenuItem value="function">Function</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={newTool.description}
                            onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                        />
                    </Grid>
                    {newTool.type === 'sql' && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="SQL Query"
                                value={newTool.sql}
                                onChange={(e) => setNewTool({ ...newTool, sql: e.target.value })}
                                placeholder="SELECT * FROM table WHERE id = {{param}}"
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            Add Tool
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    );
};
