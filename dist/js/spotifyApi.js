// DOM 
const chart = document.getElementById('chart')
const chartLayer = document.getElementById('chart-layer')

// Fetch Method & REQUEST SECTION
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer BQBz6NY6K0x286r2w5BJwtnM1EB1lKlmVRzsI8iffa2ftA3oRMQzJcSHAvchnhe3im3t-AW2zXEOyulwevhHNEREoFN3lh_0nEDde-2M2eCF0uvC7q1MFJC6VkiX7_Ed_5lSZA-GZRQNhc5I12lvwZ4LdR9tndg");

let requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
};

fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4VvfRBFClxm?market=US", requestOptions)
   .then(response => response.json())
   .then(result => {
      const data = result
      render(data)
   })
   .catch(error => console.log('error', error));


function render(data) {
   const { name: header, description: subtitle } = data;
   const { tracks: { items } } = data

   const trackList = items.map(({ track }) => {
      if (track.preview_url) {
         return track
      }
   }).filter(item => item).sort((a, b) => b.popularity - a.popularity)

   let chartsArr = [] //collects key value pairs I need
   trackList.forEach(el => {
      let ob = manualFilter(el)
      if (chartsArr.length < 20) {
         chartsArr.push(ob)
      }
   });

   // Insert In DOM
   document.getElementById('chartName').innerText = header
   document.getElementById('chartSub').innerText = subtitle
   chartsArr.forEach((arr, index) => insertToDom(arr, index))

   const buttons = document.getElementsByClassName('music-control');
   const song = new Audio();
   const songs = chartsArr.map(ob => ob.url)
   let index = 0, temp;

   [...buttons].forEach((btn, i, arr) => {
      song.src = songs[index];

      btn.addEventListener('click', () => {
         temp = index
         index = i

         if (temp !== index) {
            song.src = songs[index];
            arr[temp].innerHTML = '<i class="fa fa-play"></i>'
         }

         if (song.paused) {
            song.play().catch(() => void 0);
            btn.innerHTML = '<i class="fa fa-pause"></i>'
         } else {
            song.pause()
            btn.innerHTML = '<i class="fa fa-play"></i>'
         }

      })

   });
}

// Handle DOM Manipilation
function displayChart() {
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

// Event Listeners
chart.addEventListener('click', () => {
   ajaxLoader()
   setTimeout(displayChart, 2500)
})

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

function manualFilter(data) {
   const { album: { images } } = data
   const { artists, name } = data
   const { preview_url: url } = data
   const artist = artists.map(({ name }) => name).join(' ft ')
   const image = images[2].url
   return { artist, name, url, image }
}

function insertToDom({ name, artist, image }, index) {
   chartLayer.querySelector('.layer-wrap').insertAdjacentHTML('beforeend', `
   <div class="layer-content">
        <div class="container">
          <div class="list align-items-center row">
            <div class="list-number col-1">${index + 1}</div>
            <div class="list-img col-2">
              <img src="${image}" width="64" height="64" />
            </div>
            <div class="list-song col-8">
              <span class="list-song_title">${name}</span>
              <span class="list-song_artist">${artist}</span>
            </div>
            <div class="list-icon col-1">
              <button class="btn-control music-control">
                <i class="fa fa-play"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
   `)
}