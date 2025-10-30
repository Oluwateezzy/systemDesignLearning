# URL Shortener with Observability (Tracing, Metrics & Logging)

This project is a simple URL shortener service built with **Node.js** and **Express**, enhanced with full observability using:

✅ **OpenTelemetry** for distributed tracing
✅ **Prometheus** metrics via `prom-client`
✅ **Winston** structured logging

It demonstrates how to add tracing, metrics, and structured logs to a Node.js microservice.

---

## Project Structure

```
.
├── server.js          # Main application
├── logger.js          # Winston logger config
├── metrics.js         # Prometheus metrics setup
├── package.json
└── app.log            # Application logs (auto-generated)
```

---

## Features

| Feature          | Description                                    |
| ---------------- | ---------------------------------------------- |
| URL Shortening   | Basic in-memory URL shortening service         |
| Tracing          | OpenTelemetry (HTTP + Express instrumentation) |
| Metrics          | Prometheus counters & histograms               |
| Logging          | JSON and console logging with Winston          |
| Metrics Endpoint | `/metrics` for Prometheus scraping             |

---

## Requirements

* Node.js v16+ (recommended v18+)
* Prometheus (optional to collect metrics)
* Grafana (optional to visualize data)

---

## Installation

```bash
git clone https://github.com/Oluwateezzy/systemDesignLearning
cd systemDesignLearning/url-shortener-observability
npm install
```

---

## ▶️ Run the Service

```bash
npm start
```

Server listens on:

```
http://localhost:3000
```

---

## API Endpoints

### **Shorten URL**

**POST** `/shorten`

#### Request body:

```json
{
  "longUrl": "https://example.com"
}
```

#### Response:

```json
{
  "shortCode": "a1b2c3",
  "longUrl": "https://example.com"
}
```

---

### **Access Shortened URL**

**GET** `/:shortCode`

Redirects to original URL.

---

### **Prometheus Metrics**

**GET** `/metrics`

Returns Prometheus metrics:

* Request count
* Request latency histogram
* Default Node metrics (CPU, memory, event loop lag)

---

## Metrics Exposed

| Metric                     | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `http_requests_total`      | Request count with labels (method, route, status) |
| `http_request_duration_ms` | Histogram for request latency                     |
| Default Node metrics       | Heap, CPU, event loop, etc.                       |

---

## Observability Stack

| Component | Tool                       |
| --------- | -------------------------- |
| Tracing   | OpenTelemetry              |
| Logging   | Winston                    |
| Metrics   | Prometheus (`prom-client`) |

---

## Notes

* URL map is **in-memory** → data resets on restart
* Suitable as a learning/demo project for observability
* Supports OTEL auto-instrumentation for Express & HTTP

---

## License

MIT License — Feel free to modify and use.

---

## Future Improvements

* Persist URLs to database (Redis / MongoDB)
* Export OTEL traces to Jaeger / Zipkin / OTEL Collector
* Dockerfile + docker-compose (Prometheus + Grafana)

