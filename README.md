## CSS-DAMACY

### Background

Katamari Damacy was originally a Japanese puzzle video game developed for the PLaystation 2. The original gameplay consists the player manipulating a magical adhesive ball called the katamari which would be able to pick up smaller objects and add to itself. The size of objects that it could pick up is directly proportional to its own size. The player would have to start out with smaller objects and as the Katamari grew, it would be capable of picking up progressively larger objects.

I plan to implement a version of the game using html text elements as objects. This implementation will be outlined in the **Functionality & MVP** and **Bonus Features** sections.  

### Functionality & MVP  

With this Conway's Game of Life simulator, users will be able to:

- [ ] Adjust settings for the katamari.
- [ ] manipulate the katamari using only the mouse and potentially the spacebar.
- [ ] continue to interact with new elements continually spawned and fed into the board.

In addition, this project will include:

- [ ] An About section describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a gameboard which will occupy the whole viewport. There will be a section for controls and links to the Github Repository and my LinkedIn account and an about section. Other than the nav links, the text elements of the instructions and about section will be considered valid objects for the Katamari to interact with.

Game controls will consist of using the mouse to direct the Katamari and using the space bar to make the Katamari "jump". The player will be able to hold down the mouse button to attract the Katari in the direction of the mouse.

A drop-down menu will be available to control the settings of the katamari (mainly growth rate).


![wireframes](images/js_wireframe.jpeg)

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.  It's okay if you don't have all the details of implementation fleshed out, but you should have a solid roadmap by Monday morning.

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for creating the Katamari and rendering it.
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for tracking and updating the positions of the html elements on the screen including elements attached to the katamari as well as the katamari itself.

`katamari.js`: this script will handle logic for creating and rendering the katamari circle/ball using the canvas/easel. It will also include all   methods for controlling the katari via event listeners.

`element.js`: this will be a lightweight script containing the class definition of each element tracking relevant properties such as

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the skeleton for the scripts outlined above.  Learn the basics of `Easel.js`.  Goals:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render a circular object/katamari to the `Canvas` element

**Day 2**: Focus on testing css transform attributes using js.fiddle. Work out how to have an element rotate about a fixed point at various radii.
 Goals:
- Use js.fiddle to test which css transformations are required to orbit an element about a fixed point.
- write methods for simulating `orbiting` elements given a radius, angular velocity, and a 2d vector in `board.js`.
- write methods for creating/spawning new elements into the board in `board.js`.
- bonus: write a method for fracturing larger text elements into smaller elements (impact and crash style fracturing)

**Day 3**: Implement and test Katamari and text element interactions in `katamari.js` and `elements.js`.
- Write and test methods for controlling the katamari.
- finish writing manipulation methods for the katamari including jumping.
- write methods for attaching the katamari to elements and setting their intervals.
- create test boards for testing katamari and object interaction.

**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Create interface for adjusting setting of the Katamari
- Have a styled `Canvas`, and fantastic looking controls and title
- If there is enough time, add music.


### Bonus features

There are potentially several features that could be added.

- [ ] Alternate collision interactions with text elements.
- [ ] Add difficulty progression.
