
// ==================== COMPONENT 3: SEMANTIC DATA LAYER PAGE ====================
import React, { useState } from 'react';
import {
    Paper, Typography, Grid, TextField, Button, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Card, CardContent, Box, FormControl,
    InputLabel, Select, MenuItem, List, ListItem, ListItemIcon,
    ListItemText, Accordion, AccordionSummary, AccordionDetails,
    Switch, FormControlLabel
} from '@mui/material';
import {
    Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon,
    Schema as SchemaIcon, Category as CategoryIcon,
    Link as LinkIcon, Map as MapIcon,
    ExpandMore as ExpandMoreIcon, Storage as StorageIcon,
} from '@mui/icons-material';
import DOMAIN_TEMPLATES from './DOMAIN_TEMPLATES';



const DataMappingTable = ({ source, entity, onMap, existingMappings }) => {
    const [selectedTable, setSelectedTable] = useState(source.tables[0]);

    return (
        <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>Table: {selectedTable.name}</Typography>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Column Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Map to Field</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedTable.columns.map(column => {
                            const existingMapping = existingMappings.find(m =>
                                m.source === `${selectedTable.name}.${column.name}`
                            );

                            return (
                                <TableRow key={column.name}>
                                    <TableCell>{column.name}</TableCell>
                                    <TableCell>{column.type}</TableCell>
                                    <TableCell>
                                        <Select
                                            size="small"
                                            fullWidth
                                            value={existingMapping?.semanticField || ''}
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    onMap(
                                                        `${selectedTable.name}.${column.name}`,
                                                        entity.id,
                                                        e.target.value
                                                    );
                                                }
                                            }}
                                        >
                                            <MenuItem value="">Select field...</MenuItem>
                                            {entity.fields.map(field => (
                                                <MenuItem key={field.id} value={field.id}>
                                                    {field.name} ({field.type})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        {existingMapping ? (
                                            <Chip label="Mapped" size="small" color="success" />
                                        ) : (
                                            <Chip label="Unmapped" size="small" variant="outlined" />
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};


export const SemanticDataLayerPage = ({ domain = 'insurance' }) => {
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [dataSources, setDataSources] = useState([
        {
            id: 'postgres_1',
            name: 'Customer Database',
            type: 'postgres',
            connection: 'postgresql://user:pass@localhost:5432/customers',
            tables: [
                {
                    name: 'policy_master',
                    columns: [
                        { name: 'policy_no', type: 'string' },
                        { name: 'cust_name', type: 'string' },
                        { name: 'premium_amt', type: 'decimal' },
                        { name: 'expiry_dt', type: 'date' }
                    ]
                }
            ]
        }
    ]);
    const [mappings, setMappings] = useState([]);

    const semanticEntities = DOMAIN_TEMPLATES[domain]?.semanticEntities || [];

    const handleCreateMapping = (sourcePath, entityId, fieldId) => {
        const newMapping = {
            id: `map_${Date.now()}`,
            source: sourcePath,
            semanticEntity: entityId,
            semanticField: fieldId,
            transformation: null,
            qualityScore: 0.9
        };

        setMappings([...mappings, newMapping]);
    };

    const getEntityMappings = (entityId) => {
        return mappings.filter(m => m.semanticEntity === entityId);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchemaIcon /> Semantic Data Layer
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Map physical data sources to semantic business entities
            </Typography>

            <Grid container spacing={3}>
                {/* Left: Semantic Entities */}
                <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ p: 2, height: '500px', overflow: 'auto' }}>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>Semantic Entities</Typography>
                        <List>
                            {semanticEntities.map(entity => (
                                <ListItem
                                    key={entity.id}
                                    button
                                    selected={selectedEntity?.id === entity.id}
                                    onClick={() => setSelectedEntity(entity)}
                                    sx={{
                                        borderRadius: 1,
                                        mb: 1,
                                        border: '1px solid',
                                        borderColor: selectedEntity?.id === entity.id ? 'primary.main' : 'transparent'
                                    }}
                                >
                                    <ListItemIcon>
                                        <CategoryIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={entity.name}
                                        secondary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                <Chip
                                                    label={`${getEntityMappings(entity.id).length} mapped`}
                                                    size="small"
                                                    color={
                                                        getEntityMappings(entity.id).length === entity.fields.length ?
                                                            'success' : 'default'
                                                    }
                                                />
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Middle: Entity Details & Mapping */}
                <Grid item xs={12} md={8}>
                    {selectedEntity ? (
                        <Paper variant="outlined" sx={{ p: 3, height: '500px', overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6">{selectedEntity.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedEntity.description}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={
                                        getEntityMappings(selectedEntity.id).length === selectedEntity.fields.length ?
                                            'Fully Mapped' : 'Partially Mapped'
                                    }
                                    color={
                                        getEntityMappings(selectedEntity.id).length === selectedEntity.fields.length ?
                                            'success' : 'warning'
                                    }
                                    size="small"
                                />
                            </Box>

                            {/* Entity Fields */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>Semantic Fields</Typography>
                                <Grid container spacing={2}>
                                    {selectedEntity.fields.map(field => {
                                        const mapping = mappings.find(m =>
                                            m.semanticEntity === selectedEntity.id &&
                                            m.semanticField === field.id
                                        );

                                        return (
                                            <Grid item xs={12} key={field.id}>
                                                <Card variant="outlined">
                                                    <CardContent sx={{ py: 1, px: 2 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Box>
                                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                                    {field.name}
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {field.type} {field.required && '• Required'}
                                                                </Typography>
                                                            </Box>

                                                            {mapping ? (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Chip
                                                                        label={`Mapped to: ${mapping.source}`}
                                                                        size="small"
                                                                        color="success"
                                                                        variant="outlined"
                                                                    />
                                                                    <IconButton size="small">
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Box>
                                                            ) : (
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    onClick={() => {
                                                                        // Open mapping dialog
                                                                    }}
                                                                >
                                                                    Map Field
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>

                            {/* Data Sources */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>Data Sources</Typography>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <StorageIcon />
                                            <Typography>Customer Database</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <DataMappingTable
                                            source={dataSources[0]}
                                            entity={selectedEntity}
                                            onMap={handleCreateMapping}
                                            existingMappings={mappings.filter(m => m.semanticEntity === selectedEntity.id)}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper variant="outlined" sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography color="text.secondary">Select a semantic entity to map</Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};
