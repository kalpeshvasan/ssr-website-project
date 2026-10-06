export interface GraphQLErrorItem {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: Array<string | number>;
}

export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: GraphQLErrorItem[];
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options: RequestInit = {}
): Promise<{ data?: T; errors?: GraphQLErrorItem[]; durationMs: number }> {
  const start = performance.now();
  const isServer = typeof window === "undefined";
  const baseUrl = isServer ? (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") : "";

  try {
    const res = await fetch(`${baseUrl}/api/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify({ query, variables }),
      cache: options.cache || "no-store",
      ...options,
    });

    const json: GraphQLResponse<T> = await res.json();
    const durationMs = Number((performance.now() - start).toFixed(2));

    return {
      data: json.data,
      errors: json.errors,
      durationMs,
    };
  } catch (err: unknown) {
    const durationMs = Number((performance.now() - start).toFixed(2));
    const message = err instanceof Error ? err.message : "Failed to reach GraphQL endpoint";
    return {
      errors: [{ message }],
      durationMs,
    };
  }
}

export const GRAPHQL_QUERIES = {
  GET_METRICS: /* GraphQL */ `
    query GetMetrics {
      metrics {
        totalUsers
        apiRequestsPerMin
        responseTimeMs
        uptimePercentage
        activeQueriesCount
        serverHealth
        environment
      }
    }
  `,
  GET_SERVICES: /* GraphQL */ `
    query GetServices($category: String, $search: String) {
      services(category: $category, search: $search) {
        id
        title
        description
        category
        price
        icon
        rating
        popular
      }
    }
  `,
  GET_PRICING: /* GraphQL */ `
    query GetPricing {
      pricingPlans {
        id
        name
        price
        interval
        description
        features
        popular
        ctaText
        badge
      }
    }
  `,
  GET_BLOG_POSTS: /* GraphQL */ `
    query GetBlogPosts($category: String) {
      blogPosts(category: $category) {
        id
        slug
        title
        excerpt
        author
        authorRole
        category
        publishedAt
        readTime
      }
    }
  `,
  GET_FEATURES: /* GraphQL */ `
    query GetFeatures($category: String) {
      features(category: $category) {
        id
        title
        description
        icon
        category
        badge
      }
    }
  `,
  GET_FAQS: /* GraphQL */ `
    query GetFAQs($category: String) {
      faqs(category: $category) {
        id
        question
        answer
        category
      }
    }
  `,
  GET_ABOUT: /* GraphQL */ `
    query GetAbout {
      teamMembers {
        id
        name
        role
        bio
        avatar
        location
      }
    }
  `,
  GET_CASE_STUDIES: /* GraphQL */ `
    query GetCaseStudies {
      caseStudies {
        id
        company
        title
        summary
        resultMetric
        resultLabel
        industry
        logoText
      }
    }
  `,
  GET_CUSTOMERS: /* GraphQL */ `
    query GetCustomers {
      customers {
        id
        name
        company
        role
        quote
        rating
        avatar
      }
    }
  `,
  GET_INTEGRATIONS: /* GraphQL */ `
    query GetIntegrations($category: String) {
      integrations(category: $category) {
        id
        name
        category
        description
        icon
        status
      }
    }
  `,
  GET_CAREERS: /* GraphQL */ `
    query GetCareers {
      careers {
        id
        title
        department
        location
        type
        salary
      }
    }
  `,
  GET_DOCS: /* GraphQL */ `
    query GetDocs {
      documentation {
        id
        slug
        title
        section
        summary
        readTime
      }
    }
  `,
  GET_RESOURCES: /* GraphQL */ `
    query GetResources {
      resources {
        id
        title
        type
        description
        downloadUrl
        format
      }
    }
  `,
  GET_SYSTEM_STATUS: /* GraphQL */ `
    query GetSystemStatus {
      systemStatus {
        status
        database
        graphqlServer
        cache
        timestamp
      }
      featureFlags {
        id
        name
        enabled
        description
      }
    }
  `,
  GET_TEMPLATES: /* GraphQL */ `
    query GetTemplates {
      graphqlTemplates {
        id
        title
        description
        query
        variables
      }
    }
  `,
  GET_USER_PROFILE: /* GraphQL */ `
    query GetUserProfile {
      userProfile {
        id
        name
        email
        role
        tier
        apiKeysCount
        activeQueriesCount
        storageUsed
      }
    }
  `,
  GET_LEGAL_POLICY: /* GraphQL */ `
    query GetLegalPolicy($type: String!) {
      legalPolicy(type: $type) {
        type
        title
        lastUpdated
        sections {
          heading
          body
        }
      }
    }
  `,
};

export const GRAPHQL_MUTATIONS = {
  CREATE_SERVICE: /* GraphQL */ `
    mutation CreateService($title: String!, $description: String!, $category: String!, $price: Float!, $icon: String) {
      createService(title: $title, description: $description, category: $category, price: $price, icon: $icon) {
        id
        title
        description
        category
        price
      }
    }
  `,
  TOGGLE_FEATURE_FLAG: /* GraphQL */ `
    mutation ToggleFeatureFlag($id: ID!) {
      toggleFeatureFlag(id: $id) {
        id
        name
        enabled
      }
    }
  `,
  SUBSCRIBE_NEWSLETTER: /* GraphQL */ `
    mutation SubscribeNewsletter($email: String!) {
      subscribeNewsletter(email: $email)
    }
  `,
  SUBMIT_CONTACT: /* GraphQL */ `
    mutation SubmitContact($name: String!, $email: String!, $message: String!) {
      submitContactMessage(name: $name, email: $email, message: $message)
    }
  `,
};
