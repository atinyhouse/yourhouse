# GitHub Pages 部署指南

## 📋 部署步骤

### 1. 在 GitHub 上创建新仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 填写仓库信息：
   - Repository name: `social-sync`（或你喜欢的名字）
   - Description: `社交媒体内容聚合平台`
   - 选择 **Public**（GitHub Pages 免费版需要公开仓库）
   - **不要** 勾选 "Initialize this repository with a README"
3. 点击 "Create repository"

### 2. 推送本地代码到 GitHub

在项目目录下执行以下命令：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/social-sync.git

# 推送代码到 main 分支
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 "Build and deployment" 下：
   - Source 选择：**Deploy from a branch**
   - Branch 选择：**main** 和 **/ (root)**
5. 点击 **Save**

### 4. 等待部署完成

- 通常需要 2-5 分钟
- 部署完成后，页面会显示访问链接：
  ```
  Your site is live at https://YOUR_USERNAME.github.io/social-sync/
  ```

### 5. 访问你的网站

打开浏览器访问：`https://YOUR_USERNAME.github.io/social-sync/`

## 🔧 配置自定义域名（可选）

### 1. 购买域名

从域名注册商购买域名（如 Namecheap、GoDaddy、阿里云等）

### 2. 配置 DNS

在你的域名管理面板添加以下 DNS 记录：

```
# 如果使用根域名（example.com）
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153

# 如果使用子域名（www.example.com 或 social.example.com）
CNAME    www    YOUR_USERNAME.github.io
```

### 3. 在 GitHub 配置域名

1. 进入仓库 Settings → Pages
2. 在 "Custom domain" 输入你的域名
3. 勾选 "Enforce HTTPS"
4. 点击 Save

### 4. 等待 DNS 生效

通常需要 10 分钟到 24 小时

## 🔄 更新网站

当你修改代码后，只需：

```bash
git add .
git commit -m "更新说明"
git push
```

GitHub Pages 会自动重新部署！

## 🐛 常见问题

### Q: 404 错误

**A:** 检查：
1. 仓库是否为 Public
2. GitHub Pages 是否已启用
3. 等待几分钟让部署完成

### Q: 样式没有加载

**A:** 检查 CSS 和 JS 文件路径是否正确（相对路径）

### Q: 无法获取内容

**A:** 检查：
1. 浏览器控制台是否有错误
2. RSSHub 服务是否可用
3. 配置的用户 ID 是否正确

### Q: CORS 错误

**A:** RSSHub 支持 CORS，如果遇到问题：
1. 尝试使用不同的 RSSHub 实例
2. 检查浏览器扩展是否阻止了请求

## 📱 测试清单

部署后，请检查：

- [ ] 网站可以正常访问
- [ ] 深色模式切换正常
- [ ] 配置弹窗可以打开和关闭
- [ ] 配置保存后可以加载内容
- [ ] Tab 切换正常
- [ ] 图片可以点击放大
- [ ] 移动端显示正常

## 🎉 完成！

现在你的社交媒体聚合平台已经成功部署到 GitHub Pages 了！

分享你的链接，让更多人看到你的内容：
- `https://YOUR_USERNAME.github.io/social-sync/`

---

需要帮助？查看 [GitHub Pages 官方文档](https://docs.github.com/en/pages)
