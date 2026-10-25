# Bloomify Flower Store

A responsive React + Vite flower shop demo with 32 sample products, four category pages, product details, search and sorting, saved wishlist and cart, and a demo checkout flow.

## Run locally

1. Install Node.js from [nodejs.org](https://nodejs.org/) if it is not already installed.
2. Open a terminal in this folder.
3. Run:

   ```sh
   npm install
   npm run dev
   ```

4. Open the `http://localhost:5173` address printed by Vite. Press Ctrl+C in the terminal to stop the server.

To create a production build, run `npm run build`. To preview that build locally, run `npm run preview`.

## Demo limitations

Product prices and availability are sample data. The checkout does not collect payment or submit an order. Login and signup are UI demos only; they do not create secure accounts or save passwords. A real shop needs a backend or commerce provider, payment and fulfillment integrations, and secure authentication. Contact details and policies should be replaced with real business information before launch.

## Publish with GitHub and Vercel

1. Create a GitHub account and a new empty repository.
2. In this folder, run `git init`, `git add .`, `git commit -m "Build Bloomify flower store"`, and `git branch -M main`.
3. Connect and push your repository using the commands GitHub shows for its new repository (`git remote add origin ...` and `git push -u origin main`).
4. Sign in to [Vercel](https://vercel.com/), choose **Add New → Project**, and import the GitHub repository.
5. Vercel detects Vite. Confirm build command `npm run build` and output directory `dist`, then select **Deploy**.
6. Vercel provides a public URL after deployment. `localhost` only points to your own computer and is not a public link.
