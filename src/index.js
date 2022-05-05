import './styles/styles.css';

const log = (arg) => console.log(arg);
log("test");

function createGreating() {
    const div = document.createElement('div');
    div.innerHTML = 'Hello, webpack';

    const container = document.querySelector('.element');
    container.append(div);
}
alert('ekcnl');
createGreating();