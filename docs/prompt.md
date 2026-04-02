# Complete Backend Development Prompt for Google Antigravity

## Context
You are building the complete backend for **LocalHR.pk** - an AI-powered job portal platform. The backend serves both web (Next.js) and mobile (React Native) applications.

---

## Project Overview

**Platform:** LocalHR - AI-Powered Job Portal for Pakistan  
**Backend Type:** RESTful API (NestJS + Node.js + JavaScript)  
**Database:** MongoDB Atlas  
**AI Integration:** Google Gemini API (Direct integration)  
**Authentication:** JWT-based with role-based access control  
**File Storage:** AWS S3  
**Notifications:** Nodemailer (email) + Twilio (WhatsApp only)

---

## Complete File Structure Already Created

The following directory structure with empty JavaScript files (with comments) has been set up:

```
backend/
├── src/
│   ├── main.js                    # Application entry point
│   ├── app.module.js              # Root module
│   │
│   ├── auth/                      # Authentication Module (10 files)
│   │   ├── auth.module.js
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.js
│   │   │   └── local.strategy.js
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.js
│   │   │   └── roles.guard.js
│   │   └── dto/
│   │       ├── login.dto.js
│   │       ├── register.dto.js
│   │       └── verify-otp.dto.js
│   │
│   ├── users/                     # User Management (7 files)
│   ├── jobs/                      # Job Postings (7 files)
│   ├── applications/              # Job Applications (6 files)
│   ├── companies/                 # Company Profiles (6 files)
│   ├── ai/                        # AI Module (Gemini Integration)
│   ├── uploads/                   # File Uploads to S3 (5 files)
│   ├── notifications/             # Email/WhatsApp (7 files)
│   ├── assessments/               # Skill Tests (5 files)
│   ├── reviews/                   # Company Reviews (5 files)
│   ├── admin/                     # Admin Panel (4 files)
│   ├── salary-insights/           # Salary Data (4 files)
│   ├── referrals/                 # Referral System (4 files)
│   ├── common/                    # Shared Utilities (10 files)
│   └── config/                    # Configuration (4 files)
│
└── 966 NPM packages already installed
```

**Each file contains detailed comments explaining:**
- Purpose and responsibilities
- Methods/endpoints to implement
- Expected inputs and outputs
- Integration points

---

## Your Task: Implement Complete Backend Code

Generate production-ready code for ALL modules following the specifications in `implementtion-plan.md` and the comments in each file.

---

## CRITICAL SECURITY REQUIREMENTS

### 1. Rate Limiting (MANDATORY)
**Implement on ALL public endpoints:**

```javascript
// Global rate limiting
@UseGuards(ThrottlerGuard)
@Throttle(100, 900000) // 100 requests per 15 minutes per IP

// Auth endpoints (stricter)
@Throttle(5, 900000) // 5 requests per 15 minutes

// AI endpoints (Gemini API cost control)
@Throttle(20, 3600000) // 20 requests per hour per user
```

**Requirements:**
- IP-based rate limiting for unauthenticated requests
- User-based rate limiting for authenticated requests
- Sensible defaults for each endpoint type
- Graceful 429 responses with retry-after headers
- Store rate limit counters in Redis

**429 Response Format:**
```json
{
  "statusCode": 429,
  "message": "Too many requests. Please try again later.",
  "retryAfter": 900,
  "error": "Too Many Requests"
}
```

---

### 2. Strict Input Validation & Sanitization (MANDATORY)

**On ALL user inputs:**

```javascript
// Use class-validator for schema-based validation
export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Matches(/^[a-zA-Z0-9\s\-]+$/) // Only alphanumeric, spaces, hyphens
  title: string;

  @IsString()
  @MinLength(50)
  @MaxLength(5000)
  description: string;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  salaryMin: number;

  @IsEmail()
  @MaxLength(255)
  contactEmail: string;
}
```

**Requirements:**
- Schema-based validation using class-validator
- Type checks for all fields
- Length limits on all strings (prevent DoS)
- Whitelist allowed characters (reject unexpected patterns)
- Sanitize HTML/special characters
- Reject unexpected fields (whitelist: true, forbidNonWhitelisted: true)
- Validate file types and sizes for uploads
- Validate MongoDB ObjectIds before queries

**Global Validation Pipe:**
```javascript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,              // Strip unknown properties
    forbidNonWhitelisted: true,   // Reject unknown properties
    transform: true,              // Auto-transform to DTO types
    transformOptions: {
      enableImplicitConversion: false, // Explicit type conversion only
    },
  }),
);
```

---

### 3. Secure API Key Handling (MANDATORY)

**NEVER hard-code API keys in source code:**

```javascript
// ❌ WRONG - Never do this
const apiKey = "sk-1234567890abcdef";

// ✅ CORRECT - Always use environment variables
const apiKey = process.env.GEMINI_API_KEY;

// ✅ Validate environment variables on startup
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is required');
}
```

**Requirements:**
- ALL API keys in .env file (never in code)
- Validate required environment variables on app startup
- Use different keys for dev/staging/production
- Implement key rotation mechanism
- NEVER expose keys client-side (no keys in API responses)
- Use AWS Secrets Manager or similar for production
- Log key usage for audit trails (without logging actual keys)

**Environment Variable Validation:**
```javascript
// config/app.config.ts
export const validateEnv = () => {
  const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'NODEMAILER_EMAIL',
    'TWILIO_AUTH_TOKEN',
    'GEMINI_API_KEY',
    'PINECONE_API_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
```

---

### 4. OWASP Best Practices (MANDATORY)

**Implement ALL of the following:**

#### A. SQL/NoSQL Injection Prevention
```javascript
// ✅ Use Mongoose with parameterized queries
const user = await this.userModel.findOne({ email }); // Safe

// ❌ Never use string concatenation
const user = await this.userModel.findOne({ $where: `this.email == '${email}'` }); // Vulnerable
```

#### B. Cross-Site Scripting (XSS) Prevention
```javascript
import * as sanitizeHtml from 'sanitize-html';

// Sanitize all user-generated content
const cleanDescription = sanitizeHtml(description, {
  allowedTags: [], // No HTML allowed
  allowedAttributes: {},
});
```

#### C. Authentication & Session Management
```javascript
// ✅ Secure JWT configuration
{
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '15m',        // Short-lived access tokens
    algorithm: 'HS256',
    issuer: 'localhr-api',
    audience: 'localhr-clients',
  }
}

// ✅ HTTP-only cookies for refresh tokens
response.cookie('refreshToken', token, {
  httpOnly: true,           // Prevent XSS
  secure: true,             // HTTPS only
  sameSite: 'strict',       // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

#### D. Security Headers (Helmet)
```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
}));
```

#### E. CORS Configuration
```javascript
app.enableCors({
  origin: [
    process.env.FRONTEND_WEB_URL,
    process.env.FRONTEND_MOBILE_URL,
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

#### F. Password Security
```javascript
import * as bcrypt from 'bcrypt';

// ✅ Hash passwords with bcrypt (salt rounds: 12)
const hashedPassword = await bcrypt.hash(password, 12);

// ✅ Enforce strong password policy
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: 'Password must contain uppercase, lowercase, number, and special character',
})
password: string;
```

#### G. File Upload Security
```javascript
// ✅ Validate file types
const allowedMimeTypes = ['application/pdf', 'application/msword'];
if (!allowedMimeTypes.includes(file.mimetype)) {
  throw new BadRequestException('Invalid file type');
}

// ✅ Limit file size
@UseInterceptors(FileInterceptor('file', {
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}))

// ✅ Generate random filenames (prevent path traversal)
const filename = `${uuidv4()}.${extension}`;
```

#### H. Error Handling (Don't leak sensitive info)
```javascript
// ❌ WRONG - Exposes internal details
throw new Error(error.stack);

// ✅ CORRECT - Generic error messages
throw new BadRequestException('Invalid input');

// ✅ Log detailed errors server-side only
this.logger.error('Database error', { error, userId });
```

#### I. Logging & Monitoring
```javascript
// ✅ Log all authentication attempts
this.logger.log('Login attempt', { email, ip, userAgent, success: true });

// ✅ Log all failed operations
this.logger.warn('Failed login', { email, ip, reason: 'Invalid password' });

// ✅ Never log sensitive data
// ❌ this.logger.log('User data', { password }); // NEVER
```

---

## Code Quality Requirements

### 1. Clear Comments
```javascript
/**
 * Register a new user account
 * 
 * @param registerDto - User registration data
 * @returns User object with JWT tokens
 * @throws ConflictException if email already exists
 * @throws BadRequestException if validation fails
 */
async register(registerDto: RegisterDto): Promise<AuthResponse> {
  // Check if email already exists
  const existingUser = await this.userModel.findOne({ email: registerDto.email });
  if (existingUser) {
    throw new ConflictException('Email already registered');
  }

  // Hash password with bcrypt (12 rounds)
  const hashedPassword = await bcrypt.hash(registerDto.password, 12);

  // Create user document
  const user = await this.userModel.create({
    ...registerDto,
    password: hashedPassword,
  });

  // Generate JWT tokens
  const tokens = await this.generateTokens(user);

  return { user, ...tokens };
}
```

### 2. Error Handling
```javascript
try {
  // Operation
} catch (error) {
  // Log error with context
  this.logger.error('Operation failed', {
    operation: 'createJob',
    userId,
    error: error.message,
  });

  // Throw appropriate HTTP exception
  if (error.name === 'ValidationError') {
    throw new BadRequestException('Invalid input data');
  }
  
  throw new InternalServerErrorException('Operation failed');
}
```

### 3. Don't Break Existing Functionality
- Maintain all existing API contracts
- Keep response formats consistent
- Preserve backward compatibility
- Test all endpoints after changes

---

## Implementation Order

### Phase 1: Core Infrastructure (Week 1)
1. **main.js** - Bootstrap app with security middleware
2. **app.module.js** - Configure all modules
3. **config/** - Environment validation and configuration
4. **common/** - Guards, interceptors, filters, pipes

### Phase 2: Authentication (Week 2)
5. **auth/** - Complete authentication system
   - JWT strategy
   - Local strategy
   - Guards (JWT, Roles)
   - Controllers (register, login, verify, reset)
   - Services (password hashing, token generation)

### Phase 3: Core Modules (Week 3-4)
6. **users/** - User management
7. **companies/** - Company profiles
8. **jobs/** - Job postings
9. **applications/** - Job applications

### Phase 4: Supporting Modules (Week 5)
10. **uploads/** - S3 file uploads
11. **notifications/** - Email/WhatsApp
12. **reviews/** - Company reviews
13. **assessments/** - Skill tests

### Phase 5: AI Integration (Week 6)
14. **ai-client/** - Python AI service integration
15. Test all AI endpoints

### Phase 6: Admin & Analytics (Week 7)
16. **admin/** - Admin panel
17. **salary-insights/** - Salary data
18. **referrals/** - Referral system

### Phase 7: Testing & Deployment (Week 8)
19. Write unit tests
20. Write E2E tests
21. Deploy to staging
22. Final security audit

---

## Database Schemas

Implement these MongoDB schemas using Mongoose:

### User Schema
```javascript
{
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['job_seeker', 'employer', 'admin'], required: true },
  isVerified: { type: Boolean, default: false },
  profile: {
    fullName: String,
    phone: String,
    location: {
      city: String,
      coordinates: { type: [Number], index: '2dsphere' }
    }
  },
  cv: {
    fileUrl: String,
    parsedData: Object,
    aiScore: Number,
    lastUpdated: Date
  },
  skills: [String],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Job Schema
```javascript
{
  title: { type: String, required: true, index: 'text' },
  description: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, index: true },
  location: {
    city: { type: String, index: true },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'PKR' }
  },
  requirements: {
    skills: [String],
    experience: { min: Number, max: Number },
    education: String
  },
  embedding: [Number], // 768-dimensional vector
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },
  applicationCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now }
}
```

### Application Schema
```javascript
{
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cv: {
    fileUrl: String,
    parsedData: Object,
    aiScore: {
      total: Number,
      completeness: Number,
      relevance: Number,
      formatting: Number
    }
  },
  status: { 
    type: String, 
    enum: ['pending', 'viewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  },
  timeline: [{
    status: String,
    date: Date,
    note: String
  }],
  appliedAt: { type: Date, default: Date.now }
}
```

---

## API Response Format

**Standard Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Standard Error Response:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ],
  "timestamp": "2026-01-19T14:30:00.000Z",
  "path": "/api/auth/register"
}
```

**Pagination Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 127,
    "totalPages": 7,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Testing Requirements

### Unit Tests
```javascript
describe('AuthService', () => {
  it('should hash password with bcrypt', async () => {
    const password = 'Test@1234';
    const hashed = await service.hashPassword(password);
    expect(hashed).not.toBe(password);
    expect(await bcrypt.compare(password, hashed)).toBe(true);
  });

  it('should throw error for duplicate email', async () => {
    await expect(service.register(existingEmail)).rejects.toThrow(ConflictException);
  });
});
```

### E2E Tests
```javascript
describe('POST /api/auth/register', () => {
  it('should register new user', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send(validUserData)
      .expect(201)
      .expect(res => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.user.email).toBe(validUserData.email);
      });
  });

  it('should reject invalid email', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ ...validUserData, email: 'invalid' })
      .expect(400);
  });
});
```

---

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Database indexes created
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] Security headers enabled (Helmet)
- [ ] HTTPS enforced
- [ ] API keys rotated
- [ ] Logging configured
- [ ] Error tracking enabled (Sentry)
- [ ] Health check endpoint working
- [ ] All tests passing
- [ ] Security audit completed

---

## Documentation Requirements

1. **Swagger/OpenAPI** - Auto-generated API docs at `/api/docs`
2. **README.md** - Setup and deployment instructions
3. **CHANGELOG.md** - Track all changes
4. **SECURITY.md** - Security policies and reporting

---

## Final Notes

**Remember:**
- Security is NOT optional - implement ALL requirements
- Follow OWASP best practices religiously
- Comment your code clearly
- Don't break existing functionality
- Test everything thoroughly
- Keep dependencies updated
- Monitor for security vulnerabilities

**Reference Documents:**
- `implementtion-plan.md` - Complete technical specifications
- `backend.md` - Detailed backend documentation
- `FILE_STRUCTURE.md` - Directory structure overview
- Each `.js` file - Contains detailed comments on what to implement

---

## Success Criteria

✅ All 50+ endpoints implemented and working  
✅ All security requirements met (rate limiting, validation, secure keys)  
✅ All tests passing (unit + E2E)  
✅ Swagger documentation complete  
✅ No security vulnerabilities (npm audit)  
✅ Response time < 200ms for most endpoints  
✅ Can handle 1000+ concurrent users  
✅ All OWASP best practices followed  
✅ Clear comments throughout codebase  
✅ Zero breaking changes to existing functionality  

---

**Start with Phase 1 and work through each phase systematically. Generate production-ready, secure, well-documented code for the complete LocalHR backend API.**

🚀 **Build a world-class, secure backend!**

---
---

# DETAILED PHASE-BY-PHASE IMPLEMENTATION PROMPTS

The following sections provide extremely detailed, step-by-step implementation prompts for each phase of backend development. Use ONE phase at a time to avoid overwhelming the AI.

---

## 🔐 YOUR ACTUAL ENVIRONMENT CREDENTIALS

**Copy these EXACTLY into your `.env` file:**

```env
# MongoDB Database (READY TO USE)
MONGODB_URI=mongodb+srv://zbjadoon123_db_user:jjj@12345@localhr-cluster.nyi2bqu.mongodb.net/localhr?retryWrites=true&w=majority

# Pinecone Vector Database (READY TO USE)
PINECONE_API_KEY=pcsk_3t5oQn_FjAhkRx14sDVUvC7d13hP7hv2DpgVCe6B4pm9AWxzoDbQ9Ce1Bm2zAAro6WzLND
PINECONE_INDEX=localhr-jobs
PINECONE_ENVIRONMENT=us-east-1
PINECONE_HOST=https://localhr-jobs-3plbh8s.svc.apec-4627-b7a4.pinecone.io

# Server Configuration
NODE_ENV=development
PORT=3000

# JWT Secrets (CHANGE FOR PRODUCTION)
JWT_SECRET=localhr-jwt-secret-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=localhr-refresh-secret-key-change-in-production-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d

# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key-here

# AWS S3 (you need to create these)
AWS_ACCESS_KEY_ID=your-aws-access-key-here
AWS_SECRET_ACCESS_KEY=your-aws-secret-key-here
AWS_REGION=ap-south-1
AWS_S3_BUCKET=localhr-files

# SendGrid Email (you need to create)
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@localhr.pk

# Twilio SMS/WhatsApp (you need to create)
TWILIO_ACCOUNT_SID=your-twilio-account-sid-here
TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
TWILIO_PHONE_NUMBER=+1234567890

# Redis (for caching and rate limiting)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Frontend URLs (for CORS - will configure when frontend is ready)
FRONTEND_WEB_URL=http://localhost:3001
FRONTEND_MOBILE_URL=exp://localhost:19000

# Sentry (optional - for error tracking)
SENTRY_DSN=
```

---
---

# PHASE 1: CORE INFRASTRUCTURE & SETUP

## 🎯 Objective
Set up the complete NestJS backend foundation with security, configuration, database connection, and core utilities.

## 📋 What You'll Build
- Environment configuration with validation
- MongoDB Atlas connection
- Pinecone configuration
- Security middleware (Helmet, CORS)
- Global validation and error handling
- Swagger API documentation
- Rate limiting system
- Logging infrastructure

---

## STEP 1: Create .env File

**File:** `backend/.env`

**Action:** Create this file and paste the credentials from above EXACTLY as shown.

**Verify:** MongoDB and Pinecone credentials are already configured and ready to use.

---

## STEP 2: Implement App Configuration

**File:** `backend/src/config/app.config.js`

```javascript
/**
 * Application Configuration
 * Validates and exports all environment variables
 */

require('dotenv').config();

// Required environment variables
const REQUIRED_ENV_VARS = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'PINECONE_API_KEY',
  'PINECONE_INDEX',
  'PINECONE_HOST',
  'GEMINI_API_KEY',
];

// Validate environment variables
function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file'
    );
  }
  
  console.log('✅ All required environment variables are set');
}

// Export configuration object
const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  
  // Database
  mongodbUri: process.env.MONGODB_URI,
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  
  // Pinecone Vector Database
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    index: process.env.PINECONE_INDEX,
    environment: process.env.PINECONE_ENVIRONMENT,
    host: process.env.PINECONE_HOST,
  },
  
  // AI Service (Gemini)
  aiService: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  
  // AWS S3
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-south-1',
    s3Bucket: process.env.AWS_S3_BUCKET,
  },
  
  // SendGrid
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@localhr.pk',
  },
  
  // Twilio
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  
  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },
  
  // Frontend URLs
  frontend: {
    webUrl: process.env.FRONTEND_WEB_URL || 'http://localhost:3001',
    mobileUrl: process.env.FRONTEND_MOBILE_URL || 'exp://localhost:19000',
  },
  
  // Sentry
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};

// Validate on import
validateEnv();

module.exports = config;
```

**Test:** Run `node src/config/app.config.js` - should see "✅ All required environment variables are set"

---

## STEP 3: Implement Database Configuration

**File:** `backend/src/config/database.config.js`

```javascript
/**
 * Database Configuration
 * MongoDB connection settings
 */

const config = require('./app.config');

const databaseConfig = {
  uri: config.mongodbUri,
  options: {
    // Connection options
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    // Performance
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    
    // Retry
    retryWrites: true,
    retryReads: true,
    
    // Database name
    dbName: 'localhr',
  },
};

module.exports = databaseConfig;
```

---

## STEP 4: Implement Main Application Entry Point

**File:** `backend/src/main.js`

```javascript
/**
 * Main Application Entry Point
 * Bootstraps NestJS with security and documentation
 */

const { NestFactory } = require('@nestjs/core');
const { ValidationPipe } = require('@nestjs/common');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const helmet = require('helmet');
const { AppModule } = require('./app.module');
const config = require('./config/app.config');

async function bootstrap() {
  // Create NestJS application
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // ===== SECURITY MIDDLEWARE =====
  
  // 1. Helmet - Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  }));

  // 2. CORS - Cross-Origin Resource Sharing
  app.enableCors({
    origin: [
      config.frontend.webUrl,
      config.frontend.mobileUrl,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Per-Page'],
  });

  // 3. Global Validation Pipe (SECURITY: Strict validation)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Strip unknown properties
      forbidNonWhitelisted: true,   // Reject unknown properties
      transform: true,              // Auto-transform to DTO types
      transformOptions: {
        enableImplicitConversion: false, // Explicit type conversion only
      },
      disableErrorMessages: config.nodeEnv === 'production',
    }),
  );

  // 4. Global API prefix
  app.setGlobalPrefix('api');

  // ===== SWAGGER DOCUMENTATION =====
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('LocalHR API')
    .setDescription('LocalHR Backend API - AI-Powered Job Portal for Pakistan')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('jobs', 'Job postings')
    .addTag('applications', 'Job applications')
    .addTag('companies', 'Company profiles')
    .addTag('ai', 'AI features')
    .addTag('uploads', 'File uploads')
    .addTag('notifications', 'Notifications')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'LocalHR API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // ===== START SERVER =====
  
  const port = config.port;
  await app.listen(port);

  console.log('\n🚀 LocalHR Backend Server Started!');
  console.log(`📍 Server: http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/api/docs`);
  console.log(`🔧 Environment: ${config.nodeEnv}`);
  console.log(`💾 Database: MongoDB Atlas (localhr)`);
  console.log(`🔍 Pinecone: ${config.pinecone.index}\n`);
}

// Start application
bootstrap().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
```

---

## STEP 5: Implement Root Application Module

**File:** `backend/src/app.module.js`

```javascript
/**
 * Root Application Module
 * Imports and configures all modules
 */

const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { MongooseModule } = require('@nestjs/mongoose');
const { ThrottlerModule } = require('@nestjs/throttler');
const databaseConfig = require('./config/database.config');

@Module({
  imports: [
    // ===== CONFIGURATION =====
    
    // Environment variables (global)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),

    // ===== DATABASE =====
    
    // MongoDB Atlas connection
    MongooseModule.forRoot(databaseConfig.uri, databaseConfig.options),

    // ===== RATE LIMITING (SECURITY) =====
    
    // Multiple rate limit tiers
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 900000,  // 15 minutes
        limit: 100,   // 100 requests per 15 min per IP
      },
      {
        name: 'strict',
        ttl: 900000,  // 15 minutes
        limit: 5,     // 5 requests per 15 min (auth endpoints)
      },
      {
        name: 'ai',
        ttl: 3600000, // 1 hour
        limit: 20,    // 20 requests per hour (AI endpoints)
      },
    ]),

    // ===== FEATURE MODULES =====
    // (Will be added in next phases)
    
    // AuthModule,
    // UsersModule,
    // JobsModule,
    // ApplicationsModule,
    // CompaniesModule,
    // AiModule,
    // UploadsModule,
    // NotificationsModule,
    // AssessmentsModule,
    // ReviewsModule,
    // AdminModule,
    // SalaryInsightsModule,
    // ReferralsModule,
  ],
  controllers: [],
  providers: [],
})
class AppModule {}

module.exports = { AppModule };
```

---

## STEP 6: Implement Global Exception Filter

**File:** `backend/src/common/filters/http-exception.filter.js`

```javascript
/**
 * Global HTTP Exception Filter
 * Handles all errors consistently and securely
 * SECURITY: Prevents sensitive information leakage
 */

const { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException, 
  HttpStatus 
} = require('@nestjs/common');

@Catch()
class HttpExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Determine status code
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get error message (safe for client)
    let message = 'Internal server error';
    let errors = [];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        message = exceptionResponse.message || message;
        errors = exceptionResponse.errors || [];
      } else {
        message = exceptionResponse;
      }
    }

    // Build error response
    const errorResponse = {
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message[0] : message,
      errors: Array.isArray(message) ? message : errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log error (server-side only, no sensitive data)
    console.error('❌ Error:', {
      status,
      message: errorResponse.message,
      path: request.url,
      method: request.method,
      ip: request.ip,
      // DO NOT log: passwords, tokens, API keys
    });

    // Send response
    response.status(status).json(errorResponse);
  }
}

module.exports = { HttpExceptionFilter };
```

---

## STEP 7: Implement Logging Interceptor

**File:** `backend/src/common/interceptors/logging.interceptor.js`

```javascript
/**
 * Logging Interceptor
 * Logs all requests and responses
 */

const { Injectable, NestInterceptor, ExecutionContext, CallHandler } = require('@nestjs/common');
const { Observable } = require('rxjs');
const { tap } = require('rxjs/operators');

@Injectable()
class LoggingInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const userAgent = request.get('user-agent') || '';
    const now = Date.now();

    console.log(`📥 ${method} ${url} - ${ip} - ${userAgent}`);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const delay = Date.now() - now;

        console.log(`📤 ${method} ${url} - ${statusCode} - ${delay}ms`);
      }),
    );
  }
}

module.exports = { LoggingInterceptor };
```

---

## STEP 8: Implement Transform Interceptor

**File:** `backend/src/common/interceptors/transform.interceptor.js`

```javascript
/**
 * Transform Interceptor
 * Transforms all responses to standard format
 */

const { Injectable, NestInterceptor, ExecutionContext, CallHandler } = require('@nestjs/common');
const { Observable } = require('rxjs');
const { map } = require('rxjs/operators');

@Injectable()
class TransformInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

module.exports = { TransformInterceptor };
```

---

## STEP 9: Test Phase 1 Setup

**Run these commands:**

```bash
# 1. Verify environment variables
node src/config/app.config.js

# 2. Start the development server
npm run start:dev

# 3. Open browser and check:
# - http://localhost:3000/api/docs (Swagger documentation)
```

**Expected Output:**
```
✅ All required environment variables are set

🚀 LocalHR Backend Server Started!
📍 Server: http://localhost:3000
📚 API Docs: http://localhost:3000/api/docs
🔧 Environment: development
💾 Database: MongoDB Atlas (localhr)
🔍 Pinecone: localhr-jobs
```

---

## ✅ PHASE 1 VERIFICATION CHECKLIST

- [ ] `.env` file created with all credentials
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Swagger docs accessible at `/api/docs`
- [ ] Environment validation working
- [ ] CORS configured correctly
- [ ] Rate limiting configured (3 tiers)
- [ ] Security headers enabled (Helmet)
- [ ] Global validation pipe active
- [ ] Error handling working
- [ ] Logging interceptor active

---

## 🎯 PHASE 1 COMPLETE!

**What You've Built:**
✅ Secure backend foundation  
✅ MongoDB Atlas connected  
✅ Pinecone configured  
✅ Security middleware active  
✅ API documentation ready  
✅ Rate limiting implemented  
✅ Error handling system  

**Next:** Phase 2 - Authentication Module

---
---

# PHASE 2: AUTHENTICATION MODULE

## 🎯 Objective
Implement complete authentication system with JWT, user registration, login, OTP verification, and password reset.

## 📋 What You'll Build
- User registration with email/password
- Login with JWT tokens
- Password hashing with bcrypt (12 rounds)
- OTP generation and verification
- Password reset functionality
- Token refresh mechanism
- JWT and Local Passport strategies
- Auth guards (JWT, Roles)

---

## STEP 1: Create User Schema

**File:** `backend/src/users/schemas/user.schema.js`

```javascript
/**
 * User MongoDB Schema
 * Defines user document structure
 */

const { Schema } = require('mongoose');

const UserSchema = new Schema({
  // Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ['job_seeker', 'employer', 'admin'],
    required: true,
    default: 'job_seeker',
  },
  
  // Verification
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
  resetToken: {
    token: String,
    expiresAt: Date,
  },
  
  // Profile
  profile: {
    fullName: String,
    phone: String,
    location: {
      city: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere',
      },
    },
  },
  
  // CV Data
  cv: {
    fileUrl: String,
    parsedData: Schema.Types.Mixed,
    aiScore: Number,
    lastUpdated: Date,
  },
  
  // Skills & Experience
  skills: [String],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
    current: Boolean,
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number,
    field: String,
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: Date,
});

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'profile.location.coordinates': '2dsphere' });

// Update timestamp on save
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = { UserSchema };
```

---

## STEP 2: Create Auth DTOs

**File:** `backend/src/auth/dto/register.dto.js`

```javascript
/**
 * Register DTO
 * Validates user registration data
 */

const { 
  IsEmail, 
  IsString, 
  MinLength, 
  MaxLength, 
  Matches, 
  IsEnum, 
  IsOptional 
} = require('class-validator');

class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255)
  email;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password must contain uppercase, lowercase, number, and special character' }
  )
  password;

  @IsEnum(['job_seeker', 'employer'])
  role;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  fullName;
}

module.exports = { RegisterDto };
```

**File:** `backend/src/auth/dto/login.dto.js`

```javascript
/**
 * Login DTO
 */

const { IsEmail, IsString, MinLength } = require('class-validator');

class LoginDto {
  @IsEmail()
  email;

  @IsString()
  @MinLength(8)
  password;
}

module.exports = { LoginDto };
```

**File:** `backend/src/auth/dto/verify-otp.dto.js`

```javascript
/**
 * Verify OTP DTO
 */

const { IsEmail, IsString, Length, Matches } = require('class-validator');

class VerifyOtpDto {
  @IsEmail()
  email;

  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  @Matches(/^\d{6}$/, { message: 'OTP must contain only digits' })
  otp;
}

module.exports = { VerifyOtpDto };
```

---

## STEP 3: Implement Auth Service

**File:** `backend/src/auth/auth.service.js`

```javascript
/**
 * Authentication Service
 * Business logic for authentication
 */

const { Injectable, ConflictException, UnauthorizedException, BadRequestException } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');
const { JwtService } = require('@nestjs/jwt');
const { Model } = require('mongoose');
const * as bcrypt = require('bcrypt');
const config = require('../config/app.config');

@Injectable()
class AuthService {
  constructor(
    @InjectModel('User') private userModel,
    private jwtService,
  ) {}

  /**
   * Register new user
   * SECURITY: Hash password with bcrypt (12 rounds)
   */
  async register(registerDto) {
    // Check if email already exists
    const existingUser = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password (12 rounds for security)
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Generate OTP for email verification
    const otp = this.generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await this.userModel.create({
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role,
      'profile.fullName': registerDto.fullName,
      otp: {
        code: otp,
        expiresAt: otpExpiresAt,
      },
    });

    // TODO: Send OTP via email (Phase 4)
    console.log(`📧 OTP for ${user.email}: ${otp}`);

    // Generate JWT tokens
    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      ...tokens,
    };
  }

  /**
   * Login user
   * SECURITY: Compare hashed passwords
   */
  async login(loginDto) {
    // Find user with password field
    const user = await this.userModel.findOne({ email: loginDto.email }).select('+password');
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      ...tokens,
    };
  }

  /**
   * Verify OTP
   */
  async verifyOTP(verifyOtpDto) {
    const user = await this.userModel.findOne({ email: verifyOtpDto.email });
    
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.otp || !user.otp.code) {
      throw new BadRequestException('No OTP found for this user');
    }

    // Check if OTP expired
    if (new Date() > user.otp.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    // Verify OTP
    if (user.otp.code !== verifyOtpDto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    return {
      message: 'Email verified successfully',
      isVerified: true,
    };
  }

  /**
   * Generate OTP (6 digits)
   */
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Generate JWT tokens
   * SECURITY: Short-lived access tokens (15min), longer refresh tokens (7 days)
   */
  async generateTokens(user) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: config.jwt.secret,
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: config.jwt.refreshSecret,
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: config.jwt.expiresIn,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: config.jwt.refreshSecret,
      });

      const user = await this.userModel.findById(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

module.exports = { AuthService };
```

---

## STEP 4: Implement JWT Strategy

**File:** `backend/src/auth/strategies/jwt.strategy.js`

```javascript
/**
 * JWT Strategy
 * Validates JWT tokens and attaches user to request
 */

const { Injectable, UnauthorizedException } = require('@nestjs/common');
const { PassportStrategy } = require('@nestjs/passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { InjectModel } = require('@nestjs/mongoose');
const config = require('../../config/app.config');

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload) {
    const user = await this.userModel.findById(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  }
}

module.exports = { JwtStrategy };
```

---

## STEP 5: Implement Auth Guards

**File:** `backend/src/auth/guards/jwt-auth.guard.js`

```javascript
/**
 * JWT Auth Guard
 * Protects routes requiring authentication
 */

const { Injectable } = require('@nestjs/common');
const { AuthGuard } = require('@nestjs/passport');

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {}

module.exports = { JwtAuthGuard };
```

**File:** `backend/src/auth/guards/roles.guard.js`

```javascript
/**
 * Roles Guard
 * Implements role-based access control
 * SECURITY: Prevents unauthorized access to admin/employer endpoints
 */

const { Injectable, CanActivate, ExecutionContext, ForbiddenException } = require('@nestjs/common');
const { Reflector } = require('@nestjs/core');

@Injectable()
class RolesGuard {
  constructor(private reflector) {}

  canActivate(context) {
    const requiredRoles = this.reflector.get('roles', context.getHandler());
    
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasRole = requiredRoles.includes(user.role);
    
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

module.exports = { RolesGuard };
```

---

## STEP 6: Implement Auth Controller

**File:** `backend/src/auth/auth.controller.js`

```javascript
/**
 * Authentication Controller
 * Handles HTTP requests for authentication
 */

const { Controller, Post, Body, UseGuards, Get, Req } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } = require('@nestjs/swagger');
const { Throttle } = require('@nestjs/throttler');
const { AuthService } = require('./auth.service');
const { RegisterDto } = require('./dto/register.dto');
const { LoginDto } = require('./dto/login.dto');
const { VerifyOtpDto } = require('./dto/verify-otp.dto');
const { JwtAuthGuard } = require('./guards/jwt-auth.guard');

@ApiTags('auth')
@Controller('auth')
class AuthController {
  constructor(private authService) {}

  /**
   * Register new user
   * SECURITY: Rate limited to 5 requests per 15 minutes
   */
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 requests per 15 min
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Login user
   * SECURITY: Rate limited to 5 requests per 15 minutes
   */
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Verify OTP
   */
  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  async verifyOTP(@Body() verifyOtpDto) {
    return this.authService.verifyOTP(verifyOtpDto);
  }

  /**
   * Refresh access token
   */
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  async refreshToken(@Body('refreshToken') refreshToken) {
    return this.authService.refreshToken(refreshToken);
  }

  /**
   * Get current user profile
   * SECURITY: Requires JWT authentication
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user' })
  async getCurrentUser(@Req() req) {
    return req.user;
  }
}

module.exports = { AuthController };
```

---

## STEP 7: Implement Auth Module

**File:** `backend/src/auth/auth.module.js`

```javascript
/**
 * Authentication Module
 * Configures authentication system
 */

const { Module } = require('@nestjs/common');
const { JwtModule } = require('@nestjs/jwt');
const { PassportModule } = require('@nestjs/passport');
const { MongooseModule } = require('@nestjs/mongoose');
const { AuthController } = require('./auth.controller');
const { AuthService } = require('./auth.service');
const { JwtStrategy } = require('./strategies/jwt.strategy');
const { UserSchema } = require('../users/schemas/user.schema');
const config = require('../config/app.config');

@Module({
  imports: [
    // Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // JWT
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: {
        expiresIn: config.jwt.expiresIn,
      },
    }),
    
    // User model
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
class AuthModule {}

module.exports = { AuthModule };
```

---

## STEP 8: Update App Module

**File:** `backend/src/app.module.js`

Add AuthModule to imports:

```javascript
const { AuthModule } = require('./auth/auth.module');

@Module({
  imports: [
    // ... existing imports ...
    
    // Feature modules
    AuthModule, // ADD THIS
  ],
  // ...
})
```

---

## STEP 9: Test Authentication

**Test with Swagger:**

1. Start server: `npm run start:dev`
2. Open: `http://localhost:3000/api/docs`
3. Test endpoints:

**Register:**
```json
POST /api/auth/register
{
  "email": "test@example.com",
  "password": "Test@1234",
  "role": "job_seeker",
  "fullName": "Test User"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "Test@1234"
}
```

**Verify OTP:**
```json
POST /api/auth/verify-otp
{
  "email": "test@example.com",
  "otp": "123456"
}
```

**Get Current User:**
```
GET /api/auth/me
Authorization: Bearer <your-access-token>
```

---

## ✅ PHASE 2 VERIFICATION CHECKLIST

- [ ] User schema created with all fields
- [ ] Registration endpoint working
- [ ] Login endpoint working
- [ ] Passwords hashed with bcrypt (12 rounds)
- [ ] JWT tokens generated correctly
- [ ] OTP generation working
- [ ] OTP verification working
- [ ] Token refresh working
- [ ] JWT strategy validating tokens
- [ ] Auth guards protecting routes
- [ ] Rate limiting on auth endpoints (5 per 15 min)
- [ ] All endpoints in Swagger docs

---

## 🎯 PHASE 2 COMPLETE!

**What You've Built:**
✅ Complete authentication system  
✅ User registration with validation  
✅ Secure login with JWT  
✅ Password hashing (bcrypt)  
✅ OTP verification  
✅ Token refresh mechanism  
✅ Role-based access control  
✅ Rate limiting on auth endpoints  

# PHASE 3: USERS & COMPANIES MODULES

## 🎯 Objective
Implement user profile management and company profile modules with full CRUD operations.

## 📋 What You'll Build
- User profile management (view, update, delete)
- CV upload and management
- Skills and experience management
- Company profile creation and management
- Company verification system
- User search and filtering

---

## STEP 1: Implement Users Module

**File:** ackend/src/users/users.module.js

`javascript
/**
 * Users Module
 * Manages user profiles and data
 */

const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { UsersController } = require('./users.controller');
const { UsersService } = require('./users.service');
const { UserSchema } = require('./schemas/user.schema');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
class UsersModule {}

module.exports = { UsersModule };
`

---

## STEP 2: Implement Users Service

**File:** ackend/src/users/users.service.js

`javascript
/**
 * Users Service
 * Business logic for user management
 */

const { Injectable, NotFoundException, BadRequestException } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');
const { Model } = require('mongoose');

@Injectable()
class UsersService {
  constructor(@InjectModel('User') private userModel) {}

  /**
   * Get user profile by ID
   */
  async findById(userId) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profile: user.profile,
      cv: user.cv,
      skills: user.skills,
      experience: user.experience,
      education: user.education,
      createdAt: user.createdAt,
    };
  }

  /**
   * Update user profile
   * SECURITY: Validate all inputs
   */
  async updateProfile(userId, updateData) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update allowed fields only
    if (updateData.fullName) {
      user.profile.fullName = updateData.fullName;
    }
    if (updateData.phone) {
      user.profile.phone = updateData.phone;
    }
    if (updateData.location) {
      user.profile.location = updateData.location;
    }
    if (updateData.skills) {
      user.skills = updateData.skills;
    }
    if (updateData.experience) {
      user.experience = updateData.experience;
    }
    if (updateData.education) {
      user.education = updateData.education;
    }

    await user.save();

    return this.findById(userId);
  }

  /**
   * Upload CV
   */
  async uploadCV(userId, cvData) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.cv = {
      fileUrl: cvData.fileUrl,
      parsedData: cvData.parsedData || {},
      aiScore: cvData.aiScore || 0,
      lastUpdated: new Date(),
    };

    await user.save();

    return {
      message: 'CV uploaded successfully',
      cv: user.cv,
    };
  }

  /**
   * Delete user account
   * SECURITY: Soft delete (mark as deleted)
   */
  async deleteAccount(userId) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Soft delete: anonymize data
    user.email = deleted_@deleted.com;
    user.profile = {};
    user.cv = {};
    user.skills = [];
    user.experience = [];
    user.education = [];
    
    await user.save();

    return {
      message: 'Account deleted successfully',
    };
  }

  /**
   * Search users (admin only)
   */
  async searchUsers(filters, page = 1, limit = 20) {
    const query = {};

    if (filters.role) {
      query.role = filters.role;
    }
    if (filters.isVerified !== undefined) {
      query.isVerified = filters.isVerified;
    }
    if (filters.city) {
      query['profile.location.city'] = new RegExp(filters.city, 'i');
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel
        .find(query)
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.userModel.countDocuments(query),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }
}

module.exports = { UsersService };
`

---

## STEP 3: Create User DTOs

**File:** ackend/src/users/dto/update-user.dto.js

`javascript
/**
 * Update User DTO
 * Validates profile update data
 */

const { IsString, IsOptional, MaxLength, IsArray, ValidateNested } = require('class-validator');
const { Type } = require('class-transformer');

class LocationDto {
  @IsString()
  @MaxLength(100)
  city;

  @IsOptional()
  @IsArray()
  coordinates; // [longitude, latitude]
}

class ExperienceDto {
  @IsString()
  @MaxLength(200)
  title;

  @IsString()
  @MaxLength(200)
  company;

  @IsOptional()
  startDate;

  @IsOptional()
  endDate;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description;
}

class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  fullName;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  skills;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience;

  @IsOptional()
  @IsArray()
  education;
}

module.exports = { UpdateUserDto };
`

---

## STEP 4: Implement Users Controller

**File:** ackend/src/users/users.controller.js

`javascript
/**
 * Users Controller
 * Handles HTTP requests for user management
 */

const { Controller, Get, Put, Delete, Body, Param, Query, UseGuards, Req } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } = require('@nestjs/swagger');
const { UsersService } = require('./users.service');
const { UpdateUserDto } = require('./dto/update-user.dto');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');
const { RolesGuard } = require('../auth/guards/roles.guard');
const { Roles } = require('../common/decorators/roles.decorator');

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
class UsersController {
  constructor(private usersService) {}

  /**
   * Get current user profile
   */
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.id);
  }

  /**
   * Update current user profile
   * SECURITY: Users can only update their own profile
   */
  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@Req() req, @Body() updateUserDto) {
    return this.usersService.updateProfile(req.user.id, updateUserDto);
  }

  /**
   * Upload CV
   */
  @Put('upload-cv')
  @ApiOperation({ summary: 'Upload CV' })
  async uploadCV(@Req() req, @Body() cvData) {
    return this.usersService.uploadCV(req.user.id, cvData);
  }

  /**
   * Delete account
   */
  @Delete('account')
  @ApiOperation({ summary: 'Delete user account' })
  async deleteAccount(@Req() req) {
    return this.usersService.deleteAccount(req.user.id);
  }

  /**
   * Get user by ID (admin only)
   */
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  async getUserById(@Param('id') userId) {
    return this.usersService.findById(userId);
  }

  /**
   * Search users (admin only)
   */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Search users (admin only)' })
  async searchUsers(@Query() filters) {
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    
    return this.usersService.searchUsers(filters, page, limit);
  }
}

module.exports = { UsersController };
`

---

## STEP 5: Create Company Schema

**File:** ackend/src/companies/schemas/company.schema.js

`javascript
/**
 * Company MongoDB Schema
 */

const { Schema } = require('mongoose');

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 2000,
  },
  
  // Contact Information
  email: {
    type: String,
    required: true,
  },
  phone: String,
  website: String,
  
  // Location
  location: {
    address: String,
    city: {
      type: String,
      index: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere',
    },
  },
  
  // Business Details
  industry: {
    type: String,
    index: true,
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
  },
  foundedYear: Number,
  
  // Verification
  ntn: String, // National Tax Number
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: Date,
  
  // Owner
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Stats
  jobsPosted: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
CompanySchema.index({ name: 'text', description: 'text' });
CompanySchema.index({ 'location.city': 1 });
CompanySchema.index({ industry: 1 });

// Update timestamp
CompanySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = { CompanySchema };
`

---

## STEP 6: Implement Companies Service

**File:** ackend/src/companies/companies.service.js

`javascript
/**
 * Companies Service
 */

const { Injectable, NotFoundException, ForbiddenException } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');

@Injectable()
class CompaniesService {
  constructor(@InjectModel('Company') private companyModel) {}

  /**
   * Create company profile
   */
  async create(createCompanyDto, userId) {
    const company = await this.companyModel.create({
      ...createCompanyDto,
      owner: userId,
    });

    return company;
  }

  /**
   * Get company by ID
   */
  async findById(companyId) {
    const company = await this.companyModel
      .findById(companyId)
      .populate('owner', 'email profile.fullName');
    
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  /**
   * Update company
   * SECURITY: Only owner can update
   */
  async update(companyId, updateData, userId) {
    const company = await this.companyModel.findById(companyId);
    
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    // Check ownership
    if (company.owner.toString() !== userId) {
      throw new ForbiddenException('You can only update your own company');
    }

    Object.assign(company, updateData);
    await company.save();

    return company;
  }

  /**
   * Verify company (admin only)
   */
  async verifyCompany(companyId) {
    const company = await this.companyModel.findById(companyId);
    
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    company.isVerified = true;
    company.verifiedAt = new Date();
    await company.save();

    return {
      message: 'Company verified successfully',
      company,
    };
  }

  /**
   * Search companies
   */
  async search(filters, page = 1, limit = 20) {
    const query = {};

    if (filters.city) {
      query['location.city'] = new RegExp(filters.city, 'i');
    }
    if (filters.industry) {
      query.industry = filters.industry;
    }
    if (filters.isVerified !== undefined) {
      query.isVerified = filters.isVerified;
    }

    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      this.companyModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.companyModel.countDocuments(query),
    ]);

    return {
      companies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Delete company
   */
  async delete(companyId, userId, isAdmin = false) {
    const company = await this.companyModel.findById(companyId);
    
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    // Check ownership or admin
    if (!isAdmin && company.owner.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own company');
    }

    await company.deleteOne();

    return {
      message: 'Company deleted successfully',
    };
  }
}

module.exports = { CompaniesService };
`

---

## STEP 7: Create Company DTOs

**File:** ackend/src/companies/dto/create-company.dto.js

`javascript
/**
 * Create Company DTO
 */

const { IsString, IsEmail, IsOptional, MaxLength, IsEnum } = require('class-validator');

class CreateCompanyDto {
  @IsString()
  @MaxLength(200)
  name;

  @IsOptional()
  @IsString()
  logo;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description;

  @IsEmail()
  email;

  @IsOptional()
  @IsString()
  phone;

  @IsOptional()
  @IsString()
  website;

  @IsOptional()
  location;

  @IsOptional()
  @IsString()
  industry;

  @IsOptional()
  @IsEnum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'])
  companySize;

  @IsOptional()
  foundedYear;

  @IsOptional()
  @IsString()
  ntn;
}

module.exports = { CreateCompanyDto };
`

**File:** ackend/src/companies/dto/update-company.dto.js

`javascript
/**
 * Update Company DTO
 */

const { IsString, IsOptional, MaxLength } = require('class-validator');

class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name;

  @IsOptional()
  @IsString()
  logo;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description;

  @IsOptional()
  @IsString()
  phone;

  @IsOptional()
  @IsString()
  website;

  @IsOptional()
  location;

  @IsOptional()
  @IsString()
  industry;

  @IsOptional()
  companySize;
}

module.exports = { UpdateCompanyDto };
`

---

## STEP 8: Implement Companies Controller

**File:** ackend/src/companies/companies.controller.js

`javascript
/**
 * Companies Controller
 */

const { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiBearerAuth } = require('@nestjs/swagger');
const { CompaniesService } = require('./companies.service');
const { CreateCompanyDto } = require('./dto/create-company.dto');
const { UpdateCompanyDto } = require('./dto/update-company.dto');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');
const { RolesGuard } = require('../auth/guards/roles.guard');
const { Roles } = require('../common/decorators/roles.decorator');

@ApiTags('companies')
@Controller('companies')
class CompaniesController {
  constructor(private companiesService) {}

  /**
   * Create company
   * SECURITY: Only employers can create companies
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer', 'admin')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create company profile' })
  async create(@Body() createCompanyDto, @Req() req) {
    return this.companiesService.create(createCompanyDto, req.user.id);
  }

  /**
   * Get company by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  async findById(@Param('id') companyId) {
    return this.companiesService.findById(companyId);
  }

  /**
   * Update company
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update company' })
  async update(@Param('id') companyId, @Body() updateCompanyDto, @Req() req) {
    return this.companiesService.update(companyId, updateCompanyDto, req.user.id);
  }

  /**
   * Verify company (admin only)
   */
  @Put(':id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Verify company (admin only)' })
  async verify(@Param('id') companyId) {
    return this.companiesService.verifyCompany(companyId);
  }

  /**
   * Search companies
   */
  @Get()
  @ApiOperation({ summary: 'Search companies' })
  async search(@Query() filters) {
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    
    return this.companiesService.search(filters, page, limit);
  }

  /**
   * Delete company
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete company' })
  async delete(@Param('id') companyId, @Req() req) {
    const isAdmin = req.user.role === 'admin';
    return this.companiesService.delete(companyId, req.user.id, isAdmin);
  }
}

module.exports = { CompaniesController };
`

---

## STEP 9: Implement Companies Module

**File:** ackend/src/companies/companies.module.js

`javascript
/**
 * Companies Module
 */

const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { CompaniesController } = require('./companies.controller');
const { CompaniesService } = require('./companies.service');
const { CompanySchema } = require('./schemas/company.schema');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Company', schema: CompanySchema },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
class CompaniesModule {}

module.exports = { CompaniesModule };
`

---

## STEP 10: Create Roles Decorator

**File:** ackend/src/common/decorators/roles.decorator.js

`javascript
/**
 * Roles Decorator
 * Used to specify required roles for endpoints
 */

const { SetMetadata } = require('@nestjs/common');

const Roles = (...roles) => SetMetadata('roles', roles);

module.exports = { Roles };
`

---

## STEP 11: Update App Module

**File:** ackend/src/app.module.js

Add UsersModule and CompaniesModule:

`javascript
const { AuthModule } = require('./auth/auth.module');
const { UsersModule } = require('./users/users.module');
const { CompaniesModule } = require('./companies/companies.module');

@Module({
  imports: [
    // ... existing imports ...
    
    // Feature modules
    AuthModule,
    UsersModule,      // ADD THIS
    CompaniesModule,  // ADD THIS
  ],
  // ...
})
`

---

## STEP 12: Test Phase 3

**Test with Swagger:**

1. Start server: 
pm run start:dev
2. Open: http://localhost:3000/api/docs
3. Login to get JWT token
4. Test endpoints:

**Get Profile:**
`
GET /api/users/profile
Authorization: Bearer <token>
`

**Update Profile:**
`json
PUT /api/users/profile
Authorization: Bearer <token>
{
  "fullName": "John Doe",
  "phone": "+923001234567",
  "skills": ["JavaScript", "Node.js", "React"],
  "location": {
    "city": "Islamabad"
  }
}
`

**Create Company:**
`json
POST /api/companies
Authorization: Bearer <token>
{
  "name": "Tech Solutions Ltd",
  "description": "Leading IT company in Pakistan",
  "email": "info@techsolutions.pk",
  "location": {
    "city": "Lahore"
  },
  "industry": "Information Technology"
}
`

**Search Companies:**
`
GET /api/companies?city=Lahore&page=1&limit=20
`

---

## ✅ PHASE 3 VERIFICATION CHECKLIST

- [ ] Users module created
- [ ] User profile endpoints working
- [ ] Profile update working
- [ ] CV upload endpoint ready
- [ ] Account deletion working
- [ ] Companies module created
- [ ] Company creation working
- [ ] Company update working (owner only)
- [ ] Company verification working (admin only)
- [ ] Company search working
- [ ] Roles decorator implemented
- [ ] Role-based access control working
- [ ] All endpoints in Swagger docs

---

## 🎯 PHASE 3 COMPLETE!

**What You've Built:**
✅ Complete user profile management  
✅ CV upload system  
✅ Skills & experience management  
✅ Company profile creation  
✅ Company verification system  
✅ Role-based access control  
✅ Search and filtering  



**Next:** Phase 4 - Jobs & Applications Modules

---
---

# PHASE 4: JOBS & APPLICATIONS MODULES

## 🎯 Objective
Implement complete job posting and application management system with AI scoring.

## 📋 What You'll Build
- Job posting creation and management
- Job search with filters
- Job application system
- AI-powered CV scoring
- Application status tracking
- Employer application management

---

## STEP 1: Create Job Schema

**File:** `backend/src/jobs/schemas/job.schema.js`

```javascript
/**
 * Job MongoDB Schema
 */

const { Schema } = require('mongoose');

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: 'text',
  },
  description: {
    type: String,
    required: true,
  },
  
  // Company & Owner
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Categorization
  category: {
    type: String,
    index: true,
  },
  subCategory: String,
  
  // Location
  location: {
    city: {
      type: String,
      index: true,
    },
    area: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere',
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
  },
  
  // Salary
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'PKR',
    },
    period: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly',
    },
  },
  
  // Requirements
  requirements: {
    skills: [String],
    experience: {
      min: Number,
      max: Number,
    },
    education: String,
  },
  
  // Employment Details
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time',
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active',
    index: true,
  },
  
  // AI Embedding (for semantic search)
  embedding: [Number], // 384-dimensional vector
  
  // Stats
  applicationCount: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  
  // Expiry
  expiresAt: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
JobSchema.index({ title: 'text', description: 'text' });
JobSchema.index({ 'location.city': 1, status: 1 });
JobSchema.index({ category: 1, status: 1 });
JobSchema.index({ createdAt: -1 });

// Update timestamp
JobSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = { JobSchema };
```

---

## STEP 2: Create Application Schema

**File:** `backend/src/applications/schemas/application.schema.js`

```javascript
/**
 * Application MongoDB Schema
 */

const { Schema } = require('mongoose');

const ApplicationSchema = new Schema({
  // References
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    index: true,
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  
  // CV Data
  cv: {
    fileUrl: String,
    parsedData: Schema.Types.Mixed,
    aiScore: {
      total: {
        type: Number,
        min: 0,
        max: 100,
      },
      completeness: Number,
      relevance: Number,
      formatting: Number,
    },
  },
  
  // Cover Letter
  coverLetter: {
    type: String,
    maxlength: 2000,
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'viewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending',
    index: true,
  },
  
  // Timeline
  timeline: [{
    status: String,
    date: {
      type: Date,
      default: Date.now,
    },
    note: String,
  }],
  
  // Timestamps
  appliedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound indexes
ApplicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
ApplicationSchema.index({ job: 1, status: 1 });
ApplicationSchema.index({ candidate: 1, appliedAt: -1 });

// Update timestamp
ApplicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = { ApplicationSchema };
```

---

## STEP 3: Implement Jobs Service

**File:** `backend/src/jobs/jobs.service.js`

```javascript
/**
 * Jobs Service
 */

const { Injectable, NotFoundException, ForbiddenException } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');

@Injectable()
class JobsService {
  constructor(@InjectModel('Job') private jobModel) {}

  /**
   * Create job posting
   * SECURITY: Only employers can create jobs
   */
  async create(createJobDto, userId, companyId) {
    const job = await this.jobModel.create({
      ...createJobDto,
      postedBy: userId,
      company: companyId,
    });

    return job;
  }

  /**
   * Get all jobs with filters
   */
  async findAll(filters, page = 1, limit = 20) {
    const query = { status: 'active' };

    if (filters.city) {
      query['location.city'] = new RegExp(filters.city, 'i');
    }
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.employmentType) {
      query.employmentType = filters.employmentType;
    }
    if (filters.isRemote !== undefined) {
      query['location.isRemote'] = filters.isRemote === 'true';
    }
    if (filters.minSalary) {
      query['salary.min'] = { $gte: parseInt(filters.minSalary) };
    }

    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      this.jobModel
        .find(query)
        .populate('company', 'name logo location')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.jobModel.countDocuments(query),
    ]);

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get job by ID
   */
  async findById(jobId) {
    const job = await this.jobModel
      .findById(jobId)
      .populate('company', 'name logo description location')
      .populate('postedBy', 'email profile.fullName');
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Increment view count
    job.viewCount += 1;
    await job.save();

    return job;
  }

  /**
   * Update job
   * SECURITY: Only job owner can update
   */
  async update(jobId, updateData, userId) {
    const job = await this.jobModel.findById(jobId);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Check ownership
    if (job.postedBy.toString() !== userId) {
      throw new ForbiddenException('You can only update your own jobs');
    }

    Object.assign(job, updateData);
    await job.save();

    return job;
  }

  /**
   * Delete job
   */
  async delete(jobId, userId, isAdmin = false) {
    const job = await this.jobModel.findById(jobId);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Check ownership or admin
    if (!isAdmin && job.postedBy.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own jobs');
    }

    await job.deleteOne();

    return {
      message: 'Job deleted successfully',
    };
  }

  /**
   * Search jobs (text search)
   */
  async search(searchQuery, page = 1, limit = 20) {
    const query = {
      $text: { $search: searchQuery },
      status: 'active',
    };

    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      this.jobModel
        .find(query)
        .populate('company', 'name logo')
        .skip(skip)
        .limit(limit)
        .sort({ score: { $meta: 'textScore' } }),
      this.jobModel.countDocuments(query),
    ]);

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = { JobsService };
```

---

## STEP 4: Implement Applications Service

**File:** `backend/src/applications/applications.service.js`

```javascript
/**
 * Applications Service
 */

const { Injectable, NotFoundException, ConflictException, ForbiddenException } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');

@Injectable()
class ApplicationsService {
  constructor(
    @InjectModel('Application') private applicationModel,
    @InjectModel('Job') private jobModel,
  ) {}

  /**
   * Apply to job
   * SECURITY: Prevent duplicate applications
   */
  async create(createApplicationDto, userId) {
    const { jobId, cvData, coverLetter } = createApplicationDto;

    // Check if job exists
    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Check if already applied
    const existingApplication = await this.applicationModel.findOne({
      job: jobId,
      candidate: userId,
    });

    if (existingApplication) {
      throw new ConflictException('You have already applied to this job');
    }

    // Create application
    const application = await this.applicationModel.create({
      job: jobId,
      candidate: userId,
      cv: cvData,
      coverLetter,
      timeline: [{
        status: 'pending',
        date: new Date(),
        note: 'Application submitted',
      }],
    });

    // Increment application count
    job.applicationCount += 1;
    await job.save();

    return application;
  }

  /**
   * Get user's applications
   */
  async findByCandidate(userId, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      this.applicationModel
        .find({ candidate: userId })
        .populate('job', 'title company location salary status')
        .populate({
          path: 'job',
          populate: { path: 'company', select: 'name logo' },
        })
        .skip(skip)
        .limit(limit)
        .sort({ appliedAt: -1 }),
      this.applicationModel.countDocuments({ candidate: userId }),
    ]);

    return {
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get job applications (employer only)
   */
  async findByJob(jobId, userId, filters = {}) {
    // Verify job ownership
    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.postedBy.toString() !== userId) {
      throw new ForbiddenException('You can only view applications for your own jobs');
    }

    const query = { job: jobId };

    if (filters.status) {
      query.status = filters.status;
    }

    const applications = await this.applicationModel
      .find(query)
      .populate('candidate', 'email profile cv skills experience')
      .sort({ 'cv.aiScore.total': -1, appliedAt: -1 });

    return applications;
  }

  /**
   * Update application status (employer only)
   */
  async updateStatus(applicationId, newStatus, userId, note = '') {
    const application = await this.applicationModel
      .findById(applicationId)
      .populate('job');
    
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Verify job ownership
    if (application.job.postedBy.toString() !== userId) {
      throw new ForbiddenException('You can only update applications for your own jobs');
    }

    // Update status
    application.status = newStatus;
    application.timeline.push({
      status: newStatus,
      date: new Date(),
      note,
    });

    await application.save();

    return application;
  }

  /**
   * Get application by ID
   */
  async findById(applicationId, userId) {
    const application = await this.applicationModel
      .findById(applicationId)
      .populate('job')
      .populate('candidate', 'email profile cv skills experience');
    
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Check access (candidate or job owner)
    const isCandidate = application.candidate._id.toString() === userId;
    const isEmployer = application.job.postedBy.toString() === userId;

    if (!isCandidate && !isEmployer) {
      throw new ForbiddenException('Access denied');
    }

    return application;
  }
}

module.exports = { ApplicationsService };
```

---

## STEP 5: Create Job DTOs

**File:** `backend/src/jobs/dto/create-job.dto.js`

```javascript
/**
 * Create Job DTO
 */

const { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsEnum, IsNumber, Min, Max } = require('class-validator');

class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title;

  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(5000)
  description;

  @IsString()
  @IsNotEmpty()
  companyId;

  @IsOptional()
  @IsString()
  category;

  @IsOptional()
  location;

  @IsOptional()
  salary;

  @IsOptional()
  requirements;

  @IsOptional()
  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  employmentType;

  @IsOptional()
  expiresAt;
}

module.exports = { CreateJobDto };
```

---

## STEP 6: Create Application DTOs

**File:** `backend/src/applications/dto/create-application.dto.js`

```javascript
/**
 * Create Application DTO
 */

const { IsString, IsNotEmpty, IsOptional, MaxLength } = require('class-validator');

class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  jobId;

  @IsOptional()
  cvData;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  coverLetter;
}

module.exports = { CreateApplicationDto };
```

**File:** `backend/src/applications/dto/update-status.dto.js`

```javascript
/**
 * Update Application Status DTO
 */

const { IsEnum, IsOptional, IsString } = require('class-validator');

class UpdateStatusDto {
  @IsEnum(['pending', 'viewed', 'shortlisted', 'rejected', 'hired'])
  status;

  @IsOptional()
  @IsString()
  note;
}

module.exports = { UpdateStatusDto };
```

---

## STEP 7: Implement Jobs Controller

**File:** `backend/src/jobs/jobs.controller.js`

```javascript
/**
 * Jobs Controller
 */

const { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiBearerAuth } = require('@nestjs/swagger');
const { JobsService } = require('./jobs.service');
const { CreateJobDto } = require('./dto/create-job.dto');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');
const { RolesGuard } = require('../auth/guards/roles.guard');
const { Roles } = require('../common/decorators/roles.decorator');

@ApiTags('jobs')
@Controller('jobs')
class JobsController {
  constructor(private jobsService) {}

  /**
   * Create job
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer', 'admin')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create job posting' })
  async create(@Body() createJobDto, @Req() req) {
    return this.jobsService.create(createJobDto, req.user.id, createJobDto.companyId);
  }

  /**
   * Get all jobs
   */
  @Get()
  @ApiOperation({ summary: 'Get all jobs with filters' })
  async findAll(@Query() filters) {
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    
    return this.jobsService.findAll(filters, page, limit);
  }

  /**
   * Search jobs
   */
  @Get('search')
  @ApiOperation({ summary: 'Search jobs by keywords' })
  async search(@Query('q') query, @Query() filters) {
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    
    return this.jobsService.search(query, page, limit);
  }

  /**
   * Get job by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get job details' })
  async findById(@Param('id') jobId) {
    return this.jobsService.findById(jobId);
  }

  /**
   * Update job
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update job' })
  async update(@Param('id') jobId, @Body() updateData, @Req() req) {
    return this.jobsService.update(jobId, updateData, req.user.id);
  }

  /**
   * Delete job
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete job' })
  async delete(@Param('id') jobId, @Req() req) {
    const isAdmin = req.user.role === 'admin';
    return this.jobsService.delete(jobId, req.user.id, isAdmin);
  }
}

module.exports = { JobsController };
```

---

## STEP 8: Implement Applications Controller

**File:** `backend/src/applications/applications.controller.js`

```javascript
/**
 * Applications Controller
 */

const { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiBearerAuth } = require('@nestjs/swagger');
const { ApplicationsService } = require('./applications.service');
const { CreateApplicationDto } = require('./dto/create-application.dto');
const { UpdateStatusDto } = require('./dto/update-status.dto');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');

@ApiTags('applications')
@Controller('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
class ApplicationsController {
  constructor(private applicationsService) {}

  /**
   * Apply to job
   */
  @Post()
  @ApiOperation({ summary: 'Apply to job' })
  async create(@Body() createApplicationDto, @Req() req) {
    return this.applicationsService.create(createApplicationDto, req.user.id);
  }

  /**
   * Get my applications
   */
  @Get('my-applications')
  @ApiOperation({ summary: 'Get my applications' })
  async getMyApplications(@Req() req, @Query() filters) {
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    
    return this.applicationsService.findByCandidate(req.user.id, page, limit);
  }

  /**
   * Get applications for a job (employer only)
   */
  @Get('job/:jobId')
  @ApiOperation({ summary: 'Get job applications (employer only)' })
  async getJobApplications(@Param('jobId') jobId, @Req() req, @Query() filters) {
    return this.applicationsService.findByJob(jobId, req.user.id, filters);
  }

  /**
   * Update application status (employer only)
   */
  @Put(':id/status')
  @ApiOperation({ summary: 'Update application status (employer only)' })
  async updateStatus(@Param('id') applicationId, @Body() updateStatusDto, @Req() req) {
    return this.applicationsService.updateStatus(
      applicationId,
      updateStatusDto.status,
      req.user.id,
      updateStatusDto.note,
    );
  }

  /**
   * Get application by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get application details' })
  async findById(@Param('id') applicationId, @Req() req) {
    return this.applicationsService.findById(applicationId, req.user.id);
  }
}

module.exports = { ApplicationsController };
```

---

## STEP 9: Create Modules

**File:** `backend/src/jobs/jobs.module.js`

```javascript
const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { JobsController } = require('./jobs.controller');
const { JobsService } = require('./jobs.service');
const { JobSchema } = require('./schemas/job.schema');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
class JobsModule {}

module.exports = { JobsModule };
```

**File:** `backend/src/applications/applications.module.js`

```javascript
const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { ApplicationsController } = require('./applications.controller');
const { ApplicationsService } = require('./applications.service');
const { ApplicationSchema } = require('./schemas/application.schema');
const { JobSchema } = require('../jobs/schemas/job.schema');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Application', schema: ApplicationSchema },
      { name: 'Job', schema: JobSchema },
    ]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
class ApplicationsModule {}

module.exports = { ApplicationsModule };
```

---

## STEP 10: Update App Module

Add to imports:

```javascript
const { JobsModule } = require('./jobs/jobs.module');
const { ApplicationsModule } = require('./applications/applications.module');

@Module({
  imports: [
    // ... existing ...
    JobsModule,
    ApplicationsModule,
  ],
})
```

---

## STEP 11: Test Phase 4

**Test with Swagger:**

**Create Job:**
```json
POST /api/jobs
Authorization: Bearer <employer-token>
{
  "title": "Senior Node.js Developer",
  "description": "We are looking for an experienced Node.js developer...",
  "companyId": "company-id-here",
  "category": "Information Technology",
  "location": {
    "city": "Islamabad",
    "isRemote": false
  },
  "salary": {
    "min": 100000,
    "max": 150000,
    "currency": "PKR",
    "period": "monthly"
  },
  "requirements": {
    "skills": ["Node.js", "MongoDB", "React"],
    "experience": { "min": 3, "max": 5 },
    "education": "Bachelor's in Computer Science"
  },
  "employmentType": "full-time"
}
```

**Search Jobs:**
```
GET /api/jobs?city=Islamabad&category=Information Technology&page=1&limit=20
```

**Apply to Job:**
```json
POST /api/applications
Authorization: Bearer <job-seeker-token>
{
  "jobId": "job-id-here",
  "coverLetter": "I am very interested in this position...",
  "cvData": {
    "fileUrl": "https://s3.amazonaws.com/cv.pdf",
    "aiScore": {
      "total": 85,
      "completeness": 35,
      "relevance": 35,
      "formatting": 15
    }
  }
}
```

**Get My Applications:**
```
GET /api/applications/my-applications
Authorization: Bearer <job-seeker-token>
```

**Get Job Applications (Employer):**
```
GET /api/applications/job/job-id-here?status=pending
Authorization: Bearer <employer-token>
```

**Update Application Status:**
```json
PUT /api/applications/application-id/status
Authorization: Bearer <employer-token>
{
  "status": "shortlisted",
  "note": "Impressive background, scheduling interview"
}
```

---

## ✅ PHASE 4 VERIFICATION CHECKLIST

- [ ] Job schema created with all fields
- [ ] Application schema created
- [ ] Jobs module working
- [ ] Applications module working
- [ ] Job creation working (employer only)
- [ ] Job search and filtering working
- [ ] Job application working
- [ ] Duplicate application prevention working
- [ ] Application status updates working (employer only)
- [ ] Access control working (candidates see own, employers see job apps)
- [ ] Application count incrementing
- [ ] View count incrementing
- [ ] All endpoints in Swagger docs

---

## 🎯 PHASE 4 COMPLETE!

**What You've Built:**
✅ Complete job posting system  
✅ Job search with filters  
✅ Job application system  
✅ Application status tracking  
✅ Employer application management  
✅ Access control (candidates/employers)  
✅ Duplicate prevention  

**Next:** Phase 5 - AI Integration

---
---

# PHASE 5: AI INTEGRATION (GOOGLE GEMINI)

## 🎯 Objective
Integrate Google Gemini API for CV parsing, scoring, and RAG-based job recommendations directly within NestJS (No Python service required).

## 📋 What You'll Build
- AI Module (`src/ai`)
- Gemini Service (Text & Vision capabilities)
- CV Parsing (PDF to Text -> Gemini)
- RAG Service (Pinecone + Gemini Embeddings)
- Job Recommendations

---

## STEP 1: Install AI Dependencies

```bash
npm install @google/generative-ai @pinecone-database/pinecone pdf-parse langchain @langchain/community
```

---

## STEP 2: Implement Gemini Service

**File:** `backend/src/ai/ai.service.js`

```javascript
/**
 * AI Service (Google Gemini Integration)
 * Handles all AI interactions: Parsing, Scoring, Chat
 */

const { Injectable, HttpException } = require('@nestjs/common');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/app.config');

@Injectable()
class AiService {
  constructor() {
    // Initialize Gemini
    this.genAI = new GoogleGenerativeAI(config.aiService.apiKey); // Ensure this maps to GEMINI_API_KEY
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.visionModel = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
  }

  /**
   * Helper: Clean JSON response from AI
   */
  cleanJson(text) {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
  }

  /**
   * Parse CV text into structured JSON
   */
  async parseCV(cvText) {
    try {
      const prompt = `
        You are an expert HR Data Parser. 
        Extract the following information from the CV text below and return strictly JSON format.
        Schema: {
          "fullName": string,
          "email": string,
          "phone": string,
          "skills": string[],
          "experience": [{ "title": string, "company": string, "years": number, "description": string }],
          "education": [{ "degree": string, "institution": string, "year": string }]
        }
        
        CV Text:
        ${cvText.substring(0, 30000)}
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return JSON.parse(this.cleanJson(text));
    } catch (error) {
      console.error('Gemini Parse Error:', error);
      throw new HttpException('Failed to parse CV', 500);
    }
  }

  /**
   * Score CV against Job Description
   */
  async scoreCV(cvData, jobDescription) {
    try {
      const prompt = `
        Act as a strict HR Recruiter. Evaluate the Candidate for the Job.
        
        Job Description:
        ${jobDescription}
        
        Candidate Skills: ${cvData.skills?.join(', ')}
        Candidate Experience: ${JSON.stringify(cvData.experience)}
        
        Output strictly JSON:
        {
          "score": number (0-100),
          "matchReasons": string[],
          "missingSkills": string[],
          "hiringRecommendation": "Strong Hire" | "Hire" | "Maybe" | "Reject"
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return JSON.parse(this.cleanJson(response.text()));
    } catch (error) {
      console.error('Gemini Score Error:', error);
      return { score: 0, error: 'Scoring failed' };
    }
  }

  /**
   * RAG Chatbot
   */
  async chat(message, context = '') {
    try {
      // For now, simpler direct chat. Enhance with RAG history later.
      const chat = this.model.startChat({
        history: [], // Can implement history later
      });

      const prompt = `
        Context: ${context}
        User: ${message}
        AI (Helpful HR Assistant):
      `;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini Chat Error:', error);
      throw new HttpException('Chat service unavailable', 503);
    }
  }
}

module.exports = { AiService };
```

---

## STEP 3: Implement AI Controller

**File:** `backend/src/ai/ai.controller.js`

```javascript
/**
 * AI Controller
 */

const { Controller, Post, Body, UseGuards, Req } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiBearerAuth } = require('@nestjs/swagger');
const { Throttle } = require('@nestjs/throttler');
const { AiService } = require('./ai.service');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Throttle({ default: { limit: 20, ttl: 3600000 } }) // Cost control
class AiController {
  constructor(private aiService) {}

  @Post('parse-cv')
  @ApiOperation({ summary: 'Parse CV Text (Gemini)' })
  async parseCV(@Body('text') text) {
    return this.aiService.parseCV(text);
  }

  @Post('score')
  @ApiOperation({ summary: 'Score CV (Gemini)' })
  async scoreCV(@Body() data) {
    return this.aiService.scoreCV(data.cvData, data.jobDescription);
  }

  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI' })
  async chat(@Body('message') message) {
    return this.aiService.chat(message);
  }
}

module.exports = { AiController };
```

---

## STEP 4: Create AI Module

**File:** `backend/src/ai/ai.module.js`

```javascript
const { Module } = require('@nestjs/common');
const { AiController } = require('./ai.controller');
const { AiService } = require('./ai.service');

@Module({
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
class AiModule {}

module.exports = { AiModule };
```

@Module({
  controllers: [AIClientController],
  providers: [AIClientService],
  exports: [AIClientService],
})
class AIClientModule {}

module.exports = { AIClientModule };
```

---

## STEP 4: Update App Module

Add AIClientModule:

```javascript
const { AIClientModule } = require('./ai-client/ai-client.module');

@Module({
  imports: [
    // ... existing ...
    AIClientModule,
  ],
})
```

---

## STEP 5: Test AI Integration

**Test with Swagger:**

**Parse CV:**
```json
POST /api/ai/parse-cv
Authorization: Bearer <token>
{
  "cvText": "John Doe\nEmail: john@example.com\nExperience: 5 years in Node.js development..."
}
```

**Score CV:**
```json
POST /api/ai/score-cv
Authorization: Bearer <token>
{
  "cvData": {
    "skills": ["Node.js", "MongoDB", "React"],
    "experience": [...]
  },
  "jobDescription": "Looking for a senior Node.js developer with 5+ years experience..."
}
```

**Get Recommendations:**
```json
POST /api/ai/recommend-jobs
Authorization: Bearer <token>
{
  "limit": 10
}
```

**Semantic Search:**
```json
POST /api/ai/search
Authorization: Bearer <token>
{
  "query": "remote software engineer jobs in Islamabad",
  "filters": {
    "city": "Islamabad"
  },
  "limit": 20
}
```

**Chat:**
```json
POST /api/ai/chat
Authorization: Bearer <token>
{
  "message": "Find me Node.js jobs in Lahore with salary above 100k",
  "sessionId": "user_123_session"
}
```




---

## ✅ PHASE 5 VERIFICATION CHECKLIST

- [ ] AI client service created
- [ ] AI client module created
- [ ] CV parsing endpoint working
- [ ] CV scoring endpoint working
- [ ] Job recommendations working
- [ ] Semantic search working
- [ ] Chatbot endpoint working
- [ ] Rate limiting on AI endpoints (20 per hour)
- [ ] Error handling for AI service failures
- [ ] All endpoints in Swagger docs

---

## 🎯 PHASE 5 COMPLETE!

**What You've Built:**
✅ Complete AI service integration  
✅ CV parsing with AI  
✅ CV scoring system  
✅ Job recommendations  
✅ Semantic search  
✅ AI chatbot  
✅ Rate limiting for AI endpoints  

**Next:** Phase 6 - Uploads & Notifications

---
---

# PHASE 6: UPLOADS & NOTIFICATIONS

## 🎯 Objective
Implement file upload system (AWS S3) and notification system (Email & WhatsApp).

## 📋 What You'll Build
- File upload to AWS S3
- CV file upload and parsing
- Email notifications (SendGrid)
- WhatsApp notifications (Twilio)
- Notification templates
- Notification preferences

---

## STEP 1: Implement Uploads Service

**File:** `backend/src/uploads/uploads.service.js`

```javascript
/**
 * Uploads Service
 * Handles file uploads to AWS S3
 * SECURITY: Validate file types and sizes
 */

const { Injectable, BadRequestException } = require('@nestjs/common');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../config/app.config');
const { v4: uuidv4 } = require('uuid');

@Injectable()
class UploadsService {
  constructor() {
    this.s3Client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
    this.bucket = config.aws.s3Bucket;
  }

  /**
   * Upload file to S3
   * SECURITY: Validate file type and size
   */
  async uploadFile(file, folder = 'uploads') {
    // Validate file
    this.validateFile(file);

    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `/.`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);

      const fileUrl = `https://.s3..amazonaws.com/`;

      return {
        url: fileUrl,
        key: fileName,
        size: file.size,
        mimetype: file.mimetype,
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new BadRequestException('Failed to upload file');
    }
  }

  /**
   * Upload CV
   */
  async uploadCV(file, userId) {
    // Validate CV file
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only PDF and Word documents are allowed for CVs');
    }

    return this.uploadFile(file, `cvs/`);
  }

  /**
   * Upload company logo
   */
  async uploadLogo(file, companyId) {
    // Validate image file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG, PNG, and WebP images are allowed');
    }

    return this.uploadFile(file, `logos/`);
  }

  /**
   * Delete file from S3
   */
  async deleteFile(fileKey) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });

      await this.s3Client.send(command);

      return {
        message: 'File deleted successfully',
      };
    } catch (error) {
      console.error('S3 Delete Error:', error);
      throw new BadRequestException('Failed to delete file');
    }
  }

  /**
   * Validate file
   * SECURITY: Check file size and type
   */
  validateFile(file) {
    // Max file size: 10MB
    const maxSize = 10 * 1024 * 1024;
    
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    // Check if file has content
    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File is empty');
    }
  }
}

module.exports = { UploadsService };
```

---

## STEP 2: Implement Notifications Service

**File:** `backend/src/notifications/notifications.service.js`

```javascript
/**
 * Notifications Service
 * Handles email (Nodemailer) and WhatsApp (Twilio) notifications
 */

const { Injectable } = require('@nestjs/common');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const config = require('../config/app.config');

@Injectable()
class NotificationsService {
  constructor() {
    // Nodemailer (Gmail)
    if (config.nodemailer.email && config.nodemailer.password) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.nodemailer.email,
          pass: config.nodemailer.password,
        },
      });
    }
    
    // Twilio (WhatsApp Only)
    if (config.twilio.accountSid && config.twilio.authToken) {
      this.twilioClient = twilio(
        config.twilio.accountSid,
        config.twilio.authToken,
      );
      // Ensure whatsapp: prefix is handled in config or here
      this.twilioWhatsappNumber = config.twilio.whatsappNumber; 
    }
  }

  /**
   * Send email using Nodemailer
   */
  async sendEmail(to, subject, html, text = '') {
    if (!this.transporter) {
      console.warn('Nodemailer not configured, skipping email');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const msg = {
        to,
        from: `"${config.nodemailer.fromName}" <${config.nodemailer.fromEmail}>`,
        subject,
        text: text || subject,
        html,
      };

      await this.transporter.sendMail(msg);

      console.log(`✉️ Email sent to `);
      
      return {
        success: true,
        message: 'Email sent successfully',
      };
    } catch (error) {
      console.error('Nodemailer Error:', error);
      return {
        success: false,
        message: 'Failed to send email',
      };
    }
  }

  // ... (Keep existing template methods sendOTPEmail, sendApplicationConfirmation, sendApplicationStatusUpdate as they call sendEmail)

  /**
   * Send OTP email
   */
  async sendOTPEmail(email, otp, userName = 'User') {
    const subject = 'Verify Your Email - LocalHR';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Email Verification</h2>
        <p>Hello ,</p>
        <p>Your OTP code is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">LocalHR - AI-Powered Job Portal</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  /**
   * Send application confirmation email
   */
  async sendApplicationConfirmation(email, jobTitle, companyName) {
    const subject = `Application Submitted - `;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Application Submitted Successfully</h2>
        <p>Your application for <strong></strong> at <strong></strong> has been submitted.</p>
        <p>We'll notify you when the employer reviews your application.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">LocalHR - AI-Powered Job Portal</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  /**
   * Send application status update email
   */
  async sendApplicationStatusUpdate(email, jobTitle, status) {
    const subject = ` - `;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;"></h2>
        <p>Your application for <strong></strong> has been updated.</p>
        <p>Status: <strong></strong></p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">LocalHR - AI-Powered Job Portal</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  /**
   * Send WhatsApp Message (No SMS)
   */
  async sendWhatsApp(to, message) {
    if (!this.twilioClient) {
      console.warn('Twilio not configured, skipping WhatsApp');
      return { success: false, message: 'WhatsApp service not configured' };
    }

    try {
      // Ensure 'to' number has whatsapp: prefix if not present
      const toNum = to.startsWith('whatsapp:') ? to : `whatsapp:`;
      const fromNum = this.twilioWhatsappNumber.startsWith('whatsapp:') 
        ? this.twilioWhatsappNumber 
        : `whatsapp:`;

      await this.twilioClient.messages.create({
        body: message,
        from: fromNum,
        to: toNum,
      });

      console.log(`📱 WhatsApp sent to `);
      
      return {
        success: true,
        message: 'WhatsApp sent successfully',
      };
    } catch (error) {
      console.error('Twilio WhatsApp Error:', error);
      return {
        success: false,
        message: 'Failed to send WhatsApp',
      };
    }
  }

  /**
   * Send OTP via WhatsApp
   */
  async sendOTPSMS(phone, otp) {
    // Keeping method name sendOTPSMS for compatibility, but sending WhatsApp
    const message = `Your LocalHR verification code is: . Valid for 10 minutes.`;
    return this.sendWhatsApp(phone, message);
  }
}

module.exports = { NotificationsService };
```

---

## STEP 3: Implement Uploads Controller

**File:** `backend/src/uploads/uploads.controller.js`

```javascript
/**
 * Uploads Controller
 */

const { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req, Delete, Body } = require('@nestjs/common');
const { FileInterceptor } = require('@nestjs/platform-express');
const { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } = require('@nestjs/swagger');
const { UploadsService } = require('./uploads.service');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');

@ApiTags('uploads')
@Controller('uploads')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
class UploadsController {
  constructor(private uploadsService) {}

  /**
   * Upload CV
   */
  @Post('cv')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload CV' })
  async uploadCV(@UploadedFile() file, @Req() req) {
    return this.uploadsService.uploadCV(file, req.user.id);
  }

  /**
   * Upload company logo
   */
  @Post('logo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload company logo' })
  async uploadLogo(@UploadedFile() file, @Body('companyId') companyId) {
    return this.uploadsService.uploadLogo(file, companyId);
  }

  /**
   * Upload general file
   */
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file' })
  async uploadFile(@UploadedFile() file) {
    return this.uploadsService.uploadFile(file);
  }

  /**
   * Delete file
   */
  @Delete()
  @ApiOperation({ summary: 'Delete file from S3' })
  async deleteFile(@Body('fileKey') fileKey) {
    return this.uploadsService.deleteFile(fileKey);
  }
}

module.exports = { UploadsController };
```

---

## STEP 4: Create Modules

**File:** `backend/src/uploads/uploads.module.js`

```javascript
/**
 * Uploads Module
 */

const { Module } = require('@nestjs/common');
const { UploadsController } = require('./uploads.controller');
const { UploadsService } = require('./uploads.service');

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
class UploadsModule {}

module.exports = { UploadsModule };
```

**File:** `backend/src/notifications/notifications.module.js`

```javascript
/**
 * Notifications Module
 */

const { Module } = require('@nestjs/common');
const { NotificationsService } = require('./notifications.service');

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
})
class NotificationsModule {}

module.exports = { NotificationsModule };
```

---

## STEP 5: Update App Module

**File:** `backend/src/app.module.js`

Add to imports:

```javascript
const { UploadsModule } = require('./uploads/uploads.module');
const { NotificationsModule } = require('./notifications/notifications.module');

@Module({
  imports: [
    // ... existing imports ...
    
    // Feature modules
    AuthModule,
    UsersModule,
    CompaniesModule,
    JobsModule,
    ApplicationsModule,
    AIClientModule,
    UploadsModule,        // ADD THIS
    NotificationsModule,  // ADD THIS
  ],
  // ...
})
```

---

## STEP 6: Install Dependencies

```bash
npm install @aws-sdk/client-s3 @sendgrid/mail twilio @nestjs/platform-express uuid
```

---

## STEP 7: Test Phase 6

**Test with Swagger or Postman:**

**Upload CV:**
`
POST /api/uploads/cv
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [Select PDF or Word file]
`

**Upload Logo:**
`
POST /api/uploads/logo
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [Select image file]
companyId: company-id-here
`

**Delete File:**
`json
DELETE /api/uploads
Authorization: Bearer <token>
{
  "fileKey": "cvs/user-id/filename.pdf"
}
`

**Test Notifications (in code):**
`javascript
// In auth.service.js, after OTP generation:
await this.notificationsService.sendOTPEmail(user.email, otp, user.profile.fullName);

// In applications.service.js, after creating application:
await this.notificationsService.sendApplicationConfirmation(
  candidate.email,
  job.title,
  job.company.name
);

// In applications.service.js, after status update:
await this.notificationsService.sendApplicationStatusUpdate(
  candidate.email,
  job.title,
  newStatus
);
`

---

## ✅ PHASE 6 VERIFICATION CHECKLIST

- [ ] AWS S3 credentials configured in .env
- [ ] File upload service created
- [ ] CV upload endpoint working
- [ ] Logo upload endpoint working
- [ ] File validation working (type & size)
- [ ] File deletion working
- [ ] SendGrid API key configured
- [ ] Email service created
- [ ] OTP email template working
- [ ] Application confirmation email working
- [ ] Status update email working
- [ ] Twilio credentials configured (optional)
- [ ] WhatsApp service working
- [ ] All endpoints in Swagger docs

---

## 🎯 PHASE 6 COMPLETE!

**What You've Built:**
✅ AWS S3 file upload system  
✅ CV upload with validation  
✅ Company logo upload  
✅ File deletion  
✅ Email notifications (SendGrid)  
✅ SMS notifications (Twilio)  
✅ Email templates (OTP, applications, status updates)  
✅ File type and size validation  

**Next:** Phase 7 - Admin & Testing

---
---

# PHASE 7: ADMIN & FINAL TESTING

## 🎯 Objective
Implement admin dashboard and perform comprehensive testing.

## 📋 What You'll Build
- Admin statistics dashboard
- User management (admin)
- Company verification (admin)
- Job moderation (admin)
- System health checks
- Comprehensive testing

---

## STEP 1: Implement Admin Service

**File:** `backend/src/admin/admin.service.js`

```javascript
/**
 * Admin Service
 * Admin-only operations
 */

const { Injectable } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');

@Injectable()
class AdminService {
  constructor(
    @InjectModel('User') private userModel,
    @InjectModel('Company') private companyModel,
    @InjectModel('Job') private jobModel,
    @InjectModel('Application') private applicationModel,
  ) {}

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    const [
      totalUsers,
      totalCompanies,
      totalJobs,
      totalApplications,
      activeJobs,
      verifiedCompanies,
      jobSeekers,
      employers,
    ] = await Promise.all([
      this.userModel.countDocuments(),
      this.companyModel.countDocuments(),
      this.jobModel.countDocuments(),
      this.applicationModel.countDocuments(),
      this.jobModel.countDocuments({ status: 'active' }),
      this.companyModel.countDocuments({ isVerified: true }),
      this.userModel.countDocuments({ role: 'job_seeker' }),
      this.userModel.countDocuments({ role: 'employer' }),
    ]);

    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await this.userModel.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    const recentJobs = await this.jobModel.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    return {
      users: {
        total: totalUsers,
        jobSeekers,
        employers,
        recent: recentUsers,
      },
      companies: {
        total: totalCompanies,
        verified: verifiedCompanies,
        unverified: totalCompanies - verifiedCompanies,
      },
      jobs: {
        total: totalJobs,
        active: activeJobs,
        recent: recentJobs,
      },
      applications: {
        total: totalApplications,
      },
    };
  }

  /**
   * Get all users (paginated)
   */
  async getAllUsers(page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel
        .find()
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.userModel.countDocuments(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get pending company verifications
   */
  async getPendingVerifications() {
    return this.companyModel
      .find({ isVerified: false })
      .populate('owner', 'email profile.fullName')
      .sort({ createdAt: -1 });
  }

  /**
   * Ban/Unban user
   */
  async toggleUserBan(userId, isBanned) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isBanned = isBanned;
    await user.save();

    return {
      message: isBanned ? 'User banned successfully' : 'User unbanned successfully',
      user: {
        id: user._id,
        email: user.email,
        isBanned: user.isBanned,
      },
    };
  }

  /**
   * Delete job (admin)
   */
  async deleteJob(jobId) {
    const job = await this.jobModel.findById(jobId);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    await job.deleteOne();

    return {
      message: 'Job deleted successfully',
    };
  }

  /**
   * System health check
   */
  async healthCheck() {
    try {
      // Check database connection
      await this.userModel.findOne().limit(1);

      return {
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

module.exports = { AdminService };
```

---

## STEP 2: Implement Admin Controller

**File:** `backend/src/admin/admin.controller.js`

```javascript
/**
 * Admin Controller
 * SECURITY: Admin-only endpoints
 */

const { Controller, Get, Put, Delete, Query, Param, Body, UseGuards } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiBearerAuth } = require('@nestjs/swagger');
const { AdminService } = require('./admin.service');
const { JwtAuthGuard } = require('../auth/guards/jwt-auth.guard');
const { RolesGuard } = require('../auth/guards/roles.guard');
const { Roles } = require('../common/decorators/roles.decorator');

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('JWT-auth')
class AdminController {
  constructor(private adminService) {}

  /**
   * Get dashboard statistics
   */
  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics (admin only)' })
  async getStats() {
    return this.adminService.getDashboardStats();
  }

  /**
   * Get all users
   */
  @Get('users')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  async getAllUsers(@Query() query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 50;
    
    return this.adminService.getAllUsers(page, limit);
  }

  /**
   * Get pending verifications
   */
  @Get('pending-verifications')
  @ApiOperation({ summary: 'Get pending company verifications (admin only)' })
  async getPendingVerifications() {
    return this.adminService.getPendingVerifications();
  }

  /**
   * Ban/Unban user
   */
  @Put('users/:id/ban')
  @ApiOperation({ summary: 'Ban or unban user (admin only)' })
  async toggleUserBan(@Param('id') userId, @Body('isBanned') isBanned) {
    return this.adminService.toggleUserBan(userId, isBanned);
  }

  /**
   * Delete job
   */
  @Delete('jobs/:id')
  @ApiOperation({ summary: 'Delete job (admin only)' })
  async deleteJob(@Param('id') jobId) {
    return this.adminService.deleteJob(jobId);
  }

  /**
   * Health check
   */
  @Get('health')
  @ApiOperation({ summary: 'System health check' })
  async healthCheck() {
    return this.adminService.healthCheck();
  }
}

module.exports = { AdminController };
```

---

## STEP 3: Create Admin Module

**File:** `backend/src/admin/admin.module.js`

```javascript
/**
 * Admin Module
 */

const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { AdminController } = require('./admin.controller');
const { AdminService } = require('./admin.service');
const { UserSchema } = require('../users/schemas/user.schema');
const { CompanySchema } = require('../companies/schemas/company.schema');
const { JobSchema } = require('../jobs/schemas/job.schema');
const { ApplicationSchema } = require('../applications/schemas/application.schema');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Company', schema: CompanySchema },
      { name: 'Job', schema: JobSchema },
      { name: 'Application', schema: ApplicationSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
class AdminModule {}

module.exports = { AdminModule };
```

---

## STEP 4: Update App Module

**File:** `backend/src/app.module.js`

Add AdminModule:

```javascript
const { AdminModule } = require('./admin/admin.module');

@Module({
  imports: [
    // ... all existing modules ...
    AdminModule,  // ADD THIS
  ],
})
```

---

## STEP 5: Add isBanned Field to User Schema

**File:** `backend/src/users/schemas/user.schema.js`

Add this field:

```javascript
isBanned: {
  type: Boolean,
  default: false,
},
```

---

## STEP 6: Comprehensive Testing Checklist

### **🔐 Authentication Tests**
- [ ] Register new user (job_seeker)
- [ ] Register new user (employer)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Verify OTP
- [ ] Refresh access token
- [ ] Access protected route without token (should fail)
- [ ] Access admin route as non-admin (should fail)

### **👤 User Profile Tests**
- [ ] Get current user profile
- [ ] Update user profile (name, phone, location)
- [ ] Add skills to profile
- [ ] Add experience to profile
- [ ] Upload CV file
- [ ] Delete user account

### **🏢 Company Tests**
- [ ] Create company (employer only)
- [ ] Update company details
- [ ] Upload company logo
- [ ] Verify company (admin only)
- [ ] Search companies by city
- [ ] Search companies by industry
- [ ] Delete company

### **💼 Job Tests**
- [ ] Create job posting (employer only)
- [ ] Get all active jobs
- [ ] Search jobs by city
- [ ] Search jobs by category
- [ ] Search jobs by salary range
- [ ] Filter remote jobs
- [ ] Get job details (view count increments)
- [ ] Update job posting
- [ ] Delete job posting

### **📝 Application Tests**
- [ ] Apply to job with CV
- [ ] Prevent duplicate application (should fail)
- [ ] Get my applications
- [ ] Get job applications (employer only)
- [ ] Update application status to 'viewed'
- [ ] Update application status to 'shortlisted'
- [ ] Update application status to 'rejected'
- [ ] Update application status to 'hired'
- [ ] Non-owner cannot see applications (should fail)

### **🤖 AI Integration Tests**
- [ ] Parse CV text
- [ ] Score CV against job description
- [ ] Get personalized job recommendations
- [ ] Semantic job search
- [ ] Chat with AI assistant
- [ ] Generate job description
- [ ] Rate limiting on AI endpoints (20 per hour)

### **📤 Upload Tests**
- [ ] Upload PDF CV
- [ ] Upload Word CV
- [ ] Upload company logo (JPEG)
- [ ] Upload company logo (PNG)
- [ ] Reject invalid file type (should fail)
- [ ] Reject file over 10MB (should fail)
- [ ] Delete uploaded file

### **📧 Notification Tests**
- [ ] Send OTP email on registration
- [ ] Send application confirmation email
- [ ] Send status update email (shortlisted)
- [ ] Send status update email (hired)
- [ ] Send OTP via WhatsApp

### **👨‍💼 Admin Tests**
- [ ] Get dashboard statistics
- [ ] Get all users (paginated)
- [ ] Get pending company verifications
- [ ] Verify company
- [ ] Ban user
- [ ] Unban user
- [ ] Delete job (admin)
- [ ] System health check

### **🔒 Security Tests**
- [ ] Rate limiting on auth endpoints (5 per 15 min)
- [ ] Rate limiting on AI endpoints (20 per hour)
- [ ] Role-based access control (admin routes)
- [ ] Role-based access control (employer routes)
- [ ] Input validation (invalid email format)
- [ ] Input validation (weak password)
- [ ] Input validation (missing required fields)
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection

### **📊 Performance Tests**
- [ ] Load 1000 jobs (pagination working)
- [ ] Search with multiple filters
- [ ] Concurrent user registrations
- [ ] Database connection pooling
- [ ] Response time < 500ms for most endpoints

---

## STEP 7: Test with Swagger

**Access Swagger UI:**
`
http://localhost:3000/api/docs
`

**Test Admin Endpoints:**

**Get Stats:**
`
GET /api/admin/stats
Authorization: Bearer <admin-token>
`

**Get All Users:**
`
GET /api/admin/users?page=1&limit=50
Authorization: Bearer <admin-token>
`

**Ban User:**
`json
PUT /api/admin/users/user-id/ban
Authorization: Bearer <admin-token>
{
  "isBanned": true
}
`

**Health Check:**
`
GET /api/admin/health
Authorization: Bearer <admin-token>
`

---

## ✅ PHASE 7 VERIFICATION CHECKLIST

- [ ] Admin module created
- [ ] Admin service implemented
- [ ] Admin controller implemented
- [ ] Dashboard statistics working
- [ ] User management working
- [ ] Company verification working
- [ ] User ban/unban working
- [ ] Job deletion (admin) working
- [ ] Health check endpoint working
- [ ] All admin routes protected (admin only)
- [ ] All authentication tests passing
- [ ] All user profile tests passing
- [ ] All company tests passing
- [ ] All job tests passing
- [ ] All application tests passing
- [ ] All AI tests passing
- [ ] All upload tests passing
- [ ] All notification tests passing
- [ ] All admin tests passing
- [ ] All security tests passing
- [ ] Performance tests passing
- [ ] API documentation complete

---

## 🎯 PHASE 7 COMPLETE!

**What You've Built:**
✅ Admin dashboard with statistics  
✅ User management system  
✅ Company verification system  
✅ Job moderation  
✅ User ban/unban functionality  
✅ System health monitoring  
✅ Comprehensive testing completed  

---
---

# 🎉 ALL 7 PHASES COMPLETE!

## **Your Complete LocalHR Backend is Ready!**

### ✅ **Phase 1: Core Infrastructure**
- Environment configuration with validation
- MongoDB Atlas connection
- Pinecone vector database setup
- Security middleware (Helmet, CORS)
- Swagger API documentation
- Rate limiting (3 tiers)
- Global error handling
- Logging system

### ✅ **Phase 2: Authentication**
- User registration with validation
- Login with JWT tokens
- Password hashing (bcrypt 12 rounds)
- OTP generation and verification
- Token refresh mechanism
- Role-based access control
- Auth guards (JWT, Roles)

### ✅ **Phase 3: Users & Companies**
- User profile management
- CV upload and management
- Skills and experience tracking
- Company profile creation
- Company verification system
- Search and filtering

### ✅ **Phase 4: Jobs & Applications**
- Job posting system
- Job search with filters
- Job application system
- Application status tracking
- Employer application management
- Duplicate prevention
- Access control

### ✅ **Phase 5: AI Integration**
- AI client service
- CV parsing with AI
- CV scoring system
- Job recommendations
- Semantic search
- AI chatbot
- Rate limiting (20 req/hour)

### ✅ **Phase 6: Uploads & Notifications**
- AWS S3 file uploads
- CV upload with validation
- Company logo upload
- Email notifications (SendGrid)
- WhatsApp notifications (Twilio)
- Professional email templates

### ✅ **Phase 7: Admin & Testing**
- Admin dashboard with statistics
- User management
- Company verification
- Job moderation
- User ban/unban
- System health monitoring
- Comprehensive testing

---

## 📊 **Final Statistics:**

- **Total Modules:** 14
- **Total Endpoints:** 50+
- **Total Schemas:** 4 (User, Company, Job, Application)
- **Security Features:** 10+
- **AI Features:** 6
- **File Upload Types:** 3 (CV, Logo, General)
- **Notification Types:** 4 (Email, WhatsApp)
- **Admin Features:** 6

---

## 🚀 **Deployment Checklist:**

### **1. Environment Setup**
- [ ] Create production .env file
- [ ] Set strong JWT secrets (min 32 chars)
- [ ] Configure MongoDB Atlas production cluster
- [ ] Set up Pinecone production index
- [ ] Configure AWS S3 bucket
- [ ] Set up SendGrid account
- [ ] Set up Twilio account (optional)
- [ ] Set production CORS origins

### **2. Security Hardening**
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Configure rate limiting
- [ ] Enable CSRF protection
- [ ] Set up Sentry for error tracking
- [ ] Configure security headers
- [ ] Enable database encryption
- [ ] Set up firewall rules

### **3. Performance Optimization**
- [ ] Enable Redis caching
- [ ] Configure CDN for static files
- [ ] Set up database indexes
- [ ] Enable gzip compression
- [ ] Configure connection pooling
- [ ] Set up load balancing

### **4. Monitoring & Logging**
- [ ] Set up application monitoring
- [ ] Configure log aggregation
- [ ] Set up uptime monitoring
- [ ] Configure alerts
- [ ] Set up performance monitoring

### **5. Deployment**
- [ ] Build production bundle
- [ ] Run database migrations
- [ ] Deploy to production server
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up SSL certificates
- [ ] Configure auto-scaling
- [ ] Set up backup strategy

---

## 📚 **Next Steps:**

1. **Deploy Python AI Service:**
   - Train custom ML models
   - Deploy to separate server
   - Configure API endpoints
   - Test AI integration

2. **Build Frontend Applications:**
   - Next.js web application
   - React Native mobile apps (iOS & Android)
   - Connect to backend APIs
   - Implement UI/UX designs

3. **Testing & QA:**
   - End-to-end testing
   - Load testing
   - Security audit
   - User acceptance testing

4. **Launch:**
   - Beta testing with real users
   - Collect feedback
   - Fix bugs and issues
   - Production launch

---

## 🎊 **Congratulations!**

**Your LocalHR backend is production-ready!**

All 7 phases are complete with:
- ✅ Secure authentication
- ✅ Complete job portal functionality
- ✅ AI-powered features
- ✅ File uploads
- ✅ Notifications
- ✅ Admin dashboard
- ✅ Comprehensive testing

**Start building with:**
`ash
npm run start:dev
`

**Access API Documentation:**
`
http://localhost:3000/api/docs
`

**Good luck with your LocalHR.pk project! 🚀**

---
