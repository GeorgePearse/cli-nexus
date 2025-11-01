# CLI Nexus

A modern, web-based interface for interacting with coding CLIs like Claude Code, Gemini CLI, and other AI-powered development tools.

## Vision

CLI Nexus aims to provide a unified, intuitive graphical interface that bridges the power of command-line AI coding assistants with the accessibility of modern web applications. Instead of juggling multiple terminal windows and CLI tools, developers can interact with all their coding assistants through a single, cohesive interface.

## Key Features (Planned)

- **Unified Interface**: Single web-based UI to interact with multiple coding CLIs
  - Claude Code
  - Gemini CLI
  - And more to come

- **Session Management**:
  - Manage multiple concurrent sessions with different CLIs
  - Save and resume conversation history
  - Switch between different projects seamlessly

- **Enhanced Visualization**:
  - Syntax-highlighted code snippets
  - File tree visualization
  - Diff viewers for code changes
  - Rich markdown rendering

- **Workflow Tools**:
  - Side-by-side comparison of responses from different CLIs
  - Export conversations and code snippets
  - Custom prompts and templates library
  - Project context management

- **Developer Experience**:
  - Keyboard shortcuts for power users
  - Dark/light theme support
  - Responsive design for various screen sizes
  - Real-time streaming responses

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Toolchain**: oxc ecosystem (oxlint for ultra-fast linting)
- **Styling**: TBD (considering Tailwind CSS, styled-components, or CSS modules)
- **State Management**: TBD (React Context, Zustand, or Jotai)

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express
- **Database**: PostgreSQL (Neon)
- **ORM**: Native pg driver
- **Development**: tsx, nodemon

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- PostgreSQL database (we recommend [Neon](https://neon.tech) for serverless Postgres)

### Installation

```bash
# Clone the repository
git clone https://github.com/GeorgePearse/cli-nexus.git
cd cli-nexus

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your database connection string

# Run database migrations
npm run migrate

# Start development servers (frontend + backend)
npm run dev:all

# Or run them separately:
npm run dev        # Frontend only
npm run dev:server # Backend only
```

### Available Scripts

#### Frontend
- `npm run dev` - Start frontend development server with hot reload
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build locally

#### Backend
- `npm run dev:server` - Start backend development server with auto-reload
- `npm run build:server` - Build backend for production
- `npm run server` - Start production backend server
- `npm run migrate` - Run database migrations

#### Full Stack
- `npm run dev:all` - Run both frontend and backend concurrently

#### Code Quality
- `npm run lint` - Run oxlint for code quality checks
- `npm run lint:fix` - Auto-fix linting issues

## Project Structure

```
cli-nexus/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # CLI integration services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main application component
├── server/                 # Backend source code
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── db/                 # Database configuration and migrations
│   ├── middleware/         # Express middleware
│   ├── types/              # Backend type definitions
│   └── index.ts            # Server entry point
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── oxlintrc.json           # oxc linter configuration
└── tsconfig.server.json    # TypeScript config for backend
```

## Database Schema

The application uses PostgreSQL with the following main tables:

- **sessions** - CLI session information
- **messages** - Conversation messages linked to sessions
- **cli_configs** - User CLI configurations

See `server/db/schema.sql` for the complete schema.

## Contributing

Contributions are welcome! This project is in early stages, and we're open to ideas and improvements.

### Development Guidelines

1. Follow the existing code style (enforced by oxlint)
2. Write meaningful commit messages
3. Add tests for new features (testing framework TBD)
4. Update documentation as needed

### Roadmap

- [ ] Basic UI layout and navigation
- [ ] CLI process management and communication
- [ ] Session persistence
- [ ] Multi-CLI support
- [ ] Syntax highlighting and code display
- [ ] File tree visualization
- [ ] Settings and configuration panel
- [ ] Keyboard shortcuts
- [ ] Export functionality

## License

TBD (suggest MIT or Apache 2.0)

## Acknowledgments

- Inspired by the need for better UX around CLI-based AI coding tools
- Built with modern web technologies for performance and developer experience

## References

- [Codexia](https://github.com/milisp/codexia) - A similar project exploring AI coding assistant interfaces

---

**Status**: 🚧 Early Development - Not yet functional

For questions or suggestions, please open an issue on GitHub.
