export function detectCollision(ball, gameObject) {
  let bottom_of_Ball = ball.position.y + ball.size;
  let top_of_Ball = ball.position.y;

  let top_of_Object = gameObject.position.y;
  let left_of_Object = gameObject.position.x;
  let right_of_Object = gameObject.position.x + gameObject.width;
  let bottom_of_Object = gameObject.position.y + gameObject.height;
  if (
    bottom_of_Ball >= top_of_Object &&
    top_of_Ball <= bottom_of_Object &&
    ball.position.x >= left_of_Object &&
    ball.position.x + ball.size <= right_of_Object
  )
    return true;
  else return false;
}
