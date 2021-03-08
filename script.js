//You can edit ALL of the code here
// const allEpisodes = getAllEpisodes();
// makePageForEpisodes(allEpisodes);
// let root = document.getElementById('root');
// let search = document.getElementById('search');
// let mainContainer = document.createElement( 'ul' );
// let selectEl = document.createElement( 'select' );
// let optEl = document.createElement( 'option' );
// let container = document.getElementById( 'container' );
// mainContainer.id = 'mainContainer';
// root.appendChild(mainContainer);
 
function pad( num, size )
{
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// level 100 &level 350
function setup() {
  populateShowsDropdown(); 
  const selectedShow = document.getElementById( 'showsDropDown' );
  console.log(selectedShow);
  const showId = selectedShow.value;
  fetch( `https://api.tvmaze.com/shows/${showId}/episodes` )
    .then( response => response.json() )
    .then( (data) => {
      
      const allEpisodes = data;
      populateEpisodeDropdown( allEpisodes );
      makePageForEpisodes( allEpisodes ); 
    } )
  

}


function makePageForEpisodes( allEpisodes )
{
  let root = document.getElementById('root');
  // let search = document.getElementById('search');
  let mainContainer = document.createElement( 'ul' );
  // let selectEl = document.createElement( 'select' );
  // let optEl = document.createElement( 'option' );
  // let container = document.getElementById( 'container' );
  mainContainer.id = 'mainContainer';
  root.appendChild(mainContainer);
 
  allEpisodes.forEach(elem => {
    let list = document.createElement( 'li' );
    list.id = elem.id;
    let title = document.createElement('h4'); // create display title tag
    let img = document.createElement('img'); // create display image tag
    title.id = 'title';
    img.id = 'img';
    title.innerText = `${elem.name} - S${pad(elem.season, 2)}E${pad(elem.number,2)}`;
    if ( elem.image.medium !== null )
    {
      img.src = `${elem.image.medium}`
    }
    list.innerHTML = elem.summary;
    list.insertBefore(title, list.childNodes[0]);
    list.insertBefore(img, list.childNodes[1]);
    mainContainer.appendChild( list );
    
    //selectEpisodes(allEpisodes)
  } )
  // console.log(allEpisodes);
 
 
}
window.onload = setup;


// level 200 (live search)
function mySearchFunction()
{
  let input, filter; // Declare variables
  let allEpisodes =[...document.querySelectorAll( 'li' )]
  input = document.getElementById("myInput"); // User Input
  filter = input.value.toUpperCase(); // Filter, makes search not case sensitive
  let selectedEpisodes
  if ( input.value === '' )
  {
    selectedEpisodes = [...document.querySelectorAll( 'h4' )]
  } else
  {
      selectedEpisodes = allEpisodes.filter( episode =>
    {
      const title = episode.querySelector( 'h4' ).textContent.toUpperCase()
      const summary = episode.querySelector( 'p' ).textContent.toUpperCase()
      return ( title.includes( filter ) || summary.includes( filter ) )
    } ).map( episode =>
    {
      return episode.querySelector( 'h4' )
    } )
  }
    
      showOrHideEpisode( selectedEpisodes );


  
  // };
  // display search's result number
  //document.getElementById('result').textContent = `Displaying ${document.querySelectorAll('#mainContainer li:not(.hidden)').length}/${allEpisodes.length} episodes`;
} 

function populateEpisodeDropdown( allEpisodes )
{
  let selectEl = document.getElementById( 'episodeDropDown' );

  let episodesTitles = [...document.querySelectorAll( 'h4' )];

  allEpisodes.forEach( episode =>
  {
    let option = document.createElement( 'option' );
    option.textContent = `S${ pad( episode.season, 2 ) }E${ pad( episode.number, 2 ) } - ${ episode.name }`;
    option.value = episode.id;
    selectEl.appendChild( option );
  } )
  selectEl.addEventListener( 'change', ( e ) =>
  {
    showOrHideEpisode( e.target.value );
  } )
   
}


function showOrHideEpisode( episodeId )
{
  const allEpisodes = [...document.querySelectorAll( "li" )];
  allEpisodes.forEach( ( episode ) => ( episode.style.display = "none" ) );
  console.log( episodeId );
  const selectedEpisode = document.getElementById( episodeId )
  console.log(selectedEpisode)
  selectedEpisode.style.display = 'block';
}



// When a show is selected, your app should display the episodes for that show as per 
//the earlier levels of this challenge, except that it should first fetch the episode list from the API - see below
// You can get the list of shows by loading shows.js in your index.html and using the provided function: getAllShows()
// Ensure that your search and episode selector controls still work correctly when you switch shows.
// This show select must list shows in alphabetical order, case-insensitive.

function populateShowsDropdown(){
  let select = document.getElementById( 'showsDropDown' );

  const shows = getAllShows();
  shows.forEach( ( show ) =>
  { 
    let option  = document.createElement( 'option' );
    option.value = show.id;
    option.innerHTML = show.name;
    select.appendChild( option );

  } );

  select.addEventListener( 'change', (e) =>
  {
    let showId = e.target.value;

    fetch( `https://api.tvmaze.com/shows/${showId}/episodes` )
    .then( response => response.json() )
    .then( (data) => {
      
      const allEpisodes = data;
      populateEpisodeDropdown( allEpisodes );
      makePageForEpisodes( allEpisodes ); 
    } )
  })

}


// When your app starts, present a listing of all shows ("shows listing")
// For each show, you must display at least name, image, summary, genres, status, rating, and runtime.
// When a show name is clicked, your app should:
// fetch and present episodes from that show (enabling episode search and selection as before)
// hide the "shows listing" view.
// Add a navigation link to enable the user to return to the "shows listing"
// When this is clicked, the episodes listing should be hidden
// Provide a free-text show search through show names, genres, and summary texts.
// Ensure that your episode search and episode selector controls still work correctly when you switch from shows listing to episodes listing and back.
// Continue to get the list of shows the same way you did in level 400. (You do not need to fetch it.)

