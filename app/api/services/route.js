import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Service from '@/models/Service';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');
    
    const query = {};
    if (category) {
      query.category = category;
    }
    if (active === 'true') {
      query.active = true;
    }
    
    const services = await Service.find(query)
      .sort({ createdAt: 1 })
      .lean();
    
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, description, shortDescription, features, pricing, startingPrice, image, category } = body;
    
    // Validate required fields
    if (!title || !description || !shortDescription || !category) {
      return NextResponse.json(
        { error: 'Title, description, short description, and category are required' },
        { status: 400 }
      );
    }
    
    const slug = generateSlug(title);
    
    // Check if slug already exists
    const existingService = await Service.findOne({ slug });
    if (existingService) {
      return NextResponse.json(
        { error: 'A service with this title already exists' },
        { status: 400 }
      );
    }
    
    const service = await Service.create({
      title,
      slug,
      description,
      shortDescription,
      features: features || [],
      pricing: pricing || 'project-based',
      startingPrice: startingPrice || 0,
      image: image || '',
      category,
      active: true
    });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}