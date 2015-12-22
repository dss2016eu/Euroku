function randomAnswersOrders ()
{
      //'1' value is correct answer
  var random = [];
  for (var j = 0; j < 5; j++)
  {
    var i, arr = [];
    for (i = 1; i < 4; i++)
    {
      arr.push(i);
    }
    arr.sort(function (){
      return Math.random() - 0.5;
    });
    random.push(arr);
  }
  console.log(random);
  return random;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
