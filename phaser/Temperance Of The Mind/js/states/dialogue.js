// public functions
Main.prototype.start=function(){

    console.log("Main.start: game started at ("+this.game.width+","+this.game.height+").");

    var dialog=new Dialog( 
        {x:50, y:100, width:600}, // the geo of the dialog box
        { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top" } // the style of the text
    );

    var controller=new DialogController(dialog);

    controller.setList(
        [
            {        
                text:  "This story that is about to unfold takes place in the premise of your mind. 
                Troubled by external factors such as losing your job, girlfriend, getting kicked out of your parents house, you’re at the ends of your whims. 
                All seems lost you think. “What’s the point of all this?” You wonder as you lay on your friends couch and quietly fall asleep. 
                However the slumber is only the beginning, for you have more battles ahead of you, as to regain your peace of mind you must battle your innermost demons… [Enter]"
                lettersPerSec: 20, //letters per second 

            },
            {        
                text: "The choice is yours, will you let your grievances get the best of you or will you tame them and establish control over your thoughts once and for all? 
                The answer lies in the battle ahead…[Enter]", // the text you want to play
                lettersPerSec: 20, // letters per second
            },
            {        
                text: "To maneuver use the arrow keys to move left and right and to jump, to use an item you picked up press spacebar. 
                May the odds be in your favor!   [Enter]", // the text you want to play
                lettersPerSec: 150, // letters per second
            }
        ],
        function(){console.log("all texts in the list has been played!")}
    );

    controller.playNext();

    _setupKeys(controller);
}

// private functions
function _setupKeys(controller){
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onUp.add(function(){
        console.log("Enter pressed!");
        this.playNext();
    }, controller);
}
