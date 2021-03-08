//You can edit ALL of the code here
const shows = getAllShows();
let root = document.getElementById( 'root' );
let episodeView = document.getElementById( 'episodeView' );
let showsView = document.getElementById( 'showsView' );
let showViewButton = document.getElementById( 'showViewButton' );


 
function pad( num, size )
{
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// level 100 &level 350
function setup() {
  populateShowsDropdown(); 
  populateShowListings();

  showViewButton.addEventListener( 'click', ( e ) => {
    episodeView.style.display = 'none';
    showsView.style.display = 'block';
  })

}

//level 100
function makePageForEpisodes( allEpisodes )
{
  let mainContainer = document.createElement( 'ul' );
  mainContainer.id = 'mainContainer';
  episodeView.appendChild(mainContainer);
 
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
    
    
  } )

  episodeView.style.display = 'block';
 
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


  
  
} 
// episode drop down
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


// show drop down
function populateShowsDropdown(){
  let select = document.getElementById( 'showsDropDown' );

  
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
      updateEpisode(showId)
    
  })

}


// Provide a free-text show search through show names, genres, and summary texts.
// Ensure that your episode search and episode selector controls still work correctly when you switch from shows listing to episodes listing and back.
// Continue to get the list of shows the same way you did in level 400. (You do not need to fetch it.)

//Level 500
function populateShowListings()
{
  shows.forEach( (show) =>
  {
    let container = document.createElement( 'div' );
    container.id = show.id;
    let title = document.createElement( 'h3' );
    title.innerHTML = show.name;
    container.appendChild( title );

    if ( show.image != null )
    {
      let img = document.createElement( 'img' );
      img.src = show.image.medium;
      container.appendChild( img );
    }
    

    let summary = document.createElement( 'div' );
    summary.innerHTML = show.summary;
    container.appendChild( summary );

    let genres = document.createElement( 'p' );
    genres.innerHTML = show.genres.join();
    container.appendChild( genres );

    let status = document.createElement( 'p' );
    status.innerHTML = `STATUS: ${show.status}`;
    container.appendChild( status );

    let rating = document.createElement( 'p' );
    rating.innerHTML = show.rating.average;
    container.appendChild( rating );

    let runtime = document.createElement( 'p' );
    runtime.innerHTML = show.runtime;
    container.appendChild( runtime );

    showsView.appendChild( container );

    container.addEventListener( 'click', ( e ) =>
    {
      const showId = e.currentTarget.id;
      updateEpisode( showId )
      showsView.style.display = 'none';

    })
       
  })
}

function updateEpisode(showId)
{
  fetch( `https://api.tvmaze.com/shows/${showId}/episodes` )
    .then( response => response.json() )
    .then( (data) => {
      
      const allEpisodes = data;
      populateEpisodeDropdown( allEpisodes );
      makePageForEpisodes( allEpisodes ); 
    } )
  
}