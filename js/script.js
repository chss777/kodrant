"use strict";
const html = document.querySelector('html');
const body = document.querySelector('body');
const bee = document.getElementById('bee');
const attention = document.getElementById("attention");
const toggler = document.getElementById("toggler");
const raunds = document.getElementById("raunds");
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const raund = document.getElementById("raund");
const gamer1 = document.getElementById("gamer1");
const gamer2 = document.getElementById("gamer2");
const play = document.getElementById("play");
const num = document.getElementById("num");
const main = document.getElementById("main");
const useds = document.getElementById('useds');
const letter = document.getElementById("letter");
const tr1 = document.getElementById("tr1");
const help = document.getElementById("help");
const frame = document.getElementById('frame');
const modalContent = document.querySelector('#mode1 .modal-content');
const modalword = document.getElementById('modalword');
const myanswer = document.getElementById('myanswer');
const closemodal = document.getElementById('closemodal');

const block = document.getElementsByClassName("block");
const block3 = document.getElementsByClassName("block3");

let slovo = "";
let used;
let attempt = 7;
let g1 = 0;
let g2 = 0;
let total_raund = 1;
let r1 = 0;
let r2 = 0;
let answer;
let story = [];

const alf =
    "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";

// самые популярные браузеры: IE, Firefox, Opera, Chrome и Safari
// function navigator() {
//     if (window.navigator.userAgent.includes('Chrome')) {
//         html.style.fontSize = '2vw';
//     } else {
//         html.style.fontSize = '1.4vw';
//     }
// }
// navigator();

// localStorage.setItem('userlist', JSON.stringify(list));

if (localStorage.getItem('userlist') === null) {
    localStorage.setItem('userlist', JSON.stringify(list));
}

function cifra(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Extra small (xs)<576px || Small (sm)≥576px || Medium (md)≥768px || Large (lg)≥992px || Extra large (xl)≥1200px || Extra extra large (xxl)≥1400px

function ownsize() {
    let screen = '';
    if (window.innerWidth <= 420) {
        screen = 'xs';
    } else if (window.innerWidth <= 768) {
        screen = 'sm';
    } else if (window.innerWidth <= 992) {
        screen = 'md';
    } else if (window.innerWidth <= 1200) {
        screen = 'lg';
    } else if (window.innerWidth <= 1400) {
        screen = 'xl';
    } else screen = 'xxl';
    return screen
}

function adapter() {
    let screen = ownsize();
    switch(screen) {
        case 'xs':
            body.className = 'fs-6';
            useds.style.fontSize = '.5rem';
            break;
        case 'sm':
            body.className = 'fs-5';
            useds.style.fontSize = '.7rem';
            break;
        case 'md':
            body.className = 'fs-4';
            useds.style.fontSize = '.8rem';
                break;
        case 'lg':
            body.className = 'fs-3';
            useds.style.fontSize = '1rem';
                break;
        case 'xl':
            body.className = 'fs-2';
            useds.style.fontSize = '1rem';
            break;
        default: 
            body.className = 'fs-1';
            useds.style.fontSize = '1.5rem';
    }
}

adapter()
window.addEventListener('resize', (e) => adapter());

const mode1 = document.getElementById('mode1');
const modal = new bootstrap.Modal(mode1);

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        ok();
    }
});

const myevent = new Event('click', {bubbles: true});

bee.addEventListener('click', () => bee.classList.toggle('zoom'));

let quote = "Как сладки гортани моей слова Твои! Лучше меда устам моим.";

function openclass(name) {
    for (let el of name) {
        el.style.display = "block";
    }
}

function start() {
    openclass(block3);
    toPlay();
}

function statePlay() {
    side1.innerHTML = r1; // счёт по раундам
    side2.innerHTML = r2; // -----
    raund.innerHTML = total_raund; // номер раунда
    gamer1.innerHTML = g1; // счёт в текущем раунде
    gamer2.innerHTML = g2; // ------
    num.innerHTML = attempt = 7; // количество оставшихся попыток
}

function toPlay() {
    if  (JSON.parse(localStorage.getItem('userlist')).length < 5) {
        localStorage.setItem('userlist',  JSON.stringify(list));
    }
    openclass(block);
    play.style.display = 'none';
    modalContent.classList.remove('modal-resize');
    statePlay();
    used = []; //список введённых букв
    letter.value = ""; // поле ввода
    tr1.innerHTML = ""; // отображение введённых букв
    main.innerHTML = ""; // поле #####
    frame.innerHTML = "";
    let storage = localStorage.getItem('userlist'); // плучаем строку 
    let newlist = JSON.parse(storage);              // преобразуем в массив
    let n = cifra(0, newlist.length - 1);
    slovo = newlist.splice(n, 1)[0];
    localStorage.setItem('userlist', JSON.stringify(newlist));
    
    // slovo = 'НЕУДОБОВРАЗУМИТЕЛЬНОЕ';

    for (let i = 0; i < slovo.length; i++) {
        let div = document.createElement("div");
        main.append(div);
        div.classList.add("word");
        div.setAttribute('w', slovo[i]);
    }
    letter.placeholder = "Введите букву или всё слово";
    letter.focus();
}

const buttons = document.querySelectorAll('button[data-bs-dismiss="modal"]');
buttons.forEach(el => el.addEventListener('click', () => letter.focus()));

// счёт по раундам:  side1/side2  => r1/r2
// раунд:           total_raund
// счёт:            gamer1/gamer2 => g1/g2
// попытка:         attempt


function ok() {
    let w = letter.value;
    if (w === "") {
        warn("Введите букву или слово");
    } else if (w.length === 1 && !alf.includes(w)) {
        warn("Этот символ не является буквой алфавита. Проверьте раскладку клавиатуры");
    } else if (used.includes(w)) {
        warn("Эта буква уже вводилась!");
    } else if (w.length > 1) {
        ultimate(w.toUpperCase(), slovo);
    } else {
        used.push(w);
        let td = document.createElement("td");
        td.innerHTML = w
        tr1.appendChild(td);
        check(w, slovo);
    }
    setTimeout(() => {
        letter.value = "";
        letter.focus();
    }, 0);
}

function raundplus() {
    story.push(`${g1}:${g2}`);
    if (r1 < 3 && r2 < 3) {
        let div = document.createElement("div");
        div.innerHTML = `${total_raund}-й раунд - ${g1} : ${g2}`;
        raunds.appendChild(div);
        g1 = g2 = 0;
        total_raund += 1;    
    }
}

function ultimate(a, b) {
    let color = 'red';
    if (a === b) {
        color = 'green';
        g1 += 1; 
        if (g1 === 3) {
            r1 += 1;
            raundplus();
        } 
    } else {
        g2 += 1;
        if (g2 === 3) {
            r2 += 1;
            raundplus();
        }
    }
    modalword.innerHTML = b;
    answer = b;
    modal.show();
    myanswer.innerHTML = `Ваш ответ: <h5 id='mytext' style="color: ${color}">${a}</h5>`;

    setTimeout(() => {
        if (r1 < 3 && r2 < 3) {
            closemodal.addEventListener('click', toPlay());
        } else {
            statePlay();
            finish()
        }
        letter.value = "";
        letter.focus();    
    }, 0)
}

function finish() {
    closemodal.addEventListener('click', () => {
        let text;
        if (r1 < r2) {
            text = `Вы проиграли со счётом  ${r1}:${r2} (${story.join(' ')})`
        } else {
            text = `Вы победили со счётом  ${r1}:${r2} ! (${story.join(' ')})`
        }
        warn(text);
    })
}

function check(simv, hidden) { //  'hidden'='slovo'
    let total = "";
    let word = document.querySelectorAll('.word'); // class 'word'

    for (let i = 0; i < hidden.length; i++) {
        if (hidden[i] === simv) {
            word[i].innerHTML = simv;
        }
        word[i].innerHTML ? (total += word[i].innerHTML) : (total += '#');
        if (total === slovo) {
            return ultimate(total, slovo);
        }
    }

    attempt -= 1;
    num.innerHTML = attempt;

    if (attempt < 1) {
        setTimeout(
            () => {
                let w = prompt(
                    "Лимит попыток исчерпан. Попробуйте ввести слово:\n" + total);
                ultimate(w.toUpperCase(), hidden);
            }, 0
        );
    }
    letter.focus();
}

function warn(text) {
    attention.style.display = 'block';
    attention.innerHTML = 
    `<div id="warning" class="col alert alert-warning alert-dismissible fade show" role="alert">
        <h4>${text}</h4>
        <button id="onclose" type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert"></button>
    </div>`
    const onclose = document.getElementById('onclose');
    setTimeout(() => {
        if (r1 > 2 || r2 > 2) {
            onclose.addEventListener('click', () => location.reload());
        }
        document.addEventListener('click', () => {onclose.dispatchEvent(myevent)}, {once: true});
        const warning = document.getElementById("warning");
        warning.addEventListener('closed.bs.alert', () => {
            letter.value = "";
            letter.focus();
            attention.style.display = 'none';
            })        
    }, 0)
}

function openLetter() {
    main.addEventListener('click', look);
    main.onmouseover = (e) => e.target.style.opacity = 0.6;
    main.onmouseout = (e) => e.target.style.opacity = 1;
}

function look(e) {
    e.target.innerHTML = e.target.getAttribute('w');
    main.removeEventListener('click', look);
    main.onmouseover = (e) => e.target.style.opacity = 1;
    help.style.display = 'none';
    letter.focus();
}

function opendict() {
    myanswer.innerHTML = "";
    frame.innerHTML = `<iframe src="./kodrantID.html#${answer}" id="framic"></iframe>`;
    modalContent.classList.add('modal-resize');
}

let radio1 = document.getElementById('Radio1');
let radio2 = document.getElementById('Radio2');

function tolight() {
    html.style.setProperty('--fon-color', '#0ff');
    html.style.setProperty('--fon-color2', 'rgb(0, 0, 90)');
    html.style.setProperty('--td-text', '#fff');
    html.style.setProperty('--fon-text', '#000');
    document.querySelector('h1').style.color = '#000';
    toggler.style.color = '#000';
    localStorage.setItem('theme',  'light');
}

function todark() {
    html.style.setProperty('--fon-color', 'rgb(0, 0, 90)');
    html.style.setProperty('--fon-color2', '#0ff');
    html.style.setProperty('--td-text', '#000');
    html.style.setProperty('--fon-text', '#fff');
    document.querySelector('h1').style.color = '#ff0';
    toggler.style.color = '#ff0';
    localStorage.setItem('theme',  'dark');
}

if (localStorage.getItem('theme') !== null) {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        radio2.setAttribute('checked', true);
        radio2.onclick()
    } else {
        radio1.setAttribute('checked', true);
        radio1.onclick()
    }
}
