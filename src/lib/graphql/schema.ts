import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";

// Types
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  icon: string;
  rating: number;
  popular: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  publishedAt: string;
  readTime: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  title: string;
  summary: string;
  resultMetric: string;
  resultLabel: string;
  industry: string;
  logoText: string;
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  status: string;
}

export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
}

export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  section: string;
  summary: string;
  readTime: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: string;
  description: string;
  downloadUrl: string;
  format: string;
}

export interface MetricData {
  totalUsers: number;
  apiRequestsPerMin: number;
  responseTimeMs: number;
  uptimePercentage: number;
  activeQueriesCount: number;
  serverHealth: string;
  environment: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

export interface GraphQLTemplate {
  id: string;
  title: string;
  description: string;
  query: string;
  variables?: string;
}

// In-Memory Data Store
const servicesData: ServiceItem[] = [
  { id: "srv-1", title: "GraphQL SSR Engine", description: "Server-side render Apollo & Yoga queries with sub-5ms caching latency.", category: "Architecture", price: 49, icon: "Zap", rating: 4.9, popular: true },
  { id: "srv-2", title: "Real-time Schema Gateway", description: "Federate microservices with auto-stitched GraphQL schema merging.", category: "Gateway", price: 99, icon: "Network", rating: 4.8, popular: true },
  { id: "srv-3", title: "Optimistic UI Mutator", description: "Instant client UI updates with automatic background retry policies.", category: "Client", price: 29, icon: "Sparkles", rating: 4.7, popular: false },
  { id: "srv-4", title: "Smart Query Caching", description: "Edge CDN integration with automated cache key invalidation.", category: "Performance", price: 79, icon: "Database", rating: 4.95, popular: true },
  { id: "srv-5", title: "GraphQL Security Shield", description: "Depth limiting, rate limiting, and automated query cost estimation.", category: "Security", price: 119, icon: "ShieldCheck", rating: 4.9, popular: false }
];

const pricingPlansData: PricingPlan[] = [
  {
    id: "plan-starter",
    name: "Developer Starter",
    price: 0,
    interval: "month",
    description: "Ideal for individual developers building & prototyping Next.js GraphQL apps.",
    features: ["100,000 GraphQL queries/mo", "Single Schema Endpoint", "Community Support", "Basic Analytics", "Next.js App Router Support"],
    popular: false,
    ctaText: "Start Free via GraphQL",
  },
  {
    id: "plan-pro",
    name: "Pro Scale",
    price: 49,
    interval: "month",
    description: "For fast-growing teams needing global edge caching and query depth safety.",
    features: ["5,000,000 GraphQL queries/mo", "Schema Federation & Stitching", "Priority 24/7 Support", "Advanced Real-time Metrics", "Custom GraphQL Directives", "Automatic Type Generation"],
    popular: true,
    ctaText: "Start Pro Trial",
    badge: "Most Popular",
  },
  {
    id: "plan-enterprise",
    name: "Enterprise Dedicated",
    price: 199,
    interval: "month",
    description: "Dedicated GraphQL gateway nodes with SLA guarantees & custom security.",
    features: ["Unlimited GraphQL Traffic", "Dedicated Gateway Clusters", "Dedicated Solution Engineer", "99.99% SLA Uptime Guarantee", "Custom Auth & Rate Limiting", "SOC2 & HIPAA Compliance"],
    popular: false,
    ctaText: "Contact Sales",
  }
];

const blogPostsData: BlogPost[] = [
  {
    id: "post-1",
    slug: "mastering-graphql-nextjs-16",
    title: "Mastering Full-Stack GraphQL in Next.js 16 App Router",
    excerpt: "Learn how to build type-safe executable GraphQL schemas inside Next.js Route Handlers with sub-5ms latency.",
    content: "GraphQL and Next.js 16 App Router provide a powerful combination for modern web development. By collocating resolvers inside Route Handlers (/api/graphql), developers gain single-roundtrip query execution...",
    author: "Alex Rivera",
    authorRole: "Lead GraphQL Architect",
    category: "Architecture",
    publishedAt: "2026-10-01",
    readTime: "6 min read"
  },
  {
    id: "post-2",
    slug: "optimizing-graphql-query-performance",
    title: "10 Techniques to Reduce GraphQL Query Latency by 80%",
    excerpt: "Explore field-level caching, batching resolvers, data loader patterns, and CDN edge invalidation.",
    content: "When scaling GraphQL APIs to millions of requests per minute, optimizing database queries and caching layers becomes essential...",
    author: "Sophia Chen",
    authorRole: "Principal Infrastructure Engineer",
    category: "Performance",
    publishedAt: "2026-09-24",
    readTime: "8 min read"
  },
  {
    id: "post-3",
    slug: "graphql-vs-rest-2026-comparison",
    title: "GraphQL vs REST in 2026: Why Modern SaaS Teams Choose GraphQL",
    excerpt: "An in-depth benchmark comparing over-fetching overhead, schema typing, and client developer velocity.",
    content: "REST has served the web well for two decades, but modern complex user interfaces demand client-driven data fetching...",
    author: "Marcus Vance",
    authorRole: "VP of Developer Experience",
    category: "Engineering",
    publishedAt: "2026-09-15",
    readTime: "5 min read"
  }
];

const featuresData: Feature[] = [
  { id: "feat-1", title: "Single-Endpoint Architecture", description: "Consolidate all microservice data under one clean POST /api/graphql endpoint.", icon: "Layers", category: "Core", badge: "GraphQL Core" },
  { id: "feat-2", title: "Declarative Data Fetching", description: "Clients specify exact fields to reduce payload size by up to 75%.", icon: "Code2", category: "Core", badge: "Zero Over-fetch" },
  { id: "feat-3", title: "Type-Safe Client Hooks", description: "Custom React hooks (useGraphQLQuery & useGraphQLMutation) with built-in loading state.", icon: "CheckCircle", category: "Developer XP" },
  { id: "feat-4", title: "Dual Light/Dark Design System", description: "CSS tokens with glassmorphic cards and instant zero-flash mode toggling.", icon: "SunMoon", category: "UI System" },
  { id: "feat-5", title: "Interactive Query Playground", description: "Built-in IDE to edit queries, test mutations, and inspect JSON responses in real-time.", icon: "Terminal", category: "Developer XP" },
  { id: "feat-6", title: "Edge CDN & Query Caching", description: "Sub-millisecond query response rates backed by global cache invalidation.", icon: "Zap", category: "Performance" }
];

const faqsData: FAQItem[] = [
  { id: "faq-1", question: "How does GraphQL integrate with Next.js App Router?", answer: "Next.js Route Handlers at /api/graphql receive POST requests containing query documents and variables, executing them against an in-memory or database executable schema.", category: "General" },
  { id: "faq-2", question: "Are all pages in NovaFlow powered by GraphQL?", answer: "Yes! Every single page (Services, Pricing, Blog, Features, FAQ, Dashboard, Customers, etc.) fetches its data directly through GraphQL queries.", category: "Data Architecture" },
  { id: "faq-3", question: "Can I test custom GraphQL queries live in the browser?", answer: "Absolutely. Click on the 'GraphQL Hub' tab in the header to open the interactive GraphQL Explorer and run custom queries and mutations.", category: "Playground" },
  { id: "faq-4", question: "How do I add new GraphQL mutations?", answer: "Define your Mutation type in src/lib/graphql/schema.ts and implement the corresponding resolver function.", category: "Development" }
];

const teamMembersData: TeamMember[] = [
  { id: "team-1", name: "Elena Rostova", role: "Chief Technology Officer", bio: "Former Lead Architect at Apollo GraphQL. Pioneer in Schema Stitching and Edge Resolvers.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200", location: "San Francisco, CA" },
  { id: "team-2", name: "David Vance", role: "Head of Product & UI Design", bio: "Creator of modern glassmorphic design systems and responsive Next.js starters.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200", location: "New York, NY" },
  { id: "team-3", name: "Amara Nwosu", role: "Principal GraphQL Engineer", bio: "Specialize in high-throughput resolver caching, query depth security, and Rust-based GraphQL engines.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200", location: "London, UK" }
];

const caseStudiesData: CaseStudy[] = [
  { id: "cs-1", company: "FinTech Scale Corp", title: "Migrating from 40 REST Endpoints to 1 Unified GraphQL Gateway", summary: "How FinTech Scale reduced client app bundle size by 45% and improved page load times by 3.2x using NovaFlow GraphQL.", resultMetric: "3.2x Faster", resultLabel: "Page Load Speed", industry: "Financial Services", logoText: "FinTech" },
  { id: "cs-2", company: "CloudCart E-Commerce", title: "Handling 50,000 Requests/Sec with GraphQL Edge Caching", summary: "CloudCart scaled black friday traffic without dropping a single packet using intelligent GraphQL query invalidation.", resultMetric: "99.99%", resultLabel: "Uptime SLA", industry: "E-Commerce", logoText: "CloudCart" }
];

const customersData: CustomerTestimonial[] = [
  { id: "cust-1", name: "Sarah Jenkins", company: "NovaCloud Systems", role: "VP of Engineering", quote: "Switching to NovaFlow's GraphQL engine transformed our engineering velocity. Our frontend teams write queries in seconds.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120" },
  { id: "cust-2", name: "Michael Chang", company: "HyperScale Tech", role: "Lead FullStack Dev", quote: "The built-in GraphQL Explorer and dual-theme UI kit saved us 3 months of boilerplate UI work.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" }
];

const integrationsData: IntegrationItem[] = [
  { id: "int-1", name: "Apollo Client & Server", category: "GraphQL Engine", description: "Native compatibility with Apollo Client hooks, cache normalization, and devtools.", icon: "Sparkles", status: "VERIFIED" },
  { id: "int-2", name: "GraphQL Yoga Gateway", category: "Route Handler", description: "Lightweight W3C compliant GraphQL execution engine for Next.js 16.", icon: "Zap", status: "VERIFIED" },
  { id: "int-3", name: "Prisma & PostgreSQL", category: "Database ORM", description: "Auto-generate type-safe GraphQL resolvers directly from ORM schema models.", icon: "Database", status: "VERIFIED" },
  { id: "int-4", name: "Vercel Edge Network", category: "Deployment", description: "Deploy GraphQL route handlers to global edge networks with <10ms cold starts.", icon: "Cloud", status: "VERIFIED" }
];

const careersData: CareerOpening[] = [
  { id: "job-1", title: "Senior GraphQL Infrastructure Engineer", department: "Engineering", location: "Remote (US/EU)", type: "Full-Time", salary: "$160,000 - $190,000" },
  { id: "job-2", title: "Frontend UI/UX Developer (Next.js)", department: "Product UI", location: "San Francisco / Remote", type: "Full-Time", salary: "$140,000 - $170,000" },
  { id: "job-3", title: "Developer Relations Manager", department: "Growth", location: "New York / Remote", type: "Full-Time", salary: "$130,000 - $155,000" }
];

const docArticlesData: DocArticle[] = [
  { id: "doc-1", slug: "getting-started", title: "Quickstart & GraphQL Schema Setup", section: "Getting Started", summary: "How to initialize the Next.js GraphQL starter and query your first endpoint.", readTime: "3 min" },
  { id: "doc-2", slug: "writing-resolvers", title: "Building Type-Safe Resolvers", section: "GraphQL API", summary: "Guide to writing queries, mutations, context handlers, and custom directives.", readTime: "5 min" },
  { id: "doc-3", slug: "client-hooks", title: "Consuming Data with React Hooks", section: "Frontend UI", summary: "Using useGraphQLQuery and useGraphQLMutation inside Next.js components.", readTime: "4 min" }
];

const resourcesData: ResourceItem[] = [
  { id: "res-1", title: "GraphQL Architecture Cheatsheet 2026", type: "PDF Guide", description: "Comprehensive reference card for query optimization, schema stitching, and error handling.", downloadUrl: "#", format: "PDF" },
  { id: "res-2", title: "Next.js 16 App Router GraphQL Kit", type: "Code Starter", description: "Production ready boilerplate repository with dual light/dark UI tokens.", downloadUrl: "#", format: "ZIP" }
];

const initialFlags: FeatureFlag[] = [
  { id: "flag-1", name: "GraphQL Persisted Queries", enabled: true, description: "Hash-based query execution for bandwidth optimization" },
  { id: "flag-2", name: "Realtime Schema Subscriptions", enabled: true, description: "WebSocket transport for live push notifications" },
  { id: "flag-3", name: "Automatic Query Complexity Guard", enabled: false, description: "Reject queries exceeding maximum depth limits" },
];

const contactMessages: Array<{ id: string; name: string; email: string; message: string; date: string }> = [];

const typeDefs = /* GraphQL */ `
  type MetricData {
    totalUsers: Int!
    apiRequestsPerMin: Int!
    responseTimeMs: Float!
    uptimePercentage: Float!
    activeQueriesCount: Int!
    serverHealth: String!
    environment: String!
  }

  type ServiceItem {
    id: ID!
    title: String!
    description: String!
    category: String!
    price: Float!
    icon: String!
    rating: Float!
    popular: Boolean!
  }

  type PricingPlan {
    id: ID!
    name: String!
    price: Float!
    interval: String!
    description: String!
    features: [String!]!
    popular: Boolean!
    ctaText: String!
    badge: String
  }

  type BlogPost {
    id: ID!
    slug: String!
    title: String!
    excerpt: String!
    content: String!
    author: String!
    authorRole: String!
    category: String!
    publishedAt: String!
    readTime: String!
  }

  type Feature {
    id: ID!
    title: String!
    description: String!
    icon: String!
    category: String!
    badge: String
  }

  type FAQItem {
    id: ID!
    question: String!
    answer: String!
    category: String!
  }

  type TeamMember {
    id: ID!
    name: String!
    role: String!
    bio: String!
    avatar: String!
    location: String!
  }

  type CaseStudy {
    id: ID!
    company: String!
    title: String!
    summary: String!
    resultMetric: String!
    resultLabel: String!
    industry: String!
    logoText: String!
  }

  type CustomerTestimonial {
    id: ID!
    name: String!
    company: String!
    role: String!
    quote: String!
    rating: Int!
    avatar: String!
  }

  type IntegrationItem {
    id: ID!
    name: String!
    category: String!
    description: String!
    icon: String!
    status: String!
  }

  type CareerOpening {
    id: ID!
    title: String!
    department: String!
    location: String!
    type: String!
    salary: String!
  }

  type DocArticle {
    id: ID!
    slug: String!
    title: String!
    section: String!
    summary: String!
    readTime: String!
  }

  type ResourceItem {
    id: ID!
    title: String!
    type: String!
    description: String!
    downloadUrl: String!
    format: String!
  }

  type FeatureFlag {
    id: ID!
    name: String!
    enabled: Boolean!
    description: String!
  }

  type SystemStatus {
    status: String!
    database: String!
    graphqlServer: String!
    cache: String!
    timestamp: String!
  }

  type GraphQLTemplate {
    id: ID!
    title: String!
    description: String!
    query: String!
    variables: String
  }

  type UserProfile {
    id: ID!
    name: String!
    email: String!
    role: String!
    tier: String!
    apiKeysCount: Int!
    activeQueriesCount: Int!
    storageUsed: String!
  }

  type LegalPolicy {
    type: String!
    title: String!
    lastUpdated: String!
    sections: [PolicySection!]!
  }

  type PolicySection {
    heading: String!
    body: String!
  }

  type Query {
    metrics: MetricData!
    services(category: String, search: String): [ServiceItem!]!
    service(id: ID!): ServiceItem
    pricingPlans: [PricingPlan!]!
    blogPosts(category: String, featured: Boolean): [BlogPost!]!
    blogPost(slug: String!): BlogPost
    features(category: String): [Feature!]!
    faqs(category: String): [FAQItem!]!
    teamMembers: [TeamMember!]!
    caseStudies: [CaseStudy!]!
    customers: [CustomerTestimonial!]!
    integrations(category: String): [IntegrationItem!]!
    careers: [CareerOpening!]!
    documentation: [DocArticle!]!
    resources: [ResourceItem!]!
    featureFlags: [FeatureFlag!]!
    systemStatus: SystemStatus!
    graphqlTemplates: [GraphQLTemplate!]!
    userProfile: UserProfile!
    legalPolicy(type: String!): LegalPolicy
  }

  type Mutation {
    executeGraphQLQuery(query: String!, variables: String): String!
    createService(title: String!, description: String!, category: String!, price: Float!, icon: String): ServiceItem!
    toggleFeatureFlag(id: ID!): FeatureFlag!
    subscribeNewsletter(email: String!): Boolean!
    submitContactMessage(name: String!, email: String!, message: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
    metrics: (): MetricData => ({
      totalUsers: 14250 + Math.floor(Math.random() * 20),
      apiRequestsPerMin: 3840 + Math.floor(Math.random() * 50),
      responseTimeMs: Number((4.2 + Math.random() * 1.5).toFixed(2)),
      uptimePercentage: 99.98,
      activeQueriesCount: 128 + Math.floor(Math.random() * 12),
      serverHealth: "OPERATIONAL",
      environment: "production",
    }),
    services: (_: unknown, { category, search }: { category?: string; search?: string }) => {
      let list = [...servicesData];
      if (category && category !== "All") {
        list = list.filter((s) => s.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      }
      return list;
    },
    service: (_: unknown, { id }: { id: string }) => servicesData.find((s) => s.id === id) || null,
    pricingPlans: () => pricingPlansData,
    blogPosts: (_: unknown, { category }: { category?: string }) => {
      if (category && category !== "All") {
        return blogPostsData.filter((b) => b.category.toLowerCase() === category.toLowerCase());
      }
      return blogPostsData;
    },
    blogPost: (_: unknown, { slug }: { slug: string }) => blogPostsData.find((b) => b.slug === slug) || null,
    features: (_: unknown, { category }: { category?: string }) => {
      if (category && category !== "All") {
        return featuresData.filter((f) => f.category.toLowerCase() === category.toLowerCase());
      }
      return featuresData;
    },
    faqs: (_: unknown, { category }: { category?: string }) => {
      if (category && category !== "All") {
        return faqsData.filter((f) => f.category.toLowerCase() === category.toLowerCase());
      }
      return faqsData;
    },
    teamMembers: () => teamMembersData,
    caseStudies: () => caseStudiesData,
    customers: () => customersData,
    integrations: (_: unknown, { category }: { category?: string }) => {
      if (category && category !== "All") {
        return integrationsData.filter((i) => i.category.toLowerCase() === category.toLowerCase());
      }
      return integrationsData;
    },
    careers: () => careersData,
    documentation: () => docArticlesData,
    resources: () => resourcesData,
    featureFlags: () => initialFlags,
    systemStatus: () => ({
      status: "ALL_SYSTEMS_GO",
      database: "Healthy (0.8ms)",
      graphqlServer: "Running (v16.3 / App Router)",
      cache: "In-Memory Hit Rate 99.4%",
      timestamp: new Date().toISOString(),
    }),
    userProfile: () => ({
      id: "usr-9921",
      name: "Alex Vance",
      email: "alex.vance@novaflow.io",
      role: "GraphQL Solution Architect",
      tier: "Enterprise Pro Plan",
      apiKeysCount: 4,
      activeQueriesCount: 84920,
      storageUsed: "14.2 GB / 100 GB",
    }),
    legalPolicy: (_: unknown, { type }: { type: string }) => ({
      type: type || "terms",
      title: `${(type || "terms").toUpperCase()} Policy Document`,
      lastUpdated: "October 2026",
      sections: [
        { heading: "1. GraphQL API Usage Terms", body: "By querying the NovaFlow GraphQL endpoint, clients agree to observe rate limits and schema depth constraints." },
        { heading: "2. Privacy & Data Handling", body: "All GraphQL query parameters and mutation variables are encrypted in transit via SSL/TLS 1.3." },
        { heading: "3. Service Availability SLA", body: "NovaFlow maintains a 99.98% uptime commitment for all GraphQL gateway execution nodes." }
      ]
    }),
    graphqlTemplates: () => [
      {
        id: "tmpl-1",
        title: "Fetch Live Metrics",
        description: "Retrieve real-time server health, response times, and active query count.",
        query: `query GetMetrics {\n  metrics {\n    totalUsers\n    apiRequestsPerMin\n    responseTimeMs\n    uptimePercentage\n    serverHealth\n  }\n}`,
        variables: "{}",
      },
      {
        id: "tmpl-2",
        title: "Fetch Pricing Plans",
        description: "Query SaaS pricing plans and features list directly from GraphQL.",
        query: `query GetPricing {\n  pricingPlans {\n    id\n    name\n    price\n    interval\n    features\n    popular\n  }\n}`,
        variables: "{}",
      },
      {
        id: "tmpl-3",
        title: "Search Services Catalog",
        description: "Query microservices with category and keyword search filters.",
        query: `query SearchServices($search: String) {\n  services(search: $search) {\n    id\n    title\n    category\n    price\n    rating\n  }\n}`,
        variables: JSON.stringify({ search: "GraphQL" }, null, 2),
      },
      {
        id: "tmpl-4",
        title: "Fetch Blog Posts",
        description: "Query blog articles, excerpts, authors, and read times.",
        query: `query GetBlogPosts {\n  blogPosts {\n    id\n    title\n    excerpt\n    author\n    publishedAt\n    readTime\n  }\n}`,
        variables: "{}",
      }
    ],
  },
  Mutation: {
    createService: (
      _: unknown,
      { title, description, category, price, icon }: { title: string; description: string; category: string; price: number; icon?: string }
    ) => {
      const newService: ServiceItem = {
        id: `srv-${Date.now()}`,
        title,
        description,
        category,
        price,
        icon: icon || "Box",
        rating: 5.0,
        popular: true,
      };
      servicesData.unshift(newService);
      return newService;
    },
    toggleFeatureFlag: (_: unknown, { id }: { id: string }) => {
      const flag = initialFlags.find((f) => f.id === id);
      if (!flag) throw new Error("Feature flag not found");
      flag.enabled = !flag.enabled;
      return flag;
    },
    subscribeNewsletter: (_: unknown, { email }: { email: string }) => {
      if (!email || !email.includes("@")) throw new Error("Invalid email address.");
      return true;
    },
    submitContactMessage: (_: unknown, { name, email, message }: { name: string; email: string; message: string }) => {
      if (!name || !email || !message) throw new Error("All fields are required.");
      contactMessages.push({ id: `msg-${Date.now()}`, name, email, message, date: new Date().toISOString() });
      return true;
    },
    executeGraphQLQuery: async (_: unknown, { query, variables }: { query: string; variables?: string }) => {
      let parsedVars = {};
      if (variables) {
        try { parsedVars = JSON.parse(variables); } catch {}
      }
      const res = await graphql({
        schema,
        source: query,
        variableValues: parsedVars,
      });
      return JSON.stringify(res, null, 2);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
