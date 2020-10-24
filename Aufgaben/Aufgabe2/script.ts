////////////////////////////////////////////////////////// SOPHIE CAMPBELL EIA1 //////////////////////////////////////////////////////////



/**
 * Deklaration der Variablen
 */

interface card { // Karten Interface 
    spezialfunktion: string; // Gibt an welche spezialfunktion ("+2","+4", oder "none") die Karte hat 
    KartenWert: number;
    KartenFarbe: string;    
}

let CompKarteSichtbar: boolean = false; // Sichtbarkeit der Karten des Computers
let SpielerZug: boolean = true; // Anzeige ob Zug des Players

/*
* Karten Array
*/
let SpielerZugArray: card[] = [];                           
let CompKarteArray: card[] = [];
let DeckArray: card[] = [];
let discardPileArray: card[] = [];

/*
* Onload
*/
window.onload = function () {

    // Eventlistener um footer anzuzeigen/auszublenden
    document.getElementById("rulesButton").addEventListener('click', function(){switchOverlay(false);}, false);         
    document.getElementById("overlay").addEventListener('click', function(){switchOverlay(true);}, false);   
    document.getElementById("topDeckCard").addEventListener('click', function(){drawCard(SpielerZug);}, false);           

    // Zu Beginn wird das Deck erzeugt, gemischt, Karten ausgeteilt, und das HTML erstellt.
    generateNewDeck();
    shuffleDeck();
    dealCards();
    updateHTML();

    console.log("****************************************");
}


/*
* Set Up
*/
function generateNewDeck() { // generiert alle Karten in richtige Reihenfolge

    let newkartenwert: number;            
    let newKartenFarbe: string;
    let newspezialfunktion: string = "none";  

    for(let i:number=1; i<=9; i++){ // Schleifen die Karten mit den Werten 1-9, in vier verschiedenen Farben erzeugen
        for(let j:number=0; j<4; j++){

            newkartenwert=i;
            switch(j){
                case 0: newKartenFarbe = "red"; break;
                case 1: newKartenFarbe = "blue"; break;
                case 2: newKartenFarbe = "yellow"; break;
                case 3: newKartenFarbe = "green"; break;
            }
            let newCard: card = {                                         
                spezialfunktion: "none",
                kartenwert: newkartenwert,
                KartenFarbe: newKartenFarbe
            };
            DeckArray.push(newCard);
        }                                  
    }

    for(let k:number=0; k<4; k++){  // Schleife die 4 Sonderkarten erzeugt
        switch(k){
            case 0: case 1: newspezialfunktion = "Plus 2"; break;
            case 2: case 3: newspezialfunktion = "Plus 4"; break;
        }
        let newCard: card = {                                         
            spezialfunktion: newspezialfunktion,
            kartenwert: 0,
            KartenFarbe: "allColors"
        };
        DeckArray.push(newCard);
    }        
    console.log("Neues Deck wurde generiert.");
}
/* 
* Deck wird gemischt
*/
function shuffleDeck(){
    DeckArray.sort(function(a, b){          // .sort sortiert immer je nach positivem oder negativem Parameter
        return 0.5 - Math.random()          // gibt der .sort Methode eine zufällig positive oder negative Zahl
    })
    console.log('Das Deck wurde gemischt.');
    console.log(DeckArray);
}

/* 
* 7 Karten werden ausgeteilt. Eine Karte wird auf den Ablagestapel gelegt
*/

function dealCards(){

    for(let i:number=0; i<7; i++){
        CompKarteArray.push(DeckArray[0]);
        DeckArray.splice(0,1);
        SpielerZugArray.push(DeckArray[0]);
        DeckArray.splice(0,1);
    }
    
    discardPileArray.push(DeckArray[0]);
    DeckArray.splice(0,1);

    console.log('Karten wurden ausgeteilt.');
    console.log(CompKarteArray);
    console.log(SpielerZugArray);
    console.log(DeckArray);
    console.log(discardPileArray);
}


/*
* HTML Funktionen
*/

// Erzeugt das HTML einer Karte der Player-Hand //
// Parameter= Kartennummer
function generatePlayerHandHTML(CardNr:number){

    let cardDiv: HTMLElement = document.createElement("div"); // Eventlistener erstellt Karten Div        
    cardDiv.setAttribute("id", "playerCard" + (CardNr + 1));                  
    cardDiv.setAttribute("class", "card");    
    cardDiv.addEventListener('click', function () { playCard(CardNr, SpielerZug); }, false); 
    document.getElementById("playerHand").appendChild(cardDiv);                        
   
    let tempkartenwert: string = SpielerZugArray[CardNr].kartenwert + ""; // Inhalt der Karte wird erstellt
    switch(SpielerZugArray[CardNr].spezialfunktion){
        case "Plus 2": tempkartenwert = "+2"; break;
        case "Plus 4": tempkartenwert = "+4"; break;
    }

    let kartenwertP1: HTMLElement = document.createElement("p"); // Erstellen der <p>-Tags mit dem Inhalt in gewollter Farbe           
    kartenwertP1.innerHTML = tempkartenwert +""; 
    kartenwertP1.setAttribute("class", SpielerZugArray[CardNr].KartenFarbe);
    cardDiv.appendChild(kartenwertP1);  

    let kartenwertP2: HTMLElement = document.createElement("p");               
    kartenwertP2.innerHTML = tempkartenwert +""; 
    kartenwertP2.setAttribute("class", SpielerZugArray[CardNr].KartenFarbe);
    cardDiv.appendChild(kartenwertP2);            
}

// Erzeugt das HTML einer Karte der Player-Hand //
// Parameter= Kartennummer
function generateCompHandHTML(CardNr:number){

    if(!CompKarteSichtbar){ // Falls die Karten verdeckt sind

        let cardDiv: HTMLElement = document.createElement("div");              
        cardDiv.setAttribute("id", "compCard" + (CardNr + 1));                  
        cardDiv.setAttribute("class", "hiddenCard");     
        document.getElementById("compHand").appendChild(cardDiv);  

    } else{ // Falls die Karten sichtbar sind

        let cardDiv: HTMLElement = document.createElement("div"); // Eventlistener erstellt Karten Div                   
        cardDiv.setAttribute("id", "compCard" + (CardNr + 1));                  
        cardDiv.setAttribute("class", "card");     
        document.getElementById("compHand").appendChild(cardDiv);   
        
        let tempkartenwert: string = CompKarteArray[CardNr].kartenwert + ""; // Inhalt der Karte wird erstellt
        switch(CompKarteArray[CardNr].spezialfunktion){
            case "Plus 2": tempkartenwert = "+2"; break;
            case "Plus 4": tempkartenwert = "+4"; break;
        }
        
        let kartenwertP1: HTMLElement = document.createElement("p");  // Erstellen der <p>-Tags mit dem Inhalt in gewollter Farbe              
        kartenwertP1.innerHTML = tempkartenwert +""; 
        kartenwertP1.setAttribute("class", CompKarteArray[CardNr].KartenFarbe);
        cardDiv.appendChild(kartenwertP1);  

        let kartenwertP2: HTMLElement = document.createElement("p");               
        kartenwertP2.innerHTML = tempkartenwert +""; 
        kartenwertP2.setAttribute("class", CompKarteArray[CardNr].KartenFarbe);
        cardDiv.appendChild(kartenwertP2);   
    }
}

// Erzeugt das HTML einer Karte des Ablagestapels //
// Parameter= Kartennummer
function generateDiscardPileHTML(CardNr:number){

    
    let cardDiv: HTMLElement = document.createElement("div"); // Eventlistener erstellt Karten Div               
    cardDiv.setAttribute("id", "discardPile" + (CardNr + 1));                  
    cardDiv.setAttribute("class", "card");     
    cardDiv.style.left = 30 + (CardNr*0.5) + "%";                           // Jede neue Karte wird leicht nach rechts Verschoben.
    cardDiv.style.transform = "rotate("+ (Math.random()*31 -20) +"deg)";    // Karten bekommen eine zufällige Rotation, um einen hingeworfenen Kartenstapel zu simulieren.
    document.getElementById("playArea").appendChild(cardDiv);    

    let tempkartenwert: string = discardPileArray[CardNr].kartenwert + ""; // Inhalt der Karte wird erstellt
    switch(discardPileArray[CardNr].spezialfunktion){
        case "Plus 2": tempkartenwert = "+2"; break;
        case "Plus 4": tempkartenwert = "+4"; break;
    }
    
    let kartenwertP1: HTMLElement = document.createElement("p");  // Erstellen der <p>-Tags mit dem Inhalt in gewollter Farbe                
    kartenwertP1.innerHTML = tempkartenwert +""; 
    kartenwertP1.setAttribute("class", discardPileArray[CardNr].KartenFarbe);
    cardDiv.appendChild(kartenwertP1);  

    let kartenwertP2: HTMLElement = document.createElement("p");               
    kartenwertP2.innerHTML = tempkartenwert +""; 
    kartenwertP2.setAttribute("class", discardPileArray[CardNr].KartenFarbe);
    cardDiv.appendChild(kartenwertP2);   
}

/*
*Ruft die HTML-Funktionen auf bis alle Karten dargestellt werden 
*/
function generateAllHTML() {
    for (let i: number = 0; i < CompKarteArray.length; i++) {
        generateCompHandHTML(i);
    }
    for (let j: number = 0; j < SpielerZugArray.length; j++) {
        generatePlayerHandHTML(j);
    }
    for (let k: number = 0; k < discardPileArray.length; k++) {
        generateDiscardPileHTML(k);
    }
}

/*
* Löscht alle erzeugten HTML-Elemente
*/
function clearAllHTML() {

    // Alle HTML-Elemente der Player-Hand werden gelöscht
    let divToEmpty: HTMLElement = document.getElementById("playerHand");
    let children: HTMLCollection = divToEmpty.children;
    let childCount: number = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }
    
    // Alle HTML-Elemente der Computer-Hand werden gelöscht
    divToEmpty = document.getElementById("compHand");
    children = divToEmpty.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }
    
    // Alle HTML-Elemente des Ablage-Stapels werden gelöscht
    divToEmpty = document.getElementById("playArea");
    children = divToEmpty.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) {                           
        if (divToEmpty.firstElementChild != null)                          
        divToEmpty.removeChild(divToEmpty.firstElementChild);       
    }
}

/*
* Refreshe das komplette HTML 
*/
function updateHTML(){
    clearAllHTML();
    generateAllHTML();
}

/*
* Funktionen für Spielablauf
*/

// Parameter1 = Kartennummer 
// Parameter2 = Welcher Spieler möchte eine Karte spielen 
function playCard (playedCardNr:number, tempSpielerZug:boolean){                                              

    if (tempSpielerZug==true){ //Falls der Player eine Karte spielen will.

        if((SpielerZugArray[playedCardNr].kartenwert==discardPileArray[discardPileArray.length-1].kartenwert) ||  // Gleicher Wert?
        (SpielerZugArray[playedCardNr].KartenFarbe==discardPileArray[discardPileArray.length-1].KartenFarbe) ||     // Gleiche Farbe?
        (discardPileArray[discardPileArray.length-1].spezialfunktion!= "none")||                                // Zuletzt gelegte Karte ist eine Sonderkarte?
        (SpielerZugArray[playedCardNr].spezialfunktion!= "none")){                                              // Geklickte Karte ist eine Sonderkarte?

            // Karte wird gespielt.
            discardPileArray.push(SpielerZugArray[playedCardNr]);
            SpielerZugArray.splice(playedCardNr,1);
            console.log('Player hat Karte: "' + discardPileArray[discardPileArray.length-1].kartenwert +" "+ discardPileArray[discardPileArray.length-1].KartenFarbe + '" gespielt.');
            updateHTML();

            //Sonderfunktion wird ausgeführt
            usespezialfunktion(discardPileArray[discardPileArray.length-1],SpielerZug);
                        
            // Falls der Player keine Karten mehr auf der Hand hat, beende das Spiel.
            if (SpielerZugArray.length<1){endGame(true);}
            // Sonst ist der Computer dran. + Kleine Zeitverzögerung, zum besseren Verständniss des Spielablaufs.
            else {setTimeout(computersTurn,350);}    

        }else {console.log("Karte darf nicht gespielt werden.");}

    } else{                     // Falls der Computer eine Karte spielen will.

        if ((CompKarteArray[playedCardNr].kartenwert==discardPileArray[discardPileArray.length-1].kartenwert) ||
        (CompKarteArray[playedCardNr].KartenFarbe==discardPileArray[discardPileArray.length-1].KartenFarbe) ||
        (discardPileArray[discardPileArray.length-1].spezialfunktion != "none")||
        (CompKarteArray[playedCardNr].spezialfunktion!= "none")){
            
            // Karte wird gespielt.
            discardPileArray.push(CompKarteArray[playedCardNr]);
            CompKarteArray.splice(playedCardNr,1);
            console.log('Computer hat Karte: "' + discardPileArray[discardPileArray.length-1].kartenwert +" "+ discardPileArray[discardPileArray.length-1].KartenFarbe + '" gespielt.');
            updateHTML();

            //Sonderfunktion wird ausgeführt
            usespezialfunktion(discardPileArray[discardPileArray.length-1],SpielerZug);

            // Falls der Computer keine Karten mehr auf der Hand hat, beende das Spiel.
            if (CompKarteArray.length<1){endGame(false);}
            // Sonst ist der Player dran.
            else {SpielerZug=true;}

        }else {console.log("Karte darf nicht gespielt werden.");}
    }
}

// Parameter = Welcher Spieler möchte eine Karte ziehen
function drawCard(tempSpielerZug: boolean){

    if(DeckArray.length<1){ // Falls das Deck leer ist wird der Ablagestapel zum neuen Deck.
        refillDeck();
    }

    if (tempSpielerZug==true){              // Der Spieler der am Zug ist, zieht eine Karte. Dann ist der Andere am Zug.       
        SpielerZugArray.push(DeckArray[0]);
        DeckArray.splice(0,1);
        console.log('Spieler hat Karte: "' + SpielerZugArray[SpielerZugArray.length-1].kartenwert +" "+ SpielerZugArray[SpielerZugArray.length-1].KartenFarbe+ '" gezogen.');
        updateHTML();

        setTimeout(computersTurn,350);
    } else{
        CompKarteArray.push(DeckArray[0]);
        DeckArray.splice(0,1);
        console.log('Computer hat Karte: "' + CompKarteArray[CompKarteArray.length-1].kartenwert +" "+ CompKarteArray[CompKarteArray.length-1].KartenFarbe + '" gezogen.');
        updateHTML();

        SpielerZug=true;
    }
}

/*
*Spielzug des Computers
*/
function computersTurn(){
    console.log("****************************************");
    SpielerZug = false;

    // Jede Karte wird versucht zu spielen
    for(let i:number=0; (i<CompKarteArray.length) && (SpielerZug==false); i++){
        playCard(i,SpielerZug);
    }

    // Falls keine Karte gespielt wurde und der Computer immernoch am Zug ist, zieht er eine Karte
    if(SpielerZug==false){
        drawCard(SpielerZug);
    }
    SpielerZug=true;

    console.log("****************************************");
}

/*
* Der Ablagestapel wird zum Deck, dann wird das Deck gemischt
*/

function refillDeck(){
    
    // Zwischenspeichern der obersten Karte des Ablagestapels.
    let topCard:card = discardPileArray[discardPileArray.length-1];
    discardPileArray.pop();

    // Alle Karten des Ablagestapels werden in das Deck geschrieben und dann aus dem Ablagestapel gelöscht.
    while(discardPileArray.length>0){
        DeckArray.push(discardPileArray[discardPileArray.length-1])
        discardPileArray.pop();
    }
    discardPileArray.push(topCard);
    console.log('Ablagestapel wurde zum neuen Deck');

    shuffleDeck();
    updateHTML();
}

// Funktion der Sonderkarte tritte ein
// Parameter1= Die Karte die genutzt wird | Parameter2= Welcher Spieler ist am Zug
function usespezialfunktion(tempCard:card, tempSpielerZug:boolean){

    if(tempSpielerZug){        // Wenn der Player am Zug ist.
        switch(tempCard.spezialfunktion){

            // Bei "Plus 2" zieht der Computer 2 Karten.
            case "Plus 2":
                for(let i:number=0; i<2; i++){
                    if(DeckArray.length<1) {refillDeck();}
                    CompKarteArray.push(DeckArray[0]);
                    DeckArray.splice(0,1);
                }
                console.log('Computer musste 2 Karten ziehen.');
            break;

            // Bei "Plus 4" zieht der Computer 4 Karten.
            case "Plus 4":
                for(let i:number=0; i<4; i++){
                    if(DeckArray.length<1) {refillDeck();}
                    CompKarteArray.push(DeckArray[0]);
                    DeckArray.splice(0,1);
                }
                console.log('Computer musste 4 Karten ziehen.');
            break;
        }

    } else{                 // Wenn der Computer am Zug ist.
        switch(tempCard.spezialfunktion){
            case "Plus 2":
                for(let i:number=0; i<2; i++){
                    if(DeckArray.length<1) {refillDeck();}
                        SpielerZugArray.push(DeckArray[0]);
                        DeckArray.splice(0,1);
                }
                console.log('Player musste 2 Karten ziehen.');
            break;
            case "Plus 4":
                for(let i:number=0; i<4; i++){
                    if(DeckArray.length<1) {refillDeck();}
                        SpielerZugArray.push(DeckArray[0]);
                        DeckArray.splice(0,1);
                }
                console.log('Player musste 4 Karten ziehen.');
            break;
        }
    }
    updateHTML();
}

// Drehe die Karten der Computer-Hand um//
function flipCompHand(){
    CompKarteSichtbar = !CompKarteSichtbar;
    console.log('Die Karten des Computers wurden umgedreht.');
    updateHTML();
}

// Schalte das Overlay mit den Spielregeln an oder aus //
// Parameter= Zeigt ob das Overlay momentan sichtbar ist.
function switchOverlay(visible:boolean){
    if(visible) 
    document.getElementById("overlay").style.display = "none"; 
    else        
    document.getElementById("overlay").style.display = "block";
    console.log('Das Spielregeln-Overlay wurde an/ausgeschalten');
}