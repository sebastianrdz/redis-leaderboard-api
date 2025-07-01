# 🏆 Redis Leaderboard API

A blazing-fast backend API for managing a real-time leaderboard, built with **Node.js**, **Express**, and **Redis Sorted Sets**.

Users can submit scores, view top rankings, and fetch their personal rank — all optimized for speed and simplicity using Redis.

---

## 🔧 Features

- ⚡ High-performance leaderboard using Redis sorted sets
- 🧮 Submit and rank user scores with atomic operations
- 📊 REST API for top-N leaderboard and individual ranks
- 🧪 Fully testable with Postman, curl, or Swagger (optional)
- 🐳 Redis-powered, with Docker-ready setup (optional)

---

## 📦 Tech Stack

| Layer   | Tech             |
|---------|------------------|
| Server  | Node.js + Express |
| Storage | Redis (Sorted Sets) |
| Deploy  | Railway, Fly.io, or Docker |
| API     | REST (JSON)      |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/redis-leaderboard-api.git
cd redis-leaderboard-api
npm install
```

### 2. Set Up Environment Variables
```bash
REDIS_URL=redis://localhost:6379
PORT=3000
```


### 3. Start Redis
#### Local:
```bash
redis-server
```
#### Docker:
```bash
docker run -p 6379:6379 redis
```
#### Docker Copmose:
```bash
docker compose up

```

### 4. Start the Server
```bash
npm start
```

## API Endpoints
`POST /api/submit`
Submit a score for a user.

Request:
```json
POST /api/submit
{
  "user_id": "user:sebastian",
  "score": 1234
}
```
Reponse:
```json
{ "message": "Score submitted" }
```

---
`GET /api/leaderboard?limit=10`
Returns the top N scores (default 10).

Request:
```json
GET /api/leaderboard
```
Response:
```json
[
  { "score": 1700, "value": "user:john" },
  { "score": 1500, "value": "user:sebastian" }
]

```

---
`GET /api/rank/:user_id`
Returns the current rank and score of a user.

Request:
```json
GET /api/rank/user:sebastian
```
Response:
```json
{
  "user_id": "user:sebastian",
  "score": 1500,
  "rank": 2
}
```
