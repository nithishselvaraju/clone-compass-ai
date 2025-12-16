import React from 'react';
import FilterPanel from './FilterPanel';

const models = [
    { id: 'gpt-4', name: 'GPT-4o', desc: `GPT-4o is OpenAI's latest model, offering faster, more efficient, and skillful multimodal reasoning for text inputs while maintaining improved accuracy, coherence, and responsiveness.` },
    { id: 'gpt-41', name: 'GPT-4o mini', desc: `OpenAI's most advanced model in the small models category supports text inputs and generates text outputs, making it ideal for smaller tasks.` },
    {
        id: 'gpt-42', name: 'K2 Think Cerebras', desc: `K2 Think is a reasoning model that achieves state-of-the-art performance with 32B parameters. It was developed in the UAE by Mohamed bin Zayed University of Artificial Intelligence (MBZUAI). The model is deployed and running on the Cerebras clusters.`
    },
    { id: 'gpt-43', name: 'gpt-oss-120b Cerebras', desc: `K2 Think is a reasoning model that achieves state-of-the-art performance with 32B parameters. It was developed in the UAE by Mohamed bin Zayed University of Artificial Intelligence (MBZUAI). The model is deployed and running on the Core42 cloud located in the UAE region.` },
    { id: 'gpt-44', name: 'Whisper', desc: `Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitask model that can perform multilingual speech recognition as well as speech translation and language identification.` },
    { id: 'gpt-45', name: 'Llama 3 70B', desc: `Llama 3 is an auto-regressive language model, part of the Llama 3 family, and the next generation of Meta's open-source LLMs. It is one of the most capable openly available LLMs with improved reasoning capabilities compared to its previous models.` }
];

const ModelCatalog = ({ showFilters, setShowFilters }) => (
    <div className="main-content catalog">
        <div className="catalog-header">
            <h1>Model Catalog</h1>
            <button className="request-model-btn">Request Model</button>
        </div>

        <div className="catalog-controls">
            <button className="filters-btn" onClick={() => setShowFilters(true)}>
                ⚙️ Filters
            </button>

            <input
                className="search-box"
                placeholder="Search for a model..."
            />
        </div>

        <div className="catalog-grid">
            {models.map((model) => (
                <div key={model} className="model-card">
                    <h3>{model.name}</h3>
                    <p>{model.desc}</p>
                </div>
            ))}
        </div>

        {showFilters && <FilterPanel setShowFilters={setShowFilters} />}
    </div>
);

export default ModelCatalog;
