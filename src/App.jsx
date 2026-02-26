import React, { useState } from 'react';
import BentoGrid from './components/BentoGrid';
import ManageSiteModal from './components/ManageSiteModal';
import { useSites } from './hooks/useSites';
import { LayoutDashboard } from 'lucide-react';
import './App.css';

function App() {
    const { sites, addSite, updateSite, deleteSite } = useSites();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSite, setEditingSite] = useState(null);

    const handleAddClick = () => {
        setEditingSite(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (site) => {
        setEditingSite(site);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to remove this project from the portal?')) {
            deleteSite(id);
        }
    };

    const handleSaveSite = (siteData) => {
        if (editingSite) {
            updateSite(siteData);
        } else {
            addSite(siteData);
        }
        setIsModalOpen(false);
        setEditingSite(null);
    };

    return (
        <div className="app-container">
            {/* Dynamic background element */}
            <div className="bg-glow"></div>

            <header className="app-header liquid-glass">
                <div className="header-content">
                    <div className="logo-area">
                        <LayoutDashboard className="logo-icon" size={28} />
                        <h1>Master Portal</h1>
                    </div>
                    <p className="subtitle">Command Center</p>
                </div>
            </header>

            <main className="app-main">
                <BentoGrid
                    sites={sites}
                    onAdd={handleAddClick}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />
            </main>

            <ManageSiteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                site={editingSite}
                onSave={handleSaveSite}
            />
        </div>
    );
}

export default App;
