# Vendor Dependencies

This directory contains third-party dependencies, libraries, and external resources used by the DYP.INC cybersecurity education platform.

## 📦 Third-Party Libraries

### Core Framework
- **React 19.1.1**: Modern UI library for building user interfaces
- **React DOM 19.1.1**: React rendering for web applications
- **TypeScript 5.8.2**: Static type checking and modern JavaScript features

### Build Tools
- **Vite 6.2.0**: Fast build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **@types/node**: TypeScript definitions for Node.js

### UI Components
- **@heroicons/react**: Beautiful hand-crafted SVG icons
- **Tailwind CSS**: Utility-first CSS framework (if used)
- **Framer Motion**: Animation library (if used)

### AI Integration
- **@google/genai**: Google Gemini AI SDK for natural language processing
- **OpenAI API**: Alternative AI service integration (if used)

### Security Libraries
- **Crypto-js**: Cryptographic functions for client-side encryption
- **JWT-decode**: JSON Web Token decoding
- **DOMPurify**: XSS sanitization for HTML content

### Utility Libraries
- **Lodash**: Utility functions for JavaScript
- **Date-fns**: Modern JavaScript date utility library
- **Axios**: HTTP client for API requests

## 🔒 Security Considerations

### Dependency Security
- Regular security audits with `npm audit`
- Automated vulnerability scanning
- Dependency version pinning
- License compliance checking

### Trusted Sources
- Official npm registry
- Verified GitHub repositories
- Established open-source projects
- Security-reviewed libraries

## 📋 License Compliance

### License Types
- **MIT License**: Permissive open-source license
- **Apache 2.0**: Open-source with patent protection
- **BSD License**: Permissive with attribution requirements
- **GPL**: Copyleft license (avoided for commercial use)

### Compliance Checklist
- [ ] Review all dependency licenses
- [ ] Ensure compatibility with project license
- [ ] Document license requirements
- [ ] Include license notices in distribution

## 🔄 Dependency Management

### Version Control
- **package-lock.json**: Exact version pinning
- **Semantic Versioning**: Compatible version ranges
- **Regular Updates**: Security and feature updates
- **Breaking Changes**: Careful migration planning

### Update Strategy
```bash
# Check for outdated packages
npm outdated

# Update to latest compatible versions
npm update

# Audit for security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

## 📊 Dependency Analysis

### Bundle Size Impact
- **Core Dependencies**: Essential functionality
- **Development Dependencies**: Build-time only
- **Optional Dependencies**: Feature-specific
- **Peer Dependencies**: Framework requirements

### Performance Considerations
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Load dependencies on demand
- **Lazy Loading**: Defer non-critical dependencies
- **Bundle Analysis**: Monitor size impact

## 🛠️ Development Dependencies

### Build Tools
- **ESLint**: Code linting and style checking
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality control
- **Lint-staged**: Pre-commit linting

### Testing Framework
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing
- **Cypress**: End-to-end testing
- **Storybook**: Component development environment

### Development Utilities
- **Nodemon**: Development server auto-restart
- **Concurrently**: Run multiple commands
- **Cross-env**: Cross-platform environment variables
- **Rimraf**: Cross-platform file deletion

## 🔍 Security Scanning

### Automated Tools
- **npm audit**: Built-in vulnerability scanning
- **Snyk**: Advanced security analysis
- **OWASP Dependency Check**: Comprehensive scanning
- **GitHub Security Advisories**: Repository scanning

### Manual Review
- **License Verification**: Ensure compliance
- **Source Code Review**: Check for malicious code
- **Update Frequency**: Regular security updates
- **Community Trust**: Popular and well-maintained

## 📚 Documentation

### Dependency Documentation
- **README Files**: Usage and configuration
- **API Documentation**: Function and method references
- **Migration Guides**: Version upgrade instructions
- **Troubleshooting**: Common issues and solutions

### Internal Documentation
- **Why This Dependency**: Justification for inclusion
- **Usage Examples**: How it's used in the project
- **Configuration**: Setup and customization
- **Alternatives**: Other options considered

## 🚨 Security Alerts

### Monitoring
- **GitHub Dependabot**: Automated security updates
- **npm Security Advisories**: Official vulnerability reports
- **CVE Database**: Common Vulnerabilities and Exposures
- **Security Mailing Lists**: Community alerts

### Response Plan
1. **Immediate Assessment**: Evaluate severity and impact
2. **Update Strategy**: Plan dependency updates
3. **Testing**: Verify compatibility and functionality
4. **Deployment**: Roll out security fixes
5. **Documentation**: Update security documentation

## 📞 Support

### Dependency Issues
- **Official Documentation**: Primary source of help
- **GitHub Issues**: Bug reports and feature requests
- **Stack Overflow**: Community support
- **Discord/Slack**: Real-time community help

### Internal Support
- **Development Team**: Technical expertise
- **Security Team**: Security-related questions
- **DevOps Team**: Deployment and infrastructure
- **Project Maintainers**: Project-specific guidance

## 📄 License Information

### Project License
This project is licensed under the MIT License. All dependencies must be compatible with this license.

### Third-Party Licenses
All third-party dependencies maintain their original licenses. See individual package documentation for details.

### License Summary
```bash
# Generate license summary
npx license-checker --summary

# Export detailed license information
npx license-checker --json > licenses.json
```

---

*This document is maintained by the development team and updated regularly to reflect current dependencies and security status.*

**Last Updated**: [Date]
**Version**: 1.0
**Maintained by**: Development Team
