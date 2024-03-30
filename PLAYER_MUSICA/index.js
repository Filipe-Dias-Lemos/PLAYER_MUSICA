let musicas = [
  {
    titulo: 'Guitar Solo',
    artista: 'Filipe Lemos',
    src: 'music/We Ride! - Reed Mathis.mp3',
    img: 'images/simon-weisser-phS37wg8cQg-unsplash (1).jpg',
  },
  {
    titulo: 'Samba',
    artista: 'Bossa Nova',
    src: 'music/Ella Vater - The Mini Vandals.mp3',
    img: 'images/sam-moghadam-khamseh--_lqROGc6lE-unsplash.jpg',
  },
  {
    titulo: 'Musica Piano',
    artista: 'John Green',
    src: 'music/A Brand New Start - TrackTribe.mp3',
    img: 'images/morgan-von-gunten-n-sSgkvgslg-unsplash.jpg',
  },
];

let musica = document.querySelector('audio');
let botaoPlay = document.querySelector('.botao-play');
let botaoPause = document.querySelector('.botao-pause');
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let indexMusica = 0;

botaoPause.style.display = 'none';

renderizarMusica(indexMusica);

//Eventos
botaoPlay.addEventListener('click', tocarMusica);
botaoPause.addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 2;
  }
  renderizarMusica(indexMusica);
  musica.play();
  botaoPause.style.display = 'block';
  botaoPlay.style.display = 'none';
});
document.querySelector('.posterior').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > 2) {
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
  musica.play();
  botaoPause.style.display = 'block';
  botaoPlay.style.display = 'none';
});

//Funções
function renderizarMusica(index) {
  musica.setAttribute('src', musicas[index].src);
  musica.addEventListener('loadeddata', () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    musica.addEventListener('loadedmetadata', function () {
      duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
  });
}

function tocarMusica() {
  musica.play();
  botaoPause.style.display = 'block';
  botaoPlay.style.display = 'none';
}

function pausarMusica() {
  musica.pause();
  botaoPause.style.display = 'none';
  botaoPlay.style.display = 'block';
}

function atualizarBarra() {
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = '0' + segundos;
  }

  return campoMinutos + ':' + campoSegundos;
}
