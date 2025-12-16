import React, { useState } from 'react';
import { FiPlus, FiUpload, FiDownload, FiTrash2, FiCheck } from 'react-icons/fi';

const DataTraining = () => {
    const [trainingData, setTrainingData] = useState([
        { id: 1, name: 'Product FAQs', type: 'QA', items: 45, status: 'trained' },
        { id: 2, name: 'Company Policies', type: 'Taxonomy', items: 120, status: 'training' },
        { id: 3, name: 'Chat History', type: 'Data History', items: 1000, status: 'pending' },
        { id: 4, name: 'Technical Docs', type: 'QA', items: 85, status: 'trained' },
    ]);

    const [activeTab, setActiveTab] = useState('qa');
    const [newQA, setNewQA] = useState({ question: '', answer: '' });
    const [qaPairs, setQAPairs] = useState([
        { id: 1, question: 'What is your return policy?', answer: '30-day return policy for all products.' },
        { id: 2, question: 'How do I reset my password?', answer: 'Click forgot password on login page.' },
        { id: 3, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal.' },
    ]);

    const handleAddQA = () => {
        if (newQA.question && newQA.answer) {
            setQAPairs([...qaPairs, {
                id: Date.now(),
                question: newQA.question,
                answer: newQA.answer
            }]);
            setNewQA({ question: '', answer: '' });
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Data Training</h1>
                <p className="text-text-secondary">Train models with custom data, QA pairs, and taxonomies</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
                {trainingData.map((data) => (
                    <div key={data.id} className="card">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold">{data.name}</h3>
                                <p className="text-sm text-text-secondary">{data.type}</p>
                            </div>
                            <span className={`status-badge ${data.status === 'trained' ? 'status-active' :
                                    data.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                                        'status-inactive'
                                }`}>
                                {data.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">{data.items} items</span>
                            <div className="flex gap-2">
                                <button className="btn-icon">
                                    <FiDownload />
                                </button>
                                <button className="btn-icon">
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <div className="flex border-b border-border">
                    <button
                        className={`px-4 py-2 ${activeTab === 'qa' ? 'border-b-2 border-primary' : ''}`}
                        onClick={() => setActiveTab('qa')}
                    >
                        QA Training
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'taxonomy' ? 'border-b-2 border-primary' : ''}`}
                        onClick={() => setActiveTab('taxonomy')}
                    >
                        Taxonomy
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-primary' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Data History
                    </button>
                </div>

                {activeTab === 'qa' && (
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-4">Add Q&A Pair</h3>
                                <div className="space-y-4">
                                    <div className="input-group">
                                        <label className="label">Question</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={newQA.question}
                                            onChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
                                            placeholder="Enter question..."
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="label">Answer</label>
                                        <textarea
                                            className="input min-h-[100px]"
                                            value={newQA.answer}
                                            onChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                                            placeholder="Enter answer..."
                                        />
                                    </div>
                                    <button onClick={handleAddQA} className="btn btn-primary">
                                        <FiPlus /> Add Q&A
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">Existing Q&A Pairs</h3>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                    {qaPairs.map((qa) => (
                                        <div key={qa.id} className="border border-border rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">Q: {qa.question}</h4>
                                                <button className="btn-icon">
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-text-secondary">A: {qa.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold">Training Options</h4>
                                    <p className="text-sm text-text-secondary">Configure how the model learns from this data</p>
                                </div>
                                <button className="btn btn-primary">
                                    <FiCheck /> Train Model
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'taxonomy' && (
                    <div className="p-4">
                        <h3 className="font-semibold mb-4">Taxonomy Management</h3>
                        <p>Taxonomy configuration interface would go here...</p>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="p-4">
                        <h3 className="font-semibold mb-4">Data History Training</h3>
                        <p>Data history training interface would go here...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTraining;