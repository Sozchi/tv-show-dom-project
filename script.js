const allEpisodes = getAllEpisodes();
makePageForEpisodes(allEpisodes);
let root = document.getElementById( 'root' );
let search = document.getElementById( 'Search' );
let mainContainer = document.createElement( 'ul' );
mainContainer.id = 'mainContainer';
root.appendChild( mainContainer );

//function for Season Number and Episode Number
function pad( num, size )
{
  num = num.toString();
  while ( num.length < size ) num = '0' + num;
  return num;
}


function setup()
{
  //level 100

  allEpisodes.forEach( el =>
  {
    let list = document.createElement( 'li' ); // displays list
    let title = document.createElement( 'h4' ); // displays title
    let img = document.createElement( 'img' ); // displays image
    //let summary = document.createElement( 'p' ); // displays summary
   // list.id = 'list';
    title.id = 'title';
    img.id = 'img';
   // summary.id = 'summary';
    title.innerText = `${ el.name } - S${ pad( el.season, 2 ) }E${ pad( el.number, 2 ) }`;
    img.src = `${ el.image.medium }`;
    list.innerHTML = el.summary;
    list.insertBefore( title, list.childNodes[0] );
    list.insertBefore( img, list.childNodes[1] );
    mainContainer.appendChild( list );
  })
}
  

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

// Level 200

function mySearchFunction()
{
  let input, filter, ul, li, title, summaryNop, i;// declare variables
  input = document.getElementById( 'myInPut' ); // user input
  filter = input.nodeValue.toUpperCase();
  ul = document.getElementById( 'mainContainer' );
  li = ul.getElementsByTagName( 'li' );

  console.log( li.length );

  for (i = 0; i < allEpisodes.length; i++) {
    title = allEpisodes[i].name;
    summaryNoP = allEpisodes[i].summary;
    summaryNoP = summaryNoP.replace(/(<p>|<\/p>)/g, ""); // regex to remove <p> tag from data
    // Iterate over each list item to see if the value of the input, ignoring         case, matches the inner text or inner html of the item.
    if (summaryNoP.toUpperCase().indexOf(filter) > -1 || title.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      li[i].classList.remove('hidden');
    } else {
      li[i].classList.add('hidden');
    }
  }
  // display search's result number
  document.getElementById('result').textContent = `Displaying ${document.querySelectorAll('#mainContainer li:not(.hidden)').length}/${allEpisodes.length} episodes`;
}
 // Loop through all list items, and hide those who don't match the search query
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
window.onload = setup;