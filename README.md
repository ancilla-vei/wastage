# Smart Waste Management System — Mangalore City

Production-oriented MERN web portal for Mangalore City Municipal Corporation. Citizens submit garbage reports using live GPS and live camera; the backend validates images with Google Gemini Vision, checks duplicates, routes reports to zones, assigns sanitation workers, verifies cleanup, and exposes analytics.

## Features
- Citizen registration/login with Indian mobile validation, JWT access tokens, and refresh-token rotation.
- Live GPS waste reporting with live camera capture and Cloudinary upload support.
- Gemini Vision waste validation and cleanup verification service with development fallback.
- Duplicate detection within 50 meters using MongoDB 2dsphere indexes.
- Zone routing for Ullal, Kadri, Kankanady, Hampankatta, Surathkal, and Bejai.
- Officer workflows: worker management, complaint assignment, cleanup verification, zone analytics, hotspot reports.
- Worker workflows: assigned tasks, navigation, task start, cleanup photo completion.
- Admin workflows: officers, zones, all complaints, system analytics, hotspots, worker performance.
- Real-time Socket.io events and notification bell UI.
- Material UI government portal theme inspired by Swachh Bharat and Karnataka government palettes.

## Tech Stack
| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, React Router v6, MUI v5, Recharts |
| Maps & Camera | @react-google-maps/api, react-webcam |
| Backend | Node.js, Express.js, Socket.io |
| Database | MongoDB, Mongoose |
| Auth & Security | JWT, refresh tokens, bcryptjs, Helmet, rate limiting, express-validator |
| AI & Media | Google Gemini Vision, Cloudinary, multer |
| Jobs | node-cron hotspot recalculation |

## Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas URI
- Cloudinary credentials
- Google Gemini API key
- Google Maps browser API key

## Installation
```bash
# Clone repository
git clone <repository-url>
cd smart-waste-mangalore

# Backend setup
cd server
npm install
cp ../.env.example .env
# Fill in .env values
npm run seed
npm run dev

# Frontend setup (new terminal)
cd client
npm install
cp ../.env.example .env
# Fill in VITE_* values
npm run dev
```

## Default Login Credentials
| Role | Login | Password |
| --- | --- | --- |
| Admin | ADM001 | Admin@123 |
| Officer | OFF001–OFF006 | Officer@123 |
| Worker | WRK001–WRK012 | Worker@123 |

## API Documentation
| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | /api/auth/register | Public | Citizen registration |
| POST | /api/auth/login | Public | Citizen login |
| POST | /api/auth/staff/login | Public | Worker/officer/admin login |
| POST | /api/auth/refresh | Public | Refresh token rotation |
| POST | /api/auth/logout | Auth | Invalidate refresh token |
| POST | /api/complaints | Citizen | Submit GPS/image complaint |
| GET | /api/complaints | Officer/Admin | List complaints with filters |
| GET | /api/complaints/my | Citizen | Citizen complaint history |
| GET | /api/complaints/:id | Auth | Complaint detail |
| POST | /api/complaints/:id/support | Citizen | Support duplicate/nearby complaint |
| PATCH | /api/complaints/:id/assign | Officer | Assign worker |
| PATCH | /api/complaints/:id/verify | Officer | Verify cleanup |
| PATCH | /api/complaints/:id/reject | Officer | Reject complaint |
| GET | /api/worker/tasks | Worker | Assigned tasks |
| PATCH | /api/worker/tasks/:taskId/start | Worker | Start task with GPS |
| POST | /api/worker/tasks/:taskId/complete | Worker | Upload cleanup evidence |
| GET | /api/officer/workers | Officer | Zone worker list |
| GET | /api/officer/zone/analytics | Officer | Zone chart data |
| GET | /api/admin/analytics | Admin | System analytics |
| GET | /api/analytics/public | Public | Portal public statistics |
| GET | /api/notifications | Auth | User notifications |
| POST | /api/feedback | Citizen | Submit feedback |

## Folder Structure
- `server/` — Express API, models, controllers, routes, services, sockets, seed script.
- `client/` — Vite React app, pages by role, shared components, contexts, hooks, services, theme.
- `.env.example` — Backend and frontend environment variable reference.

## Architecture
```text
Citizen Browser ─┐
Officer Browser ─┼─ React + MUI + Socket.io Client ── Express API ── MongoDB
Worker Browser  ─┘                                      │
                                                        ├─ Cloudinary images
                                                        ├─ Gemini Vision AI
                                                        └─ Socket.io rooms
```

## Contributing
1. Create a feature branch.
2. Keep backend responses in `{ success, message, data, errors }` format.
3. Use role-protected routes for all staff/citizen workflows.
4. Run frontend build and backend syntax checks before opening a PR.
