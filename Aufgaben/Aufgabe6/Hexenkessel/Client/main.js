var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Alle verschiedenen Step types, welche zur Verfügung stehen
var recipeStepTypes;
(function (recipeStepTypes) {
    recipeStepTypes["ADD_INGREDIENT"] = "ingredient";
    recipeStepTypes["GET_UP_TO_TEMPERATURE"] = "temperatur";
    recipeStepTypes["STIRING"] = "stiring";
    recipeStepTypes["WAITING"] = "waiting";
})(recipeStepTypes || (recipeStepTypes = {}));
//alle Zubereitungsschritte (benötigen auf jeden fall den Step type und dann noch beliebige andere Eigenschaften)
var recipeSteps = [];
//alle Effekte welche ausgewählt wurden
var addedEffects = [];
//Alle notwendigen Elemente im Dokument suchen
var ingredientsDropdown = document.getElementById("ingredientDropdown");
var effectsDropdown = document.getElementById("effectsDropdown");
var effectDuration = document.getElementById("effectTime");
var poisonName = document.getElementById("name");
var poisonDescription = document.getElementById("description");
var addEffectButton = document.getElementById("addEffect");
var addIngredientButton = document.getElementById("addIngredient");
var ingredientAmount = document.getElementById("addIngredientAmount");
var getToTemperature = document.getElementById("getToTemperature");
var addTemperatureButton = document.getElementById("addTemperature");
var stirIntensityDropdown = document.getElementById("stirintensity");
var stirTime = document.getElementById("stirTime");
var addStiringButton = document.getElementById("addStiring");
var waittime = document.getElementById("waittime");
var addWaitButton = document.getElementById("addWaiting");
var recipeName = document.getElementById("recipeName");
var recipeDescription = document.getElementById("recipeDescription");
var submitButton = document.getElementById("submit");
var ingredientsList = document.getElementById("ingredientsList");
var effectsList = document.getElementById("effectsList");
var stepsList = document.getElementById("stepsList");
var totalCostSpanElement = document.getElementById("totalCost");
//hier werden die geladenen Einstellungen von Snape reingeladen
var availableIngredients = [];
var availableEffects = [];
//wenn alle Ressourcen geladen sind die snapeSettings.json laden
window.addEventListener("load", loadSnapeConfig);
function loadSnapeConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var Response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./snapeSettings.json")];
                case 1:
                    Response = _a.sent();
                    return [4 /*yield*/, Response.json()];
                case 2:
                    data = _a.sent();
                    //Daten auf die globalen Variablen übernehmen
                    availableIngredients = data.ingredients;
                    availableEffects = data.effects;
                    //Beide Dropdown listen bereinigen
                    ingredientsDropdown.innerHTML = "";
                    effectsDropdown.innerHTML = "";
                    //Zutaten als Dropdown hinzufügen
                    availableIngredients.forEach(function (ingredient) {
                        //neues Option Element erstellen und werte setzen
                        var newOption = document.createElement("option");
                        newOption.value = ingredient.name;
                        newOption.text = ingredient.name;
                        //dem Dropdown menu hinzufügen
                        ingredientsDropdown.add(newOption);
                    });
                    availableEffects.forEach(function (effect) {
                        var newOption = document.createElement("option");
                        newOption.value = effect;
                        newOption.text = effect;
                        effectsDropdown.add(newOption);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
//Beim ändern des Namens wird der name auf dem Rezept aktualisiert
poisonName.addEventListener("input", function () {
    recipeName.innerText = poisonName.value;
});
//Beim ändern der Beschreibung wird die Beschreibung auf dem Rezept aktualisiert
poisonDescription.addEventListener("input", function () {
    recipeDescription.innerText = poisonDescription.value;
});
//Add Effekt Button
addEffectButton.addEventListener("click", function () {
    //holen von effektname und dauer von den HTML Elementen
    var effectname = effectsDropdown.value;
    var duration = effectDuration.value;
    //hinzufügen auf die Globale Variable addedEffects
    addedEffects.push({ name: effectname, duration: duration });
    //Aktualisierung der darstellung der Effekte
    displayEffects();
});
//Add Ingredient Button
addIngredientButton.addEventListener("click", function () {
    var _a;
    //Name und anzahl der Zutat von HTML Elementen holen
    var ingredientsName = ingredientsDropdown.value;
    var ingredientsAmount = ingredientAmount.valueAsNumber;
    //ueber die find funktion zuerst die zutat aus den verfügbaren zutaten finden und dann die unit herausfinden
    var ingredientUnit = (_a = availableIngredients.find(function (value) { return value.name == ingredientsName; })) === null || _a === void 0 ? void 0 : _a.unit;
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.ADD_INGREDIENT,
        name: ingredientsName,
        amount: ingredientsAmount,
        unit: ingredientUnit
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
    displayIngredients();
});
//Add Temperature Button
addTemperatureButton.addEventListener("click", function () {
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.GET_UP_TO_TEMPERATURE,
        temperature: getToTemperature.value //temperatur von dem HTML Element holen (getToTemperature.value)
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
});
//Add stiring button
addStiringButton.addEventListener("click", function () {
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.STIRING,
        intensity: stirIntensityDropdown.value,
        duration: stirTime.value
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
});
//Add Waiting
addWaitButton.addEventListener("click", function () {
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.WAITING,
        duration: waittime.value
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
});
function displayEffects() {
    //Effekte-Liste bereinigen
    effectsList.innerHTML = "";
    //Für jeden ausgewählten Effekt ein eintrag in der Liste hinzufügen
    addedEffects.forEach(function (effect, index) {
        //erstellen eines li Elements
        var listItem = document.createElement("li");
        //Bearbeiten des inhalts
        listItem.innerHTML = effect.name + " for" + effect.duration + "h";
        //hinzufügen del Löschen buttons (aufruf der deleteEffect funktion mit dem eigenen index)
        listItem.innerHTML += "<button onclick = 'deleteEffect(" + index + ")'> DELETE </button>";
        //Hinzufügen zu der Effekte Liste
        effectsList.appendChild(listItem);
    });
}
function displayRecipeSteps() {
    //Bereinugung aller Zutaten Schritte
    stepsList.innerHTML = "";
    recipeSteps.forEach(function (step, index) {
        var listItem = document.createElement("li");
        var innerHTML = "";
        //Für jeden Schritt den typ herausfinden und Text dementsprechend anpassen
        if (step.type == recipeStepTypes.ADD_INGREDIENT) {
            innerHTML = "add " + step.amount + step.unit + " of " + step.name + " to the poison";
        }
        else if (step.type == recipeStepTypes.WAITING) {
            innerHTML = "wait for " + step.duration + "h";
        }
        else if (step.type == recipeStepTypes.STIRING) {
            innerHTML = "stir with " + step.intensity + " intensity for " + step.duration + "h";
        }
        else if (step.type == recipeStepTypes.GET_UP_TO_TEMPERATURE) {
            innerHTML = "bring the potion to " + step.temperature + "C°";
        }
        //hinter jedem element delete button hinzufügen welcher die funktion deleteRecipeStep mit dem eigenen Index aufruft
        innerHTML += " <button onclick='deleteRecipeStep(" + index + ")'> DELETE";
        listItem.innerHTML = innerHTML;
        //Hinzufügen des listItems
        stepsList.appendChild(listItem);
    });
}
function displayIngredients() {
    ingredientsList.innerHTML = "";
    //Aus der Zubereitungsliste alle schritte mit dem typ ADD_INGREDIENT herausfiltern
    var ingredientsSteps = recipeSteps.filter(function (value) { return value.type == recipeStepTypes.ADD_INGREDIENT; });
    var totalPrice = 0;
    ingredientsSteps.forEach(function (ingredientStep) {
        var _a;
        var listItem = document.createElement("li");
        //Preis pro einheit über availableIngredients herausfinden
        var price = (_a = availableIngredients.find(function (value) { return value.name == ingredientStep.name; })) === null || _a === void 0 ? void 0 : _a.price;
        var cost = price * ingredientStep.amount;
        totalPrice += cost;
        listItem.innerHTML = ingredientStep.amount + ingredientStep.unit + " of " + ingredientStep.name + " with kost of " + cost + " Knuts required";
        ingredientsList.appendChild(listItem);
    });
    //Gesamtpreis abändern
    totalCostSpanElement.innerText = totalPrice + " Knuts";
}
function deleteEffect(toDeteleIndex) {
    //löschen des übergebenen Indexes mithilfe der filter funktion
    //(Array behält alle werte für die die funktion true ergibt)
    addedEffects = addedEffects.filter(function (_value, index) { return index != toDeteleIndex; });
    displayEffects();
}
function deleteRecipeStep(toDeleteIndex) {
    recipeSteps = recipeSteps.filter(function (_value, index) { return index != toDeleteIndex; });
    displayRecipeSteps();
    displayIngredients();
}
submitButton.addEventListener("click", submitButtonHandler);
function submitButtonHandler(_event) {
    return __awaiter(this, void 0, void 0, function () {
        var query, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("submitButton");
                    query = new URLSearchParams();
                    query.append("effects", JSON.stringify(addedEffects));
                    query.append("recipeSteps", JSON.stringify(recipeSteps));
                    query.append("description", poisonDescription.value);
                    return [4 /*yield*/, fetch("https://hexenkessel.herokuapp.com/?" + query.toString())];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    alert(JSON.stringify(data));
                    console.log(query.toString());
                    return [2 /*return*/];
            }
        });
    });
}
