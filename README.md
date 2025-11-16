# System Design Learning with Implementation

A hands-on learning repository demonstrating key system design concepts through practical implementations. This repository contains multiple projects that explore distributed systems, observability, caching, message queues, and other fundamental system design patterns.

## Overview

This repository serves as a practical guide to understanding system design principles through working code examples. Each project focuses on specific concepts and technologies commonly used in building scalable, distributed systems.

### Projects

| Project | Technologies | Concepts Covered |
|---------|-------------|------------------|
| **Distributed Job Scheduler** | NestJS, PostgreSQL, Redis, RabbitMQ | Job scheduling, distributed systems, message queues, caching |
| **URL Shortener with Observability** | Express.js, OpenTelemetry, Prometheus, Winston | Observability, tracing, metrics, structured logging |
| **Proxy vs Reverse Proxy** | Documentation | Load balancing, reverse proxies, API gateways |

---

## System Design Concepts

### 1. Distributed Job Scheduling

**Location**: `distributed-job-scheduler/`

A distributed job scheduler built with NestJS that demonstrates how to build reliable, scalable job execution systems.

**Key Concepts**:
- **Job Orchestration**: Schedule and execute jobs based on cron expressions
- **State Management**: Track job states (active, paused, deleted) and execution history
- **Distributed Coordination**: Use message queues for distributing work across workers
- **Data Persistence**: Store job definitions and execution results in PostgreSQL
- **Caching Layer**: Redis for quick state lookups and temporary data

**Architecture**:
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Scheduler │────▶│  RabbitMQ   │────▶│   Workers   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                        │
       ▼                                        ▼
┌─────────────┐                         ┌─────────────┐
│  PostgreSQL │                         │    Redis    │
│ (Job Store) │                         │   (Cache)   │
└─────────────┘                         └─────────────┘
```

**Technologies**:
- **NestJS**: Modular backend framework
- **TypeORM**: Database ORM with entity modeling
- **PostgreSQL**: Primary data store
- **Redis**: Caching and job state management
- **RabbitMQ**: Message broker for async job processing

---

### 2. Observability & Monitoring

**Location**: `url-shortener-observability/`

A URL shortening service with comprehensive observability stack demonstrating the three pillars of observability.

**Key Concepts**:
- **Distributed Tracing**: Track requests across service boundaries with OpenTelemetry
- **Metrics Collection**: Monitor system health with Prometheus metrics
- **Structured Logging**: Capture contextual logs with Winston
- **Instrumentation**: Automatic HTTP and Express.js tracing

**The Three Pillars of Observability**:

1. **Logs** (Winston)
   - Structured JSON logging
   - Request/response logging
   - Error tracking
   - Correlation IDs

2. **Metrics** (Prometheus)
   - HTTP request duration
   - Request counts
   - Error rates
   - Custom business metrics
   - Exposed at `/metrics` endpoint

3. **Traces** (OpenTelemetry)
   - Request flow visualization
   - Span creation and propagation
   - Performance bottleneck identification
   - Distributed context propagation

**Technologies**:
- **OpenTelemetry**: Vendor-neutral observability framework
- **Prometheus**: Time-series metrics database
- **Winston**: Flexible logging library
- **Express.js**: Web application framework

---

### 3. Caching Strategies

Demonstrated in the distributed job scheduler project.

**Key Concepts**:
- **In-Memory Caching**: Fast data access with Redis
- **Cache Invalidation**: Strategies for keeping cache fresh
- **Distributed Cache**: Shared cache across multiple instances
- **Cache-Aside Pattern**: Load data into cache on demand

**Use Cases**:
- Job state lookups
- Frequently accessed configuration
- Reducing database load
- Session management

---

### 4. Message Queue Patterns

Implemented using RabbitMQ in the job scheduler.

**Key Concepts**:
- **Asynchronous Processing**: Decouple job submission from execution
- **Work Queue Pattern**: Distribute tasks among workers
- **Reliability**: Ensure jobs are not lost
- **Scalability**: Add workers to handle increased load

**Benefits**:
- Improved system responsiveness
- Better resource utilization
- Fault tolerance
- Load leveling

---

### 5. Database Design & Data Persistence

**Key Concepts**:
- **Entity Modeling**: Define data structures (Job, JobExecution entities)
- **Relationships**: One-to-many relationships between jobs and executions
- **Indexes**: Optimize query performance
- **Migrations**: Version control for database schema

**Entities**:
- `Job`: Stores job definitions with cron schedules, endpoints, and payloads
- `JobExecution`: Tracks execution history, timestamps, and results

---

### 6. API Design & RESTful Services

**Key Concepts**:
- **REST Principles**: Proper use of HTTP methods (GET, POST)
- **Resource Naming**: Clear, intuitive endpoint design
- **Status Codes**: Appropriate HTTP response codes
- **Error Handling**: Consistent error responses

**Example Endpoints** (URL Shortener):
```
POST /shorten     - Create shortened URL
GET /:shortCode   - Redirect to original URL
GET /metrics      - Prometheus metrics
```

---

### 7. Configuration Management

**Key Concepts**:
- **Environment Variables**: Store configuration outside code
- **Environment-Specific Settings**: Different configs for dev/prod
- **Secrets Management**: Keep sensitive data secure
- **Validation**: Ensure required configuration is present

**Example** (Job Scheduler):
- Database connection strings
- Redis connection details
- RabbitMQ URLs
- Port configurations

---

### 8. Microservices Architecture Patterns

**Key Concepts**:
- **Service Decomposition**: Breaking monoliths into smaller services
- **Database Per Service**: Each service owns its data
- **Service Communication**: Sync (HTTP) and async (message queues)
- **External Configuration**: Centralized configuration management

**Technologies Used**:
- PostgreSQL for persistent storage
- Redis for caching
- RabbitMQ for inter-service communication
- HTTP APIs for synchronous calls

---

### 9. Load Balancing & Reverse Proxies

**Location**: `proxy-reverse-proxy/`

Understanding the difference between forward and reverse proxies.

**Key Concepts**:
- **Forward Proxy**: Client-side proxy for accessing external resources
- **Reverse Proxy**: Server-side proxy for load balancing and security
- **Load Distribution**: Spread traffic across multiple servers
- **SSL Termination**: Handle HTTPS at the proxy level
- **Caching**: Cache static content at proxy layer

**Common Use Cases**:
- NGINX as reverse proxy
- API Gateway pattern
- Content delivery
- Security and anonymization

**Learn More**: [Medium Article](https://oluwateezzy03.medium.com/system-design-learning-journey-proxy-vs-reverse-proxy-380b7298e5ef)

---

## Getting Started

Each project has its own setup instructions. Navigate to the respective directory and follow the README:

1. **Distributed Job Scheduler**: `cd distributed-job-scheduler`
2. **URL Shortener**: `cd url-shortener-observability`
3. **Proxy Documentation**: `cd proxy-reverse-proxy`

---

## Technology Stack Summary

| Category | Technologies |
|----------|-------------|
| **Languages** | TypeScript, JavaScript |
| **Backend Frameworks** | NestJS, Express.js |
| **Databases** | PostgreSQL |
| **Caching** | Redis |
| **Message Queues** | RabbitMQ |
| **Observability** | OpenTelemetry, Prometheus, Winston |
| **ORMs** | TypeORM |
| **Testing** | Jest |

---

## Learning Resources

This repository is part of a learning journey documenting system design concepts:
- [Medium Articles](https://oluwateezzy03.medium.com/) - Detailed explanations and insights
- Project READMEs - Setup and implementation details

---

## Contributing

Feel free to explore, learn from, and build upon these implementations. Each project demonstrates real-world patterns used in production systems.

---

## License

This repository is for educational purposes.
