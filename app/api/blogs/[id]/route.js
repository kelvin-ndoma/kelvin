import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const blog = await Blog.findOne({ 
      $or: [
        { _id: params.id },
        { slug: params.id }
      ]
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, excerpt, content, featuredImage, tags, published } = body;
    
    const blog = await Blog.findOne({ 
      $or: [
        { _id: params.id },
        { slug: params.id }
      ]
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    // Update fields
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) {
      blog.content = content;
      blog.readTime = calculateReadTime(content);
    }
    if (featuredImage !== undefined) blog.featuredImage = featuredImage;
    if (tags) blog.tags = tags;
    if (published !== undefined) blog.published = published;
    
    await blog.save();
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const blog = await Blog.findOneAndDelete({ 
      $or: [
        { _id: params.id },
        { slug: params.id }
      ]
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}