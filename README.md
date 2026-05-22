# Wash Your Cloth API

Solution for Online Laundry & Dry Cleaning Service Management System.

## Features
- Role baed user authentication and authorization with jwt token system
- Rate limit for requests
- Middleware-based architecture

## Tools & Technologies
- JavaScript
- Node.js
- Express.js
- Postgresql (via sequelize)

## Libraries
- "bcrypt": "^6.0.0",
- "dotenv": "^17.4.2",
- "dotenv-expand": "^13.0.0",
- "express": "^5.2.1",
- "express-rate-limit": "^8.4.1",
- "joi": "^18.1.2",
- "jsonwebtoken": "^9.0.3",
- "luxon": "^3.7.2",
- "pg": "^8.20.0",
- "pg-hstore": "^2.3.4",
- "sequelize": "^6.37.8",
- "uuid": "^14.0.0",
- "validator": "^13.15.35"

## Project structure
```
│   app.js
│   
├───config
│       database.js
│       
├───middleware
│       middleware_auth.js
│       middleware_role.js
│       
├───model
│       index_model.js
│       model_item.js
│       model_order.js
│       model_order_item.js
│       model_otp.js
│       model_price.js
│       model_service.js
│       model_shop.js
│       model_token.js
│       model_user.js
│       
├───module
│   ├───auth
│   │       controller_auth.js
│   │       route_auth.js
│   │       service_auth.js
│   │       
│   ├───order
│   │       controller_order.js
│   │       route_order.js
│   │       service_order.js
│   │       
│   ├───resource
│   │       controller_resource.js
│   │       route_resource.js
│   │       service_resource.js
│   │       
│   ├───shop
│   │       controller_shop.js
│   │       route_shop.js
│   │       service_shop.js
│   │       
│   └───user
│           controller_user.js
│           route_user.js
│           service_user.js
│           
├───utils
│       manager_error.js
│       manager_jwt_token.js
│       manager_order_price.js
│       manager_otp.js
│       manager_password.js
│       manager_time.js
│       manager_tracking_id.js
│       
└───validator
        validator_change_password.js
        validator_change_phone.js
        validator_entry.js
        validator_item.js
        validator_length.js
        validator_login.js
        validator_order.js
        validator_order_item.js
        validator_price.js
        validator_registration_shop.js
        validator_registration_user.js
        validator_update_price.js
        validator_update_shop.js
        validator_update_user.js
```