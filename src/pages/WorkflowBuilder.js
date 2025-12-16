import React, { useState, useRef, useEffect } from 'react';
import {
    FiPlus,
    FiPlay,
    FiSave,
    FiTrash2,
    FiMove,
    FiChevronDown,
    FiChevronUp,
    FiSettings,
    FiFileText,
    FiCpu,
    FiDatabase,
    FiMail,
    FiClock,
    FiLink,
    FiActivity,
    FiX,
    FiCopy
} from 'react-icons/fi';

const WorkflowBuilder = () => {
    const [workflows, setWorkflows] = useState([
        { id: 1, name: 'Customer Support', nodes: 5, status: 'active', lastRun: '2 hours ago' },
        { id: 2, name: 'Report Generator', nodes: 3, status: 'inactive', lastRun: '1 day ago' },
        { id: 3, name: 'Data Sync', nodes: 4, status: 'active', lastRun: '5 minutes ago' },
    ]);

    const [nodes, setNodes] = useState([
        {
            id: 1,
            type: 'trigger',
            title: 'Email Trigger',
            icon: <FiMail />,
            x: 100,
            y: 100,
            isDragging: false,
            config: {
                triggerType: 'email',
                emailAddress: 'inbox@example.com',
                description: 'When an email is received'
            }
        },
        {
            id: 2,
            type: 'action',
            title: 'AI Inference',
            icon: <FiCpu />,
            x: 350,
            y: 100,
            isDragging: false,
            config: {
                model: 'gpt-4',
                temperature: 0.7,
                maxTokens: 1000,
                description: 'Run AI model on the input'
            }
        },
        {
            id: 3,
            type: 'action',
            title: 'API Call',
            icon: <FiLink />,
            x: 600,
            y: 100,
            isDragging: false,
            config: {
                url: 'https://api.example.com',
                method: 'GET',
                headers: {},
                description: 'Call external API'
            }
        },
        {
            id: 4,
            type: 'action',
            title: 'Database',
            icon: <FiDatabase />,
            x: 350,
            y: 250,
            isDragging: false,
            config: {
                operation: 'query',
                query: '',
                description: 'Database read/write operation'
            }
        },
    ]);

    const [selectedNode, setSelectedNode] = useState(3);
    const [workflowName, setWorkflowName] = useState('Customer Support Workflow');
    const [draggingNodeId, setDraggingNodeId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [expandedSections, setExpandedSections] = useState({
        configuration: true,
        description: true
    });
    const [isDraggingFromLibrary, setIsDraggingFromLibrary] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

    const canvasRef = useRef(null);
    const dragPreviewRef = useRef(null);

    const nodeTypes = [
        { type: 'trigger', name: 'Email Trigger', icon: <FiMail />, desc: 'When email received', color: 'bg-blue-100 text-blue-600' },
        { type: 'trigger', name: 'Schedule', icon: <FiClock />, desc: 'Run on schedule (cron)', color: 'bg-purple-100 text-purple-600' },
        { type: 'trigger', name: 'Webhook', icon: <FiLink />, desc: 'HTTP endpoint trigger', color: 'bg-green-100 text-green-600' },
        { type: 'trigger', name: 'Manual', icon: <FiActivity />, desc: 'Manual trigger', color: 'bg-yellow-100 text-yellow-600' },
        { type: 'action', name: 'AI Inference', icon: <FiCpu />, desc: 'Run AI model', color: 'bg-pink-100 text-pink-600' },
        { type: 'action', name: 'Send Email', icon: <FiMail />, desc: 'Send email notification', color: 'bg-blue-100 text-blue-600' },
        { type: 'action', name: 'API Call', icon: <FiLink />, desc: 'Call external API', color: 'bg-green-100 text-green-600' },
        { type: 'action', name: 'Database', icon: <FiDatabase />, desc: 'Database operation', color: 'bg-indigo-100 text-indigo-600' },
        { type: 'action', name: 'Generate Report', icon: <FiFileText />, desc: 'Create PDF/Excel report', color: 'bg-orange-100 text-orange-600' },
        { type: 'action', name: 'Wait', icon: <FiClock />, desc: 'Delay execution', color: 'bg-gray-100 text-gray-600' },
    ];

    // Handle drag start from node library
    const handleLibraryDragStart = (e, nodeType) => {
        e.dataTransfer.setData('nodeType', JSON.stringify(nodeType));
        e.dataTransfer.effectAllowed = 'copy';
        setIsDraggingFromLibrary(true);
        setDragStartPos({ x: e.clientX, y: e.clientY });

        // Create drag preview
        const dragPreview = document.createElement('div');
        dragPreview.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      width: 200px;
      padding: 16px;
      background: white;
      border: 2px solid #4f46e5;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      opacity: 0.8;
    `;
        dragPreview.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: #f3f4f6; border-radius: 6px;">
          ${React.isValidElement(nodeType.icon) ? '📧' : '📦'}
        </div>
        <div>
          <div style="font-weight: 600; font-size: 14px;">${nodeType.name}</div>
          <div style="font-size: 12px; color: #6b7280;">${nodeType.type}</div>
        </div>
      </div>
    `;
        document.body.appendChild(dragPreview);
        e.dataTransfer.setDragImage(dragPreview, 100, 25);

        // Clean up preview after drag
        setTimeout(() => document.body.removeChild(dragPreview), 0);
    };

    // Handle drag over canvas
    const handleCanvasDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    // Handle drop on canvas
    const handleCanvasDrop = (e) => {
        e.preventDefault();
        setIsDraggingFromLibrary(false);

        const nodeTypeData = e.dataTransfer.getData('nodeType');
        if (!nodeTypeData) return;

        const nodeType = JSON.parse(nodeTypeData);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Calculate drop position relative to canvas
        const x = e.clientX - rect.left - 100; // Center the node
        const y = e.clientY - rect.top - 25;

        const newNode = {
            id: Date.now(),
            type: nodeType.type,
            title: nodeType.name,
            icon: nodeType.icon,
            x: Math.max(50, x),
            y: Math.max(50, y),
            isDragging: false,
            config: getDefaultConfig(nodeType)
        };

        setNodes([...nodes, newNode]);
        setSelectedNode(newNode.id);
    };

    // Handle drag start from existing node
    const handleNodeDragStart = (e, nodeId) => {
        e.stopPropagation();
        setDraggingNodeId(nodeId);

        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });

        e.dataTransfer.setData('nodeId', nodeId.toString());
        e.dataTransfer.effectAllowed = 'move';

        // Create drag preview
        const dragPreview = e.currentTarget.cloneNode(true);
        dragPreview.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      opacity: 0.7;
      cursor: grabbing;
    `;
        document.body.appendChild(dragPreview);
        e.dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);

        setTimeout(() => document.body.removeChild(dragPreview), 0);
    };

    // Handle node drag over
    const handleNodeDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    // Handle node drop
    const handleNodeDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const nodeId = e.dataTransfer.getData('nodeId');
        if (!nodeId) return;

        const node = nodes.find(n => n.id === parseInt(nodeId));
        if (!node || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Calculate new position
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;

        setNodes(nodes.map(n => {
            if (n.id === parseInt(nodeId)) {
                return {
                    ...n,
                    x: Math.max(0, Math.min(x, rect.width - 200)),
                    y: Math.max(0, Math.min(y, rect.height - 150))
                };
            }
            return n;
        }));

        setDraggingNodeId(null);
    };

    // Mouse move for dragging
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!draggingNodeId || !canvasRef.current) return;

            const node = nodes.find(n => n.id === draggingNodeId);
            if (!node) return;

            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();

            // Calculate new position
            const x = e.clientX - rect.left - dragOffset.x;
            const y = e.clientY - rect.top - dragOffset.y;

            // Update node position
            setNodes(prevNodes => prevNodes.map(n => {
                if (n.id === draggingNodeId) {
                    return {
                        ...n,
                        x: Math.max(0, Math.min(x, rect.width - 200)),
                        y: Math.max(0, Math.min(y, rect.height - 150)),
                        isDragging: true
                    };
                }
                return n;
            }));
        };

        const handleGlobalMouseUp = () => {
            if (draggingNodeId) {
                setNodes(prevNodes => prevNodes.map(n => {
                    if (n.id === draggingNodeId) {
                        return { ...n, isDragging: false };
                    }
                    return n;
                }));
                setDraggingNodeId(null);
            }
        };

        if (draggingNodeId) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [draggingNodeId, dragOffset, nodes]);

    const getDefaultConfig = (nodeType) => {
        switch (nodeType.name) {
            case 'Email Trigger':
                return { triggerType: 'email', emailAddress: '', description: 'When email received' };
            case 'AI Inference':
                return { model: 'gpt-4', temperature: 0.7, maxTokens: 1000, description: 'Run AI model' };
            case 'API Call':
                return { url: '', method: 'GET', headers: {}, description: 'Call external API' };
            case 'Database':
                return { operation: 'query', query: '', description: 'Database operation' };
            default:
                return { description: nodeType.desc };
        }
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const deleteNode = (nodeId) => {
        setNodes(nodes.filter(n => n.id !== nodeId));
        if (selectedNode === nodeId) {
            setSelectedNode(null);
        }
    };

    const duplicateNode = (nodeId) => {
        const nodeToDuplicate = nodes.find(n => n.id === nodeId);
        if (!nodeToDuplicate) return;

        const newNode = {
            ...nodeToDuplicate,
            id: Date.now(),
            x: nodeToDuplicate.x + 50,
            y: nodeToDuplicate.y + 50
        };

        setNodes([...nodes, newNode]);
        setSelectedNode(newNode.id);
    };

    const selectedNodeData = nodes.find(n => n.id === selectedNode);

    const renderNodeConfiguration = () => {
        if (!selectedNodeData) return null;

        switch (selectedNodeData.title) {
            case 'API Call':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">HTTP Method</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>GET</option>
                                    <option>POST</option>
                                    <option>PUT</option>
                                    <option>DELETE</option>
                                    <option>PATCH</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Timeout (seconds)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                    defaultValue="30"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">API URL</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                placeholder="https://api.example.com/endpoint"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Headers (JSON)</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                                rows="3"
                                placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Request Body (JSON)</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                                rows="4"
                                placeholder='{"key": "value"}'
                            />
                        </div>
                    </div>
                );

            case 'AI Inference':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Model Selection</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                <option>GPT-4</option>
                                <option>GPT-3.5 Turbo</option>
                                <option>Claude 2</option>
                                <option>Llama 2 70B</option>
                                <option>Gemini Pro</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Temperature</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    className="w-full"
                                    defaultValue="0.7"
                                />
                                <div className="text-xs text-gray-500 text-center">0.7</div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Max Tokens</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                    defaultValue="1000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">System Prompt</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                rows="3"
                                placeholder="You are a helpful assistant..."
                            />
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Configuration</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                rows="4"
                                placeholder="Configure this node..."
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="page-container">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <input
                        type="text"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="text-2xl font-bold bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none pb-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">Build automated agentic workflows</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium">
                        <FiPlay /> Test Run
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                        <FiSave /> Save Workflow
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6" style={{ height: 'calc(100vh - 180px)' }}>
                {/* Left Sidebar - Node Library */}
                <div className="col-span-1">
                    <div className="card h-full">
                        <div className="card-header">
                            <h3 className="card-title">Node Library</h3>
                        </div>

                        <div className="space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                            <div className="p-2">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <FiSettings className="text-blue-500" />
                                    Triggers
                                </h4>
                                <div className="space-y-1">
                                    {nodeTypes.filter(n => n.type === 'trigger').map((node, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer border border-transparent hover:border-blue-200"
                                            draggable
                                            onDragStart={(e) => handleLibraryDragStart(e, node)}
                                            onClick={() => {
                                                // Add node on click as well
                                                const canvas = canvasRef.current;
                                                if (canvas) {
                                                    const rect = canvas.getBoundingClientRect();
                                                    const newNode = {
                                                        id: Date.now(),
                                                        type: node.type,
                                                        title: node.name,
                                                        icon: node.icon,
                                                        x: 100,
                                                        y: Math.max(100, (nodes.length * 150) % (rect.height - 200)),
                                                        isDragging: false,
                                                        config: getDefaultConfig(node)
                                                    };
                                                    setNodes([...nodes, newNode]);
                                                    setSelectedNode(newNode.id);
                                                }
                                            }}
                                        >
                                            <div className={`w-8 h-8 rounded flex items-center justify-center ${node.color}`}>
                                                {node.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{node.name}</div>
                                                <div className="text-xs text-gray-500">{node.desc}</div>
                                            </div>
                                            <div className="text-gray-400">
                                                <FiMove size={14} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-2">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <FiActivity className="text-green-500" />
                                    Actions
                                </h4>
                                <div className="space-y-1">
                                    {nodeTypes.filter(n => n.type === 'action').map((node, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer border border-transparent hover:border-green-200"
                                            draggable
                                            onDragStart={(e) => handleLibraryDragStart(e, node)}
                                            onClick={() => {
                                                const canvas = canvasRef.current;
                                                if (canvas) {
                                                    const rect = canvas.getBoundingClientRect();
                                                    const newNode = {
                                                        id: Date.now(),
                                                        type: node.type,
                                                        title: node.name,
                                                        icon: node.icon,
                                                        x: 100,
                                                        y: Math.max(100, (nodes.length * 150) % (rect.height - 200)),
                                                        isDragging: false,
                                                        config: getDefaultConfig(node)
                                                    };
                                                    setNodes([...nodes, newNode]);
                                                    setSelectedNode(newNode.id);
                                                }
                                            }}
                                        >
                                            <div className={`w-8 h-8 rounded flex items-center justify-center ${node.color}`}>
                                                {node.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{node.name}</div>
                                                <div className="text-xs text-gray-500">{node.desc}</div>
                                            </div>
                                            <div className="text-gray-400">
                                                <FiMove size={14} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Canvas Area */}
                <div className="col-span-2">
                    <div className="card h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Workflow Canvas</h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium">
                                    Clear All
                                </button>
                                <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium">
                                    Auto-layout
                                </button>
                            </div>
                        </div>

                        <div
                            ref={canvasRef}
                            className="workflow-canvas bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg relative"
                            style={{ height: 'calc(100% - 60px)' }}
                            onDragOver={handleCanvasDragOver}
                            onDrop={handleCanvasDrop}
                        >
                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {nodes.slice(0, -1).map((node, index) => {
                                    const nextNode = nodes[index + 1];
                                    if (!nextNode) return null;

                                    const startX = node.x + 200;
                                    const startY = node.y + 60;
                                    const endX = nextNode.x;
                                    const endY = nextNode.y + 60;

                                    return (
                                        <line
                                            key={`line-${node.id}-${nextNode.id}`}
                                            x1={startX}
                                            x2={endX}
                                            y1={startY}
                                            y2={endY}
                                            stroke="#4f46e5"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            markerEnd="url(#arrowhead)"
                                        />
                                    );
                                })}
                                <defs>
                                    <marker
                                        id="arrowhead"
                                        markerWidth="10"
                                        markerHeight="7"
                                        refX="9"
                                        refY="3.5"
                                        orient="auto"
                                    >
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
                                    </marker>
                                </defs>
                            </svg>

                            {/* Nodes */}
                            {nodes.map((node) => (
                                <div
                                    key={node.id}
                                    className={`absolute w-64 p-4 border-2 rounded-lg cursor-move transition-all shadow-md ${selectedNode === node.id
                                        ? 'border-blue-500 bg-blue-50 shadow-blue-200'
                                        : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-lg'
                                        } ${node.isDragging ? 'opacity-70 scale-105 z-50' : 'z-10'}`}
                                    style={{
                                        left: `${node.x}px`,
                                        top: `${node.y}px`,
                                        cursor: draggingNodeId === node.id ? 'grabbing' : 'grab'
                                    }}
                                    draggable
                                    onDragStart={(e) => handleNodeDragStart(e, node.id)}
                                    onDragOver={handleNodeDragOver}
                                    onDrop={handleNodeDrop}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedNode(node.id);
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                            {node.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm">{node.title}</h4>
                                            <p className="text-xs text-gray-500">
                                                {node.type === 'trigger' ? 'Trigger' : 'Action'}
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                className="p-1 hover:bg-gray-200 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    duplicateNode(node.id);
                                                }}
                                            >
                                                <FiCopy size={14} />
                                            </button>
                                            <button
                                                className="p-1 hover:bg-red-100 rounded text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNode(node.id);
                                                }}
                                            >
                                                <FiX size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                                        {node.config?.description || 'No description'}
                                    </div>

                                    <div className="text-xs text-gray-400 italic">
                                        Drag to move • Click to configure
                                    </div>
                                </div>
                            ))}

                            {/* Drag Drop Instruction */}
                            {nodes.length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <div className="text-5xl mb-4">📋</div>
                                    <h3 className="text-lg font-medium mb-2">Drag nodes here</h3>
                                    <p className="text-sm">Drag nodes from the library or click to add them</p>
                                    <div className="mt-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FiMove className="text-blue-500" />
                                            <span>Drag nodes to move them</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiLink className="text-blue-500" />
                                            <span>Nodes automatically connect</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Dragging Preview */}
                            {isDraggingFromLibrary && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                                        <div className="text-2xl mb-2">📥</div>
                                        <p className="text-blue-600 font-medium">Drop node here</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Node Configuration */}
                <div className="col-span-1">
                    <div className="card h-full overflow-y-auto">
                        <div className="space-y-6">
                            {selectedNodeData ? (
                                <>
                                    {/* Configure Node Section */}
                                    <div className="border-b pb-4">
                                        <div
                                            className="flex items-center justify-between cursor-pointer mb-3"
                                            onClick={() => toggleSection('configuration')}
                                        >
                                            <h3 className="font-semibold text-gray-800">
                                                Configure Node: {selectedNodeData.title}
                                            </h3>
                                            {expandedSections.configuration ?
                                                <FiChevronUp className="text-gray-500" /> :
                                                <FiChevronDown className="text-gray-500" />
                                            }
                                        </div>

                                        {expandedSections.configuration && (
                                            <div className="space-y-4">
                                                {renderNodeConfiguration()}

                                                <div className="flex gap-2 pt-4">
                                                    <button className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium">
                                                        Save Changes
                                                    </button>
                                                    <button className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-sm">
                                                        Test
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description Section */}
                                    <div>
                                        <div
                                            className="flex items-center justify-between cursor-pointer mb-3"
                                            onClick={() => toggleSection('description')}
                                        >
                                            <h3 className="font-semibold text-gray-800">Description</h3>
                                            {expandedSections.description ?
                                                <FiChevronUp className="text-gray-500" /> :
                                                <FiChevronDown className="text-gray-500" />
                                            }
                                        </div>

                                        {expandedSections.description && (
                                            <div>
                                                <textarea
                                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                                    rows="5"
                                                    placeholder="Describe what this node does..."
                                                    value={selectedNodeData.config?.description || ''}
                                                    onChange={(e) => {
                                                        setNodes(nodes.map(n =>
                                                            n.id === selectedNodeData.id ? {
                                                                ...n,
                                                                config: { ...n.config, description: e.target.value }
                                                            } : n
                                                        ));
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="pt-4 border-t">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                                        <div className="space-y-2">
                                            <button
                                                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded text-sm text-left flex items-center gap-2"
                                                onClick={() => duplicateNode(selectedNodeData.id)}
                                            >
                                                <FiCopy size={14} /> Duplicate Node
                                            </button>
                                            <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded text-sm text-left">
                                                Export Configuration
                                            </button>
                                            <button
                                                className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm text-left flex items-center gap-2"
                                                onClick={() => deleteNode(selectedNodeData.id)}
                                            >
                                                <FiTrash2 size={14} /> Delete Node
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <div className="text-4xl mb-4">⚙️</div>
                                    <h3 className="text-lg font-medium mb-2">Select a Node</h3>
                                    <p className="text-sm">Click on any node to configure it</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowBuilder;