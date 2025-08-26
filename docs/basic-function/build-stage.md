# Build Stage

[[toc]]

Display object (DO) is a general name for all screen objects. They are displayed in a list (display sheet) in the order of calling, in coordinates `[x:0;y:0]`. The content and display, as well as the set of properties, are different for different display objects.

The main feature of the unbound markup language is the creation, configuration and addition of instances of display objects (DO) to the corresponding target object in the display list. The target object is the parent DO for the current layout fragment. All DOs are divided into 2 groups by the presence/absence of a layout system. The layout system is responsible for positioning DO on the stage.

## Usage

```python
(block
    (tf
    )
)
```

where the `block` node is the target object for DO `tf` .

## DO list

| Top level method | Description |
| :--------------: | :---------: |
| sprite | Create a Sprite instance |
| symbol | Create a Symbol (MovieClip or Sprite) instance by name from a library |
| tf | Create an instance of a TextField text block |
| element | Create an instance of an element described in the layout |
| block | Create a child DO |

## Property

Some properties are available for all displayed objects, such as:

| Property name | Description | Format |
| :-----------: | :---------: | :----: |
| height | height of object in px or % | :number |
| width | object width in px or % | :number |
| x | X axis position in px or % | :number |
| y | Y axis position in px or % | :number |
| scaleX | horizontal multiplier | :number |
| scaleY | vertical multiplier | :number |
| alpha | object transparency from 0 to 1 | :number |
| rotation | rotation in degrees | :number |

## Example

Example of creating a `Sprite` of size `500x500px` with coordinates `[x=100; y=200]` and opacity of `50%`:

```python
(sprite
    (width = 500)
    (height = 500)
    (x = 100px)
    (y = 200px)
    (scaleX = 2)
    (alpha = 0.5)
    (rotation = 45)
)
```
