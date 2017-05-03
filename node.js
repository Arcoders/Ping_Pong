// Variables globales
var bucle;
var velocidad = 5;

var canvas = document.getElementById('canvas');
var area_w = canvas.width;
var area_h = canvas.height;
var ctx = canvas.getContext('2d');

var puntos_j1 = 0;
var puntos_j2 = 0;

var dimension_paleta = 75;
var superficie = area_h - dimension_paleta;

// class poo

class Base {

    choque(obj) {
        if (this.fondo < obj.y || this.y > obj.fondo || this.derecha < obj.x || this.x > obj.derecha) {
            return false;
        }else{
            return true;
        }
    }

}

class Puntos {

    constructor(x) {
        this.x = x;
        this.y = 25;
        this.punto = 0;
    }

    dibujar() {
        ctx.font = '25px Arial';
        ctx.fillText(this.punto.toString(), this.x, this.y);
    }

}

class Bola extends Base {

    constructor() {
        super();
        this.t = 25;
        this.x = Math.floor(Math.random() * (area_w - this.t));
        this.y = Math.floor(Math.random() * (area_h - this.t));
        this.xdir = velocidad;
        this.ydir = velocidad;
        this.p1 = new Puntos(25);
        this.p2 = new Puntos(575);
    }

    choqueV() {
        if (this.y <= 0 || this.y >= (area_h - this.t)) {
            this.ydir = -this.ydir;
        }
    }

    choqueH() {
        if (this.x <= 0) {
            this.xdir = -this.xdir;
            puntos_j2++;
            this.p2.punto = puntos_j2;
        }
        if (this.x >= (area_w - this.t)) {
            this.xdir = -this.xdir;
            puntos_j1++;
            this.p1.punto = puntos_j1;
        }
    }

    mover() {
        this.x += this.xdir;
        this.y += this.ydir;
        this.fondo = this.y + this.t;
        this.derecha = this.x + this.t;
        this.choqueV();
        this.choqueH();
    }

    dibujar() {
        ctx. fillRect(this.x, this.y, this.t, this.t);
        this.p1.dibujar();
        this.p2.dibujar();
    }

}

class Paleta extends Base {

    constructor(x) {
        super();
        this.x = x;
        this.w = 25;
        this.h = dimension_paleta;
        this.y = Math.floor(Math.random() * superficie);
        this.dir = 0;
    }

    dibujar() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    mover() {
        this.y += this.dir;
        this.derecha = this.w + this.x;
        this.fondo = this.h + this.y;
        if (this.y <= 0) {
            this.y = 0;
            this.dir = 0;
        }
        if (this.y >= superficie) {
            this.y = superficie;
            this.dir = 0;
        }
    }

}

// Objetos

var bola = new Bola();
var jugador1 = new Paleta(30);
var jugador2 = new Paleta(545);


// Functiones globales

function dibujar() {
    ctx.clearRect(0, 0, area_w, area_h);
    bola.dibujar();
    jugador1.dibujar();
    jugador2.dibujar();
}

function frame() {
    bola.mover();
    jugador1.mover();
    jugador2.mover();
    dibujar();
    choque();
    bucle = requestAnimationFrame(frame);
}


canvas.addEventListener('click', function(event){
    frame();
});

// Funciones de carousel-control

document.addEventListener('keyup', function(event) {
    var tecla = event.keyCode;
    console.log(tecla);
    if (tecla === 38 || tecla === 40) {
        jugador2.dir = 0;
    }
    if (tecla === 81 || tecla === 65) {
        jugador1.dir = 0;
    }
});

document.addEventListener('keydown', function(event) {
    var tecla = event.keyCode;
    if (tecla == 38) {
        jugador2.dir = -velocidad;
    }
    if (tecla == 40) {
        jugador2.dir = velocidad;
    }
    if (tecla == 81) {
        jugador1.dir = -velocidad;
    }
    if (tecla == 65) {
        jugador1.dir = velocidad;
    }
});

function choque() {
    if (bola.choque(jugador1) || bola.choque(jugador2)) {
        bola.xdir = -bola.xdir;
    }
}
