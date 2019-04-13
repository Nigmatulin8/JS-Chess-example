let map;
let divSquare = '<div id="s$coord" class="square $color"></div>';
let divFigure = '<div id="f$coord" class="figure">$figure</div>';
let isDragging = false;
let isFlipped = false;

$(function () {
	start();
	$('.buttonNew').click(newFiguresPHP);
	$('.buttonFlip').click(flipBoard);

	setInterval('showFiguresPHP()', 500);
});

function start() {
	map = new Array(64);
	addSquares();
	showFiguresPHP();
}

function addSquares() {
	$('.board').html('');
	for(let coord = 0; coord < 64; coord++)
		$('.board').append(divSquare
			.replace('$coord', isFlipped? 63 - coord : coord)
			.replace('$color',
				isBlackSquareAt(coord) ? 'black' : 'white'));

	setDroppable();
}

function showFigureAt(coord, figure) {
	if(map[coord] == figure) return;

	map[coord] = figure;
	$('#s' + coord).html(divFigure
		.replace('$coord', coord)
		.replace('$figure', getChessSymbol(figure)));
	setDraggable();
}

function showFigures(figures) {
	for(let coord = 0; coord < 64; coord++)
		showFigureAt(coord, figures.charAt(coord));
}

function getChessSymbol(figure) {
	switch(figure) {
		case 'K': return '&#9812';
		case 'Q': return '&#9813';
		case 'R': return '&#9814';
		case 'B': return '&#9815';
		case 'N': return '&#9816';
		case 'P': return '&#9817';
		case 'k': return '&#9818';
		case 'q': return '&#9819';
		case 'r': return '&#9820';
		case 'b': return '&#9821';
		case 'n': return '&#9822';
		case 'p': return '&#9823';
		default : return '';
	}
}

function setDraggable() {
	$('.figure').draggable({
		start: function(event, ui) {
			isDragging = true;
		}
	});
}

function setDroppable() {
	$('.square').droppable({
		drop: function(event, ui) {
			let frCoord = ui.draggable.attr('id').substring(1);
			let toCoord = this.id.substring(1);
			moveFigure(frCoord, toCoord);
			moveFigurePHP(frCoord, toCoord);
			isDragging = false;
		}
	});
}

function moveFigure(frCoord, toCoord) {
	figure = map[frCoord];
	showFigureAt(frCoord, '1');
	showFigureAt(toCoord, figure);
}

function isBlackSquareAt (coord) {
	return (coord % 8 + Math.floor(coord / 8)) % 2;
}

function showFiguresPHP() {
	if(isDragging) return;
	$.get('chess.php?getFigures', showFigures);
}

function moveFigurePHP(frCoord, toCoord) {
	$.get('chess.php?moveFigure' +
			'&frCoord=' + frCoord +
			'&toCoord=' + toCoord,
		showFigures);
}

function newFiguresPHP() {
	$.get('chess.php?newFigures', showFigures);
}

function flipBoard() {
	isFlipped = !isFlipped;
	start();
}