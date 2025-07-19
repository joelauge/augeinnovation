# GoDaddy Domain Setup for GitHub Pages

## Overview
This guide will help you point your GoDaddy domain `augeinnovation.com` to your GitHub Pages site at `joelauge.github.io/augeinnovation`.

## Step 1: Configure GitHub Pages Custom Domain

### 1.1 Go to GitHub Repository Settings
1. Navigate to your repository: https://github.com/joelauge/augeinnovation
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar

### 1.2 Add Custom Domain
1. In the **Custom domain** field, enter: `augeinnovation.com`
2. Click **Save**
3. Check the box for **Enforce HTTPS** (recommended)
4. Click **Save** again

### 1.3 Verify Domain Configuration
- GitHub will create a CNAME file in your repository
- The site will be available at both:
  - `https://augeinnovation.com`
  - `https://joelauge.github.io/augeinnovation`

## Step 2: Configure GoDaddy DNS Settings

### 2.1 Access GoDaddy DNS Management
1. Log into your GoDaddy account
2. Go to **My Products** → **Domains**
3. Find `augeinnovation.com` and click **Manage**
4. Click on **DNS** tab

### 2.2 Add/Update DNS Records

#### A Records (for root domain)
Add these A records pointing to GitHub Pages IP addresses:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

#### CNAME Record (for www subdomain)
Add this CNAME record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | joelauge.github.io | 600 |

### 2.3 Remove Conflicting Records
- Remove any existing A records for @ that don't point to GitHub
- Remove any existing CNAME records for @ (A records and CNAME records can't coexist for @)

## Step 3: Update GitHub Pages Configuration

### 3.1 Update package.json Homepage
Update the homepage field in your package.json:

```json
{
  "homepage": "https://augeinnovation.com"
}
```

### 3.2 Redeploy the Site
Run the deployment command to update the site:

```bash
npm run deploy
```

## Step 4: Verify Setup

### 4.1 Check DNS Propagation
DNS changes can take 24-48 hours to propagate globally. You can check propagation using:
- https://www.whatsmydns.net/
- https://dnschecker.org/

### 4.2 Test the Domain
Once DNS propagates, test:
- https://augeinnovation.com
- https://www.augeinnovation.com

## Troubleshooting

### Common Issues:
1. **DNS Not Propagated**: Wait 24-48 hours for full propagation
2. **HTTPS Not Working**: Ensure "Enforce HTTPS" is checked in GitHub Pages settings
3. **CNAME Conflict**: Make sure no CNAME record exists for @ (root domain)
4. **Wrong IP Addresses**: Verify you're using the correct GitHub Pages IP addresses

### Verification Commands:
```bash
# Check DNS records
dig augeinnovation.com
dig www.augeinnovation.com

# Check GitHub Pages IPs
dig joelauge.github.io
```

## Final Notes

- The site will work at both the custom domain and the original GitHub Pages URL
- HTTPS will be automatically provisioned by GitHub
- DNS changes may take time to propagate globally
- Keep the GitHub Pages settings configured for the custom domain

## Next Steps After Setup

1. Test all functionality on the new domain
2. Update any hardcoded URLs in your application
3. Consider setting up email forwarding if needed
4. Monitor the site for any issues during the transition period 