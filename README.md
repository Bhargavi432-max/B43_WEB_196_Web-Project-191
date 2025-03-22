# Loan Application System

## Overview
The **Loan Application System** is a web-based platform that allows users to manage loan applications, schedule repayments, and receive payment reminders. Built using **React.js** for the frontend and **Node.js with MongoDB** for the backend, the system provides a seamless user experience with authentication, loan scheduling, and repayment tracking features.

## Features
 **User Authentication** – Secure login system using JWT authentication.  
 **Loan Management** – Users can view, apply for, and manage their loans.  
 **Schedule Repayments** – Admins can set repayment schedules for users.  
 **Payment Reminders** – Users receive alerts for upcoming payments.  
 **Responsive UI** – Clean and intuitive interface with modern styling.  

## Deployed Link
```sh
https://67de1f5903dc035ee55a3711--dainty-snickerdoodle-0711b8.netlify.app/
---

## Tech Stack
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **State Management:** React Context API
- **API Calls:** Axios

---

## Installation & Setup
### ** Clone the Repository**
```sh
git clone https://github.com/Bhargavi432-max/Loan_Application_Sysytem.git
cd loan-application-system
```

### ** Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
```
#### **Backend**
```sh
cd backend
npm install
```

### ** Setup Environment Variables**
Create a `.env` file in the backend directory and add:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### ** Run the Application**
#### **Start Backend**
```sh
cd backend
npm start
```
#### **Start Frontend**
```sh
cd frontend
npm start
```

---

## API Endpoints
### **Authentication**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### **Loans**
- `GET /api/loans` - Fetch all available loans
- `GET /api/loans/:id` - Fetch loan details
- `POST /api/loans/apply` - Apply for a loan

### **Repayments**
- `POST /api/repayments/schedule/:loanId` - Schedule loan repayments
- `GET /api/repayments/calendar/:userId` - Fetch user's upcoming repayments

---

## File Structure
```
loan-application-system/
├── frontend/        # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│   ├── README.md
│
├── backend/        # Node.js Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   ├── .env
│
├── README.md
```

---

## Future Enhancements 
🔹 Add **SMS notifications** for upcoming repayments.  
🔹 Implement **loan approval workflows** for admin review.  
🔹 Add **AI-powered loan eligibility predictions**.  

---

