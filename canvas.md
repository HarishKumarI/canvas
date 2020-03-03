# Canvas

### Canvas Objects

- Rectangles
- Lines
- Arcs / Circles
- Bezier Curves
- Images
- Text


### Essential Skills for any canvas Piece

- Creating and Resizing Your Canvas
- Drawing Elements
- Animating Elements
- Interacting with Elements


# dat.GUI

    <script src="https://raw.githubusercontent.com/dataarts/dat.gui/master/build/dat.gui.js"></script>
    
    or 
    npm dat.gui

[Tutorials](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage)

Classes

- GUI => allows you to manipulate variables and check on the go.
- Controller => An "abstract" class that represents a given property of an object
- NumberController => dat.controllers.Controller
Represents a given property of an object that is a number.

### GUI

object creation 
 
 let gui = new dat.GUI()

| Param              |  Type           | Default  |	Description           |
|--------------------|-----------------|----------|-----------------------|
| [params]           |  Object	       |          |                       |
| [params.name]      |  String         |          | The name of this GUI. |
| [params.load]	     |  Object	       |	      | JSON object representing the saved state of this GUI.|
| [params.parent]    |  dat.gui.GUI	   |          | The GUI I'm nested in.|
| [params.autoPlace] |  Boolean        | true     |                       |	
| [params.hideable]  |  Boolean        | true     |	If true, GUI is shown/hidden by h keypress.|
| [params.closed]     |	Boolean        |	false |	If true, starts closed|
| [params.closeOnTop] |	Boolean        |	false |	If true, close/open button shows on top of the GUI |


### Add Controller

    const WaveFolder = gui.addFolder('wave')  => addFolder allows us to create a section in the GUI Element and add variables to interact and manipulate 
    WaveFolder.add(wave, 'y', 0, innerHeight) => add function allows us to add variable and manipulate on the go. 

| Param	     | Type    | 	Description                                |
|------------|---------|-----------------------------------------------|
| object	 | Object  | 	The object to be manipulated               |
| property	 | String  | 	The name of the property to be manipulated |
| [min]      | 	Number | 	Minimum allowed value                      |
| [max]      | 	Number | 	Maximum allowed value                      |
| [step]     | 	Number | 	Increment by which to change value         |


### gui.addColor(object , property) 

allows you to add color pallete to the GUI Element.

### gui.remove()

allows you to detach the GUI Element from the Document.

### gui.removeFolder() 

 for removing Folder
