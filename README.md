## Project Requirements

`node 20.12.0`
`npm 10.5.0`
`next 14.1.4`
`react ^18`

## Overview
The Product Management Platform is a web application designed to manage products. Built with Next.js and Prisma, it provides a seamless interface for product management with support for user permissions.

## Installation

**Clone the repository**
 ```bash
git clone https://github.com/Domior/product-management-platform.git
cd product-management-platform
```
**Install dependencies**
```bash
npm install
```
**Set up environment variables**\
Create a `.env` file based on `.env.example` and configure your database connection and other environment variables.

**Run the development server**
```bash
npm run dev
```
**Open the app in your browser**\
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
Product Management:

- Add new products by filling out the product form.
- Edit existing products by selecting them from the list.
- Delete products as needed.

User Permissions:

- Manage user roles and permissions to control access to different parts and actions of the application.

## Controlling Prisma Migrations
**Edit Prisma Schema**\
Make changes to your data model in `prisma/schema.prisma`.

**Generate Migration**\
After editing the schema, generate a new migration:
```bash
npx prisma migrate dev --name <migration_name>
```

**Apply Migrations**\
To apply pending migrations, use:
```bash
npx prisma migrate deploy
```

**Introspect Database**\
If you want to introspect and generate Prisma models based on an existing database schema:
```bash
npx prisma db pull
```

**Generate Prisma Client**\
After making changes to the schema or database, regenerate the Prisma Client:
```bash
npx prisma generate
```
