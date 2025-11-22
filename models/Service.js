import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a service description'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    maxlength: [150, 'Short description cannot be more than 150 characters'],
  },
  features: [{
    title: String,
    description: String,
  }],
  pricing: {
    type: String,
    enum: ['hourly', 'project-based', 'monthly', 'custom'],
    default: 'project-based',
  },
  startingPrice: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['web-design', 'web-development', 'website-refurbishment', 'digital-marketing'],
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Create slug from title before saving
ServiceSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);