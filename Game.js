class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('GameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      GameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('PlayerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("c1",c1);

    car2 = createSprite(300,200);
    car2.addImage("c2",c2);

    car3 = createSprite(500,200);
    car3.addImage("c3",c3);

    car4 = createSprite(700,200);
    car4.addImage("c4",c4);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();
    //console.log(player.index);
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var X = 100;
      var Y;
     // console.log(1);
      for(var plr in allPlayers){
        image(t1,0,-displayHeight*2,displayWidth,displayHeight*3);

        //add 1 to the index for every loop
        index = index + 1 ;
       if(index-1<=5){
        //position the cars a little away from each other in x direction
        X = X + 200;
        
        //use data form the database to display the cars in y direction
        Y = displayHeight - allPlayers[plr].distance;
        

        cars[index-1].x =X;
        cars[index-1].y =Y;

       console.log(player.distance);
       
      // console.log(Y);

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if(player.distance>2100)
{
  //game.end();
  gameState=2;
}
    drawSprites();
  }

  end()
  {
    text("YOU WIN",displayWidth/2,displayHeight/2);
     
  }
}
