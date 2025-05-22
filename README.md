
# 🔗 URL Shortener App (MERN Stack)

A secure and full-featured URL shortener app built with **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can shorten URLs, view analytics, track login history, and manage links, all with enhanced privacy and security.

## Live Preview 🌐 [Visit Website](https://url.ihavetech.com)


![Screenshot 2025-05-22 132935](https://github.com/user-attachments/assets/b2c275f0-4a4d-4c4c-b2c0-c691e7bab416)
---

## Tech Stack

- **Frontend**: React 19 + Vite + TailwindCSS  
- **Backend**: Node.js + Express 5 + MongoDB  
- **State Management**: React Query  
- **Routing**: React Router v7 (ESM-based imports)  
- **Security**: HTTPS-only cookies, JWT Auth, IP logging  
- **UI Components**: TailwindCSS, Lucide Icons

---

## Features

### URL Shortening
- Shortens any valid URL (adds `https://` automatically if missing).
- Uses `nanoid` to generate unique short IDs.
- Only logged-in users can create short URLs.

### Mini Dashboard
- View total links, active links, total clicks, and click-through rate.
- Slice preview of latest 5 shortened URLs.
- Copy / Share / Delete options.

### Click Tracking
- Logs the IP address, ISP, location (country/state/city), and device used on each click.

### Login Security
- IP address, location, and user agent are logged on every login.
- Tokens are stored in **HTTP-only cookies** for enhanced security.

### Login History (Settings Page)
- Users can view all login records.
- Auto-deletion of old login records after 6 months using **MongoDB TTL**.

### Contact Page
- Simple contact form for feedback/support.
- Integration ready for **Resend** (Transactional Email API).
- Future support for OTP-based verification via email.

---

## Installation

### Backend Setup

```bash
git clone https://github.com/theavnishkumar/url-Shortener.git
cd url-Shortener/server
npm install
npm run dev
```

Create a `.env` file in `server/` with the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
ORIGIN=http://localhost:5173
```

---

### Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Create a `.env` file in `client/`:

```env
VITE_AUTH_API=http://localhost:3000/auth
VITE_USER_API=http://localhost:3000/user
VITE_URL_API=http://localhost:3000/url
VITE_BASE_API=http://localhost:3000
```

---

## Project Structure

```
url-Shortener/
│
├── client/           # React frontend
│   ├── components/
│   ├── contexts/
│   ├── layout/
│   ├── router/
│   ├── pages/
│   ├── api/
│   └── main.jsx
│
├── server/           # Express backend
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
```

---

## Upcoming Features

- Full URL analytics (graphs, device types, countries).
- Email alerts for logins.
- OTP-based email verification (via Resend).
- 🗃Export click data and analytics to CSV/Excel.

---

## Contributing

This project is open for contributions!

- Found a bug? Open an issue
- Want to add a feature? Submit a PR
- Have suggestions? Share in the discussion tab

---

## Author

Made with ❤️ by [Avnish Kumar](https://github.com/theavnishkumar)

---

## License

Licensed under [MIT](LICENSE)
