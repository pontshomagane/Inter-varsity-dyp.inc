# Scripts

This directory contains build, deployment, and utility scripts for the DYP.INC cybersecurity education platform.

## 📁 Contents

### Build Scripts
- **build.sh**: Production build automation
- **dev.sh**: Development environment setup
- **test.sh**: Automated testing suite
- **lint.sh**: Code quality and style checking

### Deployment Scripts
- **deploy.sh**: Production deployment automation
- **docker-build.sh**: Docker container creation
- **vercel-deploy.sh**: Vercel deployment script
- **github-pages.sh**: GitHub Pages deployment

### Utility Scripts
- **setup.sh**: Initial project setup
- **clean.sh**: Clean build artifacts
- **backup.sh**: Data backup utilities
- **migrate.sh**: Database migration scripts

## 🚀 Usage

### Development Setup
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run development setup
./scripts/setup.sh

# Start development server
./scripts/dev.sh
```

### Production Build
```bash
# Build for production
./scripts/build.sh

# Deploy to production
./scripts/deploy.sh
```

### Testing
```bash
# Run all tests
./scripts/test.sh

# Run linting
./scripts/lint.sh
```

## 📋 Script Descriptions

### setup.sh
Initializes the development environment:
- Installs dependencies
- Sets up environment variables
- Configures development tools
- Validates system requirements

### build.sh
Creates production-ready build:
- Compiles TypeScript
- Bundles assets
- Optimizes for production
- Generates source maps

### deploy.sh
Deploys to production environment:
- Builds the application
- Uploads to hosting platform
- Configures environment variables
- Runs health checks

### test.sh
Runs comprehensive test suite:
- Unit tests
- Integration tests
- End-to-end tests
- Performance tests

### lint.sh
Performs code quality checks:
- ESLint analysis
- Prettier formatting
- TypeScript type checking
- Security vulnerability scanning

## 🔧 Configuration

### Environment Variables
Scripts use the following environment variables:

```bash
# Build Configuration
NODE_ENV=production
VITE_APP_TITLE="DYP.INC - Defend Your Privacy"
VITE_APP_VERSION="1.0.0"

# API Configuration
GEMINI_API_KEY=your_api_key_here

# Deployment Configuration
DEPLOY_TARGET=production
HOSTING_PLATFORM=vercel
```

### Customization
Scripts can be customized by modifying:
- Environment variables
- Build parameters
- Deployment targets
- Testing configurations

## 🛠️ Development

### Adding New Scripts
1. Create script file with `.sh` extension
2. Add executable permissions: `chmod +x script.sh`
3. Document usage in this README
4. Test thoroughly before committing

### Script Standards
- Use bash shebang: `#!/bin/bash`
- Include error handling: `set -e`
- Add usage documentation
- Follow consistent naming conventions
- Include logging and output

## 📊 Monitoring

### Build Monitoring
- Build success/failure notifications
- Performance metrics tracking
- Dependency vulnerability scanning
- Code quality metrics

### Deployment Monitoring
- Deployment status tracking
- Health check validation
- Performance monitoring
- Error logging and alerting

## 🔒 Security

### Script Security
- Validate all inputs
- Use secure file permissions
- Avoid hardcoded secrets
- Implement proper error handling

### Deployment Security
- Secure credential management
- Encrypted environment variables
- Secure communication channels
- Access control and auditing

## 📞 Support

For script-related issues:
- Check script documentation
- Review error logs
- Contact development team
- Open GitHub issue

## 📄 License

Scripts are licensed under the same terms as the main project.
