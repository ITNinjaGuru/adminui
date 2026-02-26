import React from 'react';
import SiteCard from './SiteCard';
import './BentoGrid.css';
import { Plus } from 'lucide-react';

const BentoGrid = ({ sites, onEdit, onDelete, onAdd }) => {
    return (
        <div className="bento-container">
            <div className="bento-grid">
                {sites.map((site) => (
                    <SiteCard
                        key={site.id}
                        site={site}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}

                {/* Add New Site Card positioned nicely in the grid */}
                <div
                    className="liquid-glass bento-item add-site-card"
                    onClick={onAdd}
                >
                    <div className="add-site-content">
                        <div className="icon-wrapper">
                            <Plus size={32} color="rgba(255, 255, 255, 0.8)" />
                        </div>
                        <h3>Add New Project</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BentoGrid;
