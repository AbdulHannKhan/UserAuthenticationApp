# User Authentication App

A React Native authentication app built with TypeScript, implementing signup, login, and session persistence using the Context API and AsyncStorage.

## Implemented Features

### Authentication

- **Signup** with name, email, and password. Duplicate email addresses are rejected with an "Email already exists" toast.
- **Login** with email and password. Invalid credentials trigger an "Invalid credentials" error toast.
- **Logout** clears the active session and returns to the auth flow.
- **Session Persistence** via AsyncStorage -- the user stays logged in after an app restart.

### Form Handling

- **Formik** manages all form state, submission, and field-level validation.
- Centralized validation logic in `src/Formik/Validations/` with proper `FormikErrors<T>` return types.
- Centralized initial values in `src/Formik/InitialValues/`.
- Email format validation and minimum 6-character password enforcement.

### Navigation

- **React Navigation** with separate `AuthStack` (Login, Signup) and `HomeStack` (Home).
- `AppNavigator` conditionally renders the correct stack based on authentication state.
- Loading indicator while the stored session is being hydrated on app launch.

### UI / UX

- **Custom toast notifications** via `react-native-toast-message` with styled error and success variants.
- **Password visibility toggle** using Feather eye/eye-off icons from `react-native-vector-icons`.
- **Responsive styling** using `react-native-size-matters` (`scale`, `verticalScale`, `moderateScale`) across all screens and components.
- **Centralized theming** with `Colors` and `Fonts` constants (Poppins font family).
- Reusable `AuthInput` component wrapped in `React.memo` for performance.

### Code Quality

- **MVVM architecture**: Screens are pure UI, all business logic lives in dedicated ViewController hooks (`useLoginController`, `useSignupController`, `useHomeController`).
- **Strict TypeScript** with explicit return types on all functions, `as const` theme objects, `FormikErrors<T>` generics, and typed `catch (error: unknown)`.
- **Performance optimizations**: `useCallback` on all callbacks, `useMemo` on context value with correct dependency arrays, `React.memo` on `AuthInput`.
- No dead code, no unused imports, no unused styles.

## Project Structure

```
src/
  Components/
    Input/
      AuthInput.tsx            # Reusable text input with label, error, and password toggle
  Config/
    toastConfig.tsx            # Custom toast UI (error & success variants)
  Context/
    AuthContext.tsx             # AuthProvider, useAuth hook, login/signup/logout logic
  Formik/
    InitialValues/
      index.tsx                # loginInitialValues, signupInitialValues
    Validations/
      index.tsx                # Email/password validators, form validation functions
  Navigation/
    AppNavigator.tsx           # Root navigator (AuthStack or HomeStack based on auth)
    AuthStack.tsx              # Login + Signup stack
    HomeStack.tsx              # Home stack
  Screens/
    Auth/
      Login/index.tsx          # Login screen UI
      Signup/index.tsx         # Signup screen UI
    HomeScreens/
      Home/index.tsx           # Home screen UI (user info + logout)
  Theme/
    index.ts                   # Colors and Fonts constants
  Types/
    auth.ts                    # User, AuthContextType
    controllers.ts             # LoginControllerViewModel, SignupControllerViewModel, HomeControllerViewModel
    forms.ts                   # LoginFormValues, SignupFormValues
  ViewController/
    Auth/
      Login/index.tsx          # useLoginController hook
      Signup/index.tsx         # useSignupController hook
    HomeScreens/
      Home/index.tsx           # useHomeController hook
```

## Setup Instructions

### Prerequisites

- Node.js >= 22.11.0
- React Native CLI
- Xcode (for iOS) / Android Studio (for Android)
- CocoaPods (for iOS)

### 1. Install dependencies

```bash
npm install
```

### 2. iOS only -- install pods

```bash
cd ios && pod install && cd ..
```

### 3. Start Metro bundler

```bash
npm start
```

### 4. Run the app

```bash
# Android
npm run android

# iOS
npm run ios
```

## Validation Rules

| Screen | Field    | Rule                                  |
| ------ | -------- | ------------------------------------- |
| Login  | Email    | Must match a valid email format       |
| Login  | Password | Cannot be empty                       |
| Signup | Name     | Cannot be empty                       |
| Signup | Email    | Must match a valid email format       |
| Signup | Password | Minimum 6 characters                  |

Additional server-level checks:

- **Login**: Throws "Invalid credentials" if no matching user is found.
- **Signup**: Throws "Email already exists" if the email is already registered.

## Test Flow

1. Open the app -- you land on the **Login** screen.
2. Tap **Go to Signup** and create an account with valid data.
3. On success you are automatically navigated to the **Home** screen showing your name and email.
4. Tap **Logout** and verify you return to the Login screen.
5. Login with the same credentials and verify you reach the Home screen again.
6. Kill and reopen the app -- verify session persistence (you should still be logged in).
7. Try signing up again with the same email -- verify the "Email already exists" error toast.
8. Try logging in with wrong credentials -- verify the "Invalid credentials" error toast.

## Key Libraries

| Library                          | Purpose                          |
| -------------------------------- | -------------------------------- |
| `@react-navigation/native`      | Navigation framework             |
| `@react-navigation/native-stack` | Native stack navigator          |
| `@react-native-async-storage/async-storage` | Persistent key-value storage |
| `formik`                         | Form state management            |
| `react-native-toast-message`     | Toast notifications              |
| `react-native-vector-icons`      | Feather icons (eye toggle)       |
| `react-native-size-matters`      | Responsive scaling utilities     |
| `react-native-safe-area-context` | Safe area insets                 |
