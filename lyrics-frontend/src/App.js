import React, { useState } from 'react';
import './App.css';

function App() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchLyrics = async () => {
        if (!artist || !song) {
            setError('Please enter both artist and song title');
            return;
        }

        setLoading(true);
        setError('');
        setLyrics('');

        try {
            const response = await fetch(`http://localhost:5000/api/lyrics?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`);
            const data = await response.json();

            if (data.status === 'success') {
                setLyrics(data.lyrics);
            } else {
                setError(data.message || 'Failed to fetch lyrics');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Song Lyric Finder</h1>
            </header>
            <main>
                <div className="search-container">
                    <div className="form-group">
                        <label htmlFor="artist">Artist</label>
                        <input
                            type="text"
                            id="artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            placeholder="Enter artist name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="song">Song</label>
                        <input
                            type="text"
                            id="song"
                            value={song}
                            onChange={(e) => setSong(e.target.value)}
                            placeholder="Enter song title"
                        />
                    </div>

                    <button
                        onClick={fetchLyrics}
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search Lyrics'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {lyrics && (
                    <div className="lyrics-container">
                        <h2>{song} by {artist}</h2>
                        <pre className="lyrics">{lyrics}</pre>
                    </div>
                )}
            </main>
            <footer>
                <a href="https://github.com/mohnish-sharma/">github.com/mohnish-sharma</a>
            </footer>
        </div>
    );
}

export default App;