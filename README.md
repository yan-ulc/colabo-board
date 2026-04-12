# CollaboBoard

Real-time collaborative sticky-note whiteboard built with Next.js, Convex, and Clerk.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![Convex](https://img.shields.io/badge/Convex-Realtime-f97316)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6f45ff)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## 📌 Project Information

- **Project Name**: CollaboBoard
- **Description**: A modern web app where teams can create shared boards, add draggable sticky notes, edit note content, customize colors, and collaborate in real time with live cursor and member presence.
- **Purpose**: To provide a lightweight visual collaboration space for brainstorming, planning, quick retrospectives, and idea mapping without complex setup.
- **Target Users**:
  - Students and study groups
  - Startup/product teams
  - Design and project collaborators
  - Remote teams who need a quick, real-time whiteboard

---

## 1. 🚀 Introduction

CollaboBoard is a full-stack collaborative board platform. It combines a responsive frontend (Next.js + Tailwind CSS), real-time backend logic and storage (Convex), and user authentication (Clerk).

### Background

Many teams need fast collaboration tools, but existing solutions can be too heavy or require complex onboarding. CollaboBoard addresses this by focusing on the essentials:

- Simple board creation and sharing
- Real-time visual collaboration
- Sticky notes with drag-and-drop interaction
- Presence awareness (who is online, where they are pointing)

### Problems It Solves

- **Scattered ideation**: Keeps quick thoughts in one shared visual space.
- **Remote coordination friction**: Live cursors and member stack improve awareness.
- **Board sharing complexity**: Invite by board ID or email for faster onboarding.
- **Slow collaboration feedback loops**: Updates are synchronized in real time.

---

## 2. ✨ Features

### Core Features

1. **Authentication with Clerk**
   - Sign-in / sign-out flow for secure access.
   - Protected routes for dashboard and board pages.

2. **Board Management**
   - Create a new board.
   - Rename and delete existing boards.
   - List owned boards and shared boards in one dashboard.

3. **Collaboration Access Control**
   - Invite members by email.
   - Join board directly using board ID.
   - Membership states in database (`pending`, `approved`) with approved access checks.

4. **Sticky Note Workspace**
   - Add new notes to a board.
   - Drag and drop notes freely on canvas.
   - Edit note text inline.
   - Change note color from properties panel.
   - Delete selected note.

5. **Real-Time Presence**
   - Live collaborative cursor display for other users.
   - Active member stack with profile image or initial fallback.

### Additional Features

1. **Invite Modal UX**
   - One-click board ID copy to clipboard.
   - Email invite submission with loading state.

2. **Performance-Oriented Drag Behavior**
   - Local visual position updates for smooth dragging.
   - Background mutation to persist final position.

3. **Modern UI Components**
   - Reusable button variants via class-variance-authority.
   - Icon-driven interactions with lucide-react.

4. **Type-Safe Full Stack**
   - TypeScript across frontend and backend.
   - Convex-generated API types for safer client calls.

---

## 3. 🧱 Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS v4
  - tw-animate-css
  - shadcn style tokens/components
- **Icons**: lucide-react
- **UI Utility**:
  - class-variance-authority
  - clsx
  - tailwind-merge

### Backend

- **Backend Platform**: Convex
- **Backend Logic**: Convex query/mutation functions
- **Realtime Sync**: Convex subscriptions and reactive queries

### Database

- **Database Engine**: Convex managed database
- **Collections**:
  - `users`
  - `boards`
  - `board_members`
  - `notes`
  - `presence`

### Authentication & Services

- **Auth Provider**: Clerk
- **Auth Bridge for Convex**: `convex/react-clerk`

### Tools

- ESLint 9
- Concurrently (run frontend and backend dev processes together)
- React Compiler flag enabled in Next.js config

---

## 4. 🎨 UI/UX Details

### Color Palette (Primary UI Colors)

These are the dominant values used in the current implementation.

- **Primary Blue**: `#2563EB` (action buttons)
- **Primary Indigo**: `#4F46E5` / Tailwind `indigo-600` (brand accents)
- **Canvas Surface**: `#F3F4F6`
- **Dashboard Background**: `#F9FAFB`
- **Text Primary**: Tailwind `slate-900`
- **Text Secondary**: Tailwind `slate-500`
- **Danger**: Tailwind `red-600` + `red-50`

**Sticky note palette**:

- `#FEF08A` (yellow)
- `#BBF7D0` (green)
- `#BFDBFE` (blue)
- `#FBCFE8` (pink)
- `#FFFFFF` (white)
- `#FED7AA` (orange)

### Typography

- **Main font**: Inter (loaded via Next font)
- **Hierarchy**:
  - H1: 30px (`text-3xl`) for page titles
  - H2/H3: 18-24px (`text-xl`, `text-lg`) for section headers
  - Body: 14-16px (`text-sm`, default body)
  - Micro-labels: 10-12px for helper labels/tooltips

### Layout System

- **Dashboard**:
  - Sticky top navbar
  - Centered container (`max-w-7xl`)
  - Responsive board grid:
  - mobile: 1 column
  - medium: 3 columns
  - large: 4 columns
- **Board Editor**:
  - Split layout:
  - Left canvas area (`flex-[4]`)
  - Right properties panel (`flex-[1]`, min width 300px)
- **Spacing rhythm**:
  - Common spacings use Tailwind `p-4`, `p-6`, `p-10`, `gap-2`, `gap-3`, `gap-6`

### Design Principles

- Minimal but expressive
- Action-first collaborative UX
- Clear visual grouping and hierarchy
- Soft shadows + rounded corners for approachable feel
- Real-time visual feedback prioritized over complex controls

### Dark Mode / Light Mode

- Global theme tokens define both light and dark variables in CSS.
- The current app screens are primarily designed around light visuals.
- Dark mode variable infrastructure is present and can be expanded for full screen-level support.

---

## 5. 🖼️ Screenshots / Preview

Add your screenshots inside a folder such as `docs/images/`.

### 1. Landing / Sign-in Screen

![Landing Screen](docs/images/landing.png)

Shows welcome flow and authentication entry point.

### 2. Dashboard Screen

![Dashboard Screen](docs/images/dashboard.png)

Displays board cards, create board action, join board action, and user menu.

### 3. Board Workspace Screen

![Board Workspace](docs/images/board-workspace.png)

Main canvas with sticky notes, toolbar actions, and active users.

### 4. Invite Modal

![Invite Modal](docs/images/invite-modal.png)

Board sharing flow via board ID and email invite.

### 5. Properties Panel

![Properties Panel](docs/images/properties-panel.png)

Color switcher and note deletion tools.

---

## 6. 🛠️ Installation Guide

### Prerequisites

Install the following before setup:

- Node.js 20+
- pnpm (recommended) or npm
- A Clerk account/project
- A Convex project

### Step-by-Step Setup

1. Clone repository

```bash
git clone <your-repository-url>
cd collabo-board
```

2. Install dependencies

```bash
pnpm install
```

3. Configure environment variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_JWT_ISSUER_DOMAIN=
CLERK_SECRET_KEY=
```

4. Run development environment

```bash
pnpm dev
```

This runs:

- Next.js frontend
- Convex backend dev process

5. Open app

- Visit `http://localhost:3000`

### Useful Scripts

```bash
pnpm dev            # frontend + backend together
pnpm dev:frontend   # next dev only
pnpm dev:backend    # convex dev only
pnpm build          # production build
pnpm start          # run production server
pnpm lint           # lint checks
```

---

## 7. 📘 Usage

### User Flow

1. Open homepage.
2. Sign in using Clerk.
3. System syncs your user profile into Convex (`user.store`).
4. Enter dashboard and create a board.
5. Open board and click **Add Note**.
6. Drag notes around the canvas.
7. Click a note to edit text.
8. Use properties panel to change color or delete note.
9. Invite teammates by:
   - copying board ID
   - inviting via email in modal
10. Collaborate live while seeing:
    - active collaborators
    - real-time cursor indicators

---

## 8. 🗂️ Project Structure

```text
collabo-board/
├── convex/
│   ├── auth.config.ts
│   ├── board.ts
│   ├── note.ts
│   ├── presence.ts
│   ├── schema.ts
│   ├── user.ts
│   └── _generated/
├── public/
├── src/
│   ├── app/
│   │   ├── board/[boardId]/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── board/
│   │   │   ├── BoardCanvas.tsx
│   │   │   ├── CursorPresence.tsx
│   │   │   ├── InviteModal.tsx
│   │   │   ├── PropertiesPanel.tsx
│   │   │   ├── StickyNote.tsx
│   │   │   └── UserStack.tsx
│   │   └── ui/
│   │       └── button.tsx
│   ├── lib/
│   │   ├── convex.ts
│   │   └── utils.ts
│   ├── providers/
│   │   └── convexClientProvider.tsx
│   └── midleware.ts
├── package.json
└── README.md
```

### Key File Responsibilities

- `convex/schema.ts`: Data model and indexes.
- `convex/board.ts`: Board CRUD, invites, joining, board-level access checks.
- `convex/note.ts`: Note CRUD and note-level updates.
- `convex/presence.ts`: Live cursor and active users.
- `convex/user.ts`: Clerk user sync into internal `users` table.
- `src/app/dashboard/page.tsx`: Board listing and management UI.
- `src/app/board/[boardId]/page.tsx`: Collaboration workspace UI.
- `src/components/board/*`: Collaboration widgets and editor interactions.
- `src/providers/convexClientProvider.tsx`: Clerk + Convex provider composition.

---

## 9. 🔌 API Documentation (Convex Functions)

This project uses Convex functions (queries/mutations) instead of traditional REST endpoints.

### Authentication Rule

Most write operations check user identity using `ctx.auth.getUserIdentity()`.

### Board Functions (`convex/board.ts`)

1. `create` (mutation)
   - **Args**: `{ title: string }`
   - **Behavior**: Creates board and auto-adds owner to membership list.
   - **Returns**: `boardId`

2. `inviteUser` (mutation)
   - **Args**: `{ boardId: Id<"boards">, email: string }`
   - **Behavior**: Finds user by email and inserts approved membership.
   - **Returns**: success message string.

3. `get` (query)
   - **Args**: `{}`
   - **Behavior**: Returns owned + shared approved boards.
   - **Returns**: board list sorted by creation time desc.

4. `update` (mutation)
   - **Args**: `{ id: Id<"boards">, title: string }`
   - **Behavior**: Renames board.

5. `remove` (mutation)
   - **Args**: `{ id: Id<"boards"> }`
   - **Behavior**: Deletes board and related notes.

6. `joinBoard` (mutation)
   - **Args**: `{ boardId: string }`
   - **Behavior**: Validates board ID, joins user as approved member.
   - **Returns**: normalized board ID.

7. `getById` (query)
   - **Args**: `{ id: Id<"boards"> }`
   - **Behavior**: Returns board only if user has ownership or approved membership.

### Note Functions (`convex/note.ts`)

1. `getByBoard` (query)
   - **Args**: `{ boardId: Id<"boards"> }`
   - **Returns**: all notes in the board.

2. `create` (mutation)
   - **Args**: `{ boardId: Id<"boards">, x: number, y: number }`
   - **Behavior**: Creates note with default text and color.

3. `updatePosition` (mutation)
   - **Args**: `{ id: Id<"notes">, x: number, y: number }`

4. `updateText` (mutation)
   - **Args**: `{ id: Id<"notes">, text: string }`

5. `updateColor` (mutation)
   - **Args**: `{ id: Id<"notes">, color: string }`

6. `remove` (mutation)
   - **Args**: `{ id: Id<"notes"> }`

### Presence Functions (`convex/presence.ts`)

1. `update` (mutation)
   - **Args**: `{ boardId: Id<"boards">, x: number, y: number }`
   - **Behavior**: Upserts current user cursor position.

2. `list` (query)
   - **Args**: `{ boardId: Id<"boards"> }`
   - **Behavior**: Returns recent presence entries except the current user.

3. `getActiveUsers` (query)
   - **Args**: `{ boardId: Id<"boards"> }`
   - **Behavior**: Returns users active in recent time window (3 minutes).

### User Function (`convex/user.ts`)

1. `store` (mutation)
   - **Args**: `{}`
   - **Behavior**: Creates or updates internal user record from Clerk token identity.

### Request/Response Examples

```ts
// create board
await createBoard({ title: "Sprint Planning" });

// join board by pasted ID
await joinBoard({ boardId: "k57..." });

// create note
await createNote({ boardId, x: 120, y: 240 });

// update note color
await updateColor({ id: noteId, color: "#BFDBFE" });
```

---

## 10. ⚙️ Configuration

### Environment Variables

Create `.env.local` in root:

| Variable                            | Required | Description                                              |
| ----------------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_CONVEX_URL`            | Yes      | Public Convex deployment URL used by React client.       |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes      | Clerk publishable key for frontend auth.                 |
| `CLERK_JWT_ISSUER_DOMAIN`           | Yes      | Clerk issuer domain used by Convex auth provider config. |
| `CLERK_SECRET_KEY`                  | Yes      | Clerk secret key for server-side auth operations.        |

### Important Config Files

- `next.config.ts`
  - React Compiler enabled.
- `src/providers/convexClientProvider.tsx`
  - Wires Clerk provider and Convex auth bridge.
- `convex/auth.config.ts`
  - Convex authentication provider definition for Clerk.
- `src/midleware.ts`
  - Protects dashboard and board routes through Clerk middleware.

---

## 11. ⚡ Performance & Optimization

Current optimizations already used in this project:

1. **Local drag state for smooth UX**
   - Notes move instantly in local state during drag.
   - Final position is persisted after mouse release.

2. **Indexed Convex reads**
   - Schema defines indexes such as:
     - `by_externalId`
     - `by_ownerId`
     - `by_boardId`
     - `by_board_and_user`
   - This improves query performance and lookup speed.

3. **Board deduplication in UI**
   - Prevents duplicated board cards when owner and member data overlap.

4. **Presence time-window filtering**
   - Limits stale cursor/user entries to keep real-time views lightweight.

5. **React Compiler enabled**
   - Configured in Next.js to support future rendering optimizations.

### Recommended Next Optimizations

- Add debouncing/throttling for mouse move presence updates.
- Introduce virtualization if note count grows significantly.
- Add image optimization pipeline for user avatars.

---

## 12. 🔒 Security

### Security Practices Implemented

1. **Authenticated data operations**
   - Critical mutations check identity via Convex auth context.

2. **Route protection**
   - Dashboard and board routes are restricted with Clerk middleware.

3. **Access checks for board reads**
   - `board.getById` ensures only owners or approved members can read a board.

4. **Typed backend args**
   - Convex validators (`v.string()`, `v.id()`, etc.) enforce runtime input constraints.

### Security Best-Practice Checklist (Recommended)

- Add authorization checks to all mutating note operations (position, text, color, delete).
- Add centralized permission helper for board membership validation.
- Add audit logging for destructive actions (board/note deletes).
- Add rate-limiting strategy for presence updates.

---

## 13. 🚢 Deployment

### Recommended Deployment Architecture

- **Frontend**: Vercel
- **Backend/Database**: Convex Cloud
- **Auth**: Clerk

### Deploy Steps

1. Push repository to GitHub.
2. Create Convex production deployment and copy deployment URL.
3. Configure Clerk production application.
4. In Vercel project settings, add environment variables:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_JWT_ISSUER_DOMAIN`
   - `CLERK_SECRET_KEY`
5. Connect GitHub repo to Vercel and deploy.
6. In Convex and Clerk dashboards, allow your production domain.

### Post-Deployment Verification

- Can sign in and sign out.
- Dashboard loads with authenticated user data.
- Board creation and note operations succeed.
- Invite and join flow works.
- Presence updates visible between two accounts.

---

## 14. 🛣️ Roadmap

Planned improvements:

1. Board role system (owner, editor, viewer).
2. Real invite workflow with pending approvals and notifications.
3. Keyboard shortcuts (delete note, duplicate note, quick create).
4. Multi-select notes and group move.
5. Zoom/pan canvas controls.
6. Board templates (retro, kanban, mind map starter).
7. Export board as image/PDF.
8. Full dark-mode-first UI refinement.
9. E2E tests for collaboration flows.

---

## 15. 🤝 Contributing

Contributions are welcome.

### Development Workflow

1. Fork repository.
2. Create branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit with clear messages:

```bash
git commit -m "feat: add board zoom controls"
```

4. Push branch and open Pull Request.

### Pull Request Guidelines

- Keep PR focused and reasonably small.
- Explain what changed and why.
- Include screenshots for UI changes.
- Mention affected Convex functions if backend logic changed.
- Ensure lint passes before requesting review.

### Code Quality

- Use TypeScript types for all new logic.
- Prefer reusable components over copy-paste UI.
- Keep mutations/queries explicit and validated.

---

## 16. 📄 License

This project is currently shared without an explicit license file.

Recommended action:

- Add a `LICENSE` file (for example MIT) to clearly define usage rights.

If you want this to be open-source friendly, MIT is a practical default.

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/)

---

## 📬 Contact

For support, feature requests, or collaboration inquiries, open an issue in this repository.
