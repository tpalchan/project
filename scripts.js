//define page main elements
const page = document.getElementById('root');

//define logo
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

page.appendChild(logo);
page.appendChild(container);

// create request to get required data
var request = new XMLHttpRequest();
request.open('GET', 'https://api.magicthegathering.io/v1/cards?pageSize=50&types=creature', true);

request.onload = function () {

  // create array of values from parsed JSON from responce
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
    // for each card in cards perform following actions
    data.cards.forEach(card => {

        // do not display card if image is null
        if (card.imageUrl == null){
            card.delete;
        }
        else {
            const cardbox = document.createElement('div');
            cardbox.setAttribute('class', 'cardbox');
            
            const h1 = document.createElement('h1');
            h1.textContent = card.name;
  
            const p = document.createElement('p');

            const img = new Image();
            img.setAttribute("src",card.imageUrl);
            
            //set attribute to allow next line display
            p.setAttribute('style', 'white-space: pre;');
  
            p.textContent = `Artist: ${card.artist} \r\n`;
            p.textContent += `Set Name: ${card.setName}\r\n`
            p.textContent += `Type: ${card.types}\r\n`
            p.textContent += `Original Type: ${card.originalType}`
  
            container.appendChild(cardbox);
            cardbox.appendChild(h1);
            cardbox.appendChild(p);
            cardbox.appendChild(img);
        }
    });
}  else {
    const errorMessage = document.createElement('ooops');
    errorMessage.textContent = `Something went very wrong! Please, try again`;
    page.appendChild(errorMessage);
}
}

request.send();







