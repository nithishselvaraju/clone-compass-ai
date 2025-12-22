import React, { useState } from 'react';
import { FiDatabase, FiGlobe, FiLink, FiPlus, FiTrash2, FiEdit, FiRefreshCw, FiCheck } from 'react-icons/fi';

const DataSourcesStep = ({ data, onUpdate }) => {


    const [sources, setSources] = useState([
        {
            id: 1,
            name: 'Customer Database',
            type: 'database',
            status: 'connected',
            connectionString: 'postgresql://user:pass@localhost:5432/customers',
            lastSynced: '5 minutes ago'
        },
        {
            id: 2,
            name: 'Product API',
            type: 'api',
            status: 'connected',
            endpoint: 'https://api.products.com/v1',
            lastSynced: '1 hour ago'
        },
        {
            id: 3,
            name: 'CRM Webhook',
            type: 'webhook',
            status: 'disconnected',
            endpoint: 'https://crm.example.com/webhook',
            lastSynced: '2 days ago'
        }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newSource, setNewSource] = useState({
        name: '',
        type: 'database',
        connectionString: '',
        endpoint: '',
        authentication: 'none',
        apiKey: '',
        username: '',
        password: ''
    });

    const sourceTypes = [
        { id: 'database', name: 'Database', icon: <FiDatabase />, color: 'text-blue-600' },
        { id: 'api', name: 'API', icon: <FiGlobe />, color: 'text-green-600' },
        { id: 'webhook', name: 'Webhook', icon: <FiLink />, color: 'text-purple-600' },
        { id: 'file', name: 'File System', icon: <FiDatabase />, color: 'text-yellow-600' },
        { id: 'queue', name: 'Message Queue', icon: <FiLink />, color: 'text-red-600' },
    ];

    const handleAddSource = () => {
        if (!newSource.name.trim()) return;

        const source = {
            id: Date.now(),
            name: newSource.name,
            type: newSource.type,
            status: 'disconnected',
            connectionString: newSource.connectionString,
            endpoint: newSource.endpoint,
            lastSynced: 'Never'
        };

        const updatedSources = [...sources, source];
        setSources(updatedSources);
        onUpdate(updatedSources);
        setShowAddModal(false);
        setNewSource({
            name: '',
            type: 'database',
            connectionString: '',
            endpoint: '',
            authentication: 'none',
            apiKey: '',
            username: '',
            password: ''
        });
    };

    const handleDeleteSource = (id) => {
        const updatedSources = sources.filter(source => source.id !== id);
        setSources(updatedSources);
        onUpdate(updatedSources);
    };

    const handleTestConnection = (id) => {
        const updatedSources = sources.map(source => {
            if (source.id === id) {
                return { ...source, status: 'connected', lastSynced: 'Just now' };
            }
            return source;
        });
        setSources(updatedSources);
        onUpdate(updatedSources);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'connected': return 'bg-green-100 text-green-800';
            case 'disconnected': return 'bg-red-100 text-red-800';
            case 'syncing': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className='main-content px-10'>
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-black-500 mb-4">Data Sources Configuration</h3>
                {/* <p className="text-sm text-gray-600 mb-6">Connect external data sources for real-time access and processing.</p> */}
                <div className='heighligts my-4  font-md' >
                    <p>Connect external data sources for real-time access and processing.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Source List */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">Connected Sources ({sources.length})</h4>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="check-btn flex items-center gap-2 "
                        >
                            <FiPlus /> Add Source
                        </button>
                    </div>

                    <div className="space-y-4">
                        {sources.map((source) => (
                            <div key={source.id} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${getStatusColor(source.status)}`}>
                                            {sourceTypes.find(t => t.id === source.type)?.icon}
                                        </div>
                                        <div>
                                            <h5 className="font-semibold">{source.name}</h5>
                                            <p className="text-sm text-gray-500">{source.type.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <span className={`status-badge ${getStatusColor(source.status)}`}>
                                        {source.status}
                                    </span>
                                </div>

                                <div className="text-sm text-gray-600 mb-4">
                                    {source.type === 'database' ? (
                                        <div className="font-mono text-xs truncate"><p>{source.connectionString} </p></div>
                                    ) : (
                                        <div className="font-mono text-xs truncate"><p>{source.endpoint} </p></div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-gray-500">
                                        <p>
                                            Last synced: {source.lastSynced}

                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleTestConnection(source.id)}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <FiRefreshCw /> Test
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSource(source.id)}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {sources.length === 0 && (
                            <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                                <FiDatabase className="mx-auto text-3xl mb-2" />
                                <p>No data sources connected</p>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="btn btn-primary mt-4"
                                >
                                    <FiPlus /> Add Your First Source
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Configuration & Preview */}
                <div>
                    <div className="card">
                        <h4 className="font-semibold mb-4">Sync Configuration</h4>

                        <div className="space-y-4">
                            <div>
                                <label className="label">Sync Frequency</label>
                                <select className="select">
                                    <option>Real-time</option>
                                    <option>Every 5 minutes</option>
                                    <option>Every hour</option>
                                    <option>Every 6 hours</option>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">Data Retention</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-600">Keep data for</label>
                                        <select className="select">
                                            <option>30 days</option>
                                            <option>90 days</option>
                                            <option>1 year</option>
                                            <option>Forever</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">Archive after</label>
                                        <select className="select">
                                            <option>7 days</option>
                                            <option>30 days</option>
                                            <option>Never</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="label">Access Control</label>
                                <div className="space-y-2">
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        Read access
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        Write access
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        Cache responses
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        Encrypt stored data
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="label">Error Handling</label>
                                <select className="select">
                                    <option>Retry 3 times then fail</option>
                                    <option>Retry indefinitely</option>
                                    <option>Skip failed records</option>
                                    <option>Stop on first error</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Data Preview */}
                    <div className="card mt-4">
                        <h4 className="font-semibold mb-4">Data Preview</h4>
                        <div className="text-sm text-gray-600 mb-2">Sample data from connected sources:</div>
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                            <pre className="text-xs font-mono overflow-auto">
                                {`[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "status": "active"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "inactive"
  }
]`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Source Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="card w-full max-w-2xl">
                        <div className="card-header">
                            <h3 className="card-title">Add New Data Source</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="label">Source Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={newSource.name}
                                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                                    placeholder="e.g., Customer Database"
                                />
                            </div>

                            <div>
                                <label className="label">Source Type</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {sourceTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            className={`p-3 border rounded-lg flex flex-col items-center gap-2 ${newSource.type === type.id
                                                ? 'border-primary bg-primary-light'
                                                : 'border-gray-200'
                                                }`}
                                            onClick={() => setNewSource({ ...newSource, type: type.id })}
                                        >
                                            <span className={type.color}>{type.icon}</span>
                                            <span className="text-xs">{type.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {newSource.type === 'database' && (
                                <div>
                                    <label className="label">Connection String</label>
                                    <input
                                        type="text"
                                        className="input font-mono text-sm"
                                        value={newSource.connectionString}
                                        onChange={(e) => setNewSource({ ...newSource, connectionString: e.target.value })}
                                        placeholder="postgresql://username:password@localhost:5432/database"
                                    />
                                </div>
                            )}

                            {(newSource.type === 'api' || newSource.type === 'webhook') && (
                                <div>
                                    <label className="label">Endpoint URL</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={newSource.endpoint}
                                        onChange={(e) => setNewSource({ ...newSource, endpoint: e.target.value })}
                                        placeholder="https://api.example.com/v1/endpoint"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="label">Authentication</label>
                                <select
                                    className="select"
                                    value={newSource.authentication}
                                    onChange={(e) => setNewSource({ ...newSource, authentication: e.target.value })}
                                >
                                    <option value="none">No Authentication</option>
                                    <option value="apiKey">API Key</option>
                                    <option value="basic">Basic Auth</option>
                                    <option value="oauth">OAuth 2.0</option>
                                    <option value="bearer">Bearer Token</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddSource}
                                    className="btn btn-primary flex-1"
                                >
                                    <FiCheck /> Connect Source
                                </button>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="btn btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataSourcesStep;