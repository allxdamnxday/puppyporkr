# Setting Up Hostinger DNS for Vercel Deployment

This guide will help you configure your Hostinger domain to point to your Vercel deployments for Puppyporker.

## Prerequisites

- A domain registered with Hostinger
- Vercel deployments for both frontend and backend
- Access to your Hostinger account

## Step 1: Get Vercel DNS Configuration

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your frontend project
3. Go to "Settings" > "Domains"
4. Add your domain (e.g., `puppyporker.com` and `www.puppyporker.com`)
5. Vercel will provide you with DNS records to add to your domain provider

## Step 2: Configure DNS in Hostinger

1. Log in to your Hostinger account
2. Go to "Domains" and select your domain
3. Navigate to "DNS / Nameservers"
4. Choose "DNS records" tab

### For the Frontend (www.puppyporker.com and puppyporker.com)

Add the following records:

1. **A Record**:
   - Name: `@` (or leave empty)
   - Value: `76.76.21.21` (Vercel's IP address)
   - TTL: 300 (or default)

2. **CNAME Record**:
   - Name: `www`
   - Value: `cname.vercel-dns.com.`
   - TTL: 300 (or default)

### For the Backend API (api.puppyporker.com)

Add the following record:

1. **CNAME Record**:
   - Name: `api`
   - Value: `cname.vercel-dns.com.`
   - TTL: 300 (or default)

## Step 3: Verify Domain in Vercel

1. Return to Vercel's domain settings
2. Vercel will automatically verify your domain once DNS propagation is complete
3. This may take up to 48 hours, but often happens within a few minutes to a few hours

## Step 4: Update Environment Variables

Make sure your environment variables are correctly set:

1. In your frontend project on Vercel, set:
   - `VITE_API_URL`: `https://api.puppyporker.com`

2. In your backend project on Vercel, set:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Your Supabase database URL
   - Other environment variables as needed

## Troubleshooting

- **DNS Propagation**: DNS changes can take time to propagate. If your domain isn't working immediately, wait a few hours.
- **SSL Certificate**: Vercel automatically provisions SSL certificates. If you see certificate errors, ensure your DNS is correctly configured.
- **CORS Issues**: If your frontend can't connect to your backend, check CORS settings in your backend code.

## Additional Resources

- [Vercel DNS Documentation](https://vercel.com/docs/concepts/projects/domains/dns-records)
- [Hostinger DNS Management](https://support.hostinger.com/en/articles/1583227-how-to-manage-dns-records)
