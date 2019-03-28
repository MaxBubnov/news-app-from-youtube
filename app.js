const apiKey = '946b772a2031488bbb0243d22f944597';
const defaultSource = 'the-washington-post';
// const sourceSelector = document.querySelector('#sources');
const newsArticles = document.querySelector('main');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
  // sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
  // updateNewsSources().then(() => {
  //   sourceSelector.value = defaultSource;
  //   updateNews();
  // });
    updateNews();
});

window.addEventListener('online', () => updateNews(sourceSelector.value));

async function updateNewsSources() {
  const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
  const json = await response.json();
  // sourceSelector.innerHTML =
  //   json.sources
  //     .map(source => `<option value="${source.id}">${source.name}</option>`)
  //     .join('\n');
}

async function updateNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  const response = await fetch('https://newsapi.org/v2/top-headlines?category=technology&country=ru&apiKey=946b772a2031488bbb0243d22f944597');
  const json = await response.json();
  newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}