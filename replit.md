# Wikipedia Clone

## Overview

This is a Wikipedia clone built as a full-stack web application using React, Express, and TypeScript. The application simulates a simplified version of Wikipedia with a collection of 22 articles covering various topics including science, history, technology, culture, and education. The frontend provides a Wikipedia-like interface with search functionality, article navigation, and responsive design, while the backend serves the application and manages routing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built using React with TypeScript and follows a modern component-based architecture:

- **Routing**: Uses Wouter for client-side routing, providing a lightweight alternative to React Router
- **UI Framework**: Built with shadcn/ui components based on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS for utility-first styling with custom Wikipedia-like theming
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

The application structure separates concerns into:
- Pages for route components
- Components for reusable UI elements
- Lib for utilities and data access functions
- Database directory containing article JSON files

### Backend Architecture

The backend uses Express.js with TypeScript in a minimal configuration:

- **Server Framework**: Express.js with middleware for JSON parsing, logging, and error handling
- **Development Setup**: Custom Vite integration for development mode with HMR support
- **Storage Layer**: In-memory storage implementation with interfaces for future database integration
- **API Design**: RESTful approach with placeholder routes (currently client-side data only)

### Data Storage

The application uses a client-side data storage approach:
- **Article Data**: Stored as JSON files in the `/src/database` directory
- **Schema Validation**: Zod schemas define article structure and validation rules
- **Data Access**: Custom functions handle article retrieval, search, and related article lookup
- **Future Database**: Drizzle ORM configured for PostgreSQL integration when backend API is needed

### Authentication and Authorization

Currently implemented as a placeholder system with:
- In-memory user storage for development
- Interface-based design allowing easy swapping of storage implementations
- Session management setup for future implementation

### UI/UX Design

The interface closely mimics Wikipedia's design patterns:
- Wikipedia-style layout with sidebar navigation
- Search functionality with real-time results
- Article content rendering supporting various content types (paragraphs, headings, lists, infoboxes)
- Responsive design working across desktop and mobile devices
- Accessibility features through Radix UI components

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework with TypeScript support
- **Express**: Backend web framework
- **Vite**: Build tool and development server
- **Wouter**: Lightweight client-side routing

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component library

### Data Management
- **TanStack Query**: Server state management and caching
- **Zod**: Schema validation and type safety
- **Drizzle ORM**: Database ORM (configured for future use)

### Development Tools
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast bundling for production
- **Replit Integration**: Development environment optimizations

### Database Integration (Prepared)
- **Neon Database**: Serverless PostgreSQL (via @neondatabase/serverless)
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Drizzle Kit**: Database migrations and schema management

The application is architected to easily transition from client-side data storage to a full database-backed system by implementing the existing storage interfaces with database operations.

## Recent Changes

### August 14, 2025
- Updated Wikipedia clone to match exact Wikipedia styling and layout
- Implemented precise Wikipedia colors, typography, and visual design
- Added Wikipedia-style header, navigation, search bar, and footer
- Updated article pages with authentic Wikipedia formatting (tabs, table of contents, references)
- Redesigned main page with Wikipedia portal-style layout
- Added new article: New States Continental University (article22.json)
- Total articles: 22 (expanded from original 20)