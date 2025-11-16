# Deploy to Vercel

Your React + Vite project is ready to deploy to Vercel! Follow these steps:

## Option 1: Deploy via Vercel Web Dashboard

1. **Create a GitHub repository** (if you haven't already):
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Import your project**:
   - Click "New Project"
   - Select your GitHub repository
   - Framework: Automatically detected as "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from project directory**:
   ```bash
   cd /workspaces/Top-Speed-Appliance
   vercel
   ```

3. **Follow the prompts**:
   - Link to Vercel account
   - Select project name
   - Confirm build settings
   - Deployment will begin automatically

## Project Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (React)
- **Node Version**: 18 or higher (recommended)

## Environment Variables (if needed)

If your app requires environment variables:
1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add your variables
4. Redeploy

## After Deployment

Once deployed:
- Your live URL will be displayed
- Domain is typically: `https://[project-name].vercel.app`
- Every `git push` to main branch triggers automatic redeployment

## Troubleshooting

- If build fails, check the Vercel logs in the dashboard
- Ensure `dist/` folder is created locally with `npm run build`
- Verify all dependencies are in `package.json`

Happy deploying! 🚀
