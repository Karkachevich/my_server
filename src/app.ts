import fs from 'fs';
import path from 'path';
import http, { IncomingMessage, ServerResponse } from 'http';
import { generateMainView } from '../views';

const { PORT = 3000 } = process.env;


const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const dataPath = path.join(__dirname, 'data.json');
  
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    
      if(err) { 
        console.log(`Произошла ошибка ${err.message}`); 
        return; 
      }
     const songs = JSON.parse(data);
      console.log('data: ', songs); 
    
     res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  const markup = generateMainView(songs);

  res.end(markup);
    
 });
  
 
});

server.listen(PORT);
