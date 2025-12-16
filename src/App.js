import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Overview from './components/Overview/Overview';
import DataTraining from './pages/DataTraining';
import WorkflowBuilder from './pages/WorkflowBuilder';
import DataSources from './pages/DataSources';
import RulesSetupStep from './components/RulesSetupStep';
import ModelCatalog from './components/ModelCatalog/ModelCatalog';


function App() {



  const [activeView, setActiveView] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);



  return (


    <Router>
      <div className="app">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />


        <div className="main-container">
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            collapsed={sidebarCollapsed}
          />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/models" element={<ModelCatalog />} />
            <Route path="/data-training" element={<DataTraining />} />
            <Route path="/workflows" element={<WorkflowBuilder />} />
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/rules-setup" element={<RulesSetupStep />} />
            {/* <Route path="/clients" element={<Clients />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// <div className="app">
//   <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

//   <div className="main-container">
//     <Sidebar
//       activeView={activeView}
//       setActiveView={setActiveView}
//       collapsed={sidebarCollapsed}
//     />

//     {activeView === 'catalog' ? (

//       <ModelCatalog
//         showFilters={showFilters}
//         setShowFilters={setShowFilters}
//       />
//     ) : (
//       <Overview />
//     )}
//     {/* <ModelDetails /> */}
//   </div>
// </div>