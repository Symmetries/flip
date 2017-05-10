The code is designed to be as independent from the other parts as possible

input.js is designed to keep track of all the keyboard and swipe input, and the
final input can be called at APP.input() and it will return the direction "l" or
"r"

output.js is designed to get some values of the current state of the game and
draw the screen by calling APP.output() and giving the needed values.

update.js is designed to get the past state and some input and update the state.
The new state is returned by calling APP.update() and passing in the past state
and the input from input.js

The design philosophy is that input.js, output.js and update.js are do not
depend on each other, and as such, so not call each other.

main.js brings only the methods APP.input(), APP.output() and APP.update()
together. inside of input.js, output.js and update.js there are other functions
that are called inside of APP.input(), APP.output() and APP.update(), but the
only functions that are called from main.js are APP.input(), APP.output() and 
APP.update().

The second aspect of the design philosophy is that main.js should be as simple
as it can possibly can be, by abstracting away all other aspects of the game.

The state contains the following properties:
-level: the level the player is currently in (int)
-maps: the array containing all the level blocks (array containing maps)
-x: the x position of the player
-y: the y position of the player
-angle: the angle the player is facing, it points towards the positive x axis