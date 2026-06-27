# Contributing Guidelines

Thank you for your interest in contributing to this project! To make the contribution process efficient and organized, please follow these guidelines.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](file:///c:/Users/Raj/Documents/GitHub/Portfolio/CODE_OF_CONDUCT.md). Please report any unacceptable behavior to the project maintainers.

## Branching Strategy

1. Fork the repository and create your branch from `main` (or `master`).
2. Use descriptive branch names:
   - `feat/feature-name` for new features
   - `fix/bug-name` for bug fixes
   - `docs/doc-update` for documentation changes
   - `refactor/clean-code` for code quality improvements
   - `chore/update-deps` for dependency updates or configuration tweaks

## Commit Message Conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to keep a clean, parsable commit history. Please structure your commit messages as follows:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Example Commit Messages
- `feat(projects): add drag-and-drop sort functionality for portfolio cards`
- `fix(auth): prevent unauthorized mutation bypass in server action guard`
- `docs(readme): update environment variable setup instructions`

## Coding Standards

### Design System (Strict Neo-Brutalism)
All visual updates must comply with the design guidelines defined in [Theme.md](file:///c:/Users/Raj/Documents/GitHub/Portfolio/Theme.md):
- **No Rounded Corners**: Use solid 0px border-radius structure.
- **Flat Layouts**: Avoid soft blurs, text glow, drop shadows, or z-axis elevation effects.
- **Contrast**: Maintain clear borders (`border-2 border-border`) instead of soft gradients or color fading.
- **Hover Pattern**: Implement flat color filling on interaction (e.g. `bg-accent text-accent-foreground` hover fill).

### Code Validation Rules
Before submitting a pull request, run the local quality checks:
- Standard Code Linting: `npm run lint`
- TypeScript Compilation: `npx tsc --noEmit`
- Build Dry Run: `npm run build`

The GitHub Actions CI pipeline will run these steps automatically on every pull request. PRs with failing checks will not be merged.

## Submission Workflow

1. Push your branch to your forked repository.
2. Open a Pull Request from your branch to the main branch.
3. Fill out the [Pull Request Template](file:///c:/Users/Raj/Documents/GitHub/Portfolio/.github/PULL_REQUEST_TEMPLATE.md) with details about your change.
4. Address any feedback from code reviews or failing CI pipeline checks.
5. Once approved and checks pass, your changes will be merged!
