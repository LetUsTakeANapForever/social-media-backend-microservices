# Distributed Social Media Backend System (Microservices Architecture)

A distributed social media backend system built using a microservices architecture.  
Core features are separated into independent services to improve scalability and maintainability.

---

## Overview

This project demonstrates how modern distributed systems are designed using:

- API Gateway Pattern
- Microservices Architecture
- Event-Driven Communication with RabbitMQ
- Distributed Caching with Redis
- Containerized Deployment using Docker (VPS-hosted)
- CI/CD Automation via GitHub Actions

---

## Architecture

The system consists of multiple independent services communicating through HTTP and message queues.

### Core Services

- **API Gateway**
- **User Service**
- **Post Service**
- **Media Service**
- **Search Service**

---

## Tech Stack

#### Backend

- Node.js

### Caching

- Redis

### Message Broker

- RabbitMQ

### Containerization

- Docker

### CI/CD

- GitHub Actions

### Hosting

- Hostinger VPS

---

## Services Description

### 1. API Gateway

- Central entry point
- Request routing
- Middleware handling
- Authentication layer

### 2. User Service

- User registration
- Authentication
- User logout

### 3. Post Service

- Create / Delete posts
- Business logic for content handling
- Redis caching

### 4. Media Service

- Media upload handling
- File storage integration

### 5. Search Service

- Search queries
- Redis caching
- Event-driven updates from Post Service

---

## Caching Strategy

Redis is used to:

- Cache frequently accessed search results
- Reduce database load
- Improve response time

Cache invalidation is triggered when:

- A post is created
- A post is deleted

---

## Deployment

- Each service is containerized using Docker
- Images are built and pushed automatically via GitHub Actions
- Deployed to VPS environment

---

## Purpose

The goal of this project is to understand and implement the core principles behind scalable distributed backend systems.

It focuses on designing a microservices-based architecture that incorporates event-driven communication, distributed caching, containerization, and CI/CD workflows within a production-oriented environment.
