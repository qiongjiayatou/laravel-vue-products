# Simple CRUD Laravel + VueJS

Displaying products list with pagination, adding new products, editing or deleting existing ones.

## Installation

0. Copy .env.example and rename to .env

1. Install all dependencies
```
    composer install
    npm install
    npm run dev
```

2. Generate a fresh key for application
```
    php artisan key:generate
```

3. Add database credentials to .env file
    (If needed add this to register method of your AppServiceProvider)
```
    Schema::defaultStringLength(191);
```

4. Migrate databases
```
    php artisan migrate --seed
```

5. Run application
```
    php artisan serve
```

