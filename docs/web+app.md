# Complete Development Plan: Job Portal Website + Mobile App

## Project: JobPortal.pk - AI-Powered HR-Friendly Platform

---

## PHASE 1: WEBSITE DEVELOPMENT

### 1.1 PUBLIC PAGES (No Authentication Required)

#### Page 1: Landing Page (`/`)
**Purpose:** First impression, job search, feature showcase

**Sections:**
- Header with navigation (Find Jobs, Post Jobs, Companies, Salary Insights, Reviews)
- Hero section with 3-field search bar (Job Title, Location, Category)
- Trust indicators (company logos)
- Featured jobs grid (6 cards)
- Features showcase (AI CV Screening, Job Alerts, Salary Insights, Reviews)
- How it works (3 steps)
- Statistics section (jobs, companies, seekers)
- Footer with links

**Features:**
- Guest job search (no login required)
- Auto-location detection
- Popular search suggestions
- Responsive design

---

#### Page 2: Job Search Results (`/jobs`)
**Purpose:** Browse and filter jobs

**Layout:**
- Left sidebar (30%): Filters panel
  - Location (city dropdown + "Near Me" toggle)
  - Salary range (dual slider: 15k-200k PKR)
  - Experience level (checkboxes)
  - Job type (Full-time, Part-time, Contract, Internship)
  - Posted date (24h, 7d, 30d, Any)
  - Company type (Verified, Startup, MNC, SME)
  - "Apply Filters" button
- Main content (70%): Job listings
  - Search bar with current query
  - Results count + sort dropdown
  - Job cards (vertical stack)
  - Pagination

**Features:**
- Real-time filtering
- Map view toggle (shows jobs on interactive map)
- Save jobs (requires login)
- Distance calculation from user location
- Infinite scroll option

---

#### Page 3: Job Details (`/jobs/[id]`)
**Purpose:** View complete job information

**Sections:**
- Company banner image
- Company logo (overlapping banner)
- Job title, company name, verification badge
- Meta info (location, salary, job type, experience, posted date)
- "Apply Now" button (sticky)
- Tabs: Description | Requirements | Company | Reviews
- Right sidebar:
  - "Quick Apply" card with match score
  - Similar jobs (3 cards)
  - Company info card

**Features:**
- AI match score (if logged in)
- Social sharing
- Report job option
- Company follow button

---

#### Page 4: Companies Directory (`/companies`)
**Purpose:** Browse registered companies

**Features:**
- Company cards grid
- Search by name/industry
- Filter by: Industry, Size, Location, Verified status
- Company ratings (from reviews)
- Pagination

---

#### Page 5: Salary Insights (`/salary`)
**Purpose:** Salary data and calculator

**Sections:**
- Salary calculator form:
  - Job title (autocomplete)
  - City (dropdown)
  - Years of experience (slider)
  - Skills (multi-select)
  - "Calculate" button
- Results display:
  - Salary range (25th, 50th, 75th percentile)
  - Chart visualization
  - Sample size
- Trending salaries section
- Salary by city comparison
- Salary by industry comparison

**Features:**
- Anonymous salary submission form
- Export report (PDF)
- Share results

---

#### Page 6: Company Reviews (`/reviews`)
**Purpose:** Browse company reviews

**Features:**
- Search companies
- Filter by: Rating, Industry, City
- Review cards showing:
  - Company name + logo
  - Overall rating (1-5 stars)
  - Rating breakdown (Culture, Management, Salary, Work-Life)
  - Pros/cons
  - Interview experience
  - Helpful votes
- Pagination

---

### 1.2 AUTHENTICATION PAGES

#### Page 7: Sign Up (`/signup`)
**Two separate flows:**

**Job Seeker Sign Up:**
- Full name
- Email
- Mobile number
- Password
- City
- OTP verification (SMS/WhatsApp)
- Redirect to onboarding wizard

**Employer Sign Up:**
- Company name
- Official email
- Contact person name
- Password
- NTN/Registration number
- Email verification link
- Redirect to company profile setup

---

#### Page 8: Login (`/login`)
**Features:**
- Email/password form
- "Remember me" checkbox
- Forgot password link
- Social login (Google, LinkedIn - optional)
- Redirect to appropriate dashboard

---

#### Page 9: Forgot Password (`/forgot-password`)
**Flow:**
- Enter email
- Receive reset link
- Reset password page
- Confirmation

---

### 1.3 JOB SEEKER PAGES (Authentication Required)

#### Page 10: Onboarding Wizard (`/onboarding`)
**5-step wizard:**

**Step 1: Basic Info**
- Profile photo upload
- Headline (50 chars)
- Bio (500 chars)
- Current location

**Step 2: CV Upload**
- Drag-and-drop PDF/DOC upload
- AI parsing in progress indicator
- Parsed data preview

**Step 3: Work Experience**
- Add/edit experience entries
- Title, Company, Dates, Description
- "Currently working here" checkbox
- Add multiple entries

**Step 4: Education**
- Add/edit education entries
- Degree, Institution, Year, Grade
- Add multiple entries

**Step 5: Skills & Preferences**
- Skills (tag input with autocomplete)
- Certifications
- Languages
- Job preferences:
  - Desired job types
  - Expected salary range
  - Preferred locations
  - Availability

---

#### Page 11: Job Seeker Dashboard (`/dashboard`)
**Sections:**
- Overview cards:
  - Profile completion percentage
  - Applications (total, pending, shortlisted)
  - Profile views (this week)
  - Saved jobs count
- "For You" jobs feed (AI-recommended)
- Recent applications table
- Quick actions (Complete profile, Update CV)

---

#### Page 12: My Applications (`/applications`)
**Features:**
- Filter by status (All, Pending, Shortlisted, Interview, Rejected, Hired)
- Application cards showing:
  - Job title + company
  - Applied date
  - Status badge
  - Match score
  - Actions (View job, Withdraw)
- Timeline view for each application

---

#### Page 13: Saved Jobs (`/saved`)
**Features:**
- Grid of saved job cards
- Remove from saved
- Apply directly
- Sort by: Date saved, Salary, Relevance

---

#### Page 14: Profile (`/profile`)
**Sections:**
- Profile header (photo, name, headline)
- Edit profile button
- Tabs:
  - Overview (summary, skills, languages)
  - Experience (timeline)
  - Education
  - Certifications
  - Settings (email preferences, privacy)

---

#### Page 15: Edit Profile (`/profile/edit`)
**Form sections:**
- Personal info
- Work experience (add/edit/delete)
- Education (add/edit/delete)
- Skills (add/remove tags)
- Certifications
- Languages
- CV upload (replace)
- Save/Cancel buttons

---

#### Page 16: Resume Builder (`/resume-builder`)
**Layout:**
- Left sidebar (20%): Section navigation
  - Personal Info ✓
  - Experience ✓
  - Education ✓
  - Skills (editing)
  - Certifications
  - Languages
- Center (50%): Editor
  - Form inputs for current section
  - Add/remove entries
- Right (30%): Live preview
  - Miniature resume preview
  - Template selector (3 templates)
  - Zoom controls
  - "Download PDF" button

**Features:**
- Auto-fill from profile
- Drag-and-drop section reordering
- Real-time preview
- PDF export (high quality)

---

#### Page 17: Skill Assessments (`/assessments`)
**Sections:**
- Available tests (browse by category)
- My test results (completed tests)
- Test card showing:
  - Test name
  - Category
  - Duration
  - Number of questions
  - "Start Test" button

---

#### Page 18: Take Test (`/assessments/[id]/take`)
**Features:**
- Timer (countdown)
- Question counter (5/20)
- Question display
- Answer options (multiple choice, coding editor)
- "Next" / "Previous" buttons
- "Submit Test" button
- Auto-submit when time expires

---

#### Page 19: Test Results (`/assessments/[id]/results`)
**Sections:**
- Score display (85/100)
- Pass/Fail badge
- Breakdown by question
- Correct/incorrect answers
- Certificate download (if passed)
- "Retake Test" button

---

#### Page 20: Messages (`/messages`)
**Features:**
- Inbox list (left sidebar)
- Conversation view (right)
- Send message
- Attachment support
- Read/unread status

---

#### Page 21: Referrals (`/referrals`)
**Sections:**
- Your referral code (large display)
- Share buttons (Email, WhatsApp, Copy link)
- Referral stats:
  - Total referrals
  - Successful referrals
  - Points earned
- Referral history table
- Leaderboard (top referrers)
- Redeem points section

---

### 1.4 EMPLOYER PAGES (Authentication Required)

#### Page 22: Company Profile Setup (`/company/setup`)
**First-time setup wizard:**
- Company logo upload
- Company banner upload
- Industry (dropdown)
- Company size (dropdown)
- Founded year
- Website URL
- About us (rich text)
- Location (HQ)
- Social media links
- Submit for verification

---

#### Page 23: HR Dashboard (`/dashboard/hr`)
**Sections:**
- Overview cards:
  - Active jobs (3)
  - New applications (24)
  - Interviews scheduled (5)
  - Hired this month (2)
- Quick actions:
  - Post New Job
  - Download Reports
- My jobs list (table)
- Recent activity feed
- Top skills requested (chart)

---

#### Page 24: Post Job (`/jobs/post`)
**6-step wizard:**

**Step 1: Basics**
- Job title (autocomplete suggestions)
- Category (auto-selected, editable)
- Number of vacancies
- Employment type (radio buttons)

**Step 2: Description**
- Job description (rich text editor)
- "Generate with AI" button
- Key responsibilities (bullet list)
- Qualifications required (bullet list)

**Step 3: Requirements**
- Skills required (tag input, min 3, max 15)
- Experience level (dropdown)
- Education (dropdown)
- Certifications (optional)
- Gender preference (radio)
- Age range (optional slider)

**Step 4: Location**
- Work mode (On-site, Remote, Hybrid)
- City (dropdown)
- Area/Neighborhood (cascading dropdown)
- Exact address (optional)
- Interactive map (pin location)

**Step 5: Salary**
- Salary type (Monthly, Weekly, Hourly, Project-based)
- Salary range (Min-Max) or "Negotiable"
- Currency (PKR default)
- Benefits (multi-select)

**Step 6: Preview**
- Preview job post as it will appear
- Edit buttons for each section
- "Publish Job" button

---

#### Page 25: My Jobs (`/jobs/manage`)
**Features:**
- Jobs table showing:
  - Job title
  - Status (Active, Closed, Draft)
  - Views count
  - Applications count
  - Posted date
  - Actions (Edit, Close, Delete, Duplicate)
- Filter by status
- Search jobs
- Bulk actions

---

#### Page 26: Applications Management (`/applications`)
**Kanban Board Layout:**

**5 Columns:**
1. **Priority Inbox** (Score > 60%, green badge)
2. **Filtered** (Score 30-60%, yellow badge)
3. **Shortlisted** (manually moved)
4. **Interview Scheduled** (with date/time)
5. **Rejected** (collapsed by default)

**Candidate Cards (draggable):**
- Profile photo
- Name
- Job applied for
- Match score (87% with progress bar)
- 3 skill tags
- Applied date
- Actions: View profile, Message, More menu

**Features:**
- Drag-and-drop between columns
- Bulk actions (shortlist all, reject all)
- Filter by: Match score, Date, Skills
- Search candidates
- Export to Excel

---

#### Page 27: Candidate Profile View (`/candidates/[id]`)
**Layout:**
- Profile header (photo, name, headline, location)
- Match score (large display with breakdown)
- Actions: Message, Shortlist, Reject, Download CV

**Tabs:**
- **Overview:** Summary, key skills, languages, availability
- **Experience:** Timeline of work history
- **Education:** Degrees and institutions
- **Skills:** Skills with proficiency levels
- **Assessments:** Test results (if any)

**Right Sidebar:**
- Contact info card (locked/unlocked state)
- "Unlock Contact" button (reveals phone/email)
- Application details (applied date, status, notes)
- "Add to Interview" button
- "Send Message" button

---

#### Page 28: Schedule Interview (`/interviews/schedule`)
**Features:**
- Candidate selection
- Date/time picker
- Interview type (In-person, Phone, Video)
- Location/meeting link
- Interviewer selection
- Notes
- Send calendar invite

---

#### Page 29: Analytics (`/analytics`)
**Sections:**
- Date range picker (Last 7/30/90 days, Custom)
- Overview metrics (cards)
- Charts:
  - Job views over time (line chart)
  - Applications funnel (funnel chart)
  - Candidate sources (pie chart)
  - Time-to-hire (bar chart)
- Top performing jobs table
- Skills gap analysis
- Export reports (PDF, Excel)

---

#### Page 30: Company Profile (`/company/profile`)
**Public-facing company page:**
- Company banner
- Company logo
- Company name + verification badge
- Rating (from reviews)
- About us
- Industry, Size, Founded, Website
- Location
- Active jobs (list)
- Company reviews
- Photos/gallery

---

### 1.5 ADMIN PAGES (Super Admin Only)

#### Page 31: Admin Dashboard (`/admin`)
**Sections:**
- Platform-wide metrics:
  - Total users (job seekers + employers)
  - Total companies
  - Total active jobs
  - Total applications
- User growth chart (6 months)
- Job category distribution (donut chart)
- Revenue tracking (if monetized)
- Recent activity feed

---

#### Page 32: User Management (`/admin/users`)
**Features:**
- Users table (job seekers + employers)
- Search by name/email
- Filter by: Type, Status, Verified
- Actions: View, Ban, Delete
- Bulk actions
- Export to CSV

---

#### Page 33: Company Verification (`/admin/companies`)
**Features:**
- Pending verifications queue
- Company details review
- NTN/Registration document view
- Approve/Reject buttons
- Rejection reason (if rejected)
- Verified companies list

---

#### Page 34: Content Moderation (`/admin/moderation`)
**Sections:**
- Flagged jobs (review queue)
- Flagged reviews (review queue)
- Reported users
- Actions: Approve, Remove, Ban user

---

#### Page 35: Taxonomy Management (`/admin/taxonomy`)
**Features:**
- Categories (add/edit/delete)
- Skills (add/edit/delete)
- Job titles (add/edit/delete)
- Locations (cities, areas, neighborhoods)
- Bulk import (CSV)

---

#### Page 36: Analytics (Admin) (`/admin/analytics`)
**Advanced metrics:**
- User acquisition sources
- Conversion rates
- Engagement metrics
- Geographic distribution (heatmap)
- Popular searches
- Platform health (uptime, errors)

---

### 1.6 SPECIAL PAGES

#### Page 37: AI Chatbot (`/chat`)
**Features:**
- Chat interface (full screen or sidebar)
- Bot avatar (robot icon)
- User messages (right, blue bubbles)
- Bot messages (left, gray bubbles)
- Job cards displayed inline
- Voice input button
- Text input with send button
- Conversation history
- "Start new conversation" button

---

#### Page 38: About Us (`/about`)
**Sections:**
- Our story
- Mission & vision
- Team (if applicable)
- Contact info

---

#### Page 39: Contact (`/contact`)
**Features:**
- Contact form
- Email, phone, address
- Social media links
- FAQ section

---

#### Page 40: Privacy Policy (`/privacy`)
**Legal content:**
- Data collection
- Data usage
- Cookies policy
- User rights
- GDPR compliance

---

#### Page 41: Terms of Service (`/terms`)
**Legal content:**
- User agreement
- Prohibited activities
- Liability limitations
- Dispute resolution

---

#### Page 42: FAQ (`/faq`)
**Sections:**
- For job seekers
- For employers
- About AI features
- Account & billing
- Search functionality

---

## PHASE 2: MOBILE APP DEVELOPMENT (React Native)

### 2.1 AUTHENTICATION SCREENS

#### Screen 1: Splash Screen
- App logo
- Loading animation
- Auto-navigate to Home or Login

#### Screen 2: Onboarding (First Launch)
- 3-4 slides explaining features
- "Skip" button
- "Get Started" button

#### Screen 3: Login
- Email/password inputs
- "Remember me" toggle
- "Forgot password" link
- "Sign up" link
- Social login buttons

#### Screen 4: Sign Up
- User type selection (Job Seeker / Employer)
- Registration form
- OTP verification

---

### 2.2 JOB SEEKER SCREENS

#### Screen 5: Home Feed
- Search bar with mic icon
- "For You" / "Browse" tabs
- Job cards (vertical scroll)
- Bottom navigation (Home, Search, Chat, Saved, Profile)

#### Screen 6: Job Details
- Scrollable content
- Company banner
- Job info
- "Apply Now" floating button
- Save icon (top-right)

#### Screen 7: Search & Filters
- Search input
- Filter chips (Location, Salary, Type)
- Filter modal (full screen)
- Results list

#### Screen 8: Map View
- Full-screen map
- Job pins
- Bottom sheet with job cards
- "List view" toggle

#### Screen 9: My Applications
- Status tabs (All, Pending, Shortlisted, Interview, Rejected)
- Application cards
- Pull-to-refresh

#### Screen 10: Saved Jobs
- Saved job cards
- Remove from saved
- Apply button

#### Screen 11: Profile
- Profile header
- Edit button
- Tabs (Overview, Experience, Education)
- Settings button

#### Screen 12: Edit Profile
- Form sections (scrollable)
- Photo upload
- Save/Cancel buttons

#### Screen 13: Resume Builder (Mobile)
- Section selector (bottom sheet)
- Form inputs
- Preview (modal)
- Download button

#### Screen 14: Skill Test (Mobile)
- Timer (top)
- Question display
- Answer options
- Next/Previous buttons

#### Screen 15: Test Results
- Score display
- Pass/Fail badge
- Certificate download
- Share button

#### Screen 16: Messages
- Conversation list
- Chat screen
- Send message

#### Screen 17: Notifications
- Notification list
- Mark as read
- Clear all

---

### 2.3 EMPLOYER SCREENS

#### Screen 18: HR Dashboard (Mobile)
- Overview cards (scrollable)
- Quick actions
- Jobs list
- Applications summary

#### Screen 19: Post Job (Mobile)
- Step-by-step wizard
- Form inputs
- Preview
- Publish button

#### Screen 20: Applications (Mobile)
- Horizontal tabs (Priority, Filtered, Shortlisted, Interview)
- Candidate cards
- Swipe actions (Shortlist, Reject)

#### Screen 21: Candidate Profile (Mobile)
- Scrollable profile
- Match score
- Contact unlock button
- Action buttons (Message, Shortlist, Reject)

---

### 2.4 CHATBOT SCREEN

#### Screen 22: AI Chat
- Chat interface
- Voice input
- Job cards inline
- Quick actions (Apply, Save)

---

### 2.5 SETTINGS & MISC

#### Screen 23: Settings
- Account settings
- Notification preferences
- Language (English/Urdu)
- Privacy
- About
- Logout

#### Screen 24: Help & Support
- FAQ
- Contact support
- Report issue

---

## PHASE 3: AI MODELS & ALGORITHMS

### 3.1 AI CV PARSING MODEL

**Technology:** Google Gemini 1.5 Flash API + Custom Regex

**Input:** PDF/DOC file (CV)

**Process:**
1. Extract text from PDF
2. Send text to Gemini with structured prompt
3. Parse JSON response
4. Validate extracted data
5. Store in database

**Output:** Structured data (name, email, phone, experience, education, skills, certifications, languages)

**Accuracy Target:** 85-90%

---

### 3.2 AI CV SCORING ALGORITHM

**Purpose:** Score CVs 0-100 to filter low-quality applications

**Components:**

**1. Completeness Score (40%)**
- Has name: 10 points
- Has contact (email + phone): 10 points
- Has experience: 10 points
- Has education: 10 points

**2. Relevance Score (40%)**
- Calculate semantic similarity between CV and job description
- Use vector embeddings (Gemini embeddings)
- Cosine similarity × 40

**3. Formatting Score (20%)**
- Proper structure (experience + education): 10 points
- Has skills listed: 10 points

**Thresholds:**
- < 30%: Auto-reject (Red flag)
- 30-60%: Warning (Yellow flag)
- > 60%: Accept (Green flag)

---

### 3.3 ADVANCED SORTING ALGORITHM FOR JOB SEARCH

**Purpose:** Rank jobs by relevance to user profile

**Factors:**

**1. Skill Match (40%)**
- Calculate overlap between user skills and job requirements
- Weight: (matching skills / required skills) × 40

**2. Experience Match (20%)**
- Compare user experience with job requirements
- Perfect match: 20 points
- Under-qualified: Reduce by 5 points per year gap
- Over-qualified: 15 points

**3. Location Match (15%)**
- Distance-based scoring
- < 5km: 15 points
- 5-10km: 10 points
- 10-20km: 5 points
- > 20km: 0 points

**4. Salary Match (15%)**
- Compare user expected salary with job offer
- Job salary ≥ expected: 15 points
- Job salary < expected: Reduce proportionally

**5. Recency (10%)**
- Posted < 3 days: 10 points
- Posted 3-7 days: 7 points
- Posted 7-14 days: 5 points
- Posted > 14 days: 2 points

**6. Search Query Match (bonus)**
- If search query provided, add text similarity score

**Output:** Jobs ranked by total score (descending)

---

### 3.4 RAG CHATBOT MODEL

**Technology:** LangChain + Google Gemini + Pinecone

**Architecture:**
```
User Query → Intent Classifier → Query Transformer → Vector Search → LLM Response Generator
```

**Components:**

**1. Intent Classifier**
- Classifies user intent: JOB_SEARCH, APPLY, PROFILE_UPDATE, HELP, CHITCHAT
- Uses Gemini with few-shot prompting

**2. Query Transformer**
- Extracts entities: job title, location, salary, skills
- Converts natural language to structured query

**3. Vector Search**
- Embeds user query using Gemini embeddings
- Searches Pinecone index for similar jobs
- Returns top 5 matches

**4. Response Generator**
- Uses LangChain conversation chain
- Maintains context (last 10 messages)
- Generates conversational response with job details

**Example:**
- User: "I need a driver job in Lahore under 40k"
- Intent: JOB_SEARCH
- Entities: {role: "driver", location: "Lahore", salary_max: 40000}
- Vector Search: Find jobs matching "driver Lahore"
- Filter: salary <= 40000
- Response: "I found 3 driver jobs in Lahore under 40k: [job cards]"

---

### 3.5 MODEL TRAINING & IMPROVEMENT

#### 3.5.1 CV Parsing Model Fine-Tuning

**Data Collection:**
- Collect 1000+ real CVs (anonymized)
- Manually label extracted data
- Create training dataset

**Fine-Tuning Process:**
1. Use Gemini fine-tuning API
2. Train on labeled dataset
3. Validate on test set (20%)
4. Iterate until 90%+ accuracy

**Continuous Improvement:**
- Log all parsing results
- Flag low-confidence extractions
- Manual review and correction
- Retrain monthly with new data

---

#### 3.5.2 Scoring Algorithm Optimization

**A/B Testing:**
- Test different weight combinations
- Measure HR satisfaction (accept/reject rates)
- Optimize thresholds (30%, 60%)

**Feedback Loop:**
- Track HR actions (shortlist, reject)
- Adjust weights based on patterns
- Example: If HR rejects many 65% scores, increase threshold to 70%

---

#### 3.5.3 Job Ranking Model Training

**Supervised Learning:**
- Collect user interactions (clicks, applies, saves)
- Label jobs as relevant/not relevant
- Train ranking model (LightGBM or XGBoost)

**Features:**
- Skill overlap
- Experience match
- Location distance
- Salary match
- User click history
- Time of day
- Device type

**Training Process:**
1. Collect 10,000+ user interactions
2. Split data (80% train, 20% test)
3. Train model
4. Evaluate (NDCG, MRR metrics)
5. Deploy if improvement > 5%

**Continuous Learning:**
- Retrain weekly with new data
- Monitor click-through rate (CTR)
- A/B test new models

---

#### 3.5.4 Chatbot Improvement

**Conversation Quality:**
- Log all conversations
- Manual review of 100 conversations/week
- Identify failure cases
- Update prompts and examples

**Intent Classification:**
- Collect misclassified intents
- Add to training examples
- Retrain classifier monthly

**Response Quality:**
- User feedback (thumbs up/down)
- Track satisfaction rate
- Adjust temperature and prompts

---

### 3.6 ADVANCED AI FEATURES (Future)

#### 3.6.1 Predictive Analytics
- Predict time-to-hire for jobs
- Predict candidate acceptance rate
- Predict salary trends

#### 3.6.2 Automated Interview Scheduling
- AI suggests best interview times
- Considers both parties' calendars
- Sends automated reminders

#### 3.6.3 Skill Gap Analysis
- Analyze market demand vs. candidate supply
- Suggest training courses
- Predict future skill needs

#### 3.6.4 Fake Profile Detection
- Detect duplicate profiles
- Identify suspicious patterns
- Flag for manual review

---

## DEVELOPMENT TIMELINE

### Month 1-2: Website Core
- Pages 1-9 (Public + Auth)
- Database setup
- Basic AI CV parsing

### Month 3-4: Job Seeker Features
- Pages 10-21
- AI scoring algorithm
- Job search & filtering

### Month 5: Employer Features
- Pages 22-30
- Kanban board
- Analytics

### Month 6: Premium Features
- Resume builder
- Skill assessments
- Salary insights
- Company reviews

### Month 7: AI & Mobile
- Advanced RAG chatbot
- Mobile app (all screens)
- Model training
- Testing & deployment

---

## TOTAL DELIVERABLES

**Website:** 42 pages
**Mobile App:** 24 screens
**AI Models:** 5 models (CV parsing, scoring, ranking, chatbot, intent classification)
**Algorithms:** 3 advanced algorithms (sorting, matching, recommendation)

**All features FREE - No paywalls!** 🚀
