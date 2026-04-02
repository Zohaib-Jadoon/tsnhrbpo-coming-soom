export interface ServiceChapter {
  id: string
  number: string
  title: string
  description: string
  services: string[]
}

export const HR_CHAPTERS: ServiceChapter[] = [
  {
    id: "recruitment",
    number: "01",
    title: "Recruitment & Talent Acquisition",
    description: "Streamline the entire hiring lifecycle from job creation to final selection.",
    services: [
      "Recruitment Process Outsourcing (RPO)",
      "Executive search / headhunting",
      "Job description creation",
      "Candidate sourcing",
      "Resume screening & shortlisting",
      "Candidate assessments (skills, psychometric)",
      "Interview scheduling & management",
      "Interview evaluation forms",
      "Offer letter preparation & issuance",
      "Talent pipeline management",
      "Employer branding support"
    ]
  },
  {
    id: "onboarding",
    number: "02",
    title: "Onboarding & Employee Lifecycle",
    description: "Manage the employee journey ensuring smooth onboarding and lifecycle management.",
    services: [
      "Digital onboarding workflows",
      "Employee document verification",
      "Induction & orientation programs",
      "Probation tracking",
      "Employee contract management"
    ]
  },
  {
    id: "payroll",
    number: "03",
    title: "Payroll & Compensation",
    description: "Financial management related to salaries, benefits, and compliance.",
    services: [
      "Payroll processing",
      "Salary calculation",
      "Tax deductions & compliance",
      "Payslip generation",
      "Bonus & incentive management",
      "Expense reimbursement processing",
      "Salary benchmarking & market analysis"
    ]
  },
  {
    id: "attendance",
    number: "04",
    title: "Attendance & Workforce Management",
    description: "Track working hours and optimize workforce productivity through advanced timesheets.",
    services: [
      "Attendance tracking & timesheets",
      "Leave management & approval workflows",
      "Overtime calculation",
      "Remote work / flexible schedule tracking",
      "Shift scheduling & workforce planning"
    ]
  },
  {
    id: "performance",
    number: "05",
    title: "Performance & Talent Management",
    description: "Measure performance, set goals, and plan career development.",
    services: [
      "KPI & goal tracking",
      "Performance appraisals & reviews",
      "360-degree feedback collection",
      "Promotion & succession planning",
      "Talent evaluation & rating"
    ]
  },
  {
    id: "learning",
    number: "06",
    title: "Learning & Development",
    description: "Improve organizational capability through structured training and learning paths.",
    services: [
      "Employee training & development programs",
      "Personalized learning paths",
      "Certification tracking",
      "Leadership development programs",
      "Learning progress monitoring"
    ]
  },
  {
    id: "engagement",
    number: "07",
    title: "Employee Engagement & Retention",
    description: "Foster a positive culture through engagement analytics and recognition programs.",
    services: [
      "Employee surveys & pulse checks",
      "Engagement analytics & reports",
      "Recognition & reward programs",
      "Exit interviews & attrition analysis"
    ]
  },
  {
    id: "tech",
    number: "08",
    title: "HR Technology & Analytics",
    description: "Advanced analytics to help make data-driven HR decisions.",
    services: [
      "HRIS / HR Management System implementation (Octofy)",
      "HR analytics & reporting dashboards",
      "Workforce planning & forecasting",
      "HR automation consulting"
    ]
  },
  {
    id: "compliance",
    number: "09",
    title: "Compliance & Policy Management",
    description: "Ensure HR operations comply with laws and company policies.",
    services: [
      "HR policies creation & management",
      "Legal & regulatory compliance",
      "Employee handbook & guidelines",
      "Audit & risk management"
    ]
  },
  {
    id: "assessments",
    number: "10",
    title: "Talent Assessment & Psychometrics",
    description: "Evaluate candidate abilities through structured assessments.",
    services: [
      "Cognitive ability testing",
      "Personality & behavioral assessments",
      "Leadership potential evaluations",
      "Skill gap analysis",
      "Assessment result reporting"
    ]
  },
  {
    id: "strategic",
    number: "11",
    title: "Strategic HR Consulting",
    description: "Advisory services aimed at improving long-term human capital development.",
    services: [
      "Organizational structure design",
      "Workforce optimization",
      "HR process improvement",
      "Compensation & benefits strategy",
      "Succession planning",
      "Change management support"
    ]
  }
]
