import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService extends PrismaClient implements OnModuleInit {

  constructor() {
  super({
    log: ['query'], // This will log all SQL queries to the console
  });
}
  async onModuleInit() {
    await this.$connect();
    // Let's seed the database with lots of dummy data to make performance differences obvious.
    await this.seedDatabase();
  }

  async seedDatabase() {
    const bookCount = await this.book.count();
    if (bookCount > 0) return; // Already seeded

    console.log('Seeding database with 50,000 books...');
    const books: Array<{ title: string; author: string; isbn: string; year: number }> = [];
    for (let i = 0; i < 50000; i++) {
      books.push({
        title: `Book Title ${i}`,
        author: `Author ${i % 100}`, // Only 100 unique authors
        isbn: `isbn-${i}`,
        year: 1900 + (i % 124), // Years between 1900 and 2024
      });
    }

    // Batch insert for performance
    for (let i = 0; i < books.length; i += 1000) {
      await this.book.createMany({ data: books.slice(i, i + 1000) });
    }
    console.log('Seeding complete!');
  }

  // 1. Find by ID (uses the primary key index - always fast)
  findById(id: number) {
    return this.book.findUnique({ where: { id } });
  }

  // 2. Find by ISBN (uses the unique index - always fast)
  findByIsbn(isbn: string) {
    return this.book.findUnique({ where: { isbn } });
  }

  // 3. Find by Author (initially slow full scan, then fast with an index)
  findByAuthor(author: string) {
    return this.book.findMany({ where: { author } });
  }

  // 4. Find by Year Range (initially slow full scan, then fast with an index)
  findByYearRange(startYear: number, endYear: number) {
    return this.book.findMany({
      where: {
        year: {
          gte: startYear,
          lte: endYear,
        },
      },
    });
  }

  // 5. Search in Title with LIKE '%...%' (Always slow, demonstrates index limitations)
  searchByTitlePartial(keyword: string) {
    return this.book.findMany({
      where: {
        title: { contains: keyword },
      },
    });
  }
}
