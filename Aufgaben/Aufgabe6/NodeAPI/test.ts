namespace Aufgabe6 {
    console.log("Hallo");

    let x: number=0;
    console.log(x);
    x++;
    console.warn(x);

    setTimeout(handlesTimeout, 2000);
    
    function handleTimeout(_event: Event):void {
        console.log("Timeout";)
    }
}