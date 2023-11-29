# Hosting on Vercel

This guide will walk you through the process of hosting the frontend of the library management system on Vercel.

## Steps:

### 1. Create a Vercel Account

If you don't have a Vercel account, sign up for one at [Vercel](https://vercel.com/).

### 2. Install Vercel CLI (Optional)

If you prefer using the Vercel CLI for deployment, you can install it globally on your machine:

```bash
npm install -g vercel
```

### 3. Deploy Using Vercel Web Interface

1. Log in to your Vercel account.

2. Click on the "Import Project" button.

3. Choose the frontend repository of your library management system.

4. Configure your settings, and click on "Deploy."

5. Vercel will automatically build and deploy your frontend.

6. Once the deployment is complete, you will receive a unique URL (e.g., `your-project-name.vercel.app`).

### 4. Deploy Using Vercel CLI (Optional)

1. Open a terminal and navigate to your frontend project directory.

2. Run the following command:

```bash
vercel
```

3. Follow the prompts to configure your project.

4. Once the deployment is complete, you will receive a unique URL.

### 5. Access Your Website

Your frontend should now be hosted on Vercel. Access it through the provided Vercel subdomain or custom domain if you have set one up.

## Note:

- Ensure your API calls in the frontend point to the correct backend URL if it's hosted separately.
