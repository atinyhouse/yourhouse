// Content Rendering

// Format date
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            return minutes === 0 ? '刚刚' : `${minutes}分钟前`;
        }
        return `${hours}小时前`;
    } else if (days === 1) {
        return '昨天';
    } else if (days < 7) {
        return `${days}天前`;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const currentYear = now.getFullYear();

        if (year === currentYear) {
            return `${month}-${day}`;
        }
        return `${year}-${month}-${day}`;
    }
}

// Create content card HTML
function createCard(item) {
    const imageClass = item.images.length === 1 ? 'single' :
                      item.images.length === 2 ? 'double' : 'multiple';

    const imagesHTML = item.images.length > 0 ? `
        <div class="card-images ${imageClass}">
            ${item.images.map(img => `
                <img src="${img}" alt="" class="card-image" loading="lazy">
            `).join('')}
        </div>
    ` : '';

    const isLongContent = item.content.length > 300;
    const contentClass = isLongContent ? 'collapsed' : '';
    const expandHTML = isLongContent ? `
        <span class="card-expand">展开全文</span>
    ` : '';

    return `
        <article class="content-card" data-platform="${item.platform}">
            <div class="card-header">
                <div class="card-platform">
                    <span class="platform-badge ${item.platform}"></span>
                    <span>${item.platformName}</span>
                </div>
                <time class="card-date">${formatDate(item.pubDate)}</time>
            </div>

            <div class="card-content ${contentClass}">
                ${item.content}
            </div>
            ${expandHTML}

            ${imagesHTML}

            <div class="card-footer">
                <a href="${item.link}" class="card-link" target="_blank" rel="noopener noreferrer">
                    查看原文
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            </div>
        </article>
    `;
}

// Render content cards
function renderContent(items, filter = 'all') {
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';

    const filteredItems = filter === 'all' ? items :
                         items.filter(item => item.platform === filter);

    filteredItems.forEach(item => {
        const cardHTML = createCard(item);
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Update counts
    updateCounts(items);

    // Add event listeners
    addCardEventListeners();
}

// Update tab counts
function updateCounts(items) {
    const counts = {
        all: items.length,
        jike: items.filter(i => i.platform === 'jike').length,
        wechat: items.filter(i => i.platform === 'wechat').length,
        xiaohongshu: items.filter(i => i.platform === 'xiaohongshu').length
    };

    Object.entries(counts).forEach(([key, count]) => {
        const el = document.getElementById(`count-${key}`);
        if (el) el.textContent = count;
    });
}

// Add event listeners to cards
function addCardEventListeners() {
    // Expand/collapse content
    document.querySelectorAll('.card-expand').forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.previousElementSibling;
            content.classList.toggle('collapsed');
            this.textContent = content.classList.contains('collapsed') ? '展开全文' : '收起';
        });
    });

    // Image lightbox
    document.querySelectorAll('.card-image').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });
}

// Open image lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const image = lightbox.querySelector('.lightbox-image');
    image.src = src;
    lightbox.style.display = 'flex';
}

// Close image lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Export functions
window.SocialSync = window.SocialSync || {};
window.SocialSync.render = {
    content: renderContent,
    openLightbox,
    closeLightbox
};
