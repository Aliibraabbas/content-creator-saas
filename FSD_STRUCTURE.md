# Feature Sliced Design (FSD) Structure

This project follows the **Feature Sliced Design** architecture methodology.

## 📁 Folder Structure

```
src/
├── app/                    # Application layer
│   ├── providers/          # Global providers (React Query, Auth, Theme)
│   ├── routes/             # Routing configuration
│   └── styles/             # Global styles
│
├── pages/                  # Pages layer
│   ├── dashboard/          # Dashboard page
│   ├── content-detail/     # Content detail page
│   ├── content-form/       # Create/Edit content page
│   └── profile/            # Profile/Settings page
│
├── widgets/                # Widgets layer
│   ├── content-list/       # Content list widget
│   ├── content-card/       # Content card widget
│   └── header/             # Header widget
│
├── features/               # Features layer
│   ├── content-create/     # Create content feature
│   ├── content-edit/       # Edit content feature
│   ├── content-delete/     # Delete content feature
│   ├── content-favorite/   # Toggle favorite feature
│   └── auth/               # Authentication features
│
├── entities/               # Entities layer
│   └── content/            # Content entity
│       ├── model/          # Zustand store + types
│       ├── api/            # React Query hooks
│       └── ui/             # Content-specific UI components
│
└── shared/                 # Shared layer
    ├── api/                # API client (Supabase)
    ├── config/             # Environment config
    ├── lib/                # Utilities, helpers
    │   └── test/           # Test setup
    └── ui/                 # Reusable UI components (Button, Input, etc.)
```

## 🔄 Import Rules (Dependency Flow)

**STRICT RULE**: Lower layers CANNOT import from upper layers.

```
app → pages → widgets → features → entities → shared
```

### Allowed imports:
- ✅ `pages` can import from `widgets`, `features`, `entities`, `shared`
- ✅ `features` can import from `entities`, `shared`
- ✅ `entities` can import from `shared`
- ❌ `entities` CANNOT import from `features`
- ❌ `shared` CANNOT import from any other layer

## 📦 Layer Responsibilities

### **app/** - Application configuration
- Providers setup (React Query, Auth)
- Routing
- Global styles
- App initialization

### **pages/** - Route pages
- Compose widgets and features
- Handle page-level layout
- One folder per route

### **widgets/** - Complex UI blocks
- Self-contained UI sections
- Can use features and entities
- Reusable across pages

### **features/** - User interactions
- Business logic for user actions
- Forms, mutations, side effects
- One feature = one user action

### **entities/** - Business entities
- Data models and types
- API queries (React Query)
- State management (Zustand)
- Entity-specific UI

### **shared/** - Foundation
- API client
- UI kit (buttons, inputs, etc.)
- Utilities and helpers
- No business logic

## 🎯 Benefits

1. **Scalability**: Clear structure for growing codebase
2. **Maintainability**: Easy to find and modify code
3. **Reusability**: Shared components and logic
4. **Testability**: Isolated layers are easier to test
5. **Team collaboration**: Clear ownership and boundaries
