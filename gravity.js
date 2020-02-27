let canvas = document.querySelector('canvas');

let innerWidth = canvas.width = window.innerWidth - 6;
let innerHeight = canvas.height = window.innerHeight - 6;

let ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
    innerWidth = canvas.width = window.innerWidth - 6;
    innerHeight = canvas.height = window.innerHeight - 6;
})