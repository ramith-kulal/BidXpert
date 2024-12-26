# Bidxpert Auction Platform

Bidxpert is an auction platform where users can list and bid on items. Built using Next.js, TypeScript, Prisma, and modern web technologies, it allows seamless interaction with user authentication and secure bidding functionalities.

Live Demo: [https://bidxpert.vercel.app/](https://bidxpert.vercel.app/)

## Features

- **User Authentication**: Sign-up, login, and token-based authentication using JWT and bcrypt.
- **Real-time Auction Items**: List and bid on auction items with real-time updates (no WebSockets).
- **Secure Token Storage**: User JWT tokens are securely stored in HTTP-only cookies.
- **Database Management**: Uses Prisma for easy management of database operations.
- **Modern UI**: Built with Next.js, TypeScript, and Tailwind CSS for a clean, responsive interface.
- **Deployment**: Hosted on Vercel with automated Prisma Client generation.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Authentication**: JWT (JSON Web Token), bcrypt
- **Database**: PostgreSQL (with Prisma ORM)
- **Version Control**: Git, GitHub
- **Deployment**: Vercel
## Screenshots:
![Screenshot 2024-12-26 234707](https://github.com/user-attachments/assets/8dda5b24-557c-4d2f-90f9-141e5d0c1636)
![Screenshot 2024-12-26 234809](https://github.com/user-attachments/assets/67f7f034-3ee9-44e6-a207-22ef0541abc9)
![Screenshot 2024-12-26 234749](https://github.com/user-attachments/assets/d11310c7-6241-437e-a952-a4315fdcc0f7)
![Screenshot 2024-12-26 234733](https://github.com/user-attachments/assets/873ebf81-dc15-4796-926d-1d38e59e942e)

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- PostgreSQL or any relational database
- Prisma ORM

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bidxpert.git
   cd bidxpert
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables:
  ```bash
DATABASE_URL="your-database-connection-string"

```

4. Set up Prisma:
   ```bash
   npx prisma generate
If deploying on Vercel, ensure the prisma generate command is part of the build process (as described in the previous steps).

5.Run the application locally:
Start the development server:
```bash
npm run dev
```
# Conclusion
This project has been an excellent learning experience, helping me strengthen my skills in full-stack development, security, and deployment. I'm excited about the potential to further enhance the platform with new features and optimizations. Feel free to explore the project, and feel free to contribute or provide feedback. Thanks for checking it out!
   
   
