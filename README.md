# Wash Your Cloth API

Solution for Online Laundry & Dry Cleaning Service Management System.

## Features
- Role baed user authentication and authorization with jwt token system
- Rate limit for requests
- Middleware-based architecture
- Persisted, user-scoped order notifications with Socket.IO realtime delivery

## Tools & Technologies
- JavaScript
- Node.js
- Express.js
- Postgresql (via sequelize)
- Socket.IO

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
- "socket.io": "^4.8.4",
- "uuid": "^14.0.0",
- "validator": "^13.15.35"

## Project structure
```
│   app.js
│   
├───config
│       database.js
│       socket.js
│       
├───middleware
│       middleware_auth.js
│       middleware_role.js
│       
├───model
│       index_model.js
│       model_item.js
│       model_app_notification.js
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
│   ├───notification
│   │       controller_notification.js
│   │       route_notification.js
│   │       service_notification.js
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

## Installation

To setup node.js:<br>
Follow the [Official guide](https://nodejs.org/en/download).

To run this project locally, follow these steps:
1. clone the repository:
```
git clone https://github.com/Neloy-SWE/wash_your_cloth_api.git
```

2. inside the project directory:
- create .env file
- copy all text from example.env and paste in .env
- replace all example values with real values and credentials.

3. navigate to the project directory:
```
cd wash_your_cloth_api
```

4. install dependencies:
```
npm install
```

5. run the project:
```
npm run start
```

- To add auto run on save changes, you may install nodemon (in the project or globally) and run:
```
npm run dev
```
<br>
<br>
<table border="1" bordercolor="#9ca3af" cellpadding="12" cellspacing="0" width="100%">
  <thead>
    <tr><th colspan="5" align="center" bgcolor="#1f2937"><h2><font color="#ffffff">API Endpoints</font></h2></th></tr>
    <tr>
      <th bgcolor="#374151"><big><strong><font color="#ffffff">Path</font></strong></big></th>
      <th bgcolor="#374151"><big><strong><font color="#ffffff">Method</font></strong></big></th>
      <th bgcolor="#374151"><big><strong><font color="#ffffff">Headers</font></strong></big></th>
      <th bgcolor="#374151"><big><strong><font color="#ffffff">Request body / parameters</font></strong></big></th>
      <th bgcolor="#374151"><big><strong><font color="#ffffff">Description</font></strong></big></th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/auth/route_auth.js">/auth/registration</a></big></td>
      <td valign="top" bgcolor="#000000"><big>POST</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body (user):</strong><ul><li>firstName: String; required</li><li>lastName: String; required</li><li>address: String; required</li><li>phone: String (11 digits); required</li><li>longitude: Number; required</li><li>latitude: Number; required</li><li>password: String (8+ chars; uppercase, lowercase, number, special character); required</li><li>role: String (user or shop); required</li></ul><strong>Body (shop):</strong><ul><li>ownerFirstName: String; required</li><li>ownerLastName: String; required</li><li>shopAddress: String; required</li><li>phone: String (11 digits); required</li><li>longitude: Number; required</li><li>latitude: Number; required</li><li>password: String (8+ chars; uppercase, lowercase, number, special character); required</li><li>role: String (user or shop); required</li><li>shopName: String; required</li><li>deliveryCharge: Number (positive); required</li><li>openTime: String (12-hour time); required</li><li>closeTime: String (12-hour time; after openTime); required</li><li>weekends: String (comma-separated weekdays); required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Creates a user or laundry shop account and returns the registration result.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/auth/route_auth.js">/auth/login</a></big></td>
      <td valign="top" bgcolor="#111111"><big>POST</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Body:</strong><ul><li>phone: String (11 digits); required</li><li>password: String; required</li><li>role: String (user or shop); required</li><li>installationId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Authenticates a user or shop and returns session tokens.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/auth/route_auth.js">/auth/refresh-token</a></big></td>
      <td valign="top" bgcolor="#000000"><big>POST</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body:</strong><ul><li>refreshToken: String; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Exchanges a valid refresh token for refreshed authentication tokens.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/auth/route_auth.js">/auth/logout</a></big></td>
      <td valign="top" bgcolor="#111111"><big>POST</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Body:</strong><ul><li>allDevices: Boolean (default false); optional</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Revokes the current session, or all sessions when requested.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/auth/route_auth.js">/auth/otp-verify</a></big></td>
      <td valign="top" bgcolor="#000000"><big>POST</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body:</strong><ul><li>recordId: String; required</li><li>otpRequestId: String (verifyUser, resetPassword, or changePhone); required</li><li>otpCode: String (configured OTP length); required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Verifies an OTP for account verification, password reset, or phone change.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/user/route_user.js">/user/change-password</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Body:</strong><ul><li>oldPassword: String; required</li><li>newPassword: String (8+ chars; uppercase, lowercase, number, special character); required</li><li>confirmPassword: String (must match newPassword); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Changes the authenticated user's password.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/user/route_user.js">/user/change-phone</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body:</strong><ul><li>oldPhone: String (11 digits); required</li><li>newPhone: String (11 digits; different from oldPhone); required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Changes the authenticated user's phone number.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/user/route_user.js">/user/view</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><em>None</em></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns the authenticated user's profile.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/user/route_user.js">/user/update</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body:</strong><ul><li>firstName: String; required</li><li>lastName: String; required</li><li>address: String; required</li><li>longitude: Number; required</li><li>latitude: Number; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Updates the authenticated user's profile and location.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/shop/route_shop.js">/shop/view</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><em>None</em></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns the authenticated shop's profile and details.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/shop/route_shop.js">/shop/update</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body:</strong><ul><li>ownerFirstName: String; required</li><li>ownerLastName: String; required</li><li>shopAddress: String; required</li><li>longitude: Number; required</li><li>latitude: Number; required</li><li>shopName: String; required</li><li>deliveryCharge: Number (positive); required</li><li>openTime: String (12-hour time); required</li><li>closeTime: String (12-hour time; after openTime); required</li><li>weekends: String (comma-separated weekdays); required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Updates the authenticated shop's profile, location, hours, and delivery charge.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/shop/route_shop.js">/shop/list</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns a paginated, searchable list of shops for users.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/shop/route_shop.js">/shop/details/:shopId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>GET</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>shopId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Returns details for the specified shop.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/service-add</a></big></td>
      <td valign="top" bgcolor="#111111"><big>POST</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Body:</strong><ul><li>serviceName: String (2-200 chars; starts uppercase); required</li><li>description: String (2-1000 chars); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Adds a service offered by the authenticated shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/resource/route_resource.js">/resource/service-list</a></big></td>
      <td valign="top" bgcolor="#000000"><big>GET</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Returns the authenticated shop's paginated, searchable services.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/service-update/:serviceId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>serviceId: UUID v4; required</li></ul><strong>Body:</strong><ul><li>serviceName: String (2-200 chars; starts uppercase); required</li><li>description: String (2-1000 chars); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Updates a service owned by the authenticated shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/resource/route_resource.js">/resource/service-activation/:serviceId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>serviceId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Activates or deactivates the specified shop service.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/item-add</a></big></td>
      <td valign="top" bgcolor="#111111"><big>POST</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Body:</strong><ul><li>itemName: String (2-200 chars; starts uppercase); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Adds a clothing item handled by the authenticated shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/resource/route_resource.js">/resource/item-list</a></big></td>
      <td valign="top" bgcolor="#000000"><big>GET</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Returns the authenticated shop's paginated, searchable clothing items.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/item-update/:itemId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>itemId: UUID v4; required</li></ul><strong>Body:</strong><ul><li>itemName: String (2-200 chars; starts uppercase); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Updates a clothing item owned by the authenticated shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/resource/route_resource.js">/resource/item-activation/:itemId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>itemId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Activates or deactivates the specified shop item.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/price-add</a></big></td>
      <td valign="top" bgcolor="#111111"><big>POST</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Body:</strong><ul><li>serviceId: UUID v4; required</li><li>itemId: UUID v4; required</li><li>price: Number (positive); required</li><li>discountPrice: Number (0 or greater); required</li><li>ironPressPrice: Number (0 or greater); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Adds a price for a service and clothing item at the authenticated shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/resource/route_resource.js">/resource/price-list-shop</a></big></td>
      <td valign="top" bgcolor="#000000"><big>GET</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Returns the authenticated shop's paginated, searchable price list.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/price-list-user/:shopId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>shopId: UUID v4; required</li></ul><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns a paginated, searchable list of prices for the specified shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/resource/route_resource.js">/resource/price-activation/:priceId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>priceId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Activates or deactivates the specified shop price.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/resource/route_resource.js">/resource/price-update/:priceId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>priceId: UUID v4; required</li></ul><strong>Body:</strong><ul><li>price: Number (positive); required</li><li>discountPrice: Number (0 or greater); required</li><li>ironPressPrice: Number (0 or greater); required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Updates the listed prices for a shop service and item.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/order/route_order.js">/order/place</a></big></td>
      <td valign="top" bgcolor="#000000"><big>POST</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span><br><span>Content-Type: application/json</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Body:</strong><ul><li>shopId: UUID v4; required</li><li>items: Array (at least one item); required<ul><li>priceId: UUID v4; required</li><li>quantity: Integer (at least 1); required</li><li>isIronPress: Boolean; required</li></ul></li><li>note: String (up to 500 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Places an order with a shop using selected priced items.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/order/route_order.js">/order/list</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns a paginated, searchable order list for the authenticated user or shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/order/route_order.js">/order/details-user/:orderId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>GET</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Returns order details for the authenticated user.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/order/route_order.js">/order/details-shop/:orderId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns order details for the authenticated shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/order/route_order.js">/order/delete/:orderId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Deactivates the specified order for the user who placed it.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/order/route_order.js">/order/accept/:orderId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Accepts the specified order as the receiving shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/order/route_order.js">/order/reject/:orderId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Rejects the specified order as the receiving shop.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/order/route_order.js">/order/ready/:orderId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Marks the specified order as ready at the shop.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/order/route_order.js">/order/handover-request/:orderId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Requests handover of the ready order from the shop.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/order/route_order.js">/order/confirm-received/:orderId</a></big></td>
      <td valign="top" bgcolor="#111111"><big>PATCH</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><strong>Path variables:</strong><ul><li>orderId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#111111"><big>Confirms receipt of the order for the user who placed it.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/notification/route_notification.js">/notification/list</a></big></td>
      <td valign="top" bgcolor="#000000"><big>GET</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Query parameters:</strong><ul><li>currentPage: Number (default 0); optional</li><li>pageSize: Number (default 15; 1-100); optional</li><li>search: String (up to 100 chars); optional</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Returns the authenticated user's paginated, searchable notifications.</big></td>
    </tr>
    <tr bgcolor="#111111">
      <td valign="top" bgcolor="#111111"><big><a href="src/module/notification/route_notification.js">/notification/unread-count</a></big></td>
      <td valign="top" bgcolor="#111111"><big>GET</big></td>
      <td valign="top" bgcolor="#111111"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#111111"><big><em>None</em></big></td>
      <td valign="top" bgcolor="#111111"><big>Returns the authenticated user's unread notification count.</big></td>
    </tr>
    <tr bgcolor="#000000">
      <td valign="top" bgcolor="#000000"><big><a href="src/module/notification/route_notification.js">/notification/read/:notificationId</a></big></td>
      <td valign="top" bgcolor="#000000"><big>PATCH</big></td>
      <td valign="top" bgcolor="#000000"><big><span>Authorization: Bearer &lt;access_token&gt;</span></big></td>
      <td valign="top" bgcolor="#000000"><big><strong>Path variables:</strong><ul><li>notificationId: UUID v4; required</li></ul></big></td>
      <td valign="top" bgcolor="#000000"><big>Marks the specified notification as read for its owner.</big></td>
    </tr>
  </tbody>
</table>

<br>
<br>

To understand the project a little more, check out the implementation of APIs for mobile app at [Wash Your Cloth Mobile App](https://github.com/Neloy-SWE/wash_your_cloth_mobile_app).

## Future Improvements
- implement payment gateway for order payment.
- latitude and longitude based location pick show shop list for user.
- implement order tracking for user.
- chat facility between user and shop.
- include convenient time details during order placement to pick up and delivery for user.

## Support
If you find this repository useful, consider giving it a star.

For feedbacks or suggestions:
Email: taufiqneloy.swe@gmail.com

lets connect on [LinkedIn](https://www.linkedin.com/in/taufiq-ahommed-neloy/)