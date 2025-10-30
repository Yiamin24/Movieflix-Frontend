# MovieFlix - Movie & TV Show Management System

A full-featured Netflix-themed web application for managing your favorite movies and TV shows. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Features
- ✅ **User Authentication** - Login and signup functionality with session persistence
- ✅ **CRUD Operations** - Add, view, edit, and delete movie/TV show entries
- ✅ **Infinite Scroll** - Automatically loads more entries as you scroll
- ✅ **Search & Filter** - Search by title, director, or location; filter by type
- ✅ **Image Upload** - Upload images from your system or paste URLs (supports base64 storage)
- ✅ **Dual View Modes** - Switch between table view (desktop) and card/grid view (mobile-friendly)
- ✅ **Responsive Design** - Optimized layouts for desktop, tablet, and mobile devices
- ✅ **No Scroll Issues** - Viewport-optimized layout that fits perfectly on screen
- ✅ **Netflix Dark Theme** - Sleek dark UI inspired by Netflix
- ✅ **Toast Notifications** - Real-time feedback for all actions

### Technical Features
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- Form validation
- Local storage for persistence
- Mock data generation
- Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movieflix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📝 Usage

### Authentication
- **Demo Login**: Use any email and password to login
- **Sign Up**: Create a new account with name, email, and password
- User sessions persist in localStorage

### Managing Entries
1. **Add Entry**: Click "Add New Entry" button
2. **Edit Entry**: Click the edit icon on any table row
3. **Delete Entry**: Click the trash icon and confirm deletion
4. **Search**: Use the search bar to find entries by title, director, or location
5. **Filter**: Use the type dropdown to filter by Movies or TV Shows
6. **Infinite Scroll**: Scroll down the table to automatically load more entries

### Adding Images
You can add poster images in two ways:
1. **Upload from System**: 
   - Click "Upload Image" button in the form
   - Select an image file (JPG, PNG, GIF - max 5MB)
   - Image is automatically converted to base64 and stored
2. **Paste URL**: 
   - Enter an image URL in the "Or paste image URL" field
   - Works with any public image URL
- Live preview shown before saving
- Uploaded images persist in localStorage

### View Modes
- **Table View** (Desktop): Full-featured table with all columns visible, horizontal scroll when needed
- **Grid/Card View** (Mobile & Optional): Optimized card layout for easy browsing on smaller screens
- Switch between views using the icons in the filter bar (desktop only)
- Mobile devices automatically use card view for better experience

### Data Structure
Each entry includes:
- Title
- Type (Movie/TV Show)
- Director
- Budget
- Filming Location
- Duration
- Year/Time Period
- Poster Image URL
- Description (optional)

## 🏗️ Project Structure

```
/
├── components/
│   ├── ui/                      # Shadcn UI components
│   ├── Dashboard.tsx            # Main dashboard with table and infinite scroll
│   ├── EntryForm.tsx           # Add/Edit form modal
│   ├── DeleteDialog.tsx        # Delete confirmation dialog
│   ├── LoginPage.tsx           # Authentication page
│   └── Navbar.tsx              # Navigation bar
├── lib/
│   └── mockData.ts             # Mock data generator
├── types/
│   └── index.ts                # TypeScript interfaces
├── styles/
│   └── globals.css             # Global styles and Netflix theme
├── App.tsx                      # Main application component
└── README.md                    # This file
```

## 🎨 Customization

### Theme Colors
The Netflix theme colors are defined in `/styles/globals.css`:
- **Primary**: `#e50914` (Netflix red)
- **Background**: `#141414` (Dark gray)
- **Card**: `#1a1a1a` (Slightly lighter gray)
- **Border**: `rgba(255, 255, 255, 0.1)` (Subtle white)

### Mock Data
To add more mock entries, edit `/lib/mockData.ts` and add new items to the `movies` or `tvShows` arrays.

## 💡 Key Features Explained

### Image Storage
- **Local Storage**: Images uploaded from your system are converted to base64 strings
- **No Server Needed**: All data including images persists in browser localStorage
- **File Validation**: Automatic validation for file type and size
- **Size Limit**: Maximum 5MB per image to prevent storage issues

### Viewport Optimization
- **No Horizontal Scroll**: Table and content fit within viewport width
- **Fixed Height Layout**: Content area has a fixed height based on viewport
- **Sticky Elements**: Table headers and action columns stay visible while scrolling
- **Responsive Breakpoints**: Different layouts for mobile (<768px) and desktop

### Infinite Scroll
- **Smart Loading**: Loads 15 entries at a time
- **Intersection Observer**: Uses modern browser API for efficient scroll detection
- **Loading States**: Shows skeleton loaders while fetching more entries
- **Automatic**: Works seamlessly as you scroll down the table or grid

## 🔧 Technologies Used

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Frontend Deployment (Recommended Platforms)

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

## 📊 Sample Data

The application comes with 50+ pre-populated entries including:
- Popular movies (Inception, The Dark Knight, Interstellar, etc.)
- Hit TV shows (Breaking Bad, Stranger Things, Game of Thrones, etc.)

## 🔮 Future Enhancements

To make this a production-ready full-stack application, consider:

1. **Backend Integration**:
   - Use Supabase for PostgreSQL database
   - Implement RESTful APIs
   - Add real authentication with JWT
   - Store images in cloud storage (Supabase Storage)

2. **Additional Features**:
   - Rating system
   - Favorites/watchlist
   - Categories and genres
   - Advanced filtering (by year, budget range, etc.)
   - Sorting options
   - Export data to CSV/JSON
   - Share lists with other users

3. **UI Enhancements**:
   - Grid view option
   - Detail view modal
   - Image upload with drag & drop
   - Dark/light theme toggle
   - Accessibility improvements

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Netflix for design inspiration
- Shadcn for the amazing UI component library
- Unsplash for placeholder images

---

**Note**: This is a frontend demonstration application with mock data. For production use with a real backend, consider integrating with Supabase, Firebase, or a custom Node.js/Express backend with MySQL/PostgreSQL.
