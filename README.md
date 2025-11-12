# Social Sync

> 社交媒体内容聚合平台 - 统一展示你的即刻、微信公众号、小红书内容

![Preview](https://via.placeholder.com/1200x600/F7F6F3/37352F?text=Social+Sync)

## ✨ 特性

- 🎨 **包豪斯极简设计** - 参考 Notion 和 atinyhouse 的优雅风格
- 🌓 **深色模式** - 自动适应系统主题，支持手动切换
- 📱 **完全响应式** - 完美适配移动端、平板和桌面
- 🚀 **零后端** - 纯静态站点，部署简单
- 🔄 **自动同步** - 通过 RSSHub 自动拉取最新内容
- 🎯 **多平台支持** - 即刻、微信公众号、小红书

## 🎯 在线演示

访问：[https://yourusername.github.io/social-sync/](https://yourusername.github.io/social-sync/)

## 🚀 快速开始

### 1. 部署到 GitHub Pages

1. Fork 这个仓库
2. 进入仓库设置 Settings → Pages
3. Source 选择 `main` 分支
4. 保存后等待几分钟即可访问

### 2. 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/social-sync.git
cd social-sync

# 使用任何 HTTP 服务器运行
# 方式1: Python
python3 -m http.server 8000

# 方式2: Node.js
npx serve

# 访问 http://localhost:8000
```

### 3. 配置社交媒体账号

1. 点击页面右上角的"配置"按钮
2. 填入你的社交媒体信息：

**即刻**
- 打开你的即刻主页：`https://web.okjike.com/u/YOUR_USER_ID`
- 复制 URL 中的用户 ID
- 粘贴到配置框

**微信公众号**
- 使用 RSSHub 生成 RSS：`https://rsshub.app/wechat/mp/YOUR_ACCOUNT`
- 详见 [RSSHub 文档](https://docs.rsshub.app/social-media.html#wei-xin)

**小红书**
- 打开你的小红书主页，复制用户 ID
- 填入配置框

3. 保存配置，内容会自动加载

## 📁 项目结构

```
social-sync/
├── index.html          # 主页面
├── css/
│   ├── reset.css       # CSS 重置
│   ├── variables.css   # 设计系统变量
│   ├── main.css        # 主要样式
│   └── components.css  # 组件样式
├── js/
│   ├── config.js       # 配置管理
│   ├── sync.js         # 内容同步
│   ├── render.js       # 内容渲染
│   └── main.js         # 主逻辑
└── README.md
```

## 🎨 设计系统

### 色彩

**浅色模式**
- 背景：`#FFFFFF` / `#F7F6F3`
- 文字：`#37352F` / `#8B8B8B`
- 强调：`#2383E2`

**深色模式**
- 背景：`#1A1A1A` / `#1F1F1F`
- 文字：`#E0E0E0` / `#A0A0A0`
- 强调：`#4A9EFF`

### 字体

- 西文：Inter
- 中文：Noto Sans SC / PingFang SC
- 等宽：SF Mono / Monaco

### 间距

基于 8px 网格系统：8, 16, 24, 32, 48, 64

## 🛠️ 技术栈

- **前端**：原生 HTML + CSS + JavaScript
- **数据源**：RSSHub
- **部署**：GitHub Pages
- **字体**：Google Fonts

## 📝 配置说明

配置信息存储在浏览器的 LocalStorage 中，格式如下：

```json
{
  "jike": "71A6B3C3-1382-4121-A17A-2A4C05CB55E8",
  "wechat": "https://rsshub.app/wechat/mp/account",
  "xiaohongshu": "5d8d8d8d8d8d8d8d"
}
```

## 🔧 自定义

### 修改颜色主题

编辑 `css/variables.css` 中的 CSS 变量：

```css
:root {
    --accent-color: #2383E2;  /* 主题色 */
    /* ... 其他变量 */
}
```

### 添加新平台

1. 在 `js/sync.js` 中添加同步函数
2. 在 `index.html` 中添加新 Tab
3. 在 `css/variables.css` 中添加平台颜色

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

## 🙏 致谢

- 设计灵感来自 [Notion](https://notion.so) 和 [atinyhouse](https://atinyhouse.github.io)
- 数据服务由 [RSSHub](https://rsshub.app) 提供
- 字体由 [Google Fonts](https://fonts.google.com) 提供

## 📮 联系

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/yourusername/social-sync/issues)
- 发送邮件至 your.email@example.com

---

用 ❤️ 和 Claude Code 制作
