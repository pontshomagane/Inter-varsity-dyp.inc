# Source Code

This directory contains the main source code for the DYP.INC cybersecurity education platform.

## �� Directory Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── Chatbot.tsx
│   ├── PasswordGame.tsx
│   ├── PhishingGame.tsx
│   ├── SocialEngineeringGame.tsx
│   ├── TwoFactorGame.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useLocalStorage.tsx
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── constants.tsx       # Application constants
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build configuration
└── index.html          # HTML template
```

## 🏗️ Architecture

### Component Structure
- **Functional Components**: Modern React with hooks
- **TypeScript**: Full type safety and IntelliSense
- **Modular Design**: Reusable and maintainable components
- **Responsive Layout**: Mobile-first design approach

### State Management
- **React Hooks**: useState, useEffect, useContext
- **Local Storage**: Persistent user data
- **Context API**: Global state management
- **Custom Hooks**: Reusable state logic

### Styling
- **CSS Modules**: Scoped styling
- **Responsive Design**: Mobile and desktop support
- **Theme System**: Light and dark mode support
- **Accessibility**: WCAG compliance

## 🎮 Core Components

### Dashboard.tsx
Main application dashboard featuring:
- Progress tracking and analytics
- Achievement system
- XP and leveling system
- Quick access to games and features

### Chatbot.tsx
AI-powered security assistant with:
- Natural language processing
- Contextual responses
- Learning resource recommendations
- Real-time threat information

### Security Games
Interactive learning modules:
- **PasswordGame.tsx**: Password strength training
- **PhishingGame.tsx**: Email and website analysis
- **SocialEngineeringGame.tsx**: Manipulation tactics
- **TwoFactorGame.tsx**: 2FA setup and management

### UI Components
Reusable interface elements:
- **Badge.tsx**: Achievement and status indicators
- **ProgressChart.tsx**: Visual progress tracking
- **ScoreGauge.tsx**: Performance metrics
- **ThemeToggle.tsx**: Dark/light mode switching

## 🔧 Configuration

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Vite Configuration
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 🚀 Development

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

### Environment Variables
Create a `.env.local` file:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
VITE_APP_TITLE=DYP.INC - Defend Your Privacy
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component and function testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user journey testing
- **Accessibility Tests**: WCAG compliance validation

### Test Files
- `*.test.tsx` - Component tests
- `*.spec.ts` - Function tests
- `e2e/` - End-to-end tests
- `__mocks__/` - Mock implementations

## 📦 Dependencies

### Core Dependencies
- **React 19.1.1**: UI framework
- **TypeScript 5.8.2**: Type safety
- **Vite 6.2.0**: Build tool
- **@heroicons/react**: Icon library

### AI Integration
- **@google/genai**: Gemini AI integration
- **Natural Language Processing**: Chatbot functionality

### Development Dependencies
- **@types/node**: Node.js types
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 🔒 Security Considerations

### Code Security
- Input validation and sanitization
- XSS prevention measures
- CSRF protection
- Secure API communication

### Data Protection
- Local storage encryption
- Secure credential handling
- Privacy-first design
- GDPR compliance

## 📊 Performance

### Optimization Strategies
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies

### Monitoring
- Performance metrics tracking
- Error logging and reporting
- User analytics (privacy-compliant)
- Real-time monitoring

## 🎨 UI/UX Guidelines

### Design Principles
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile Responsive**: Touch-friendly interface
- **Intuitive Navigation**: Clear user flows
- **Consistent Design**: Unified visual language

### Component Guidelines
- Single responsibility principle
- Reusable and composable
- Well-documented props
- Comprehensive error handling

## 📚 Documentation

### Code Documentation
- JSDoc comments for functions
- README files for complex components
- Type definitions for all interfaces
- Usage examples and demos

### API Documentation
- Endpoint documentation
- Request/response schemas
- Authentication requirements
- Error handling guidelines

## 🔄 Version Control

### Git Workflow
- Feature branch development
- Pull request reviews
- Automated testing
- Semantic versioning

### Code Quality
- Pre-commit hooks
- Automated linting
- Type checking
- Security scanning

## 📞 Support

For development questions:
- Check component documentation
- Review TypeScript definitions
- Consult the main README
- Contact the development team

## 📄 License

Source code is licensed under the MIT License.
