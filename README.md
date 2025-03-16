# lyric-scraper-flaskapp

A simple web application built with Flask (backend) and React (frontend) to fetch and display song lyrics using the [SongLyrics](https://www.songlyrics.com/) website.

### Screenshots

![screenshot](https://github.com/mohnish-sharma/lyric-scraper-flaskapp/blob/main/screenshot.png)

## Features

- **Search Lyrics**: Enter the artist name and song title to fetch the lyrics.
- **Responsive Design**: The frontend is designed to be responsive and user-friendly.
- **Error Handling**: Proper error messages are displayed if the lyrics are not found or if there are network issues.
- **CORS Support**: The backend is configured to allow cross-origin requests from the frontend.

## Technologies Used

- **Backend**: Flask, BeautifulSoup, Requests
- **Frontend**: React (JS), CSS
- **Deployment**: Gunicorn (for production)

## Setup and Installation

### Prerequisites

- [Python 3.x](https://www.python.org/)
- [Node.js](https://nodejs.org/en) (for running the React frontend)
- [pip](https://pypi.org/project/pip/) (Python package manager)
- [npm](https://www.npmjs.com/) (Node.js package manager)

### Backend Setup

1. **Clone the repository**:
   
    ```bash
    git clone https://github.com/mohnish-sharma/lyric-scraper-flaskapp.git
    cd lyric-scraper-flaskapp
    ```
2. **Install Python dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Flask server:**

    ```bash
    python app.py
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd lyrics-frontend
   ```

2. **Install Node.js dependencies**:

   ```bash
   npm install
   ```

3. **Run the React app**:

   ```bash
   npm start
   ```

   The frontend will start running on `http://localhost:3000`.

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter the artist name and song title in the input fields.
3. Click the "Search Lyrics" button to fetch and display the lyrics.

## API Endpoints

- **GET `/api/lyrics`**: Fetches lyrics for a given artist and song title.
  - Query Parameters:
    - `artist`: The name of the artist.
    - `song`: The title of the song.
  - Example: `/api/lyrics?artist=coldplay&song=yellow`
- **GET `/health`**: Health check endpoint to verify if the server is running.
  - Returns: `{"status": "healthy"}`

## Deployment

To deploy the Flask app in production, you can use **[Gunicorn](https://gunicorn.org/)**:

1. Install Gunicorn:

   ```bash
   pip install gunicorn
   ```

2. Run the app with Gunicorn:

   ```bash
   gunicorn --bind 0.0.0.0:5000 app:app
   ```