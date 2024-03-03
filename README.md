# Guide to Setting Up Node.js Project

## Step 1: Install Node.js Environment

First, you need to install the Node.js environment on your computer:

1. Access the following link to download Node.js: [Node.js Download](https://nodejs.org/en).
2. Download the appropriate version of Node.js for your operating system and proceed with the installation.
3. Verify the successful installation by opening Terminal (or Command Prompt) and running the following commands:

```shell
node --version
npm --version
```

If the Node.js and npm versions are displayed, the installation was successful.

## Step 2: Install PostgreSQL Database

The project requires a PostgreSQL database to be installed and configured:

1. Access the following link to download PostgreSQL: [PostgreSQL Download](https://www.postgresql.org/).
2. Download and install PostgreSQL version 12.15.
3. After installation, open PostgreSQL and create a new database named "capstone".
4. During installation, ensure that PostgreSQL is set to run on port 5432.

## Step 3: Install Redis

1. Access the following link to download Redis: [Redis Download](https://redis.io/download/).
2. Download and install the appropriate version of Redis for your operating system.
3. After installation, open Redis and ensure it is running on port 6379.

## Step 4: Open Node.js Project

1. Open Terminal (or Command Prompt) and navigate to the root directory of the project.

## Step 5: Add .env File

To configure environment variables, you need to add a .env file in the root directory of the project. Create a file named ".env" and copy the following environment variables into it:

```shell
PORT=5000
POSTGRES_PORT=5432
POSTGRES_USER_NAME=<Add if applicable>
POSTGRES_USER_PASSWORD=<Add if applicable>
POSTGRES_DB_NAME=capstone
POSTGRES_HOST=<Add if applicable>
SECRET_JWT=
SECRET_JWT_ADMIN=
S3_ACCESS_KEY=<AWS S3 Access Key>
S3_SECRET_KEY=<AWS S3 Secret Key>
S3_REGION=<AWS S3 Bucket Region>
S3_BUCKET=<AWS S3 Bucket Name>
SES_USERNAME=<AWS SES User Account>
SES_PASSWORD=<AWS SES User Password>
SES_REGION=<AWS SES User Region>
REDIS_URI=redis://localhost:6379
REDIS_USERNAME=<Add if applicable>
REDIS_PASSWORD=<Add if applicable>
```

## Step 6: Install Dependencies

Before running the project, you need to install the dependencies. Open Terminal (or Command Prompt) and run the following command:

```shell
npm install
```

Run the command to download git submodule for the project:

```shell
git submodule update --init --recursive && \
git submodule foreach git checkout $(branch) && \
git submodule foreach git pull origin $(branch)
```

## Step 7: Run the Project

Run the following command to run the project:

For admin server:

```shell
npx ts-node cmd/admin/index.ts
```

For app server:

```shell
npx ts-node cmd/app/index.ts
```

---
