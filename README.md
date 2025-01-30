# Chambitos - Freelancer Marketplace Platform

Chambitos is a platform designed to connect freelancers and small business owners with clients looking for various services. It provides a user-friendly marketplace where skilled professionals can showcase their talents and find meaningful work opportunities.

## Getting Started

This project uses [Supabase](https://supabase.io/) as authentication and database provider. You will need to create an account and a project to get the necessary credentials. To configure your supabase project, follow the steps in the [Supabase Configuration](#supabase-configuration) section.

```bash

1. Clone the repository.
2. Install the dependencies.
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server.
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Configuration

1. Create a new project in Supabase.
2. In the sql editor, run the query in the `supabase.sql` file to create the necessary tables in your Supabase project.
3. Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
```

Replace `<SUBSTITUTE_SUPABASE_URL>` and `<SUBSTITUTE_SUPABASE_ANON_KEY>` with your Supabase project URL and anonymous key respectively.

