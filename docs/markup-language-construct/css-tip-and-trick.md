# CSS Tip and Trick

[[toc]]

## Usage

Create a style object:

```python
(def css SomeStyleObject()
    (position = "absolute")
    (width = 100%)
    (height = 100%)
)
```

Call:
```python
(block
    (class SomeStyleObject)
)
```

## Example

### Implementation of the hover pseudo-class

```python
(def element SomeElement() layout=true
    (scope
        # Declare events:
        (event evBtnOverEvent)
        (event evBtnOutEvent)
        ...
    )
    ...
    # Bind events:
    (dispatch evBtnOverEvent args="{}" on=rollOver)
    (dispatch evBtnOutEvent args="{}" on=rollOut)
    ...
    (block
        (style
            # Bind style changes to events:
            (bind alpha 1 (event "evBtnOverEvent"))
            (bind alpha 0.7 (event "evBtnOutEvent"))
        )
    )
)
```

### Triggering hover when hovering over a specific area, not the entire block

If you want to set a specific area as `hitArea`, add a block with `name='hoverArea'` and pass the block name to `hitArea` property of the `parentElement` using `$target` object.

```python
(def element parentElement() layout=true
    (style
        (width = 100px)
        (height = 100px)
        ...
    )
  
  
    (block
        (name = 'hoverArea')
        (style
            (width = 50px)
            (height = 50px)
            ...
        )
    )
    (hitArea = "$target.hoverArea")
    # Hover on the parent block will only work when hovering over `hoverArea`
)
```

### Changing styles depending on screen width/height (analogous to media queries)

```python
(def element SomeElement() layout=true
    (scope
        # Write the screen height value to a variable
        (var viewSizeHeight:number = "viewSize.height")
        (bind viewSizeHeight "viewSize.height" (event "viewResized"))
    )
    (style
        ...
        # Check and set the desired value for the property
        (bind bottom 0 (bind enabled "viewSizeHeight < 800"))
        (bind bottom 27px (bind enabled "viewSizeHeight > 800"))
    )
)
```
