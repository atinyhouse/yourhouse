// Configuration Management

const CONFIG_KEY = 'social-sync-config';

// Get configuration from localStorage
function getConfig() {
    const config = localStorage.getItem(CONFIG_KEY);
    return config ? JSON.parse(config) : {
        jike: '',
        wechat: '',
        xiaohongshu: ''
    };
}

// Save configuration to localStorage
function saveConfig(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

// Check if any platform is configured
function hasConfig() {
    const config = getConfig();
    return config.jike || config.wechat || config.xiaohongshu;
}

// Export functions
window.SocialSync = window.SocialSync || {};
window.SocialSync.config = {
    get: getConfig,
    save: saveConfig,
    has: hasConfig
};
