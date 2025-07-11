
# 🔗 URL Shortener App (MERN Stack)

A secure and full-featured URL shortener app built with **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can shorten URLs, view analytics, track login history, and manage links, all with enhanced privacy and security.

## Live Preview 🌐 [Visit Website](https://url.ihavetech.com)


![Screenshot 2025-05-22 132935](https://github.com/user-attachments/assets/b2c275f0-4a4d-4c4c-b2c0-c691e7bab416)
---

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS  
- **Backend**: Node.js, Express 5, MongoDB  
- **State Management**: React Query  
- **Routing**: React Router v7 (ESM-based imports)  
- **Security**: HTTPS-only cookies, JWT Auth, IP logging  
- **UI Components**: TailwindCSS, Lucide Icons, QR Code Generator

---

## Features

### URL Shortening
- Shortens any valid URL (adds `https://` automatically if missing).
- Uses `nanoid` to generate unique short IDs.
- Only logged-in users can create short URLs.
- Displays QR code for every shortened URL

### Dashboard
- View total links, active links, total clicks, and click-through rate.
- Preview of shortened URLs.
- Copy / Share / Delete options.

### Analytics

- Click tracking per link: logs IP address, ISP, device, country, state, and city.
- Users can view detailed analytics at `/analytics`.
- Live count of total clicks and click sources.

### QR Code Support

- Each short URL includes a generated QR code.
- Easy to scan and share offline or across devices.

### Click Tracking
- Logs the IP address, ISP, location (country/state/city), and device used on each click.

### Login Security
- IP address, location, and user agent are logged on every login.
- Auto-deletes old login records after 6 months using MongoDB TTL.
- Tokens are stored in **HTTP-only cookies** for enhanced security.

### Login History (Privacy Page)
- Users can view all login records.
- Logged info includes IP, location, and browser details.
- Auto-deletion of old login records after 6 months using **MongoDB TTL**.

### Contact Page
- Simple contact form for feedback/support.
- Integration ready for **Resend** (Transactional Email API).
- Future plan: OTP verification via email.

### Safe Deletion of Short URLs
- Deleted short links are first backed up before being removed.
- Backup stays for 6 months using MongoDB TTL.
- Helps with tracking misuse or accidental data loss.
- Only visible to the owner and admin if needed.
- If a user deletes a link by mistake, they can contact the admin via the Contact Page to request restoration.

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
VITE_BASE_API=http://localhost:3000
VITE_URL_API=http://localhost:3000/url
VITE_USER_API=http://localhost:3000/user
VITE_AUTH_API=http://localhost:3000/auth
VITE_ANALYTICS_API=http://localhost:3000/url/analytics
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

- Email alerts for logins.
- OTP-based email verification (via Resend).
- Export click data and analytics to CSV/Excel.
- Admin dashboard to manage users.

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
