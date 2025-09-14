# Setup Guide

## Prerequisites

Before setting up DYP.INC, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Inter-varsity-dyp.inc.git
cd Inter-varsity-dyp.inc
```

### 2. Install Dependencies

```bash
cd src
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the `src` directory:

```bash
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Application Configuration
VITE_APP_TITLE=DYP.INC - Defend Your Privacy
VITE_APP_VERSION=1.0.0
```

### 4. Get Gemini API Key

1. Visit [Google AI Studio](https://ai.studio.google/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

### 5. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Setup

### Code Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── Chatbot.tsx
│   ├── PasswordGame.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useLocalStorage.tsx
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── constants.tsx       # Application constants
└── vite.config.ts      # Vite configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **API key not working**
   - Verify the API key is correct
   - Check if the key has proper permissions
   - Ensure the key is in the `.env.local` file

3. **Build errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

- Check the [Issues](https://github.com/your-username/Inter-varsity-dyp.inc/issues) page
- Review the [Documentation](README.md)
- Contact the development team

## Production Deployment

### Build Process

```bash
cd src
npm run build
```

The built files will be in the `dist/` directory.

### Deployment Options

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Docker**: Use the provided Dockerfile

### Environment Variables for Production

Set the following environment variables in your deployment platform:

- `GEMINI_API_KEY` - Your Gemini API key
- `VITE_APP_TITLE` - Application title
- `VITE_APP_VERSION` - Application version
