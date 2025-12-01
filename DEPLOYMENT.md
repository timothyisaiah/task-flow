# Deployment to GitHub Pages

## ⚠️ Important Limitations

**GitHub Pages only serves static files**, which means:

- ❌ **Server Actions won't work** (create/update/delete operations)
- ❌ **API Routes won't work** (position updates)
- ❌ **Database connections won't work** (PostgreSQL)
- ❌ **Authentication won't work** (NextAuth)
- ❌ **Server-side data fetching won't work**

The whiteboard and other features that require server-side functionality **will not work** on GitHub Pages.

## Recommended Alternative: Vercel

For a full-featured deployment with all server capabilities, use **Vercel** (free):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables (POSTGRES_URL, AUTH_SECRET, etc.)
5. Deploy!

Vercel is built by the Next.js team and supports all Next.js features out of the box.

## GitHub Pages Setup (Static Only)

If you still want to deploy to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Source: GitHub Actions

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

3. **The GitHub Action will automatically build and deploy**

4. **Your site will be available at**:
   - `https://[username].github.io/[repository-name]`
   - Or custom domain if configured

## Environment Variables

For GitHub Pages (static export), environment variables are not used since there's no server.

For Vercel, add these in the Vercel dashboard:
- `POSTGRES_URL` or `DATABASE_URL`
- `AUTH_SECRET`
- Any other environment variables your app needs

