### Prerequisites

- Node.js version: **22.19.0**
- npm version: **10.9.3**

### Running locally

1. Create `.env` file with the following variables:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Important Note

You will need to provide me with a testing Gmail account so I can whitelist it for testing purposes.

### Notes for Further Development

Application is not production ready. There are a lot of things to be covered:

- **Session handling**: Improve session management and persistence (Security critical)
- **Refresh token**: Introduce refresh token into the app (Security critical)
- **Backend separation**: Replace Supabase quick solution with a separated backend implementation (Security/Architecture)
- **Testing**: Add tests to make sure all cases are covered (Reliability & Security)
- **TypeScript improvements**: Improve TypeScript usage by removing `any` types throughout the codebase (Code quality)
- **Calendar component**: Continue working on Calendar component, separate additional components for better code organization
- **UI/UX improvements**: Improve the flow and user experience
- **Login page**: Enhance Login page with more descriptive information
