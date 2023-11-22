/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(var i=0;i<games.length;i++)
    {
        
    

        // create a new div element, which will become the game card
        let game_class = document.createElement('div');
        
        

        // add the class game-card to the list
        game_class.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_class.innerHTML = `<img src=${games[i]["img"]} class = "game-img"> 
        </br><h3> ${games[i]["name"]}</h3>
        <p>${games[i]["description"]}</p>
        <p>Goal:${games[i]["goal"]}</br></br>
        Plegded:${games[i]["pledged"]}</br>
        <button>Donate Now</button>`;
        // console.log(`hello:${i} ${games[i]["name"]}`);

        // append the game to the games-container
        let container = document.getElementById("games-container");
        container.appendChild(game_class);
    }
}

// call the function we just defined using the correct variable
 addGamesToPage(GAMES_JSON) ;

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

//here I broke down the JSON to demonstrate ability to use the map function
let sumContribute = GAMES_JSON.map(GAMES_JSON  => GAMES_JSON.backers);
let TotalsumContribute = sumContribute.reduce((prev,next)=>{ return prev+next},0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${TotalsumContribute.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

//here I did it like it was shown in the example on the prework instruction site
let TotalAmountRaised = GAMES_JSON.reduce((prev,gameObj)=>{ return prev+gameObj.pledged},0);

// set inner HTML using template literal
raisedCard.innerHTML = ` $ ${TotalAmountRaised .toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let TotalgameCrds = GAMES_JSON.reduce((prev)=>{ return prev+1},0);
// set inner HTML using template literal
gamesCard.innerHTML = `${TotalgameCrds .toLocaleString('en-US')}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unFunded = GAMES_JSON.filter((games)=>{return games.pledged<games.goal});
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fullFunded = GAMES_JSON.filter((games)=>{return games.pledged>=games.goal});

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fullFunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON) ;
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
//reused line of code from above but with some slight tweaks to just get the number
let unFundedGames = (GAMES_JSON.filter((games)=>{return games.pledged<games.goal})).length;
let allGames = GAMES_JSON.length;
console.log(unFundedGames);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${TotalAmountRaised.toLocaleString('en-US')} has been raised for ${allGames} 
${allGames == 1 ? "game. ": "games. "}Currently, ${unFundedGames} 
${unFundedGames == 1 ? "game remains unfunded. ": "games remain unfunded. "} We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
let descript = document.createElement('p');
descript.innerHTML = displayStr;
descriptionContainer.appendChild(descript);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames);
// use destructuring and the spread operator to grab the first and second games
let [firstGame,SecondGame] = [sortedGames[0],sortedGames[1]]; 
// create a new element to hold the name of the top pledge game, then append it to the correct element
let game1 = document.createElement('p');
game1.innerHTML = `<b>${firstGame.name}</b>`
firstGameContainer.appendChild(game1);

// do the same for the runner up item
let game2 = document.createElement('p');
game2.innerHTML = `<b>${SecondGame.name}</b>`
secondGameContainer.appendChild(game2);

//this feature allows for a quick scroll down to a desired part of the web page. Right now it's a small webpage so it does not matter much
//but one day it will
function inputVal(){
    //stores whatever input the user put in the text box
    let visitInput = document.getElementById("input").value;
    console.log(visitInput);

    //basic if and else statment to see where the page scrolls down to
    if(visitInput == "Our Game")
    {
        const scroll = document.getElementById("games-container");
        scroll.scrollIntoView();
    }
    else if(visitInput == "Stats")
    {
        const scroll = document.getElementById("Stats");
        scroll.scrollIntoView();
    }
}
//find the button.
const inputbtn = document.getElementById("go");
//when button is clicked call the inputVal 
inputbtn.addEventListener("click",inputVal);

