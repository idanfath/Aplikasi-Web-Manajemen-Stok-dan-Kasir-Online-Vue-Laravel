# Fullstack Project (Vue & Laravel)

Welcome to the Fullstack Project! This repository contains a Vue.js frontend and a Laravel backend. Follow the instructions below to get the project up and running.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/)
- [Laravel](https://laravel.com/)

## Installation

### Backend (Laravel)

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/fullstack-project.git
   cd fullstack-project
   ```

2. Install PHP dependencies:

   ```sh
   composer install
   ```

3. Copy the `.env.example` to `.env` and configure your environment variables:

   ```sh
   cp .env.example .env
   php artisan key:generate
   ```

4. Run migrations:
   ```sh
   php artisan migrate
   ```

### Frontend (Vue.js)

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install Node.js dependencies:
   ```sh
   npm install
   ```

## Running the Project

### Backend

Start the Laravel development server:

```sh
php artisan serve
```

### Frontend

Start the Vue.js development server:

```sh
npm run serve
```

## Project Structure

```
fullstack-project/
├── backend/        # Laravel backend
├── frontend/       # Vue.js frontend
├── .env.example    # Environment variables example
├── README.md       # Project documentation
└── ...
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Happy coding!
