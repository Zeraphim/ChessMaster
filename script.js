let matrix = new Array(10);

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let outside_counter = 1


var isAbleToMove = false;
var selected_box = null;
var selected_piece = null;
var selected_move = null;

// Generate 10x10 matrix values
for (let i = 0; i < 10; i++) {
    matrix[i] = new Array(10); 
    for (let j = 0; j < 10; j++) {
        // if outside box
        if (i === 0 || i === 9) {
            matrix[i][j] = "o" + outside_counter;
            outside_counter++;

        // if vertical border 
        } else if (j === 0 || j === 9) { 
            matrix[i][j] = "o" + outside_counter;
            outside_counter++;
        // 8x8 matrix
        } else {
            matrix[i][j] = letters[j-1] + (9 - i);
        }
    }
}

console.log(matrix);

// Print all elements of matrix
// for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//         console.log(matrix[i][j]);
//     }
// }

var main_pieces_layout = ["rook","knight", "bishop", "queen", "king", "bishop", "knight", "rook"]

function createChessboard() {

    const chessboard = document.querySelector('.Chessboard_Layout');
    
    for (let i = 1; i <= matrix.length; i++) {
        for (let j = 1; j <= matrix[i-1].length; j++) {

            // If outside box (top and bottom)
            if (i === 1 || i === 10) {
                const square = document.createElement('div');
                square.className = 'outside';
                square.id = matrix[i-1][j-1];
                chessboard.appendChild(square);

                // Add text inside the div for j=2 to j=9
                if (j >= 2 && j <= 9) {
                    square.textContent = String.fromCharCode('a'.charCodeAt(0) + j - 2);
                }
            // if vertical border 
            } else if (j === 1 || j === 10) { 
                const square = document.createElement('div');
                square.className = 'outside';
                square.id = matrix[i-1][j-1];
                chessboard.appendChild(square);

                // Add text inside the div for i=2 to i=9
                if (i >= 2 && i <= 9) {
                    square.textContent = 10 - i;
                }
            // 8x8 matrix
            } else {
                const square = document.createElement('div');
                square.className = 'square';
                square.id = matrix[i-1][j-1];
                chessboard.appendChild(square);


                // Add CSS styling to alternating boxes
                if ((i + j) % 2 === 0) {
                    square.style.backgroundColor = 'white';
                } else {
                    square.style.backgroundColor = 'teal';
                }

                // Add main pieces to the board
                if (i === 2 || i === 9) {
                    // Add image inside the square div
                    const piece = document.createElement('img');
                    piece.className = 'piece';

                    if (i === 2) {
                        piece.id = 'b_' + main_pieces_layout[j-2];
                    } else if (i === 9) {
                        piece.id = 'w_' + main_pieces_layout[j-2];
                    }

                    piece.src = './assets/pieces/' + piece.id + '.png';
                    square.appendChild(piece);

                // Add pawns to the board

                } else if (i === 3 || i === 8) {
                    // Add image inside the square div
                    const piece = document.createElement('img');
                    piece.className = 'piece';

                    if (i === 3) {
                        piece.id = 'b_pawn';
                    } else if (i === 8) {
                        piece.id = 'w_pawn';
                    }
                    piece.src = './assets/pieces/' + piece.id + '.png';
                    square.appendChild(piece);

                    // Boxes with no initial pieces
                } else {
                    // Add image inside the square div
                    const piece = document.createElement('img');
                    piece.className = 'piece';

                    piece.src = '';
                    square.appendChild(piece);
                }
                
                // Adding event listeners to the squares
                square.addEventListener('click', function() {

                    // Access the piece inside the square
                    var piece = square.querySelector(".piece");

                    // Check if the piece exists before trying to log its src
                    if (piece && !isAbleToMove) {
                        // console.log(piece.src);

                        // Get the name of the piece only
                        let pointed_piece = piece.src.split('/').pop().split('.')[0];
                        console.log("Box: " + this.id + "\nPiece: " + pointed_piece)

                        isAbleToMove = true;
                        selected_box = this.id;
                        selected_piece = pointed_piece;

                    } else if (isAbleToMove === true) {
                        console.log("MOVE? " + isAbleToMove + "\nPrevious Box: " + selected_box + "\nSelected Move: " + this.id + "\nSelected Piece: " + selected_piece);

                        const prev_box = document.querySelector(`#${selected_box} .piece`);
                        const new_box = document.querySelector(`#${this.id} .piece`);

                        if (prev_box) prev_box.src = '';
                        if (new_box) new_box.src = './assets/pieces/' + selected_piece + '.png';

                        isAbleToMove = false;
                        selected_box = null;
                        selected_piece = null;
                        selected_move = null;
                    } else {
                        console.log("Box: " + this.id + "\nPiece: Empty");
                    }
                });

            }
        }
    }
}

window.onload = createChessboard;
