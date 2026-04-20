# Prompts de Ingeniería — cart-manager

Colección de prompts estructurados utilizados durante el desarrollo del proyecto `cart-manager`,
siguiendo los principios de **Prompt Engineering** del CoE ITAC:

1. Comentarios claros y descriptivos
2. Pasos secuenciales
3. Contexto específico del framework/tecnología
4. Ejemplos de entrada/salida cuando aplica
5. Restricciones explícitas

---

## PROMPT 1 — Configuración de variables de entorno

**Branch:** `feature/CART-5/env-config`

```
// Context: Angular 21 project, cart-manager, gitflow branching model
// Task: Add .env and .env.example files for environment configuration
// Step 1: Create .env with PROJECT_JIRA=CART variable for commitlint
// Step 2: Create .env.example as a safe template without real values
// Step 3: Ensure .env is listed in .gitignore, .env.example is committed
// Constraints: Never commit real secrets; .env.example must be a public template
// Expected output: .env ignored by git, .env.example tracked by git
```

**Archivos generados:** `.env`, `.env.example`, `.gitignore` (actualizado)

---

## PROMPT 2 — ESLint + Prettier

**Branch:** `feature/CART-6/eslint-prettier`

```
// Context: Angular 21 project with TypeScript, cart-manager
// Task: Configure ESLint with Angular-specific rules and Prettier for code formatting
// Step 1: Install @angular-eslint, @typescript-eslint, eslint-config-prettier
// Step 2: Create eslint.config.js (flat config) with TypeScript rules
// Step 3: Create .prettierrc with standard formatting rules
// Step 4: Create .prettierignore to exclude package-lock.json, dist, coverage
// Constraints: ESLint v10 uses flat config; no conflict between ESLint and Prettier
// Expected output: `npx eslint src/` runs without config errors
```

**Archivos generados:** `eslint.config.js`, `.prettierrc`, `.prettierignore`

---

## PROMPT 3 — CommitLint + lefthook

**Branch:** `feature/CART-7/commitlint-lefthook`

```
// Context: Angular 21 project, gitflow, Smart Commits format required by ITAC CoE
// Task: Configure commitlint with lefthook to validate Smart Commits on commit-msg hook
// Smart Commits format: "prefix((PROJECT-NNN) - HU(PROJECT-NNN)): description"
// Step 1: Install @commitlint/cli and lefthook
// Step 2: Create commitlint.config.cjs with custom scope regex validator
// Step 3: Configure lefthook.yml with commit-msg and pre-commit hooks
// Step 4: Run lefthook install to activate hooks
// Constraints: PROJECT_JIRA read from .env; scope must match (CART-NNN) - HU(CART-NNN) pattern
// Expected output: commits with wrong format are rejected; valid Smart Commits pass
```

**Archivos generados:** `commitlint.config.cjs`, `lefthook.yml`

---

## PROMPT 4 — Barrel files (index.ts)

**Branch:** `feature/CART-8/barrel-files`

```
// Context: Angular 21 project, cart-manager, ITAC CoE standards
// Task: Add index.ts barrel files to encapsulate exports from components, services, models
// Step 1: Create src/app/models/index.ts exporting Product and CartItem interfaces
// Step 2: Create src/app/services/index.ts exporting ProductService and AlertService
// Step 3: Create src/app/components/index.ts exporting all component classes
// Constraints: Barrel files must only re-export; no logic inside index.ts files
// Expected output: imports can use folder path instead of specific file path
```

**Archivos generados:**
- `src/app/models/index.ts`
- `src/app/services/index.ts`
- `src/app/components/index.ts`

---

## PROMPT 5 — Atomic Design (restructura de componentes)

**Branch:** `feature/CART-9/atomic-design`

```
// Context: Angular 21 project, Atomic Design methodology (5 levels)
// Task: Reorganize src/app/components into Atomic Design folder structure
// Atomic levels: atoms / molecules / organisms / templates / pages
// Step 1: Create folder structure atoms, molecules, organisms, templates, pages
// Step 2: Classify existing components:
//   - product-form → molecules (form with multiple fields)
//   - product-list → organisms (complex section with multiple molecules)
//   - cart → organisms (complex section with multiple molecules)
// Step 3: Move components to correct folders and update all imports
// Step 4: Update barrel index.ts to reflect new paths
// Constraints: Build must compile after move; no logic changes, only structural
// Expected output: ng build succeeds with atomic folder structure
```

**Estructura resultante:**
```
src/app/components/
  atoms/
  molecules/
    product-form/
  organisms/
    cart/
    product-list/
  templates/
  pages/
  index.ts
```

---

## PROMPT 6 — Unit Tests (Vitest)

**Branch:** `feature/CART-10/unit-tests`

```
// Context: Angular 21 project, Vitest runner, ITAC CoE coverage standards
// Task: Write real unit tests for ProductService and AlertService
// Step 1: Test ProductService - getProducts, addProduct, updateProduct, deleteProduct
// Step 2: Test ProductService - addToCart, removeFromCart, updateCartQuantity, getCartTotal
// Step 3: Test AlertService - mock SweetAlert2 and verify confirmDelete, success, error, info
// Input: ProductService initial state has 3 products (ids 1, 2, 3)
// Output: All methods covered, edge cases tested (empty cart, duplicate cart item, qty <= 0)
// Constraints: No real browser dialogs; mock Swal.fire with vi.spyOn; use Vitest API (not Jasmine)
// Expected output: 28/28 tests pass
```

**Archivos generados/actualizados:**
- `src/app/services/product.spec.ts` — 22 tests (ProductService)
- `src/app/services/alert.spec.ts` — 6 tests (AlertService)
- `src/app/app.spec.ts` — corregido selector del título

---

## PROMPT 7 — GitHub Actions Workflows + CODEOWNERS

**Branch:** `feature/CART-11/github-workflows`

```
// Context: Angular 21 project, gitflow with integration/laboratory/main branches
// Task: Add GitHub Actions workflows and CODEOWNERS following ITAC CoE standards
// Step 1: Create .github/CODEOWNERS assigning required reviewers per branch
// Step 2: Create requirements.yml - installs deps and runs lint on PRs to integration
// Step 3: Create integration.yml - runs tests on merge to integration
// Step 4: Create laboratory.yml - runs build on merge to laboratory
// Step 5: Create production.yml - runs build + tag validation on merge to main
// Constraints: Node 22.x; approval matrix: integration needs 2 reviews, main needs DevOps+Architect
// Expected output: .github/ folder with 4 workflow files + CODEOWNERS
```

**Archivos generados:**
- `.github/CODEOWNERS`
- `.github/workflows/requirements.yml`
- `.github/workflows/integration.yml`
- `.github/workflows/laboratory.yml`
- `.github/workflows/production.yml`

---

## Resumen de ramas creadas

| Branch | Ticket | Descripción |
|--------|--------|-------------|
| `feature/CART-5/env-config` | CART-5 | Variables de entorno |
| `feature/CART-6/eslint-prettier` | CART-6 | ESLint + Prettier |
| `feature/CART-7/commitlint-lefthook` | CART-7 | CommitLint + lefthook |
| `feature/CART-8/barrel-files` | CART-8 | Barrel files index.ts |
| `feature/CART-9/atomic-design` | CART-9 | Atomic Design structure |
| `feature/CART-10/unit-tests` | CART-10 | Unit tests Vitest |
| `feature/CART-11/github-workflows` | CART-11 | GitHub Actions + CODEOWNERS |
