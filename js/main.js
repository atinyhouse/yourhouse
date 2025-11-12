// Main Application Logic

(function() {
    'use strict';

    let currentTab = 'all';
    let contentData = [];

    // Initialize app
    function init() {
        initTheme();
        initEventListeners();
        loadContent();
    }

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Initialize event listeners
    function initEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

        // Config buttons
        document.getElementById('config-btn').addEventListener('click', openConfigModal);
        document.getElementById('config-btn-empty').addEventListener('click', openConfigModal);

        // Modal close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeConfigModal);
        });

        document.querySelector('.modal-overlay').addEventListener('click', closeConfigModal);

        // Config form submit
        document.getElementById('config-form').addEventListener('submit', handleConfigSubmit);

        // Tab switching
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.addEventListener('click', function() {
                switchTab(this.dataset.tab);
            });
        });

        // Lightbox close
        document.querySelector('.lightbox-close').addEventListener('click', window.SocialSync.render.closeLightbox);
        document.querySelector('.lightbox-overlay').addEventListener('click', window.SocialSync.render.closeLightbox);
    }

    // Open config modal
    function openConfigModal() {
        const modal = document.getElementById('config-modal');
        const config = window.SocialSync.config.get();

        // Populate form with current config
        document.getElementById('jike-url').value = config.jike || '';
        document.getElementById('wechat-url').value = config.wechat || '';
        document.getElementById('xiaohongshu-url').value = config.xiaohongshu || '';

        modal.classList.add('active');
    }

    // Close config modal
    function closeConfigModal() {
        const modal = document.getElementById('config-modal');
        modal.classList.remove('active');
    }

    // Handle config form submit
    async function handleConfigSubmit(e) {
        e.preventDefault();

        const config = {
            jike: document.getElementById('jike-url').value.trim(),
            wechat: document.getElementById('wechat-url').value.trim(),
            xiaohongshu: document.getElementById('xiaohongshu-url').value.trim()
        };

        window.SocialSync.config.save(config);
        closeConfigModal();
        await loadContent();
    }

    // Switch tab
    function switchTab(tab) {
        currentTab = tab;

        // Update active tab
        document.querySelectorAll('.tab-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tab === tab) {
                item.classList.add('active');
            }
        });

        // Render filtered content
        window.SocialSync.render.content(contentData, tab);
    }

    // Load content
    async function loadContent() {
        const loading = document.getElementById('loading');
        const empty = document.getElementById('empty');
        const grid = document.getElementById('content-grid');

        // Check if configured
        if (!window.SocialSync.config.has()) {
            loading.style.display = 'none';
            empty.style.display = 'flex';
            grid.style.display = 'none';
            return;
        }

        // Show loading
        loading.style.display = 'flex';
        empty.style.display = 'none';
        grid.style.display = 'grid';

        try {
            // Sync content
            contentData = await window.SocialSync.sync.all();

            // Hide loading
            loading.style.display = 'none';

            // Check if we have content
            if (contentData.length === 0) {
                empty.style.display = 'flex';
                grid.style.display = 'none';
                return;
            }

            // Render content
            window.SocialSync.render.content(contentData, currentTab);
        } catch (error) {
            console.error('Failed to load content:', error);
            loading.style.display = 'none';
            empty.style.display = 'flex';
            grid.style.display = 'none';
        }
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
