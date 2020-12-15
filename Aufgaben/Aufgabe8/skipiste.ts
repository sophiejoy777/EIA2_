const canvas = <HTMLCanvasElement>document.getElementById("slope")
const crc2 = canvas.getContext("2d")
class SkiFahrer {
    public x;
    public y;
    public color: string;

    constructor (x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public drawSkier () {
        crc2.fillStyle = this.color;
        crc2.beginPath();
        crc2.arc(this.x + 5, this.y + 5, 8, 0, 2 * Math.PI);
        crc2.fill();
        crc2.fillRect(this.x, this.y, 10, 40);
        crc2.lineWidth = 2;
        crc2.beginPath();
        crc2.moveTo(this.x - 20, this.y + 46);
        crc2.lineTo(this.x + 19, this.y + 38);
        crc2.stroke();
    }
}

drawBackground();
drawSun();
drawLift();
drawTree();


//Skifahrer
let Skiers: SkiFahrer[] = [];

Skiers.push(new SkiFahrer(250, 300, "#27b4df"));
Skiers.push(new SkiFahrer(300, 450, "#d84b20"));
Skiers.push(new SkiFahrer(450, 500, "#7fb0b2"));
Skiers.push(new SkiFahrer(500, 200, "#cf3476"));
Skiers.push(new SkiFahrer(290, 340, "#cf3476"));
Skiers.push(new SkiFahrer(450, 290, "#27b4df"));
Skiers.push(new SkiFahrer(290, 190, "#7fb0b2"));
Skiers.push(new SkiFahrer(560, 300, "#cf3476"));


function drawSkiers() {
    for(let Skier of Skiers){
        Skier.drawSkier();
    }
}
drawSkiers();

//Hintergrund
function drawBackground () {
    //Himmel
    var grd = crc2.createLinearGradient(0, 0, 0, 300);
    var grd2 = crc2.createLinearGradient(0, 0, 0, 300);
    grd.addColorStop(0, "#66e0ff");
    grd.addColorStop(1, "white");
    grd2.addColorStop(0, "#00ffff");
    grd2.addColorStop(1, "white");
    crc2.fillStyle = grd;
    crc2.fillRect(0, 0, 800, 600);

    //Berge
    //Berg1
    crc2.beginPath();
    crc2.moveTo(460, 220);
    crc2.lineTo(520, 130);
    crc2.lineTo(570, 220);
    crc2.lineTo(460, 220);
    crc2.closePath();
    crc2.fillStyle = "#393c3e";
    crc2.fill();

    //Berg2
    crc2.beginPath();
    crc2.moveTo(280, 200);
    crc2.lineTo(320, 90);
    crc2.lineTo(390, 200);
    crc2.lineTo(280, 200);
    crc2.closePath();
    crc2.fillStyle = "#393c3e";
    crc2.fill();

    //Berg3
    crc2.beginPath();
    crc2.moveTo(320, 220);
    crc2.lineTo(400, 50);
    crc2.lineTo(450, 220);
    crc2.lineTo(320, 220);
    crc2.closePath();
    crc2.fillStyle = "#595e62";
    crc2.fill();


    //Berg4
    crc2.beginPath();
    crc2.moveTo(370, 220);
    crc2.lineTo(450, 100);
    crc2.lineTo(500, 220);
    crc2.lineTo(370, 220);
    crc2.closePath();
    crc2.fillStyle = "gray";
    crc2.fill();

    

    //Skipiste/Hügel
    crc2.beginPath();
    crc2.arc(350, 1010, 820, 1.0 * Math.PI, 2 * Math.PI);
    crc2.fillStyle = "#faffff";
    crc2.fill();
    crc2.beginPath();
}

//Sonne
function drawSun (): void {
    crc2.beginPath();
    crc2.arc(100, 70, 50, 0, 2 * Math.PI);
    crc2.fillStyle = "yellow";
    crc2.fill();
    crc2.closePath();
  }


//Skilift
function drawLift () {

    //Liftstationen
    crc2.fillStyle = "#000000";
    crc2.fillRect(397, 450, 10, 50);
    crc2.beginPath();
    crc2.fillRect(387, 450, 30, 20);
    crc2.closePath();
    crc2.fill();
    crc2.fillRect(397, 180, 10, 50);
    crc2.beginPath();
    crc2.fillRect(387, 180, 30, 20);
    crc2.closePath();
    crc2.fill();

    //Seile
    crc2.fillStyle = "000000";
    crc2.fillRect(390, 190, 1, 260);
    crc2.fillRect(413, 190, 1, 260);
}

//Bäume abbilden
function drawTree () {
    createTree(100, 275, crc2);
    createTree(150, 375, crc2);
    createTree(30, 350, crc2);
    createTree(650, 300, crc2);
    createTree(700, 450, crc2);
    createTree(50, 500, crc2);
    createTree(620, 525, crc2);
}

//Bäume erstellen
function createTree(x, y, crc2) {
    crc2.fillStyle = "#8B4513";
    crc2.fillRect(x, y, 12, 20);
    crc2.beginPath();
    crc2.moveTo(x - 14, y);
    crc2.lineTo(x + 26, y);
    crc2.lineTo(x + 4, y - 60);
    crc2.lineTo(x - 14, y);
    crc2.fillStyle = "green";
    crc2.fill();
    crc2.closePath();
}

// Schneeflocken
for (var i = 1; i < 40; i++) {
    createSnowflake(Math.floor(Math.random()  * (800 + 1)), Math.floor(Math.random()  * (600 + 1)), crc2);
  }

 // tslint:disable-next-line: align
 function createSnowflake (x: number, y:number, crc2:any): void {
   crc2.beginPath();
   crc2.arc(x, y, 4, 0 * Math.PI, 2.0 * Math.PI);
   crc2.strokeStyle = "#BDBDBD";
   crc2.stroke();
   crc2.fillStyle = "white";
   crc2.fill();
   crc2.closePath();
 }


 




 
 
 





