# Table of Contents

### 1. [User API](#1-user-api-1)
- 1.1 Show User Profile [GET /user] [here](#11-show-user-profile-get-user)
- 1.2 Update User Account [POST /user/update] [here](#12-update-user-account-post-userupdate)
- 1.3 Ban User [POST /user/ban] [here](#13-ban-user-post-userban)
- 1.4 Unban User [POST /user/unban] [here](#14-unban-user-post-userunban)

### 2. [Authentication API](#2-authentication-api-1)
- 2.1 Login [POST /auth/login] [here](#21-login-post-authlogin)
- 2.2 Register [POST /auth/register] [here](#22-register-post-authregister)
- 2.3 Logout [POST /auth/logout] [here](#23-logout-post-authlogout)

### 3. [News API](#3-news-api-1)
- 3.1 Show All News (Search) [GET /berita] [here](#31-show-all-news-search-get-berita)
- 3.2 Show News by ID [GET /berita/id/{id}] [here](#32-show-news-by-id-get-beritaidid)
- 3.3 Show News by Category [GET /berita/kategori/{id}] [here](#33-show-news-by-category-get-beritakategoriid)
- 3.4 Like News [POST /berita/like] [here](#34-like-news-post-beritalike)

### 4. [Event API](#4-event-api-1)
- 4.1 Show All Events [GET /event] [here](#41-show-all-events-get-event)
- 4.2 Show Event by ID [GET /event/id/{id}] [here](#42-show-event-by-id-get-eventidid)
- 4.3 Register to Event [POST /event/register] [here](#43-register-to-event-post-eventregister)
- 4.4 Unregister from Event [POST /event/unregister] [here](#44-unregister-from-event-post-eventunregister)

### 5. [Job Vacancy API](#5-job-vacancy-api-1)
- 5.1 Show All Job Vacancies (Search) [GET /loker] [here](#51-show-all-job-vacancies-search-get-loker)
- 5.2 Show Job Vacancy by ID [GET /loker/id/{id}] [here](#52-show-job-vacancy-by-id-get-lokeridid)

<br>

# 1. User API

### 1.1 Show User Profile [GET /user]

**Description:** This API endpoint is used to retrieve the user profile.

**Parameters:**
- None

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
        "alumni": {
            // data alumni
        }
    }
}
```

### 1.2 Update User Account [POST /user/update]

**Description:** This API endpoint is used to update the user account.

**Parameters:**
- `email`: `string`
- `old_password`: `string`
- `password`: `string`
- `password_confirmation`: `string`
- `avatar`: `file`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
    }
}
```

**Note:**
- To update the password, the following parameters are required: `old_password`, `password`, `password_confirmation`.
- Use POST method because there is a file upload (`multipart/form-data` is needed, like in PUT).
- Changing the password will not reset the token.

### 1.3 Ban User [POST /user/ban]

**Description:** This API endpoint is used to ban a user.

**Parameters:**
- `id_user`: `number`
- `ban_reason`: `string`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
    }
}
```

### 1.4 Unban User [POST /user/unban]

**Description:** This API endpoint is used to unban a user.

**Parameters:**
- `id_user`: `number`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
    }
}
```

# 2. Authentication API

### 2.1 Login [POST /auth/login]

**Description:** This API endpoint is used for user login.

**Parameters:**
- `email`: `string`
- `password`: `string`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
    }
}
```

### 2.2 Register [POST /auth/register]

**Description:** This API endpoint is used for user registration.

**Parameters:**
- `email`: `string`
- `password`: `string`
- `password_confirmation`: `string`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
    }
}
```

### 2.3 Logout [POST /auth/logout]

**Description:** This API endpoint is used for user logout.

**Parameters:**
- None

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // data user
    }
}
```

# 3. News API

### 3.1 Show All News (Search) [GET /berita]

**Description:** This API endpoint is used to retrieve all news with search functionality.

**Parameters:**
- `search`: `string`
- `page`: `number` (default: 1)
- `limit`: `number` (default: 10)
- `id_kategori_berita`: `number`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        "current_page": number,
        // news data
        "is_liked": boolean,
        "kategori": {
            // category data
        }
    },
    // other data (page_url, next_page_url, prev_page_url, total, etc.)
}
```

### 3.2 Show News by ID [GET /berita/id/{id}]

**Description:** This API endpoint is used to retrieve a specific news by its ID.

**Parameters:**
- None (ID is specified in the URL)

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // news data
        "is_liked": boolean,
        "kategori": {
            // category data
        }
    }
}
```

### 3.3 Show News by Category [GET /berita/kategori/{id}]

**Description:** This API endpoint is used to retrieve news by a specific category.

**Parameters:**
- None (Category ID is specified in the URL)

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // news data
    }
}
```

### 3.4 Like News [POST /berita/like]

**Description:** This API endpoint is used to like a news.

**Parameters:**
- `id_berita`: `number`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // news data
        "is_liked": boolean
    }
}
```

# 4. Event API

### 4.1 Show All Events [GET /event]

**Description:** This API endpoint is used to retrieve all events.

**Parameters:**
- None

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // events data
    }
}
```

### 4.2 Show Event by ID [GET /event/id/{id}]

**Description:** This API endpoint is used to retrieve a specific event by its ID.

**Parameters:**
- None (ID is specified in the URL)

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // event data
        "is_registered": boolean
    }
}
```

### 4.3 Register to Event [POST /event/register]

**Description:** This API endpoint is used to register for an event.

**Parameters:**
- `id_event`: `number`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // event data
    }
}
```

### 4.4 Unregister from Event [POST /event/unregister]

**Description:** This API endpoint is used to unregister from an event.

**Parameters:**
- `id_event`: `number`

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // event data
    }
}
```

# 5. Job Vacancy API

### 5.1 Show All Job Vacancies (Search) [GET /loker]

**Description:** This API endpoint is used to retrieve all job vacancies with search functionality.

**Parameters:**
- `search`: `string` (will search in job title and company name)
- `page`: `number` (default: 1)
- `limit`: `number` (default: 10)

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        "current_page": number,
        // job vacancies data
        "perusahaan": {
            // company data (logo, name, etc.)
        }
    },
    // other data (page_url, next_page_url, prev_page_url, total, etc.)
}
```

### 5.2 Show Job Vacancy by ID [GET /loker/id/{id}]

**Description:** This API endpoint is used to retrieve a specific job vacancy by its ID.

**Parameters:**
- None (ID is specified in the URL)

**Response:**
```json
{
    "success": boolean,
    "message": string,
    "data": {
        // job vacancy data
        "perusahaan": {
            // company data (logo, name, etc.)
        }
    }
}
```
