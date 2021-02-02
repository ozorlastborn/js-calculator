// The proCalculator constructor takes in three arguments.
// The first arguments will be the parents of the calculator buttons.
// The second arguments will be the answer display.
// The third arguments will be the solute to be calculated.

// The equalState variable checks if a calculation has been done
// this allow for chaining of calculation functions in the calculator.

class ProCalculator {
    constructor(master, screen, display) {
        this.master = master;
        this.screen = screen;
        this.display = display;
    }
    init(){
        let equalState = false;
        this.master.addEventListener('click', (e) => {
            let button = e.target;
            if (button.id === "number"){
                if (equalState) {
                    equalState = false;
                    this.display.innerHTML = "";
                    this.display.innerHTML += button.innerHTML ;
                }else{
                    this.display.innerHTML += button.innerHTML ;
                }
            }else if (button.id === "clear") {
                this.display.innerHTML = '';
                this.screen.innerHTML = '0';
            }else if(button.id === 'delete'){
                let scr = this.display.innerHTML;
                this.display.innerHTML = scr.slice(0, scr.length-1);
            }else if (button.id === "opKey") {
                this.noDup (button, () => {
                    if (equalState) {
                        equalState = false;
                        this.display.innerHTML = this.screen.innerHTML;
                        this.screen.innerHTML = '';
                        this.display.innerHTML += button.innerHTML ;
                    }else{
                        this.display.innerHTML += button.innerHTML ;
                    }
                });
            }else if (button.id === 'equal'){
                let answer = eval(this.display.innerHTML);
                let scr = this.display.innerHTML;
                this.noDup(answer, equalState, () => {
                    this.screen.innerHTML = answer;
                    equalState = true; 
                });
            }
        });
    }
    noDup(){
        let callBack = arguments[arguments.length-1];
        let scr = this.display.innerHTML;
        let c = scr.charAt(scr.length-1);
        if (c === '+' || c === '-' || c === '*' || c === '/') {
            scr += '' ;
        }else {
            callBack(arguments[0]) ;
        }

    }
}

const calcButtons = document.querySelectorAll('.calculator-buttons')[0];
 
const screen = document.querySelector('#screen-bottom');

const display = document.querySelector('#screen-top');

const calc = new ProCalculator(calcButtons, screen, display);

calc.init();

