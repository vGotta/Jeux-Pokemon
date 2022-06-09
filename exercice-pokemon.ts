import promptSync from 'prompt-sync'

const prompt: any = promptSync();
let HP_player: number = 50
let HP_CPU: number = 50
let attaque: string[] = ["charge", "soin", "aqua-jet", "draco-rage"];
let round: number = 1
let currentPlayer: string = "Player"

function choiceAttack(): string {
    for (let i = 0; i < attaque.length; i++) {
        console.log(attaque[i] + ": " + i);

    }
    let choice: number = parseInt(prompt("choisie ton attaque entre 1 et 4:  "));
    let attack: string = attaque[choice]
    return attack
}

function attack(choiceAttack: string) {

    switch (choiceAttack) {
        case ("charge"):
            console.log(currentPlayer + " utilise charge");

            if (attackSuccess(0, 1) == true) {
                updateLifeOppenent(-10)
                console.log(HP_CPU);


            } else {
                console.log('raté');
            }
            console.log("HP_player", HP_player, "HP_CPU", HP_CPU);

            break;
        case ("soin"):
            console.log(currentPlayer + " utilise soin");
            if (attackSuccess(0, 1) == true) {
                updateMyLife(10)
                console.log("reussi");

            } else {
                console.log('raté');
            }
            console.log("HP_player", HP_player, "HP_CPU", HP_CPU);

            break;
        case ("aqua-jet"):
            console.log(currentPlayer + " utilise aqua-jet");
            if (attackSuccess(0, 2) == true) {
                updateLifeOppenent(-20)
            } else {
                console.log('raté');
            }
            console.log("HP_player", HP_player, "HP_CPU", HP_CPU);

            break;
        case ("draco-rage"):
            console.log(currentPlayer + " utilise draco-rage");
            if (attackSuccess(0, 4) == true) {
                updateLifeOppenent(-50)
            } else {
                console.log('raté');
            }
            console.log("HP_player", HP_player, "HP_CPU", HP_CPU);

        default:
            console.log("tu perd ton tour");

    }
}

function attackSuccess(min: number, max: number) {
    let success: boolean = false;
    if (random(min, max) == max) {
        success = true
    }
    return success
}

function random(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

function updateMyLife(nmb_life: number) {
    if (round % 2 == 0) {
        HP_CPU = HP_CPU + nmb_life
    } else {
        HP_player = HP_player + nmb_life
    }
}

function updateLifeOppenent(nmb_life: number) {
    if (round % 2 == 0) {
        HP_player = HP_player + nmb_life
    } else {
        HP_CPU = HP_CPU + nmb_life

    }
}
function Game() {
    while (HP_player > 0 && HP_CPU > 0) {
        if (round % 2 != 0) {
            let choisenAttack: string = choiceAttack()
            attack(choisenAttack)

        } else {
            console.log("le cpu choisi: ");

            let CPUchoisentAttack: string = attackCpu()
            attack(CPUchoisentAttack)
        }
        if (HP_player < 1) {
            console.log("PERDUUUUUU");

        } else if (HP_CPU < 1) {
            console.log("VICTOIREEEEEEE");
        }

        round++
        rotatePlayer()
    }
}

function attackCpu(): string {
    let choiceCpu: number = random(0, attaque.length - 1);
    let choisenAtack: string = attaque[choiceCpu]
    return choisenAtack;
}

function rotatePlayer() {
    if (round % 2 != 0) {
        currentPlayer = "Player"

    } else {
        currentPlayer = "CPU"
    }
}

attackCpu();
Game();