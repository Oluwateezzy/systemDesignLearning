# Book Library Indexing Demo

A practical demonstration of database indexing concepts using NestJS, Prisma, and SQLite. This project accompanies the deep-dive article on database indexing performance.

## 📚 Overview

This project demonstrates how different database indexes (B-Tree, Hash, etc.) affect query performance. It includes a seeding script that generates 50,000 book records and provides endpoints to benchmark various query types.

**Read the full guide:** [INDEXING_DEEP_DIVE.md](./INDEXING_DEEP_DIVE.md)

## 🚀 Getting Started

### Prerequisites
- Node.js
- Yarn

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Push the schema to the database (this will also generate the Prisma client):
   ```bash
   npx prisma db push
   ```

3. Start the development server:
   ```bash
   yarn start:dev
   ```

   *Note: On the first run, the application will automatically seed the database with 50,000 records. This may take a few seconds.*

## ⚡️ Running Benchmarks

The project includes a built-in benchmarking tool to compare query performance.

### Option 1: Via Browser
Visit [http://localhost:3000/books/benchmark](http://localhost:3000/books/benchmark) to run the full suite of benchmarks.

### Option 2: Via Curl
```bash
curl http://localhost:3000/books/benchmark
```

### Expected Output
You will see a JSON response with execution times for various operations:

```json
{
  "Primary Key Lookup": "1ms",
  "Unique Index Lookup": "1ms",
  "Non-Indexed Column (Title)": "150ms",
  "Indexed Column (Author)": "2ms",
  "Range Query (Year)": "5ms",
  "Composite Index (Author + Year)": "1ms",
  "LIKE Wildcard Search": "200ms"
}
```

## 🧪 Experiments

You can try these individual endpoints to see the SQL queries in your console (query logging is enabled):

- **Primary Key (Fast):** `/books/id?id=25000`
- **Unique Index (Fast):** `/books/isbn?isbn=isbn-25000`
- **Author Index (Fast):** `/books/author?author=Author%2042`
- **Year Range Index (Fast):** `/books/year-range?start=2000&end=2010`
- **Full Scan (Slow):** `/books/search-title?keyword=Title%20250`

## 🛠 Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** SQLite
- **Language:** TypeScript
