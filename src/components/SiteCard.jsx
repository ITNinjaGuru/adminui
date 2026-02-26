import React, { useState } from 'react';
import { ExternalLink, Edit2, Trash2, MoreVertical, Globe } from 'lucide-react';
import './SiteCard.css';

const THUM_IO_API = 'https://image.thum.io/get/width/800/crop/800/';

const SiteCard = ({ site, onEdit, onDelete }) => {
    const [showActions, setShowActions] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Fallback to initial letter if screenshot fails
    const getInitial = () => site.title ? site.title.charAt(0).toUpperCase() : '?';

    return (
        <div
            className="bento-item liquid-glass site-card"
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="site-actions-layer">
                <button
                    className="action-toggle-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowActions(!showActions);
                    }}
                >
                    <MoreVertical size={20} color="rgba(255,255,255,0.7)" />
                </button>

                {showActions && (
                    <div className="action-menu liquid-glass">
                        <button onClick={() => onEdit(site)}>
                            <Edit2 size={14} /> Edit
                        </button>
                        <button className="danger-btn" onClick={() => onDelete(site.id)}>
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="site-preview" onClick={() => window.open(site.url, '_blank')}>
                {!imageError ? (
                    <img
                        src={`${THUM_IO_API}${site.url}`}
                        alt={`Preview of ${site.title}`}
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="site-placeholder">
                        <Globe size={48} className="placeholder-icon" opacity={0.3} />
                        <span className="placeholder-initial">{getInitial()}</span>
                    </div>
                )}

                <div className="launch-overlay">
                    <ExternalLink size={32} color="white" />
                </div>
            </div>

            <div className="site-info">
                <h3>{site.title}</h3>
                <p className="site-url">{new URL(site.url).hostname}</p>
                {site.description && <p className="site-desc">{site.description}</p>}
            </div>
        </div>
    );
};

export default SiteCard;
