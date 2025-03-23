# Github Vibe - a GitHub Analytics Dashboard

A comprehensive React-based web application that provides deep insights into GitHub ecosystem data through an intuitive, widget-driven interface. Built with modern web technologies and best practices, this dashboard offers developers, maintainers, and open-source enthusiasts a powerful tool to track repository metrics, user activity, and community trends.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To connect the Github api, you need to [create an Github app](https://github.com/settings/apps/new) and configure following env variables. Simply add the following to .env file:

```
NEXT_PUBLIC_GITHUB_CLIENT_ID=add_your_public_client_id_here
GITHUB_CLIENT_SECRET=add_your_client_secret_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

To run the development server:

```bash
npm run rtk-codegen
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To deploy the app, in ci use the following script:

```
npm run rtk-codegen && npm run build
```

## Key Features

- Customizable Widget Dashboard:
  Build personalized views with customizable components for tracking trending repositories, top contributors, issue activity, and more.

- Repository Intelligence:
  Detailed analysis of codebases including commit history, branch management, pull request tracking, and contributor activity with drill-down capabilities.

- User Profiling:
  Comprehensive profiles showing GitHub user statistics, activity, following networks, and issue/pull request histories.

- Real-time GitHub Data:
  Integrated with GitHub's API to deliver fresh metrics on stars, forks, commits, and repository health indicators.

## Technical Highlights

Modern Stack: React + TypeScript + Ant Design + Redux Toolkit Query
