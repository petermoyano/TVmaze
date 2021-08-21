/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.*/


$("#search-form").submit(function (event) {
    event.preventDefault();
    async function searchShows() {
        let shows = [];
        let show = {};
        const response = await axios.get("https://api.tvmaze.com/search/shows", { params: { q: `${event.currentTarget[0].value}` } });
        for (let i = 0; i < response.data.length; i++) {
            show["id"] = response.data[i].show.id;
            show["name"] = response.data[i].show.name;
            show["summary"] = response.data[i].show.summary;
            if (response.data[i].show.image === null) {
                show["image"] = "https://tinyurl.com/tv-missing"
            }
            else { show["image"] = response.data[i].show.image.original; }
            shows.push(show);
            show = {};
        }
        populateShows(shows);
    }
    searchShows();
})

/* *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
/* async function searchShows(query) {
    // TODO: Make an ajax request to the searchShows api.  Remove
    // hard coded data.

    return [
        {
            id: 1767,
            name: "The Bletchley Circle",
            summary: "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>",
            image: "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
        }
    ]
} */



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */
function populateEpisodes (episodes){
    const $episodesList= $("#episodes-list");
    for(let episode of episodes){
        let $item = $(
            `<li class="col-md-6 col-lg-3>${episode.name}</li>
            <li class="col-md-6 col-lg-3>${episode.number}</li>
            <li class="col-md-6 col-lg-3>${episode.season}</li>
            <li class="col-md-6 col-lg-3>${episode.id}</li>`
        )
        $episodesList.append($item);
    }
}
function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty();

    for (let show of shows) {
        let $item = $(
            `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
               <div class="card" data-show-id="${show.id}">
               <img class="card-img-top" src="${show.image}">
                 <div class="card-body">
                   <h5 class="card-title">${show.name}</h5>
                   <p class="card-text">${show.summary}</p>
                   <button id="getEpisodesBtn" class="btn btn-secondary">Get Episodes</button>
                 </div>
               </div>
             </div>
            `);

        $showsList.append($item);
    }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

/* $("#search-form").on("submit", async function handleSearch(evt) { *************************************************
    evt.preventDefault();

    let query = $("#search-query").val();
    if (!query) return;

    $("#episodes-area").hide();

    let shows = await searchShows(query);

    populateShows(shows);
});
 */

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) { }
// TODO: get episodes from tvmaze
//       you can get this by making GET request to
//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
$("#shows-list").click(async function (eve) {
    /*     let $ShowId = eve.target.closest(".card").data("show-id") Why is this line throwing an error?*/
    let $showId = eve.target.closest(".Show").dataset.showId;
    let episodes = [];
    let episode = {};
    const epResponse = await axios.get(`http://api.tvmaze.com/shows/${$showId}/episodes`);
    for (let i = 0; i < epResponse.data.length; i++) {
        console.log(i);
        console.log(epResponse.data[i])
        console.log(epResponse.data[i].name);
        console.log(epResponse.data[i].number);
        console.log(episode);

        episode[name] = epResponse.data[i].name;
        episode[number] = epResponse.data[i].number;
        episode[id] = epResponse.data[i].id;
        episode[season] = epResponse.data[i].season;

    }
populateEpisodes(episodes);
    /* let $epList = `<li>` */
})

    // TODO: return array-of-episode-info, as described in docstring above

