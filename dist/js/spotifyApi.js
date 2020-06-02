// code snippet for AJAX
// token expired
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer BQBVD6lnzUIxDogczjWO6Lp7RZH2rfmBdE-up632ssCShTa3yctjf_wK7eqlQe7bYu37B7GeWbE7W6p7lkSxwtC0dIDAaIrQz7vwAU2Mit7gI3OCu2QHTZC9M0KVF-hpOWXMowRqVQbY-Jb5GOV4vT7igM9eF5Q");

var requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
};

fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4VvfRBFClxm?market=US", requestOptions)
   .then(response => response.json())
   .then(result => {
      const data = result
      console.log(data)
   })
   .catch(error => console.log('error', error));

function render(data) {
   const { name: header, description: subtitle } = data
   const { tracks: { items } } = data
   let playlist = filteredPlaylist(items)
   for (let i = 0; i < 30; i++) {
      const element = playlist[i];
      console.log(element)
   }
}

function filteredPlaylist(tracks) {
   return tracks.filter(({ track }) => track.preview_url).sort((a, b) => b.track.popularity - a.track.popularity)
}

const chart = document.getElementById('chart')
const chartLayer = document.getElementById('chart-layer')
chart.addEventListener('click', () => {
   ajaxLoader()
   setTimeout(renderChart, 2500)
})

function renderChart() {
   chartLayer.style.left = '0%';
   const backbtn = chartLayer.querySelector('#back')
   backbtn.addEventListener('click', () => {
      chartLayer.style.left = '-120%';
   })
}

function ajaxLoader() {
   const spinner = document.querySelector('.spinner')
   const gif = spinner.querySelector('img')
   classChain(spinner).add('show').remove('out')
   classChain(gif).add('spinning')
   setTimeout(() => {
      hideLoader(spinner, gif);
   }, 3000)
}

function hideLoader(spinner, gif) {
   classChain(spinner).add('out')
   classChain(gif).remove('spinning')
}




// utility
function classChain(el) {
   let list = el.classList

   return {
      toggle: function (c) {
         list.toggle(c)
         return this
      },
      add: function (c) {
         list.add(c);
         return this
      },
      remove: function (c) {
         list.remove(c);
         return this
      }
   }
}