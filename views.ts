type Song = {
    title: string,
    artist: string
  };
  
  type SongMarkup = (song: Song) => string;
  type MainView = (songs: Song[]) => string;
  
  const generateSongMarkup: SongMarkup = (song) => `
    <div class="song">
      <p class="song__title">${song.title}</p>
      <p class="song__artist">${song.artist}</p>
    </div>
  `;
  
  export const generateMainView: MainView = (songs) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Плейлист для работы</title>
      <style>
        html, body {
          font-family: Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          background-color: #566270;
        }
  
        .container {
          max-width: 468px;
          margin: auto;
          color: white;
        }
  
        .cover {
          display: flex;
          margin: 40px 0;
        }
  
        .cover__image {
          width: 150px;
          height: 150px;
          background-image: url(https://pictures.s3.yandex.net/frontend-developer/dom_bom/cover.jpg);
          background-size: cover;
          background-position: center;
          border-radius: 5px;
          -webkit-box-shadow: 0px 0px 80px -22px rgba(165, 147, 224, 1);
          -moz-box-shadow: 0px 0px 80px -22px rgba(165, 147, 224, 1);
          box-shadow: 0px 0px 80px -22px rgba(165, 147, 224, 1);
        }
  
        .cover__info {
          margin-left: 30px;
          width: calc(468px - 150px - 30px);
        }
  
        .cover__title {
          margin-bottom: 0;
        }
  
        .cover__count {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
  
        .song {
          align-items: center;
          display: flex;
          position: relative;
          height: 50px;
          margin-top: 5px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          font-size: 0.8em;
          padding: 0 10px;
          transition: transform 0.2s ease-in-out;
        }
  
        .song:hover {
          transform: scale(1.02);
        }
  
        .song__title {
          font-weight: bold;
        }
  
        .song__artist {
          margin-left: 10px;
        }
      </style>
    </head>
    <body>
      <main class="container">
        <div class="cover">
          <div class="cover__image"></div>
          <div class="cover__info">
            <p class="cover__count">${songs.length} треков</p>
            <h1 class="cover__title">Плейлист для работы</h1>
          </div>
        </div>
        <div class="songs-container">
          ${songs.map(generateSongMarkup).join('')}
        </div>
      </main>
    </body>
    </html>
  `;
