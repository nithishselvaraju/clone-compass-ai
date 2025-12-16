import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
const ModelDetails = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { state } = useLocation();

    const { modelName, overview } = state || {};
    return (

        <div className="main-content" >

            <div className="flex h-screen ">

                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-6">
                        {/* Breadcrumb */}


                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {modelName} <span className="text-lg font-normal text-gray-600">2024-11-20</span>
                                </h1>
                            </div>
                            <div className="flex space-x-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Subscribe
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Try it out
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-8">
                            <nav className="flex space-x-8">
                                {['Overview', 'Code Example', 'Pricing', 'Compute'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.toLowerCase()
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {activeTab === 'overview' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Overview</h2>
                                    <p className="text-gray-600 mb-6">
                                        {overview}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h3 className="font-medium mb-3">Input modalities</h3>
                                            <div className="flex space-x-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Text</span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Image</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-3">Output modalities</h3>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Text</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h3 className="font-medium mb-3">Context length</h3>
                                            <div className="inline-flex items-center bg-gray-100 rounded-lg px-4 py-2">
                                                <span className="text-gray-900">128,000</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-3">Max output tokens</h3>
                                            <div className="inline-flex items-center bg-gray-100 rounded-lg px-4 py-2">
                                                <span className="text-gray-900">18,223</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'code example' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Code Example</h2>
                                    <div className="flex space-x-4 mb-6">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">OPENAI</button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">AZURE</button>
                                    </div>

                                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm text-gray-400">POST: https://api.core42.ai/v1/chat/completions HTTP/1.1</span>
                                            <button className="text-sm text-blue-400 hover:text-blue-300">Copy code</button>
                                        </div>
                                        <pre className="text-sm">
                                            {`{
  "model": "gpt-4o",
  "stream": false,
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}`}</pre>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pricing' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-6">PRICING</h2>
                                    <p className="text-gray-600 mb-6">Pricing is based on the number of tokens used.</p>

                                    <div className="overflow-x-auto mb-8">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Text tokens</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Input</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Output</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-4 py-3 text-sm text-gray-600">Per 1M tokens</td>
                                                    <td className="px-4 py-3 text-sm font-medium">$2.50</td>
                                                    <td className="px-4 py-3 text-sm font-medium">$10.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                        <h3 className="font-medium text-gray-900 mb-2">Batch API</h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            50% discount on inputs and outputs tokens with the Batch
                                        </p>
                                        <div className="text-sm">
                                            <span className="text-gray-700">Per 1M tokens</span>
                                            <span className="ml-4 font-medium">$1.25</span>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900 mb-2">Web Search</h3>
                                        <div className="text-sm">
                                            <span className="text-gray-700">Per 1K transactions</span>
                                            <span className="ml-4 font-medium">$18.00</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'compute' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Compute Settings</h2>
                                    <p className="text-gray-600">Compute configuration options will be displayed here.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;