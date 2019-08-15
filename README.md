# Flip
A player is stuck in a 3D maze but can only see a 2D cross section of it.
The player must rotate the plane in order to find the exit.
A demo can be found [here](https://diegolopez.me/flip). 

# Code Organization
The code is designed to be as independent from the other parts as possible

The file `input.js` is designed to keep track of all the keyboard and swipe input, and the
final input can be called at `APP.input()` and it will return the direction "l" or
"r"

The file `output.js` is designed to get some values of the current state of the game and
draw the screen by calling `APP.output()` and giving the needed values.

The file `update.js` is designed to get the past state and some input and update the state.
The new state is returned by calling `APP.update()` and passing in the past state
and the input from `input.js`.

The design philosophy is that `input.js`, `output.js` and `update.js` do not
depend on each other, and as such, so not call each other.

The file `main.js` brings only the methods `APP.input()`, `APP.output()` and `APP.update()`
together. inside of `input.js`, `output.js` and `update.js` there are other functions
that are called inside of `APP.input()`, `APP.output()` and `APP.update()`, but the
only functions that are called from `main.js` are `APP.input()`, `APP.output()` and 
`APP.update()`.

The second aspect of the design philosophy is that `main.js` should be as simple
as it can possibly can be, by abstracting away all other aspects of the game.

The state contains the following properties:
* level: the level the player is currently in (int)
* maps: the array containing all the level blocks (array containing maps)
* x: the x position of the player
* y: the y position of the player
* z: the z position of the player
* u: the vector describing where the player is going
* v: the vector that describes, together with u, the plane where the player lies
