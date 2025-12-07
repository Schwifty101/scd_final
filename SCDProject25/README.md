# NodeVault - Secure Password Management CLI

A command-line interface application for secure password and credential management with MongoDB backend support.

## Features

- ✅ CRUD operations (Create, Read, Update, Delete)
- 🔍 Search functionality (case-insensitive, across all fields)
- 🔄 Sort records by ID, name, or value
- 📤 Export vault data to text file
- 💾 Automatic backup system (timestamped backups on add/delete)
- 📊 Vault statistics (record counts, date ranges, file metadata)
- 🗄️ MongoDB integration for persistent storage
- 📝 Event-driven logging system

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed
- Git (for cloning the repository)

## Quick Start with Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/LaibaImran1500/SCDProject25.git
cd SCDProject25
```

### 2. Configure Environment Variables

The `.env` file is already configured with default values:

```bash
MONGODB_URI=mongodb://admin:SecurePass123@mongodb:27017/nodevault?authSource=admin
NODE_ENV=production
```

**Note**: For production deployment, change the MongoDB credentials in both `.env` and `docker-compose.yml`.

### 3. Deploy with Docker Compose

Build and start all services:

```bash
docker-compose up --build -d
```

This single command will:
- Build the backend application from source
- Pull MongoDB 7.0 image
- Create private network for service isolation
- Create persistent volume for MongoDB data
- Start both services in the correct order

### 4. Verify Services are Running

```bash
docker-compose ps
```

You should see:
- `mongodb-repo`: MongoDB 7.0 container
- `nodevault-repo`: NodeVault backend container

### 5. View Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f backend
```

## Managing the Application

### Start Services

```bash
docker-compose start
```

### Stop Services

```bash
docker-compose stop
```

### Restart Services

```bash
docker-compose restart
```

### Stop and Remove Containers

```bash
docker-compose down
```

### Stop and Remove Everything (including volumes)

```bash
docker-compose down -v
```

## Architecture

### Docker Compose Services

- **mongodb**: MongoDB 7.0 database
  - Persistent storage via Docker volume
  - Authentication enabled
  - Isolated on private network

- **backend**: NodeVault CLI application
  - Built from Dockerfile
  - Node.js 18 Alpine base image
  - Connected to MongoDB via Docker network

### Network Architecture

```
┌─────────────────────────────────────┐
│   Docker Compose Environment       │
│                                     │
│  ┌──────────────┐  ┌────────────┐ │
│  │   Backend    │  │  MongoDB   │ │
│  │ (NodeVault)  │──│   7.0      │ │
│  └──────────────┘  └────────────┘ │
│         │                │         │
│         └────────────────┘         │
│      nodevault-network (bridge)    │
│                                     │
│  Volume: mongodb-repo-data          │
└─────────────────────────────────────┘
```

## Manual Deployment (Without Docker Compose)

### Using Pre-built Docker Image

```bash
# Create network
docker network create nodevault-network

# Start MongoDB
docker run -d --name mongodb \
  --network nodevault-network \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=SecurePass123 \
  -v mongodb-data:/data/db \
  mongo:7.0

# Start backend
docker run -d --name nodevault \
  --network nodevault-network \
  -e MONGODB_URI=mongodb://admin:SecurePass123@mongodb:27017/nodevault?authSource=admin \
  schwifty404/scdproject25:v1.0
```

## Local Development (Non-Dockerized)

### Prerequisites

- Node.js 18+
- MongoDB running locally or via Docker

### Setup

```bash
# Install dependencies
npm install

# Configure environment
echo "MONGODB_URI=mongodb://localhost:27017/nodevault" > .env

# Run application
node main.js
```

## Troubleshooting

### Services won't start

```bash
# Check if ports are already in use
docker ps -a

# Remove conflicting containers
docker-compose down
docker system prune -f
```

### MongoDB connection issues

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify network connectivity
docker exec nodevault-repo ping -c 2 mongodb
```

### Application logs show errors

```bash
# View detailed backend logs
docker-compose logs --tail 50 backend
```

## Data Persistence

- MongoDB data persists in Docker volume `scdproject25_mongodb-repo-data`
- Data survives container restarts and removals
- To completely reset data: `docker-compose down -v`

## Security Notes

- Default credentials are for development only
- Change MongoDB credentials for production deployment
- `.env` file should not be committed to version control (add to `.gitignore`)
- Use Docker secrets or environment-specific .env files for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker Compose
5. Submit a pull request

## License

This project is part of an academic assignment for SCD course at FAST-NUCES.

## Author

**Soban Ahmad** (22i2460)
FAST-NUCES | Semester 7 | SCD Project

## Repository

- **GitHub**: https://github.com/LaibaImran1500/SCDProject25
- **Docker Hub**: https://hub.docker.com/r/schwifty404/scdproject25

## Acknowledgments

- Built with Node.js, MongoDB, and Docker
- Containerization follows industry best practices
- Deployed using Docker Compose for simplified orchestration
