# ci-cd-demo

Lab 11 前后端 CI/CD 示例工程。

## 结构

```
ci-cd-demo/
├── .github/workflows/
│   ├── ci.yml          # Node.js 最小 CI：Lint → Test → Build
│   ├── static.yml      # 前端构建并部署到 GitHub Pages
│   └── deploy-ecs.yml  # push 后自动构建并部署到 ECS（Nginx + systemd + 回滚）
└── apps
    ├── backend         # TypeScript + Express，/api/hello、/health、/api/version
    └── frontend        # React + Vite，调用相对路径 /api/hello
```

## 本地验证

```bash
cd apps/backend && npm ci && npm run lint && npm test && npm run build
cd ../frontend && npm ci && npm run lint && npm test && npm run build
```

## 部署

仓库 Settings → Secrets and variables → Actions 中配置：

| Secret | 内容 |
| --- | --- |
| `ECS_HOST` | 服务器公网 IP 或域名 |
| `ECS_USER` | `deploy` |
| `ECS_SSH_PRIVATE_KEY` | 部署专用 ED25519 私钥全文 |
| `ECS_SSH_KNOWN_HOSTS` | 核对过指纹的 `ssh-keyscan` 输出 |
