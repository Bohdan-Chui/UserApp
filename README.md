# User Push Notification System

A microservice-based system for creating users and sending delayed push notifications using RabbitMQ, Redis and Webhook.

---

## Overview

- `user-service` – HTTP API for creating users + emits `user.created` event  
- `scheduler-service` – Listens for `user.created`, schedules a delayed task via Redis (Bull), emits `send.push`  
- `notification-service` – Listens for `send.push`, sends HTTP POST to webhook.site

---

## Technologies Used

- **NestJS**
- **RabbitMQ** – messaging between services
- **Redis + Bull** – job queue for delayed tasks
- **PostgreSQL** – user data storage
- **Webhook.site** – fake push delivery for testing
- **Docker + Docker Compose**

---

## How to Run

### Clone the repository

```bash
git clone https://github.com/Bohdan-Chui/UserApp
```

### Define Webhook URL
Examle: 
```
WEBHOOK_URL=https://webhook.site/your-unique-id
```

### Start the system
```
docker-compose up --build
```

### Test the API

Send a POST request to create a user
```
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "Alex"}'
```
