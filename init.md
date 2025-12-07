# Docker Project - Task Tracker and Plan

**Project**: Dockerizing and Deploying Applications (macOS)
**Student**: Soban Ahmad
**Start Date**: December 7, 2025
**Status**: Planning Complete ✓ | Ready to Execute

---

## Project Overview

This project involves 7 parts covering Docker containerization, deployment, and orchestration on macOS. The project will be completed incrementally with screenshots and a progressive report (`PROJECT_REPORT.md`).

### Key Repositories:

1. **SCD-25-NodeApp**: https://github.com/LaibaImran1500/SCD-25-NodeApp
2. **SCDProject25**: https://github.com/LaibaImran1500/SCDProject25

---

## Planning Status: ✅ COMPLETED

- [x] Explored SCD-25-NodeApp repository
- [x] Explored SCDProject25 repository
- [x] Created comprehensive task breakdown
- [x] Wrote detailed plan to plan file
- [x] User questions answered (server setup, report format, MongoDB approach, Docker Hub)
- [x] Ready to begin execution

---

## Execution Status by Part

### Part 1: Understanding Environment Inconsistency (10 marks) - ✅ COMPLETED

**Objective**: Demonstrate version mismatch issues by installing Node 16 and running an app requiring Node 18+

- [x] Task 1.1: Install nvm (Node Version Manager) ✅
- [x] Task 1.2: Install and verify Node 16 ✅
- [x] Task 1.3: Clone SCD-25-NodeApp repository ✅
- [x] Task 1.4: Attempt to install dependencies and run (will fail) ✅
- [x] Report Part 1 completed ✅

**Estimated Time**: 1-2 hours

---

### Part 2: Solving with Docker Containers (15 marks) - ✅ COMPLETED

**Objective**: Fix version mismatch by containerizing with correct Node version

- [x] Task 2.1: Research and identify correct Node version (Node 18+) ✅
- [x] Task 2.2: Create Dockerfile for the app ✅
- [x] Task 2.3: Build Docker image locally ✅
- [x] Task 2.4: Test Docker container locally ✅
- [x] Task 2.5: Publish image to Docker Hub ✅
- [x] Task 2.6: Run in "server" environment (macOS) ✅
- [x] Task 2.7: Test HTTP request ✅
- [x] Report Part 2 completed ✅

**Estimated Time**: 2-3 hours

---

### Part 3: Building Features into SCDProject25 (15 marks) - 🔄 IN PROGRESS

**Objective**: Clone NodeVault, create feature branch, implement 7 features, integrate MongoDB

- [x] Task 3.1: Clone SCDProject25 repository ✅
- [x] Task 3.2: Run application locally ✅
- [x] Task 3.3: Create feature branch ✅
- [x] Task 3.4: Implement Search Functionality
- [x] Task 3.5: Implement Sorting Capability
- [x] Task 3.6: Implement Export to Text File
- [x] Task 3.7: Implement Automatic Backup System
- [x] Task 3.8: Implement Data Statistics
- [x] Task 3.9: Set up MongoDB Docker container
- [x] Task 3.10: Integrate MongoDB into application
- [x] Task 3.11: Move MongoDB connection to .env file
- [ ] Task 3.12: Test all features
- [ ] Task 3.13: Merge feature branch to main
- [ ] Report Part 3 completed

**Estimated Time**: 6-8 hours

---

### Part 4: Containerize the Application (10 marks) - ⏳ PENDING

**Objective**: Create Dockerfiles and publish images

- [ ] Task 4.1: Create containerization branch
- [ ] Task 4.2: Create Dockerfile for backend
- [ ] Task 4.3: Build Docker image
- [ ] Task 4.4: Run and test containers locally
- [ ] Task 4.5: Document container logs and processes
- [ ] Task 4.6: Publish image to Docker Hub
- [ ] Task 4.7: Commit and version changes
- [ ] Report Part 4 completed

**Estimated Time**: 1-2 hours

---

### Part 5: Deploy Containers Manually (15 marks) - ⏳ PENDING

**Objective**: Manual deployment with Docker CLI, networking, volumes

- [ ] Task 5.1: Create private Docker network
- [ ] Task 5.2: Deploy MongoDB with volume
- [ ] Task 5.3: Deploy backend container
- [ ] Task 5.4: Verify network isolation
- [ ] Task 5.5: Test data persistence
- [ ] Task 5.6: Document all Docker commands
- [ ] Task 5.7: Document challenges and complexity
- [ ] Report Part 5 completed

**Estimated Time**: 2-3 hours

---

### Part 6: Simplifying with Docker Compose (15 marks) - ⏳ PENDING

**Objective**: Recreate deployment using docker-compose.yml

- [ ] Task 6.1: Create docker-compose.yml
- [ ] Task 6.2: Create .env file
- [ ] Task 6.3: Stop manual containers
- [ ] Task 6.4: Deploy with Docker Compose
- [ ] Task 6.5: Test all services
- [ ] Task 6.6: Demonstrate easy management
- [ ] Task 6.7: Compare with manual process
- [ ] Report Part 6 completed

**Estimated Time**: 1-2 hours

---

### Part 7: Update Repo with Docker Compose (10 marks) - ⏳ PENDING

**Objective**: Add docker-compose.yml to repository

- [ ] Task 7.1: Navigate to project repository
- [ ] Task 7.2: Clean Docker environment
- [ ] Task 7.3: Create docker-compose.yml in repository
- [ ] Task 7.4: Ensure .env file exists
- [ ] Task 7.5: Build and run with Docker Compose
- [ ] Task 7.6: Verify application functionality
- [ ] Task 7.7: Create README (optional)
- [ ] Task 7.8: Commit and push final code
- [ ] Task 7.9: Final cleanup
- [ ] Report Part 7 completed

**Estimated Time**: 1-2 hours

---

## Overall Progress

**Total Tasks**: 60+ individual tasks across 7 parts
**Completed**: 14 execution tasks (Planning: ✅) | Part 1: ✅ | Part 2: ✅
**Remaining**: 46+ tasks
**Total Estimated Time**: 15-25 hours

---

## Prerequisites Checklist

Before starting execution:

- [ ] macOS with terminal access ✓
- [ ] Homebrew installed (`brew --version`)
- [ ] Git installed (`git --version`)
- [ ] Docker Desktop for Mac installed and running
- [ ] Internet connection ✓
- [ ] Docker Hub account credentials ✓
- [ ] Text editor installed ✓

---

## Workflow

### Step-by-Step Process:

1. **I provide**: Exact commands for current task
2. **You execute**: Run commands, take screenshot(s)
3. **You confirm**: "Done, screenshot taken"
4. **I update**: Add task content to `PROJECT_REPORT.md`
5. **I update**: Mark task complete in this `init.md`
6. **Repeat**: Move to next task

### Important Notes:

- One task at a time - no rushing
- Wait for report updates after each task
- Screenshots must show date/time
- Replace `yourusername` with your Docker Hub username
- Keep this file updated as we progress

---

## File Structure

```
~/Fast-Nuces/Semester 7/SCD/final/
├── init.md (this file - task tracker)
├── PROJECT_REPORT.md (will be created - incremental report)
├── SCD-25-NodeApp/ (will be cloned in Part 1)
├── SCDProject25/ (will be cloned in Part 3)
└── deployment/ (will be created in Part 6)
```

---

## Next Step

**Current**: Part 3, Task 3.4: Implement Search Functionality

Last completed: Task 3.3 ✅

---

## Notes

- Plan file location: `/Users/sobanahmad/.claude/plans/quiet-stargazing-sunbeam.md`
- Detailed plan available in plan file
- This init.md will be updated after each task completion
- Screenshots should be organized by part/task number
