////////////////////////////////////////////////////////// SOPHIE CAMPBELL EIA1 //////////////////////////////////////////////////////////
//------------------------------------------- Karten Arrays ------------------------------------------------//
var playerHandArray = [];
var compHandArray = [];
var deckArray = [];
var discardPileArray = [];
//------------------------------------------- Zusätzliche Variablen -------------------------------------------//
var playersTurn = true; // Gibt an ob der Player am Zug ist.
var compHandVisible = false; // Gibt an ob die Karten des Computers sichtbar sind.
//------------------------------------------- Onload -------------------------------------------//
window.onload = function () {
    // Zwei Eventlistener um die Spielregeln anzuzeigen/auszublenden.
    document.getElementById("rulesButton").addEventListener('click', function () { switchOverlay(false); }, false);
    document.getElementById("overlay").addEventListener('click', function () { switchOverlay(true); }, false);
    document.getElementById("topDeckCard").addEventListener('click', function () { drawCard(playersTurn); }, false);
    // Zu Beginn wird das Deck erzeugt, gemischt, Karten ausgeteilt, und das HTML erstellt.
    generateNewDeck();
    shuffleDeck();
    dealCards();
    updateHTML();
    console.log("****************************************");
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// SETUP-FUNKTIONEN ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------- Generiert alle Karten und schreibt sie ins deckArray ----------------------------------------//
function generateNewDeck() {
    var newCardValue;
    var newCardColor;
    var newSpecialProperty = "none";
    // Schleifen die Karten mit den Werten 1-9, in vier verschiedenen Farben erzeugen.
    for (var i = 1; i <= 9; i++) {
        for (var j = 0; j < 4; j++) {
            newCardValue = i;
            switch (j) {
                case 0:
                    newCardColor = "red";
                    break;
                case 1:
                    newCardColor = "blue";
                    break;
                case 2:
                    newCardColor = "yellow";
                    break;
                case 3:
                    newCardColor = "green";
                    break;
            }
            var newCard = {
                specialProperty: "none",
                cardValue: newCardValue,
                cardColor: newCardColor
            };
            deckArray.push(newCard);
        }
    }
    // Schleife die 4 Sonderkarten (zwei mal "+4", zwei mal "+2") erzeugt.
    for (var k = 0; k < 4; k++) {
        switch (k) {
            case 0:
            case 1:
                newSpecialProperty = "Plus 2";
                break;
            case 2:
            case 3:
                newSpecialProperty = "Plus 4";
                break;
        }
        var newCard = {
            specialProperty: newSpecialProperty,
            cardValue: 0,
            cardColor: "allColors"
        };
        deckArray.push(newCard);
    }
    console.log("Neues Deck wurde generiert.");
}
//---------------------------------------- Mischt das Deck ----------------------------------------//
function shuffleDeck() {
    deckArray.sort(function (a, b) {
        return 0.5 - Math.random(); // gibt der .sort Methode eine zufällig positive oder negative Zahl.
    });
    console.log('Das Deck wurde gemischt.');
    console.log(deckArray);
}
//---------------------------------------- Teilt beiden Spielern 7 Karten aus und legt eine Karte auf den Ablagestapel ----------------------------------------//
function dealCards() {
    for (var i = 0; i < 7; i++) {
        compHandArray.push(deckArray[0]);
        deckArray.splice(0, 1);
        playerHandArray.push(deckArray[0]);
        deckArray.splice(0, 1);
    }
    discardPileArray.push(deckArray[0]);
    deckArray.splice(0, 1);
    console.log('Karten wurden ausgeteilt.');
    console.log(compHandArray);
    console.log(playerHandArray);
    console.log(deckArray);
    console.log(discardPileArray);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// HTML-FUNKTIONEN ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------- Erzeugt das HTML einer Karte der Player-Hand ----------------------------------------//
// Parameter= Kartennummer
function generatePlayerHandHTML(CardNr) {
    // Erstellen des Karten-<div> mit Eventlistener.
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "playerCard" + (CardNr + 1));
    cardDiv.setAttribute("class", "card");
    cardDiv.addEventListener('click', function () { playCard(CardNr, playersTurn); }, false);
    document.getElementById("playerHand").appendChild(cardDiv);
    // Ermitteln was auf der Karte stehen soll.
    var tempCardValue = playerHandArray[CardNr].cardValue + "";
    switch (playerHandArray[CardNr].specialProperty) {
        case "Plus 2":
            tempCardValue = "+2";
            break;
        case "Plus 4":
            tempCardValue = "+4";
            break;
    }
    // Erstellen der <p>-Tags mit dem Inhalt in gewollter Farbe.
    var cardValueP1 = document.createElement("p");
    cardValueP1.innerHTML = tempCardValue + "";
    cardValueP1.setAttribute("class", playerHandArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP1);
    var cardValueP2 = document.createElement("p");
    cardValueP2.innerHTML = tempCardValue + "";
    cardValueP2.setAttribute("class", playerHandArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP2);
}
//---------------------------------------- Erzeugt das HTML einer Karte der Computer-Hand ----------------------------------------//
// Parameter= Kartennummer
function generateCompHandHTML(CardNr) {
    if (!compHandVisible) { // Falls die Karten verdeckt sind.
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", "compCard" + (CardNr + 1));
        cardDiv.setAttribute("class", "hiddenCard");
        document.getElementById("compHand").appendChild(cardDiv);
    }
    else { // Falls die Karten sichtbar sind.
        // Erstellen des Karten-<div> mit Eventlistener.
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", "compCard" + (CardNr + 1));
        cardDiv.setAttribute("class", "card");
        document.getElementById("compHand").appendChild(cardDiv);
        // Ermitteln was auf der Karte stehen soll.
        var tempCardValue = compHandArray[CardNr].cardValue + "";
        switch (compHandArray[CardNr].specialProperty) {
            case "Plus 2":
                tempCardValue = "+2";
                break;
            case "Plus 4":
                tempCardValue = "+4";
                break;
        }
        // Erstellen der <p>-Tags mit dem Inhalt in gewollter Farbe.
        var cardValueP1 = document.createElement("p");
        cardValueP1.innerHTML = tempCardValue + "";
        cardValueP1.setAttribute("class", compHandArray[CardNr].cardColor);
        cardDiv.appendChild(cardValueP1);
        var cardValueP2 = document.createElement("p");
        cardValueP2.innerHTML = tempCardValue + "";
        cardValueP2.setAttribute("class", compHandArray[CardNr].cardColor);
        cardDiv.appendChild(cardValueP2);
    }
}
//---------------------------------------- Erzeugt das HTML einer Karte des Ablage-Stapels ----------------------------------------//
// Parameter= Kartennummer
function generateDiscardPileHTML(CardNr) {
    // Erstellen des Karten-<div>.
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "discardPile" + (CardNr + 1));
    cardDiv.setAttribute("class", "card");
    cardDiv.style.left = 30 + (CardNr * 0.5) + "%"; // Jede neue Karte wird leicht nach rechts Verschoben.
    cardDiv.style.transform = "rotate(" + (Math.random() * 31 - 20) + "deg)"; // Karten bekommen eine zufällige Rotation, um einen hingeworfenen Kartenstapel zu simulieren.
    document.getElementById("playArea").appendChild(cardDiv);
    // Ermitteln was auf der Karte stehen soll.
    var tempCardValue = discardPileArray[CardNr].cardValue + "";
    switch (discardPileArray[CardNr].specialProperty) {
        case "Plus 2":
            tempCardValue = "+2";
            break;
        case "Plus 4":
            tempCardValue = "+4";
            break;
    }
    // Erstellen der <p>-Tags mit dem Inhalt in gewollter Farbe.
    var cardValueP1 = document.createElement("p");
    cardValueP1.innerHTML = tempCardValue + "";
    cardValueP1.setAttribute("class", discardPileArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP1);
    var cardValueP2 = document.createElement("p");
    cardValueP2.innerHTML = tempCardValue + "";
    cardValueP2.setAttribute("class", discardPileArray[CardNr].cardColor);
    cardDiv.appendChild(cardValueP2);
}
//---------------------------------------- Ruft die HTML-Funktionen auf bis alle Karten dargestellt werden ----------------------------------------//
function generateAllHTML() {
    for (var i = 0; i < compHandArray.length; i++) {
        generateCompHandHTML(i);
    }
    for (var j = 0; j < playerHandArray.length; j++) {
        generatePlayerHandHTML(j);
    }
    for (var k = 0; k < discardPileArray.length; k++) {
        generateDiscardPileHTML(k);
    }
}
//---------------------------------------- Löscht alle erzeugten HTML-Elemente ----------------------------------------//
function clearAllHTML() {
    // Lösche alle HTML-Elemente der Player-Hand.
    var divToEmpty = document.getElementById("playerHand");
    var children = divToEmpty.children;
    var childCount = children.length;
    for (var i = 0; i < childCount; i++) {
        if (divToEmpty.firstElementChild != null)
            divToEmpty.removeChild(divToEmpty.firstElementChild);
    }
    // Lösche alle HTML-Elemente der Computer-Hand.
    divToEmpty = document.getElementById("compHand");
    children = divToEmpty.children;
    childCount = children.length;
    for (var i = 0; i < childCount; i++) {
        if (divToEmpty.firstElementChild != null)
            divToEmpty.removeChild(divToEmpty.firstElementChild);
    }
    // Lösche alle HTML-Elemente des Ablage-Stapels.
    divToEmpty = document.getElementById("playArea");
    children = divToEmpty.children;
    childCount = children.length;
    for (var i = 0; i < childCount; i++) {
        if (divToEmpty.firstElementChild != null)
            divToEmpty.removeChild(divToEmpty.firstElementChild);
    }
}
//---------------------------------------- Refreshe das komplette HTML ----------------------------------------//
function updateHTML() {
    clearAllHTML();
    generateAllHTML();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// FUNKTIONEN FÜR DEN SPIELABLAUF ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------- Spiele die gecklickte Karte falls es gültig ist ----------------------------------------//
// Parameter1 = Kartennummer | Parameter2 = Welcher Spieler möchte eine Karte spielen 
function playCard(playedCardNr, tempPlayersTurn) {
    if (tempPlayersTurn == true) { //Falls der Player eine Karte spielen will.
        if ((playerHandArray[playedCardNr].cardValue == discardPileArray[discardPileArray.length - 1].cardValue) || // Gleicher Wert?
            (playerHandArray[playedCardNr].cardColor == discardPileArray[discardPileArray.length - 1].cardColor) || // Gleiche Farbe?
            (discardPileArray[discardPileArray.length - 1].specialProperty != "none") || // Zuletzt gelegte Karte ist eine Sonderkarte?
            (playerHandArray[playedCardNr].specialProperty != "none")) { // Geklickte Karte ist eine Sonderkarte?
            // Karte wird gespielt.
            discardPileArray.push(playerHandArray[playedCardNr]);
            playerHandArray.splice(playedCardNr, 1);
            console.log('Player hat Karte: "' + discardPileArray[discardPileArray.length - 1].cardValue + " " + discardPileArray[discardPileArray.length - 1].cardColor + '" gespielt.');
            updateHTML();
            //Sonderfunktion wird ausgeführt
            useSpecialProperty(discardPileArray[discardPileArray.length - 1], playersTurn);
            // Falls der Player keine Karten mehr auf der Hand hat, beende das Spiel.
            if (playerHandArray.length < 1) {
                endGame(true);
            }
            // Sonst ist der Computer dran. + Kleine Zeitverzögerung, zum besseren Verständniss des Spielablaufs.
            else {
                setTimeout(computersTurn, 350);
            }
        }
        else {
            console.log("Karte darf nicht gespielt werden.");
        }
    }
    else { // Falls der Computer eine Karte spielen will.
        if ((compHandArray[playedCardNr].cardValue == discardPileArray[discardPileArray.length - 1].cardValue) ||
            (compHandArray[playedCardNr].cardColor == discardPileArray[discardPileArray.length - 1].cardColor) ||
            (discardPileArray[discardPileArray.length - 1].specialProperty != "none") ||
            (compHandArray[playedCardNr].specialProperty != "none")) {
            // Karte wird gespielt.
            discardPileArray.push(compHandArray[playedCardNr]);
            compHandArray.splice(playedCardNr, 1);
            console.log('Computer hat Karte: "' + discardPileArray[discardPileArray.length - 1].cardValue + " " + discardPileArray[discardPileArray.length - 1].cardColor + '" gespielt.');
            updateHTML();
            //Sonderfunktion wird ausgeführt
            useSpecialProperty(discardPileArray[discardPileArray.length - 1], playersTurn);
            // Falls der Computer keine Karten mehr auf der Hand hat, beende das Spiel.
            if (compHandArray.length < 1) {
                endGame(false);
            }
            // Sonst ist der Player dran.
            else {
                playersTurn = true;
            }
        }
        else {
            console.log("Karte darf nicht gespielt werden.");
        }
    }
}
//---------------------------------------- Ziehe eine Karte ----------------------------------------//
// Parameter = Welcher Spieler möchte eine Karte ziehen
function drawCard(tempPlayersTurn) {
    // Falls das Deck leer ist wird der Ablagestapel zum neuen Deck.
    if (deckArray.length < 1) {
        refillDeck();
    }
    // Der Spieler der am Zug ist, zieht eine Karte. Dann ist der Andere am Zug.
    if (tempPlayersTurn == true) {
        playerHandArray.push(deckArray[0]);
        deckArray.splice(0, 1);
        console.log('Spieler hat Karte: "' + playerHandArray[playerHandArray.length - 1].cardValue + " " + playerHandArray[playerHandArray.length - 1].cardColor + '" gezogen.');
        updateHTML();
        setTimeout(computersTurn, 350);
    }
    else {
        compHandArray.push(deckArray[0]);
        deckArray.splice(0, 1);
        console.log('Computer hat Karte: "' + compHandArray[compHandArray.length - 1].cardValue + " " + compHandArray[compHandArray.length - 1].cardColor + '" gezogen.');
        updateHTML();
        playersTurn = true;
    }
}
//---------------------------------------- Der Spielzug des Computers ----------------------------------------//
function computersTurn() {
    console.log("****************************************");
    playersTurn = false;
    // Jede Karte auf der Computer-Hand wird zu spielen versucht.
    for (var i = 0; (i < compHandArray.length) && (playersTurn == false); i++) {
        playCard(i, playersTurn);
    }
    // Falls keine Karte gespielt wurde und der Computer immernoch am Zug ist, zieht er eine Karte.
    if (playersTurn == false) {
        drawCard(playersTurn);
    }
    playersTurn = true;
    console.log("****************************************");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// ZUSATZ-FUNKTIONEN ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------- Das Spiel wird beendet und ein neues Spiel wird begonnen ----------------------------------------//
// Parameter= Wurde das Spiel gewonnen oder Verloren
function endGame(wonTheGame) {
    console.log('Spiel wurde beendet.');
    // Ein Alert ausgegeben, je nachdem ob gewonnen oder verloren wurde.
    if (wonTheGame) {
        alert("!!!!! GLÜCKWUNSCH !!!!!\n!!!!! DU HAST GEWONNEN !!!!!\n\nNochmal spielen?");
    }
    else {
        alert("Du hast leider verloren.\n\nNochmal spielen?");
    }
    // Leere alle Arrays und Starte eine neue Runde.
    while (compHandArray.length > 0) {
        compHandArray.pop();
    }
    while (playerHandArray.length > 0) {
        playerHandArray.pop();
    }
    while (deckArray.length > 0) {
        deckArray.pop();
    }
    while (discardPileArray.length > 0) {
        discardPileArray.pop();
    }
    console.log('Arrays wurden geleert.');
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    generateNewDeck();
    shuffleDeck();
    dealCards();
    updateHTML();
    playersTurn = true;
}
//---------------------------------------- Der Ablagestapel wird zum Deck, dann wird das Deck gemischt ----------------------------------------//
function refillDeck() {
    // Zwischenspeichern der obersten Karte des Ablagestapels.
    var topCard = discardPileArray[discardPileArray.length - 1];
    discardPileArray.pop();
    // Alle Karten des Ablagestapels werden in das Deck geschrieben und dann aus dem Ablagestapel gelöscht.
    while (discardPileArray.length > 0) {
        deckArray.push(discardPileArray[discardPileArray.length - 1]);
        discardPileArray.pop();
    }
    discardPileArray.push(topCard);
    console.log('Ablagestapel wurde zum neuen Deck');
    shuffleDeck();
    updateHTML();
}
//---------------------------------------- Die Sonderfunktion einer Karte wird benutzt ----------------------------------------//
// Parameter1= Die Karte die genutzt wird | Parameter2= Welcher Spieler ist am Zug
function useSpecialProperty(tempCard, tempPlayersTurn) {
    if (tempPlayersTurn) { // Wenn der Player am Zug ist.
        switch (tempCard.specialProperty) {
            // Bei "Plus 2" zieht der Computer 2 Karten.
            case "Plus 2":
                for (var i = 0; i < 2; i++) {
                    if (deckArray.length < 1) {
                        refillDeck();
                    }
                    compHandArray.push(deckArray[0]);
                    deckArray.splice(0, 1);
                }
                console.log('Computer musste 2 Karten ziehen.');
                break;
            // Bei "Plus 4" zieht der Computer 4 Karten.
            case "Plus 4":
                for (var i = 0; i < 4; i++) {
                    if (deckArray.length < 1) {
                        refillDeck();
                    }
                    compHandArray.push(deckArray[0]);
                    deckArray.splice(0, 1);
                }
                console.log('Computer musste 4 Karten ziehen.');
                break;
        }
    }
    else { // Wenn der Computer am Zug ist.
        switch (tempCard.specialProperty) {
            case "Plus 2":
                for (var i = 0; i < 2; i++) {
                    if (deckArray.length < 1) {
                        refillDeck();
                    }
                    playerHandArray.push(deckArray[0]);
                    deckArray.splice(0, 1);
                }
                console.log('Player musste 2 Karten ziehen.');
                break;
            case "Plus 4":
                for (var i = 0; i < 4; i++) {
                    if (deckArray.length < 1) {
                        refillDeck();
                    }
                    playerHandArray.push(deckArray[0]);
                    deckArray.splice(0, 1);
                }
                console.log('Player musste 4 Karten ziehen.');
                break;
        }
    }
    updateHTML();
}
//---------------------------------------- Drehe die Karten der Computer-Hand um ----------------------------------------//
function flipCompHand() {
    compHandVisible = !compHandVisible;
    console.log('Die Karten des Computers wurden umgedreht.');
    updateHTML();
}
//---------------------------------------- Schalte das Overlay mit den Spielregeln an oder aus ----------------------------------------//
// Parameter= Zeigt ob das Overlay momentan sichtbar ist.
function switchOverlay(visible) {
    if (visible)
        document.getElementById("overlay").style.display = "none";
    else
        document.getElementById("overlay").style.display = "block";
    console.log('Das Spielregeln-Overlay wurde an/ausgeschalten');
}
//# sourceMappingURL=script.js.map