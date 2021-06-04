import { useEffect, useState,useRef } from 'react';
import Box from './component/box/Box';
import './App.css';


function App() {

   // a state to represent the board
  const [board,setBoard]=useState([["","",""],["","",""],["","",""]])

  // should human play or computer?
  const [humanturn,setHumanturn]=useState();
  
  // 0 means no one won yet, 1 means someone won, 2 means its a tie;
  const [hasWon,setHasWon]=useState(0);

  //when start is 0 that means its the machine turn, in case it is 1 than that means it is the human turn
  const start= Math.random() < 0.5 ? 0 : 1;
  
 
  var humanmark="X";
  var computermark="O";




  // initial mounting to determine who will start human or computer
  useEffect(()=>{

   
    if(start===0){
      setHumanturn(false)
      computerAI()


    } 

    else
    setHumanturn(true);



  },[])
  
   //this is used to sip the initial mount
  const isFirstRun = useRef(true);
  
  useEffect(()=>{

    if(isFirstRun.current){
      isFirstRun.current=false;


    }
    else{
      checkWinner(false);
      
      if(checkWinner(false)!=="X"&&checkWinner(false)!=="O"&&checkWinner(false)!=="T"){

        computerAI();


      }

      checkWinner(false);

    }
  },[board])


   const checkWinner=(vision)=>{

      
    // check for row winning status
     for( var row=0;row<3;row++){
        
      var temprow=board[row];
      var rowWithSameValues=true;
      var tempmark=temprow[0];
     
      //go over every element in the row  and check if it has the same value
      for( var col=0;col<3;col++){

        if(tempmark!==temprow[col]){
          //if we are here it means not everything on the row has the same value
          rowWithSameValues=false;
        }

      }
      //if the row has all with same value than we terminate and we declare the winner
      if(rowWithSameValues&&(tempmark==="X"||tempmark==="O")){
        if(!vision)
        setHasWon(1);
        return tempmark;
      }



       
     }

     //check for column winning status
     var temprow0=board[0];
     var temprow1=board[1];
     var temprow2=board[2];
     var tempForFirstCol=temprow0[0];
     var tempForSecCol=temprow0[1];
     var tempForThirdCol=temprow0[2];


     //this will go over each column, if the column has all x or all o than it will return the fact that winning occured
     if((temprow0[0]===tempForFirstCol&&temprow1[0]===tempForFirstCol&&temprow2[0]===tempForFirstCol&&tempForFirstCol!=="")){
      if(!vision)
      setHasWon(1);
      return tempForFirstCol;
      
     }
     if((temprow0[1]===tempForSecCol&&temprow1[1]===tempForSecCol&&temprow2[1]===tempForSecCol&&tempForSecCol!=="")){
      if(!vision)
      setHasWon(1);
      return tempForSecCol;
     }


     if((temprow0[2]===tempForThirdCol&&temprow1[2]===tempForThirdCol&&temprow2[2]===tempForThirdCol&&tempForThirdCol!=="")){
      if(!vision)
      setHasWon(1);
      return tempForThirdCol;
     }



     //here we check for diagnal winning
     var tempForFirstdiagnal=temprow0[0];
     var tempForSecdiagnal=temprow0[2];

      
     if((temprow0[0]===tempForFirstdiagnal&&temprow1[1]===tempForFirstdiagnal&&temprow2[2]===tempForFirstdiagnal&&tempForFirstdiagnal!=="")){
      if(!vision)
      setHasWon(1);
      return tempForFirstdiagnal;
      
     }


     if((temprow0[2]===tempForSecdiagnal&&temprow1[1]===tempForSecdiagnal&&temprow2[0]===tempForSecdiagnal&&tempForSecdiagnal!=="")){
      if(!vision)
      setHasWon(1);
      return tempForSecdiagnal;
      
     }


     if(temprow0[0]!==""&&temprow0[1]!==""&&temprow0[2]!==""&&temprow1[0]!==""&&temprow1[1]!==""&&temprow1[2]!==""&&temprow2[0]!==""&&temprow2[1]!==""&&temprow2[2]!==""){

      if(!vision)
        setHasWon(2);

     return "T";}





     

     return "";


   }


// look up table for the minmax
   let scores = {
    X: -10,
    O: 10,
    T: 0,
  };
  
   


 //implementation of the minmax algorithm
  const minmax = (boardd,depth,ismaximizing)=>{
    var winning=checkWinner(true);
    if(winning!==""){
      return scores[winning];
    }


    if(ismaximizing){
      var bestScore=-Infinity;

      for(var row=0;row<3;row++){
       var tempforrow=boardd[row];

        for(var col=0;col<3;col++){

          if(tempforrow[col]===""){
            tempforrow[col]=computermark;
            boardd[row]=tempforrow;
            bestScore=Math.max(minmax(boardd,depth+1,false),bestScore);
            tempforrow[col]="";
            boardd[row]=tempforrow;
          }


        }
      }

        
        return bestScore

    } else {
      var bestScore=Infinity;


      for(var row=0;row<3;row++){
       var tempforrow=boardd[row];

        for(var col=0;col<3;col++){

          if(tempforrow[col]===""){
            tempforrow[col]=humanmark;
            boardd[row]=tempforrow;

            bestScore=Math.min(minmax(boardd,depth+1,true),bestScore);
            tempforrow[col]="";
            boardd[row]=tempforrow;
          }


        }
      }

        
        return bestScore
    }
    





    

  }

  const computerAI = ()=>{

    var rowIndexForBestMove;
    var columnIndexForBestMove;

  
      //update the board if its computer turn
      if(!humanturn){
        // finding the best position
        var bestScore=-Infinity;

        for(var row=0;row<3;row++){
         var tempforrow=board[row];
  
          for(var col=0;col<3;col++){
  
            if(tempforrow[col]===""){
              tempforrow[col]=computermark;
              board[row]=tempforrow;
              let currentScore=minmax(board,0,false)
              console.log(currentScore);
              console.log(row+" "+col);


              
              if(currentScore>bestScore){
                bestScore=currentScore;
                rowIndexForBestMove=row;
                columnIndexForBestMove=col;
                console.log("Choosen position"+row+" "+col);

              }


              tempforrow[col]="";
              board[row]=tempforrow;


            }
  
  
          }
        }

       // update the board after finding the best position
      let tempboard=board;
      console.log(board);
      let temprow=tempboard[rowIndexForBestMove];
      temprow[columnIndexForBestMove]=computermark;
      tempboard[rowIndexForBestMove]=temprow;
      //crete new array object to solve the issue with useEffect not updating;
      const ftemp=[...tempboard];

      setBoard(ftemp);
      setHumanturn(!humanturn);

      }

    




  }








  

  //human player function
  const updateBoard = (indexrow,indexcol,boxValue)=>{

          
   
    
     

       if(boxValue===""&&humanturn===true&&checkWinner(false)!=="X"&&checkWinner(false)!=="O"&&checkWinner(false)!=="T"){
         //update the board
         let tempboard=board;
         let temprow=tempboard[indexrow];
         temprow[indexcol]=humanmark;
         tempboard[indexrow]=temprow;
         //crete new array object to solve the issue with useEffect not updating;
         const ftemp=[...tempboard];

         setBoard(ftemp);
         console.log(board);
         setHumanturn(!humanturn);


  
       }else return


  



}
  

  
  return (
    <div className="container">



      <div className="board">

      {
        board.map((row,indexrow)=>{
           
          return(
          <div key={indexrow} className="row">

            {row.map((boxValue,indexcol)=>{


               return(
                <Box value={boxValue} key={indexcol} computerAI={computerAI} updateBoard={updateBoard}  indexrow={indexrow} indexcol={indexcol}   center={2} />


                        )


            })
            
            }

          </div>)
          
        
        }



        )
      }
      </div>

    
    </div>
  );
}

export default App;
