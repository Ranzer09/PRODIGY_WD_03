let allstyles = document.getElementsByClassName('stylz')
let stylez=document.getElementsByClassName('point')
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let pp=ap=0

function wincond(board) {
    let win = 'n'
    //horizontal
   
    for (let i = 0; i < 3; i++) 
        {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != '') 
            {console.log('horizontal')
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] == pch) {
               
                document.getElementById(`a${i + 1}`).style.display = 'block';
                win = 'Player';
                return(win)
            }
            else if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] == ach) {
               
                document.getElementById(`a${i + 1}`).style.display = 'block';
                win = 'AI';
                return(win)
            }
        }
    }
    //vertical
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != '') 
            {
               
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] == pch) {
               
                document.getElementById(`b${i + 1}`).style.display = 'block';
                win = 'Player';
                return(win)
            }
            else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] == ach) {
               
                document.getElementById(`b${i + 1}`).style.display = 'block';
                win = 'AI';
                return(win)
            }
        }
    }
    //diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != '') 
        {console.log('diagonal 1')
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] == pch) 
            {
           
            document.getElementById('w2').style.display = 'block';
            win = 'Player';
            return(win)
        }
        else 
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] == ach) 
            {
           
            document.getElementById('w2').style.display = 'block';
            win = 'AI';
            return(win)
        }
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != '') 
        {
           
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] == pch) 
            {
            document.getElementById('w1').style.display = 'block';
            win = 'Player';
            return(win)
        }
        else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] == ach) 
            {
            document.getElementById('w1').style.display = 'block';
            win = 'AI';
            return(win)
        }
    }
    if (board.every(side => side.every(ele => ele != undefined && ele != null && ele != ''))){
        setTimeout(function () {
            alert('The game ended with a Draw!')
            reset()
            return;
        }, 10);
    }
   
    return win;
}
//setting choice
let pch = ''
let ach = ''
function ch(c1, c2) {
    pch = c1;
    ach = c2;
}

//adding the event listeners to all cells
let cells = document.querySelectorAll('.cell');
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        let cellid = this.id.substr(1);
        playeradd(parseInt(cellid));
        //extract id and send
    });
});

function playeradd(id) {
    if (pch == '' || ach == '')
        alert('Select your choice!!')
    else {
        //check if the cell is empty
        if (document.getElementById(`c${id}`).innerHTML.trim() == "") {//add to the html
            document.getElementById(`c${id}`).innerHTML = pch;
            board[Math.floor((id - 1) / 3)][(id - 1) % 3] = pch;//add to the board matrix
            turn(1);//activate the turn function to figure out whose turn it is
           
            return;
        }
        else
            alert("Cell is occupied!!");
    }
}
function aiadd() {
    for (let i = 0; i < 9; i++) {
        let num = Math.floor(Math.random() * 9) + 1;//check if the cell is empty
       //trying to block user's play
        for (let j = 0; j < 3; j++)
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] == pch){
            for (let k = 0; k < 3; k++) {
                if (board[k][0] === board[k][1] && board[k][0] == pch){
                    num = (k + 1) * 3
                    break;
                }
                else
                    if (board[0][k] === board[1][k] && board[1][k] == pch){
                        num = k + 7
                    break;
                    }
                break;}
            }
       
        if (document.getElementById(`c${num}`).innerHTML.trim() == "") {
            document.getElementById(`c${num}`).innerHTML = ach;//add to the html
            board[Math.floor((num - 1) / 3)][(num - 1) % 3] = ach;//add to the board matrix
            turn(0);//activate the turn function to figure out whose turn it is
            return;
        }
    }
}

function turn(i) {
   
    a = wincond(board)
   
    if (a == 'n') {
        if (i)//if turn is false then it is player's turn else AI
            setTimeout(() => {
               return aiadd();
            }, 100);
    }
    else if (a == 'Player') {            
        setTimeout(function () {
            alert('Player won the game!')
            pp+=1
            stylez[0].innerHTML=pp
            reset()
        }, 10);
    }
    else if (a == 'AI') {
        setTimeout(function () {
            alert('AI won the game!')
            ap+=1
            stylez[1].innerHTML=ap
            reset()
        }, 10);
    }

}



function reset() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    pch = '';
    ach = '';
    cells.forEach(function (cell) {
        cell.innerHTML = '';
    });
    Array.from(allstyles).forEach(function (styl) {
        styl.style.display = 'none';
    });
}
