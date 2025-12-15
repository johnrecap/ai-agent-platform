# AI Agent Dashboard

New dashboard for the AI Agent Platform.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-agent-dashboard.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Set Environment Variables:
   - `VITE_API_URL` = `https://your-backend.railway.app` (your Railway backend URL)
5. Click "Deploy"

### 3. Configure Subdomain

After deployment, you can set a custom domain like `dashboard.yourdomain.com`

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (Railway) |

## Features

- 📊 Dashboard with charts
- 👥 Customer management
- 📈 Analytics
- ⚙️ Settings (Admin only)
- 🔒 Security (Admin only)
