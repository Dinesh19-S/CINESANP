const mongoose = require('mongoose');
const Movie = require('../models/Movie');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinesnap';

const sampleMovies = [
  {
    title: 'Vikram',
    description: 'A black-ops squad commander goes after a mysterious group of masked men who have declared war on the system.',
    posterUrl: 'https://placehold.co/400x600/000/FFF?text=Vikram',
    posterAiHint: 'action thriller',
    rating: 4.7,
    genres: ['Action', 'Thriller'],
    duration: 175,
    releaseYear: 2025,
    reviews: [
      { 
        author: 'Anbu', 
        authorId: 'user1',
        avatarUrl: 'https://i.pravatar.cc/150?u=anbu', 
        rating: 5, 
        comment: 'An absolute blast from start to finish. A true comeback!' 
      },
      { 
        author: 'Priya', 
        authorId: 'user2',
        avatarUrl: 'https://i.pravatar.cc/150?u=priya', 
        rating: 4, 
        comment: 'Great action sequences, but the plot can be a bit confusing.' 
      },
    ],
    showtimes: [
      { screen: 1, time: '4:30 PM', date: new Date('2025-01-28') },
      { screen: 1, time: '8:00 PM', date: new Date('2025-01-28') },
      { screen: 7, time: '5:00 PM', date: new Date('2025-01-28') },
      { screen: 7, time: '9:30 PM', date: new Date('2025-01-28') },
    ],
  },
  {
    title: 'Leo',
    description: 'A mild-mannered café owner becomes a local hero through an act of violence, which sets off repercussions with a drug cartel that believes he was once a part of them.',
    posterUrl: 'https://placehold.co/400x600/000/FFF?text=Leo',
    posterAiHint: 'action crime',
    rating: 4.5,
    genres: ['Action', 'Thriller', 'Crime'],
    duration: 164,
    releaseYear: 2025,
    reviews: [
      { 
        author: 'Karthik', 
        authorId: 'user3',
        avatarUrl: 'https://i.pravatar.cc/150?u=karthik', 
        rating: 5, 
        comment: 'Thalapathy Vijay at his absolute best. The hyena fight was insane!' 
      },
    ],
    showtimes: [
      { screen: 2, time: '6:00 PM', date: new Date('2025-01-28') },
      { screen: 2, time: '8:45 PM', date: new Date('2025-01-28') },
      { screen: 8, time: '10:00 PM', date: new Date('2025-01-28') },
    ],
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://placehold.co/400x600/000/FFF?text=Inception',
    posterAiHint: 'sci-fi thriller',
    rating: 4.8,
    genres: ['Sci-Fi', 'Thriller', 'Action'],
    duration: 148,
    releaseYear: 2010,
    reviews: [],
    showtimes: [
      { screen: 3, time: '7:00 PM', date: new Date('2025-01-28') },
      { screen: 3, time: '10:15 PM', date: new Date('2025-01-28') },
    ],
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    // Insert sample movies
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();