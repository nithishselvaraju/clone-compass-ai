import React, { useState } from 'react';
import { FiUpload, FiPlus, FiTrash2, FiDownload, FiFileText } from 'react-icons/fi';

const DataTraining = ({ data, onUpdate }) => {
    const [trainingData, setTrainingData] = useState([]);
    // const [qaPairs, setQaPairs] = useState(data.qaPairs || []);
    const [newQA, setNewQA] = useState({ question: '', answer: '' });
    const [activeTab, setActiveTab] = useState('qa');

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newData = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toLocaleDateString(),
        }));

        const updatedData = [...trainingData, ...newData];
        setTrainingData(updatedData);
        onUpdate(updatedData);
    };

    const handleAddQA = () => {
        if (newQA.question.trim() && newQA.answer.trim()) {
            const newQAPair = {
                id: Date.now(),
                question: newQA.question,
                answer: newQA.answer,
            };
            const updatedQAPairs = [...qaPairs, newQAPair];
            setQaPairs(updatedQAPairs);
            onUpdate(updatedQAPairs);
            setNewQA({ question: '', answer: '' });
        }
    };

    const handleDeleteQA = (id) => {
        const updatedQAPairs = qaPairs.filter(qa => qa.id !== id);
        setQaPairs(updatedQAPairs);
        onUpdate(updatedQAPairs);
    };

    const handleDeleteFile = (id) => {
        const updatedData = trainingData.filter(file => file.id !== id);
        setTrainingData(updatedData);
        onUpdate(updatedData);
    };


    const [qaPairs, setQaPairs] = useState([
        { id: 1, question: 'What is your return policy?', answer: '30-day return policy for all products.' },
        { id: 2, question: 'How do I reset my password?', answer: 'Click forgot password on login page.' },
        { id: 3, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal.' },
    ]);

    return (
        <div className='main-content'>
            <div className="mb-6">
                <h3 className="font-semibold mb-4">Data Training Configuration</h3>
                <p className="text-sm text-gray-600 mb-6">Upload training data and create Q&A pairs to improve model performance.</p>

                <div className="flex border-b mb-6">
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === 'qa' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('qa')}
                    >
                        Q&A Training
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === 'files' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('files')}
                    >
                        File Upload
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === 'taxonomy' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('taxonomy')}
                    >
                        Taxonomy
                    </button>
                </div>
            </div>

            {activeTab === 'qa' && (
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-4">Add Q&A Pair</h4>
                        <div className="space-y-4">
                            <div className="input-group">
                                <label className="label">Question</label>
                                <input
                                    type="text"
                                    value={newQA.question}
                                    onChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
                                    className="input"
                                    placeholder="What is your return policy?"
                                />
                            </div>

                            <div className="input-group">
                                <label className="label">Answer</label>
                                <textarea
                                    value={newQA.answer}
                                    onChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                                    className="input"
                                    rows="4"
                                    placeholder="We offer a 30-day return policy for all products..."
                                />
                            </div>

                            <button
                                onClick={handleAddQA}
                                className="btn btn-primary w-full"
                            >
                                <FiPlus /> Add Q&A Pair
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Existing Q&A Pairs ({qaPairs.length})</h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {qaPairs.map((qa) => (
                                <div key={qa.id} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-medium text-sm">Q: {qa.question}</div>
                                            <div className="text-sm text-gray-600 mt-1">A: {qa.answer}</div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteQA(qa.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {qaPairs.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <FiFileText className="mx-auto text-3xl mb-2" />
                                    <p>No Q&A pairs added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'files' && (
                <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                        <FiUpload className="mx-auto text-3xl text-gray-400 mb-4" />
                        <h4 className="font-semibold mb-2">Upload Training Data</h4>
                        <p className="text-sm text-gray-600 mb-4">Upload documents, spreadsheets, or text files</p>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="btn btn-primary cursor-pointer"
                        >
                            <FiUpload /> Choose Files
                        </label>
                        <p className="text-xs text-gray-500 mt-2">Supports: PDF, DOC, TXT, CSV, JSON (Max 100MB)</p>
                    </div>

                    {trainingData.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-4">Uploaded Files ({trainingData.length})</h4>
                            <div className="space-y-2">
                                {trainingData.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <FiFileText className="text-gray-400" />
                                            <div>
                                                <div className="font-medium text-sm">{file.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {Math.round(file.size / 1024)} KB • Uploaded {file.uploadDate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="btn btn-secondary btn-sm">
                                                <FiDownload /> Download
                                            </button>
                                            <button
                                                onClick={() => handleDeleteFile(file.id)}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'taxonomy' && (
                <div>
                    <h4 className="font-semibold mb-4">Taxonomy Configuration</h4>
                    <p className="text-sm text-gray-600 mb-6">Define categories and classifications for your data.</p>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="input-group">
                                <label className="label">Categories (comma-separated)</label>
                                <textarea
                                    className="input"
                                    rows="4"
                                    placeholder="e.g., Technical Support, Billing, Account Issues, Feature Requests"
                                />
                            </div>

                            <div className="input-group">
                                <label className="label">Priority Levels</label>
                                <div className="space-y-2">
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        Low
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        Medium
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        High
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        Urgent
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="input-group">
                                <label className="label">Tags</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Add tags separated by commas"
                                />
                            </div>

                            <div className="input-group">
                                <label className="label">Sentiment Analysis</label>
                                <div className="space-y-2">
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked />
                                        Positive/Negative/Neutral
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        Emotion detection
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        Intent classification
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTraining;