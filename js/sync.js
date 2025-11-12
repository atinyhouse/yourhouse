// Content Synchronization

// RSSHub instances
const RSSHUB_INSTANCES = [
    'https://rsshub.app',
    'https://rsshub.rssforever.com',
    'https://rsshub.ktachibana.party'
];

// Fetch RSS feed from RSSHub
async function fetchRSS(url) {
    for (const instance of RSSHUB_INSTANCES) {
        try {
            const response = await fetch(url.replace('https://rsshub.app', instance), {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            if (response.ok) {
                const text = await response.text();
                return parseRSS(text);
            }
        } catch (error) {
            console.error(`Failed to fetch from ${instance}:`, error);
            continue;
        }
    }
    throw new Error('All RSSHub instances failed');
}

// Parse RSS XML to JSON
function parseRSS(xmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const items = doc.querySelectorAll('item');

    return Array.from(items).map(item => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';

        // Extract images from description
        const images = extractImages(description);

        // Clean HTML from description
        const content = stripHTML(description);

        return {
            title,
            content,
            link,
            pubDate: new Date(pubDate),
            images
        };
    });
}

// Extract image URLs from HTML
function extractImages(html) {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const images = [];
    let match;

    while ((match = imgRegex.exec(html)) !== null) {
        const url = match[1];
        // Filter out avatars and small images
        if (!url.includes('avatar')) {
            images.push(url);
        }
    }

    return images;
}

// Strip HTML tags
function stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// Sync content from Jike
async function syncJike(userId) {
    if (!userId) return [];

    try {
        const url = `https://rsshub.app/jike/user/${userId}`;
        const items = await fetchRSS(url);

        return items.map(item => ({
            ...item,
            platform: 'jike',
            platformName: '即刻'
        }));
    } catch (error) {
        console.error('Failed to sync Jike:', error);
        return [];
    }
}

// Sync content from WeChat
async function syncWeChat(rssUrl) {
    if (!rssUrl) return [];

    try {
        const items = await fetchRSS(rssUrl);

        return items.map(item => ({
            ...item,
            platform: 'wechat',
            platformName: '微信公众号'
        }));
    } catch (error) {
        console.error('Failed to sync WeChat:', error);
        return [];
    }
}

// Sync content from Xiaohongshu
async function syncXiaohongshu(userId) {
    if (!userId) return [];

    try {
        const url = `https://rsshub.app/xiaohongshu/user/${userId}`;
        const items = await fetchRSS(url);

        return items.map(item => ({
            ...item,
            platform: 'xiaohongshu',
            platformName: '小红书'
        }));
    } catch (error) {
        console.error('Failed to sync Xiaohongshu:', error);
        return [];
    }
}

// Sync all configured platforms
async function syncAll() {
    const config = window.SocialSync.config.get();

    const results = await Promise.all([
        syncJike(config.jike),
        syncWeChat(config.wechat),
        syncXiaohongshu(config.xiaohongshu)
    ]);

    // Flatten and sort by date
    const allItems = results.flat();
    allItems.sort((a, b) => b.pubDate - a.pubDate);

    return allItems;
}

// Export functions
window.SocialSync = window.SocialSync || {};
window.SocialSync.sync = {
    all: syncAll,
    jike: syncJike,
    wechat: syncWeChat,
    xiaohongshu: syncXiaohongshu
};
