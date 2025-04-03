# Contract Clause Reviewer - Architecture Rules

## Core Principles

1. **Separation of Concerns**: Clearly separate UI components, business logic, and data access.
2. **Type Safety**: Use TypeScript throughout the project with strict typing.
3. **Security First**: Implement security best practices at every level.
4. **Performance Optimization**: Minimize API calls and optimize rendering.
5. **Accessibility**: Ensure the application is accessible to all users.

## Folder Structure Rules

### `/pages`
- Each file corresponds to a route in the application
- API routes go in `/pages/api`
- Keep page components thin, delegating to components for UI and hooks for logic
- Use dynamic routes for parameterized pages

### `/components`
- Follow atomic design principles (atoms, molecules, organisms)
- Each component in its own folder with index.ts export
- Include component-specific tests in the same folder
- Use React.memo for performance optimization where appropriate
- Props must be fully typed with TypeScript interfaces

### `/styles`
- Use Tailwind CSS utility classes as primary styling method
- Custom CSS only when absolutely necessary
- Theme variables defined in tailwind.config.js
- Responsive design breakpoints follow Tailwind defaults

### `/utils`
- Pure utility functions only
- Each utility should have a single responsibility
- All utilities must be fully tested
- Export named functions (not default exports)

### `/lib`
- Service integrations and API clients
- Abstract third-party dependencies behind interfaces
- Implement retry logic and error handling
- Use environment variables for configuration

### `/types`
- Shared TypeScript interfaces and types
- Follow naming convention: `IComponentName` for interfaces
- Use union types for state enumerations
- Export all types from index.ts

### `/hooks`
- Custom React hooks for reusable logic
- Follow naming convention: `use[Feature]`
- Each hook should have a single responsibility
- Include tests for each hook

### `/context`
- React context providers for global state
- Use TypeScript for context value types
- Provide default values for all contexts
- Keep context providers focused on specific domains

## Naming Conventions

1. **Files and Folders**:
   - React components: PascalCase (e.g., `Button.tsx`)
   - Utilities and hooks: camelCase (e.g., `useAuth.ts`)
   - Test files: `[filename].test.ts` or `[filename].spec.ts`

2. **Variables and Functions**:
   - Variables: camelCase
   - Component props: camelCase
   - Functions: camelCase
   - React components: PascalCase
   - Interfaces: PascalCase with 'I' prefix (e.g., `IButtonProps`)
   - Types: PascalCase (e.g., `ReviewType`)
   - Constants: UPPER_SNAKE_CASE

## API Integration Rules

1. **Authentication**:
   - API keys must be stored in environment variables
   - Never expose API keys in client-side code
   - Implement rate limiting for API calls
   - Use server-side API routes to proxy requests

2. **Error Handling**:
   - Implement proper error boundaries
   - Log errors with appropriate context
   - Provide user-friendly error messages
   - Implement retry logic for transient failures

3. **Data Fetching**:
   - Use React Query or SWR for data fetching
   - Implement caching strategies
   - Handle loading and error states
   - Implement pagination for large datasets

## State Management

1. **Local State**:
   - Use React useState for component-specific state
   - Use useReducer for complex state logic

2. **Global State**:
   - Use React Context for shared state
   - Consider Zustand for more complex state management
   - Avoid prop drilling beyond 2 levels

## Testing Standards

1. **Unit Tests**:
   - Test all utility functions
   - Test custom hooks
   - Mock external dependencies

2. **Component Tests**:
   - Test component rendering
   - Test user interactions
   - Test edge cases

3. **Integration Tests**:
   - Test API routes
   - Test authentication flows
   - Test form submissions

## Performance Guidelines

1. **Rendering Optimization**:
   - Use React.memo for pure components
   - Implement virtualization for long lists
   - Optimize images with next/image

2. **Bundle Size**:
   - Use dynamic imports for code splitting
   - Analyze bundle size regularly
   - Minimize dependencies

## Security Rules

1. **Input Validation**:
   - Validate all user inputs server-side
   - Sanitize inputs to prevent XSS attacks
   - Implement CSRF protection

2. **Authentication**:
   - Use HttpOnly cookies for session management
   - Implement proper password hashing
   - Use secure and SameSite cookies

3. **API Security**:
   - Implement rate limiting
   - Use HTTPS for all requests
   - Validate request origins
   - Implement proper error handling to avoid information leakage

## Accessibility Standards

1. **WCAG Compliance**:
   - Aim for WCAG 2.1 AA compliance
   - Use semantic HTML elements
   - Implement proper focus management
   - Provide alternative text for images

2. **Keyboard Navigation**:
   - Ensure all interactive elements are keyboard accessible
   - Implement proper tab order
   - Provide visible focus indicators

## Git Workflow

1. **Branching Strategy**:
   - main: production-ready code
   - develop: integration branch
   - feature/[feature-name]: for new features
   - fix/[issue-number]: for bug fixes

2. **Commit Messages**:
   - Follow conventional commits format
   - Include issue references where applicable

3. **Pull Requests**:
   - Require code review before merging
   - Run automated tests before merging
   - Squash commits on merge
