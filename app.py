from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup


app = Flask(__name__)


def get_lyrics(artist, song_title):
    artist = artist.lower().replace(" ", "-")
    song_title_with_dashes = song_title.lower().replace(" ", "-")
    url = f"https://www.songlyrics.com/{artist}/{song_title_with_dashes}-lyrics/"

    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        lyrics_div = soup.find('p', id='songLyricsDiv')
        
        if lyrics_div:
            return {"status": "success", "lyrics": lyrics_div.text.strip()}
        else:
            return {"status": "not_found", "message": "Lyrics not found for the given song"}
    else:
        return {"status": "error", "message": "Failed to retrieve lyrics. Please check the artist and song title"}

@app.route('/api/lyrics', methods=['GET'])
def lyrics_endpoint():
    artist = request.args.get('artist', '')
    song_title = request.args.get('song', '')
    
    if not artist or not song_title:
        return jsonify({"status": "error", "message": "Both artist and song parameters are required"}), 400
    
    result = get_lyrics(artist, song_title)
    return jsonify(result)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)