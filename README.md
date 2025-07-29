# Client Scheduler

<br>

## Overview

A simple, responsive frontend for scheduling onboarding and follow-up calls, built with React, TypeScript, and Tailwind CSS, integrated with Firebase Firestore for data persistence.

## Tech Stack

- **React (with TypeScript)** UI library for building components
- **Tailwind CSS** for utility-first styling
- **Firebase Firestore** for real-time data storage and querying
  
## Features

- **Daily Calendar View:** Displays time slots in 20-minute increments (10:30 AM–7:30 PM).
- **Booking Flow:** Modal for client search, call type selection, and time slot booking.
- **Overlap Prevention:** Ensures no two calls overlap based on call duration.
- **Recurring Calls:** Automatically shows weekly follow-up calls on the chosen weekday.
- **Past Slot Handling:** Disables time slots before the current time.
- **Cancel Bookings:** Remove bookings with a single click.

## Firebase Schema
The Firestore database consists of two main collections:

- **clients** (optional): stores static client info
  - Fields:  
    - `name` (string)  
    - `phone` (string)

- **bookings**: stores each booked call
  - Fields:
    - `clientId` (string)
    - `clientName` (string)
    - `callType` ("onboarding" | "followup")
    - `date` (string, YYYY-MM-DD)
    - `time` (string, HH:mm)
    - `recurrence?` ("weekly")
    - `createdAt` (timestamp)

## Project Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/e36b29ed-2629-4c80-bd17-94a87a2b1fd9" alt="Screenshot 1" width="45%" />
  <img src="https://github.com/user-attachments/assets/0ff69f73-f662-49a0-a1e7-3a137eaeb204" alt="Screenshot 2" width="45%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/943c3d73-4675-4a1e-bb01-d1a0947d9f45" alt="Screenshot 3" width="45%" />
  <img src="https://github.com/user-attachments/assets/53ac5e8a-0c75-4326-aa9a-bd5fdc25f0ac" alt="Screenshot 4" width="45%" />
</p>

---

## Installation

### Clone the repository:

  ```bash
  git clone https://github.com/ssln-arun/client-scheduler.git
  cd client-scheduler
  ```
### Install Dependencies:
  
  ```bash
  npm install
  ```

### Firebase Setup:

1. Create a Firebase Project
   - Go to the Firebase Console and create a new project.

2. Enable Firestore
   - In your Firebase project, navigate to:
   - Build > Firestore Database -> Click Create Database and select the desired mode and region.

3. Get Firebase Config
   - Go to Project Settings > General -> Scroll down to Your Apps -> Choose your web app or create one -> Copy the Firebase configuration object.

4. Create a .env file
   - At the root of your project, create a file named .env and paste your Firebase configuration like this:

  ```bash
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  ```

5. Add .env to .gitignore
   To ensure your Firebase credentials are not exposed, add the following line to your .gitignore file:
  ```bash
  .env
  ```

6. Set up Firebase config in the app
   Create a file at:
  ```bash
  src/firebase/config.ts
  ```
Paste the following code:  

  ```ts
  import { initializeApp } from 'firebase/app';
  import { getFirestore } from 'firebase/firestore';
  
  const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  ```

### Start the Development Server:

  ```bash
  npm run dev
  ```
Open http://localhost:5173/ in your browser.

## Usage

- Select a **date** using the date picker.
- Click **Book** on an available time slot.
- In the modal, **search** for a client, choose call type, and confirm.
- See the booking appear immediately on the calendar.
- Cancel any booking by clicking **Delete** on its slot.

## Future Improvements

- Add user authentication and per-user calendars.
- Replace static client list with Firestore collection.
- Enhance UI with animations and accessibility updates.
- Add timezone and localization support.
