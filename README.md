# Vibe Coding

Vibe Coding is a full-stack web application built using Angular for the frontend and Node.js with Express.js for the backend. The application uses MySQL/TiDB as its database and follows a REST API architecture.

## Tech Stack

### Frontend
- Angular
- TypeScript
- RxJS
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MySQL (Local Development)
- TiDB Cloud (Production)

## Project Structure

```text
Vibe-Coding/
├── vibe-coding/           # Angular Frontend
└── vibe-coding-backend/   # Node.js Backend
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/ankitsendhav8/Vibe-Coding.git
cd Vibe-Coding
```

### Backend Setup

```bash
cd vibe-coding-backend
npm install
npm start
```

Backend will run on:

```text
http://localhost:3000
```

### Frontend Setup

Open a new terminal and run:

```bash
cd vibe-coding
npm install
ng serve
```

Frontend will run on:

```text
http://localhost:4200
```

## Environment Variables

Create a `.env` file inside the `vibe-coding-backend` folder:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vibecodingdb

JWT_SECRET=your_secret_key
```

## Live Application

### Frontend (Netlify)

https://vibe-coding.netlify.app


## Database

The application uses:

- MySQL for local development
- TiDB Cloud for production deployment

Update database credentials in the `.env` file before running the application.

## Author

**Ankit Sendhav**

GitHub: https://github.com/ankitsendhav8