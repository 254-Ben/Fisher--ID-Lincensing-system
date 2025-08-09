# Fisher-ID: Digital Fisher Identity System

A comprehensive digital identity management system designed specifically for the fishing industry, providing secure digital identification, permit management, and regulatory compliance tools for fishermen and maritime authorities.

## 🎯 Project Overview

Fisher-ID is a full-stack web application that modernizes the traditional fisher identification process by providing:
- **Digital Fisher IDs** with QR codes for quick verification
- **Permit Management System** for tracking fishing licenses and certifications
- **Boat Registration** and documentation management
- **Administrative Dashboard** for regulatory authorities
- **Real-time Status Tracking** for permits and compliance

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + JWT Authentication
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcryptjs
- **File Upload**: Multer for document/image uploads
- **QR Generation**: qrcode library for digital ID verification

### Project Structure
```
Fisher-ID/
├── backend/
│   ├── server.js                 # Main server file
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Boat.js              # Boat registration schema
│   │   ├── Permit.js            # Fishing permits schema
│   │   └── DigitalId.js         # Digital ID schema
│   └── routes/
│       ├── auth.js              # Authentication endpoints
│       ├── boats.js             # Boat management
│       ├── permits.js           # Permit management
│       ├── digitalId.js         # Digital ID endpoints
│       ├── fisher.js            # Fisher profile endpoints
│       └── admin.js             # Admin dashboard endpoints
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main React app
│   │   ├── pages/               # Application pages
│   │   ├── components/          # Reusable components
│   │   ├── services/            # API services
│   │   └── contexts/            # React contexts
│   └── vite.config.js           # Vite configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Fisher-ID
```

2. **Install backend dependencies**
```bash
cd backend
pnpm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
pnpm install
```

4. **Environment Configuration**

Create `.env` files in both backend and frontend directories:

**Backend `.env`**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fisher-id
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

**Frontend `.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start the development servers**

**Backend**
```bash
cd backend
pnpm dev
```

**Frontend**
```bash
cd frontend
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Fisher Management
- `GET /api/fisher/profile` - Get fisher profile
- `PUT /api/fisher/profile` - Update fisher profile
- `GET /api/fisher/dashboard` - Get fisher dashboard data

### Boat Management
- `GET /api/boats` - Get all boats for user
- `POST /api/boats` - Register new boat
- `GET /api/boats/:id` - Get specific boat details
- `PUT /api/boats/:id` - Update boat information
- `DELETE /api/boats/:id` - Delete boat registration

### Permit Management
- `GET /api/permits` - Get all permits
- `POST /api/permits` - Apply for new permit
- `GET /api/permits/:id` - Get permit details
- `PUT /api/permits/:id` - Update permit status
- `DELETE /api/permits/:id` - Cancel permit

### Digital ID
- `GET /api/digital-id` - Get digital ID
- `POST /api/digital-id/generate` - Generate new digital ID
- `GET /api/digital-id/:id/verify` - Verify digital ID via QR code

### Admin Endpoints
- `GET /api/admin/dashboard` - Admin dashboard statistics
- `GET /api/admin/users` - Manage all users
- `GET /api/admin/permits` - Review all permits
- `PUT /api/admin/permits/:id/approve` - Approve permits
- `PUT /api/admin/permits/:id/reject` - Reject permits

## 🎨 Features

### For Fishermen
- **Digital ID Card**: QR code-enabled digital identification
- **Permit Tracking**: Real-time status of fishing permits
- **Boat Registration**: Easy boat documentation management
- **Profile Management**: Update personal and professional information
- **Document Upload**: Secure upload of certificates and documents

### For Administrators
- **Dashboard Analytics**: Overview of system statistics
- **User Management**: Manage all registered users
- **Permit Approval**: Streamlined permit review process
- **Compliance Monitoring**: Track regulatory compliance
- **Reporting Tools**: Generate compliance reports

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Comprehensive request validation
- **File Upload Security**: Secure file handling with validation
- **CORS Protection**: Cross-origin resource sharing configuration

## 🧪 Testing

### Backend Testing
```bash
cd backend
pnpm test
```

### Frontend Testing
```bash
cd frontend
pnpm test
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
pnpm build

# Start backend in production
cd ../backend
pnpm start
```

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@fisher-id.com or join our Slack channel.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for the fishing industry community
- Special thanks to maritime regulatory authorities for their input
