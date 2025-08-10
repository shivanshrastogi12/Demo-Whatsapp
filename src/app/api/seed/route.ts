import { NextResponse } from 'next/server';
import { seedDatabaseFromPreloader } from '@/lib/seedData';

// Handle both GET and POST for easy browser testing
export async function GET() {
  return seedDatabase();
}

export async function POST() {
  return seedDatabase();
}

async function seedDatabase() {
  try {
    // Only allow seeding in development mode for security
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Seeding not allowed in production' },
        { status: 403 }
      );
    }

    console.log('🚀 Database seeding requested via API...');
    
    const result = await seedDatabaseFromPreloader();
    
    return NextResponse.json({
      success: true,
      message: `Database seeded successfully with ${result.totalMessages} messages`,
      data: result
    });

  } catch (error) {
    console.error('Database seeding failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database seeding failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
