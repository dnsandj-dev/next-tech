import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import path from 'path'

// 1. Force load the .env file from the root directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// 2. Double-check if the variable actually loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is not defined in .env")
  process.exit(1)
}

// 3. Explicitly pass the URL to the constructor to bypass shell nesting issues
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

async function main() {
  // Log the database host (hiding credentials) to verify connection target
  const dbHost = process.env.DATABASE_URL?.split('@')[1] || 'Unknown Host'
  console.log(`🌱 Starting seed on: ${dbHost}`)

  // --- Seed Logic Starts Here ---

  const vendor = await prisma.vendor.upsert({
    where: { name: 'Ingram Micro' },
    update: {
      contactPerson: 'Sarah Jenkins',
      email: 's.jenkins@ingram.com',
      rating: 5,
    },
    create: {
      name: 'Ingram Micro',
      contactPerson: 'Sarah Jenkins',
      email: 's.jenkins@ingram.com',
      rating: 5,
    },
  })

  console.log(`✅ Vendor ready: ${vendor.name}`)
  console.log('📦 Upserting products...')

  const products = [
    {
      sku: 'MBP-14-M3P',
      name: 'MacBook Pro 14" (M3 Pro)',
      category: 'Workstations',
      basePrice: 1750.0,
    },
    {
      sku: 'MX67-HW',
      name: 'Cisco Meraki MX67 Firewall',
      category: 'Networking',
      basePrice: 650.0,
    },
    {
      sku: 'DELL-U2723QE',
      name: 'Dell UltraSharp 27" 4K Monitor',
      category: 'Peripherals',
      basePrice: 420.0,
    },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        category: p.category,
        basePrice: p.basePrice,
        status: 'Available',
        vendorId: vendor.id,
      },
      create: {
        sku: p.sku,
        name: p.name,
        category: p.category,
        basePrice: p.basePrice,
        status: 'Available',
        vendorId: vendor.id,
      },
    })
  }

  console.log('✅ All products upserted successfully!')
  console.log('🚀 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })