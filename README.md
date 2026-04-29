# Insighta CLI

## Overview

Insighta CLI is the command-line interface for Insighta Labs+ Stage 3 Backend Engineers Assessment.

This tool allows users to securely interact with the Insighta Backend directly from the terminal using refresh token authentication, automatic access token handling, and protected API requests.

The CLI connects to the same backend used by the web portal and supports role-based access through JWT authentication.

---

## Features

* Secure CLI login using refresh token
* Automatic access token generation
* Local credential storage
* Protected API request support
* Profile access from terminal
* Current user information lookup
* CSV profile export access
* Logout support
* Globally installable package

---

## System Connection

This project works with:

### Backend Repository

```text id="cli-backend"
insighta-backend
```

The backend handles:

* GitHub OAuth
* JWT access tokens
* refresh tokens
* role-based access control
* profile endpoints
* CSV export

### Web Portal Repository

```text id="cli-web"
insighta-web
```

The web portal provides browser-based access using the same backend.

All three systems connect to one shared backend.

---

## Authentication Flow

### Step 1 — GitHub Login

User logs in through backend GitHub OAuth:

```http id="cli-auth1"
GET /api/v1/auth/github
```

Backend returns:

* accessToken
* refreshToken

---

### Step 2 — CLI Login

User runs:

```bash id="cli-auth2"
insighta login
```

Then pastes:

```text id="cli-auth3"
refreshToken
```

The CLI sends:

```http id="cli-auth4"
POST /api/v1/auth/refresh
```

Backend returns a fresh:

```text id="cli-auth5"
accessToken
```

---

### Step 3 — Credentials Storage

Tokens are stored locally at:

```bash id="cli-auth6"
~/.insighta/credentials.json
```

Example:

```json id="cli-auth7"
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## Available Commands

---

## Login

```bash id="cli-cmd1"
insighta login
```

Logs user in using refresh token.

---

## Logout

```bash id="cli-cmd2"
insighta logout
```

Removes stored local credentials.

---

## Current User

```bash id="cli-cmd3"
insighta whoami
```

Shows the currently stored access token / authenticated user information.

---

## Request Protected API

### Get all profiles

```bash id="cli-cmd4"
insighta request profile
```

(Admin only)

---

### Get current user

```bash id="cli-cmd5"
insighta request profile/me
```

(Admin + Analyst)

---

### Export profiles CSV

```bash id="cli-cmd6"
insighta request profile/export
```

(Admin only)

---

## Token Handling Approach

### Refresh Token

Used only for:

* login
* generating new access tokens

Never used for protected API calls.

---

### Access Token

Used for:

```http id="cli-token1"
Authorization: Bearer <accessToken>
```

Automatically attached to protected requests.

Used for:

* profile access
* export access
* current user route

---

## Role-Based Access

The backend enforces:

### Admin

Can access:

* all profiles
* export CSV
* protected admin routes

### Analyst

Can access:

* own profile only

The CLI respects backend role validation automatically.

---

## Installation

---

## Clone repository

```bash id="cli-install1"
git clone <your-cli-repo-url>
cd insighta-cli
```

---

## Install dependencies

```bash id="cli-install2"
npm install
```

---

## Link globally

```bash id="cli-install3"
npm link
```

This enables:

```bash id="cli-install4"
insighta
```

from anywhere in terminal.

---

## Run Example

```bash id="cli-run1"
insighta login
insighta request profile
insighta request profile/me
insighta request profile/export
```

---

## Folder Structure

```bash id="cli-structure"
bin/
src/
 ├── commands/
 ├── config/
 ├── core/
 ├── utils/
package.json
README.md
```

---

## Error Handling

The CLI handles:

* missing credentials
* expired access tokens
* invalid refresh tokens
* insufficient permissions
* protected route failures
* backend connection issues

This improves stability and production readiness.

---

## Deployment Note

This project is a local globally-installed CLI tool and does not require web deployment like the backend or frontend.

It connects to the deployed backend URL.

Example:

```text id="cli-live"
https://your-backend-url.up.railway.app
```

---

## Author

Built by:

**Harbeahorlar Berry**

Backend Engineers — Stage 3 Submission
