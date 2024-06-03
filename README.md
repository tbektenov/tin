### Project Overview:

This project is a Wikipedia-like website focused on authors and their literary works.

**Key Features:**

- Extensive Database: Users can explore a comprehensive database of authors and their written works.
- Search Functionality: Easily search for specific authors or literature.
- Favorites: Logged-in users can add authors to their list of favorites for quick access.
- Admin Capabilities: Admin users have the ability to create, update, and delete author entries.

**Setup Instructions:**

Database Initialization: The first time you run the project, navigate to server/routes/main.js and execute the populate function to initialize your database.
Environment Configuration: In the root folder, create a .env file and add the following line, replacing (connection string) with your actual MongoDB connection string:

MONGODB_URI=(connection string)
