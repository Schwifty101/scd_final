# Docker Project - Environment Inconsistency & Containerization

**Student**: Soban Ahmad (22i2460)  
**Course**: SCD | Semester 7  
**Institution**: FAST-NUCES  
**Date**: December 7, 2025

---

## 📋 Project Overview

This project demonstrates the complete lifecycle of solving environment inconsistency problems using Docker containerization. It covers:

1. **Environment Inconsistency** - Demonstrating version conflicts (Node 16 vs Node 18)
2. **Docker Solutions** - Containerizing applications to ensure consistency
3. **Feature Development** - Building and integrating 7 new features with MongoDB
4. **Containerization** - Creating production-ready Docker images
5. **Manual Deployment** - Using Docker CLI for networking and volumes
6. **Docker Compose** - Simplifying orchestration with declarative configuration
7. **Repository Integration** - Adding Docker Compose to the project repository

**Total Score**: 100/100 marks

---

## 🗂️ Project Structure

```
.
├── PROJECT_REPORT.md          # Complete documentation with screenshots
├── init.md                    # Task tracker and progress log
├── README.md                  # This file
├── SCD-25-NodeApp/            # Part 1-2: Node.js app with version conflicts
│   ├── Dockerfile
│   ├── app.js
│   └── package.json
├── SCDProject25/              # Part 3-7: NodeVault application
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── README.md
│   ├── main.js
│   ├── package.json
│   ├── db/                    # Database layer (file + MongoDB)
│   ├── events/                # Event system for logging
│   ├── data/                  # JSON file storage
│   └── backups/               # Automatic backups
├── deployment/                # Part 6: Docker Compose deployment
│   └── docker-compose.yml
└── screenshots/               # 30+ timestamped evidence files
```

---

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed
- Node.js 18+ (for local development)
- Git
- macOS/Linux terminal

### Clone Repository

```bash
git clone https://github.com/Schwifty101/scd_final.git
cd scd_final
```

### Deploy with Docker Compose

#### Option 1: Deploy from Repository (Recommended)

```bash
cd SCDProject25
docker-compose up -d
```

#### Option 2: Deploy from Deployment Folder

```bash
cd deployment
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

---

## 📦 Docker Images

Published on Docker Hub:

1. **schwifty404/scd-nodeapp:v1.0** (65MB)
   - Node.js 18 Alpine
   - Express 5.1.0 application
   - Simple REST API

2. **schwifty404/scdproject25:v1.0** (141MB)
   - Node.js 18 Alpine
   - NodeVault CLI application
   - MongoDB integration

**Pull Images:**

```bash
docker pull schwifty404/scd-nodeapp:v1.0
docker pull schwifty404/scdproject25:v1.0
```

---

## 🏗️ Project Parts Summary

### Part 1: Understanding Environment Inconsistency (10 marks)

**Problem**: Application requires Node 18+ but server has Node 16

- Installed nvm (Node Version Manager)
- Installed Node 16
- Cloned SCD-25-NodeApp
- Documented deployment failures
- **Error**: `ReferenceError: fetch is not defined`

### Part 2: Solving with Docker Containers (15 marks)

**Solution**: Containerize with correct Node version

- Identified Node 18 as requirement
- Created Dockerfile with Node 18 Alpine
- Built and tested Docker image locally
- Published to Docker Hub
- Successfully deployed from Docker Hub
- **Result**: Application runs in container regardless of host Node version

### Part 3: Building Features into SCDProject25 (15 marks)

**Enhancement**: Added 7 new features to NodeVault application

1. ✅ **Search Functionality** - Case-insensitive search across all fields
2. ✅ **Sorting Capability** - Sort by id/name/value (asc/desc)
3. ✅ **Export to Text** - Generate human-readable exports
4. ✅ **Automatic Backups** - Timestamped backups on add/delete
5. ✅ **Data Statistics** - View vault statistics
6. ✅ **MongoDB Integration** - Docker-based MongoDB setup
7. ✅ **Environment Configuration** - .env file for secrets

### Part 4: Containerize the Application (10 marks)

**Deliverable**: Docker images for production deployment

- Created Dockerfile with best practices
- Built optimized image (141MB)
- Tested container locally
- Published to Docker Hub
- Documented container logs and processes

### Part 5: Deploy Containers Manually (15 marks)

**Manual Deployment**: Using Docker CLI commands

- Created private network: `nodevault-private`
- Deployed MongoDB with persistent volume
- Connected backend to network
- Verified network isolation (no public MongoDB access)
- Tested data persistence across restarts

### Part 6: Simplifying with Docker Compose (15 marks)

**Orchestration**: One-command deployment

- Created docker-compose.yml with services
- Configured environment variables
- Deployed stack with single command
- Demonstrated easy management (start/stop/logs)
- **Comparison**: 1 command vs 8+ manual commands

### Part 7: Update Repo with Docker Compose (10 marks)

**Integration**: Added Docker Compose to repository

- Created docker-compose.yml in repository
- Configured for building from source
- Created comprehensive README
- Committed and pushed to GitHub
- Final verification of all services

---

## 🐳 Docker Resources

### Networks

- `nodevault-private` - Private bridge network (Part 5)
- `scdproject25_nodevault-network` - Compose managed network (Part 6-7)

### Volumes

- `mongodb-data` - Persistent MongoDB storage (Part 5)
- `scdproject25_mongodb-repo-data` - Compose managed volume (Part 6-7)

### Containers

- `mongodb` / `mongodb-repo` - MongoDB 7.0 database
- `nodevault` / `nodevault-repo` - NodeVault CLI application

---

## 📊 Technical Metrics

| Metric | Manual Deployment | Docker Compose |
|--------|-------------------|----------------|
| **Commands** | 8+ commands | 1 command |
| **Setup Time** | 5-10 minutes | 30 seconds |
| **Configuration** | CLI arguments | YAML file |
| **Networking** | Manual creation | Automatic |
| **Volumes** | Manual creation | Automatic |
| **Dependencies** | Manual ordering | Automatic |
| **Reproducibility** | Medium | High |

---

## 🔧 Development Workflow

### Local Development (without Docker)

```bash
cd SCDProject25
npm install
node main.js
```

### Docker Development

```bash
cd SCDProject25
docker-compose up --build
```

### View Logs

```bash
docker-compose logs -f
docker-compose logs backend
docker-compose logs mongodb
```

### Execute Commands in Container

```bash
docker exec -it nodevault-repo /bin/sh
docker exec -it mongodb-repo mongosh -u admin -p SecurePass123
```

---

## 📸 Documentation

Complete documentation available in:

- **PROJECT_REPORT.md** - Full report with 30+ screenshots
- **init.md** - Task tracker with completion status
- **screenshots/** - Timestamped evidence for each task

---

## 🔗 Links

- **GitHub Repository**: https://github.com/Schwifty101/scd_final
- **Docker Hub (App 1)**: https://hub.docker.com/r/schwifty404/scd-nodeapp
- **Docker Hub (App 2)**: https://hub.docker.com/r/schwifty404/scdproject25
- **Source Repo 1**: https://github.com/LaibaImran1500/SCD-25-NodeApp
- **Source Repo 2**: https://github.com/LaibaImran1500/SCDProject25

---

## 🎯 Key Achievements

1. ✅ Demonstrated real-world environment inconsistency problem
2. ✅ Solved using Docker containerization
3. ✅ Implemented 7 production-ready features
4. ✅ Integrated MongoDB database with Docker
5. ✅ Published 2 images to Docker Hub
6. ✅ Created private networking and persistent storage
7. ✅ Mastered Docker Compose orchestration
8. ✅ Comprehensive documentation with 30+ screenshots

---

## 📝 License

This project is for educational purposes as part of SCD coursework at FAST-NUCES.

---

## 👨‍💻 Author

**Soban Ahmad**  
Roll Number: 22i2460  
Email: i222460@nu.edu.pk  
Institution: FAST-NUCES  
Semester: 7

---

**Project Status**: ✅ COMPLETED (100/100)  
**Date Completed**: December 7, 2025
