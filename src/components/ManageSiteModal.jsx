import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ManageSiteModal.css';

const ManageSiteModal = ({ isOpen, onClose, onSave, site = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: ''
    });

    useEffect(() => {
        if (site) {
            setFormData(site);
        } else {
            setFormData({ title: '', url: '', description: '' });
        }
    }, [site, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic formatting
        let formattedUrl = formData.url.trim();
        if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = 'https://' + formattedUrl;
        }

        onSave({
            ...formData,
            url: formattedUrl,
            id: site?.id || crypto.randomUUID(),
            createdAt: site?.createdAt || new Date().toISOString()
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content liquid-glass">
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <h2>{site ? 'Edit Project' : 'Add New Project'}</h2>

                <form onSubmit={handleSubmit} className="site-form">
                    <div className="form-group">
                        <label htmlFor="title">Project Name</label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., My Awesome App"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">Website URL</label>
                        <input
                            id="url"
                            type="text"
                            required
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="e.g., mysite.com or https://mysite.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief note about this project..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            {site ? 'Save Changes' : 'Add Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageSiteModal;
