# Hive Blog Clone (Next.js)

## Overview
This project is a full-stack blogging application inspired by Hive Blog, built using Next.js. It integrates with a live API to allow users to:
- Register and verify accounts using OTP
- Login and manage user sessions
- Upload images, Create, edit, and delete blog posts
- Comment on posts and edit/delete comments
- Like and dislike posts
- Change user passwords and edit profiles

## Features
- **User Authentication:** Register, verify OTP, login, and edit user profiles.
- **Post Management:** Create, edit, and delete blog posts with images and tags.
- **Comment System:** Add, edit, and delete comments on posts.
- **Like & Dislike System:** Users can like or dislike posts.
- **Category Management:** Fetch all categories and filter posts by category.
- **Secure API Calls:** Uses Axios for API interactions.
- **Responsive Design:** Fully optimized for desktop and mobile devices.

## Tech Stack
- **Frontend:** Next.js, React Context API, Tailwind CSS
- **Backend:** Live API hosted on render and data stored on mongoDB Atlas
- **Package Manager:** npm/yarn


## Usage
### Registering a User
1. Fill out the registration form with a valid email address.
2. Submit the form to receive an OTP.
3. Enter the OTP to complete registration.

### Logging In
1. Enter username and password.
2. Click "Login" to authenticate.

### Creating a Post
1. Fill out the post creation form.
2. Upload images (optional).
3. Add tags to the post.
4. Submit the post.

### Editing a Post
1. Navigate to user's profile and click on edit icon of an existing post.
2. Modify the content.
3. Save changes.

### Commenting on a Post
1. Open a post and click on reply button.
2. Add a comment and post.

### Liking/Disliking a Post
1. Click the like or dislike button to interact with a post.

### Changing Password
1. On navigation bar, click on hamburger icon and select change user password.
2. Enter the old and new password.
3. Confirm the new password and submit.

