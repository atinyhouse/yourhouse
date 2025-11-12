# 推送代码到 GitHub

远程仓库已配置完成：`https://github.com/atinyhouse/yourhouse.git`

## 🔐 认证方式

### 方式 1：使用 GitHub CLI（推荐）

```bash
# 1. 安装 GitHub CLI（如果还没安装）
brew install gh

# 2. 登录 GitHub
gh auth login

# 3. 推送代码
git push -u origin main
```

### 方式 2：使用 Personal Access Token

```bash
# 1. 创建 Token
# 访问：https://github.com/settings/tokens
# 点击 "Generate new token (classic)"
# 勾选 "repo" 权限
# 生成并复制 token

# 2. 使用 token 推送
git push https://YOUR_TOKEN@github.com/atinyhouse/yourhouse.git main
```

### 方式 3：使用 SSH（推荐长期使用）

```bash
# 1. 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "your.email@example.com"

# 2. 添加 SSH 密钥到 ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. 复制公钥到剪贴板
pbcopy < ~/.ssh/id_ed25519.pub

# 4. 添加到 GitHub
# 访问：https://github.com/settings/keys
# 点击 "New SSH key"
# 粘贴公钥并保存

# 5. 更改远程仓库 URL 为 SSH
git remote set-url origin git@github.com:atinyhouse/yourhouse.git

# 6. 推送代码
git push -u origin main
```

## 📝 当前状态

```
仓库地址: https://github.com/atinyhouse/yourhouse.git
本地分支: main
远程已配置: ✅
代码已提交: ✅
等待推送: ⏳
```

## 🚀 推送完成后

1. 访问仓库：https://github.com/atinyhouse/yourhouse
2. 进入 Settings → Pages
3. Source 选择：main 分支 / (root)
4. 保存后等待部署
5. 访问：https://atinyhouse.github.io/yourhouse/

---

选择一种认证方式完成推送即可！
