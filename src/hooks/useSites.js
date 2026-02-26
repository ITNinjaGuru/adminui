import { useState, useEffect } from 'react';

const STORAGE_KEY = 'master_admin_portal_sites';

export const useSites = () => {
    const [sites, setSites] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setSites(JSON.parse(stored));
            } else {
                // Default example site
                const defaultSites = [
                    {
                        id: '1',
                        title: 'Example Project',
                        url: 'https://example.com',
                        description: 'This is an example project to show the layout.',
                        createdAt: new Date().toISOString()
                    }
                ];
                setSites(defaultSites);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSites));
            }
        } catch (e) {
            console.error('Failed to load sites from local storage', e);
        }
        setIsInitialized(true);
    }, []);

    // Save to local storage whenever sites change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
        }
    }, [sites, isInitialized]);

    const addSite = (newSite) => {
        setSites(prev => [newSite, ...prev]);
    };

    const updateSite = (updatedSite) => {
        setSites(prev => prev.map(site => site.id === updatedSite.id ? updatedSite : site));
    };

    const deleteSite = (id) => {
        setSites(prev => prev.filter(site => site.id !== id));
    };

    return { sites, addSite, updateSite, deleteSite };
};
