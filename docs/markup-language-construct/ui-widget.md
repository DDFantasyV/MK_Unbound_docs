# UI Widget

[[toc]]

## Symbol

Add `MovieClip` to the scene by its name `(linkage)`. Used in element declarations with `layout=false` parameter. For example, `display object` is created without `layout system`.

::: code-group
```python [Example 1]
(def element TestView() layout=false
    (symbol 'linkageName')
)
```

```python [Example 2]
(symbol " 'torpedo_markers_ally_c' ")
```
:::

## Sprite

Add an instance of `Sprite` class to the scene. Used in element declarations with `layout=false` parameter.

```python
(def element TestView() layout=false
    (sprite
        (y = 140)
        (tf
            (text = 'hello unbound')
        )
    )
)
```

## MC

Add an instance of `MovieClip` class to the scene by its name `(linkage)`. Used in element declarations with `layout=true` parameter. (i.e. support for `layout system` and `styles`)

```python
(def element TestView() layout=true
    (mc 'FWCloseButtonSlimMC'
        (name = 'closeBtnCrossAnim')
        (bindcall gotoAndPlay "stateFrame")
    )
)
```

## TextField

Add an instance of `TextField` class to the scene. Supported in all elements with `layout=true|false`. `text` or `htmlText` property is used to set the text. If both `text` and `htmlText` are set, only the latter action will be applied.

::: code-group
```python [Example 1]
(tf
    (text = 'Hello world!')
)
```

```python [Example 2]
(tf
    (style
        (width = 400)
        (height = 100)
        (textColor = 0xff0000)
        (fontFamily = $TitleFont)
        (fontSize = 56)
        (textAlign = "right")
        (leading = 10)
        (letterSpacing = 10)
    )
    (multiline = true)
    (autoSize = 'left')
    (selectable = false)
    (text = 'Hello unbound!!!')
)
```
:::

For the case when the text is too large and does not fit into the text field, there is `elideMode` property . If `elideMode=true`, then the text is cut to fit the entire block and the last 3 characters are replaced with `.` Each time the text is cut, `textElideStatus` event is generated; the argument passes the status: whether the text is cut or not.

::: details Example
```python
(tf
    (class HeroTitleTextStyle)
    (style
        (width = 200)
        (elideMode = true)
    )
    (text = 'Any long text')
    (trace "$event.value" init=false on='textElideStatus')
)
```
:::

## substitute

`substitute` - a `textblock` method that allows you to replace substrings with images.

`init=true` - required argument

```python
(tf
    (class $TextDefault19NM)
    (bindcall substitute imageOffset="_frameTextCount"
                        substitutionMap={'[test_icon]' : 'icon_ground_radar_ally' }
                        sourceText='radar: [test_icon] mouse: [KEY_LEFTMOUSE]'
                        postfix='_bg'
                        init=true
    )
)
```

## Elevent

Refer to [Element](/markup-language-construct/element).

## Block

Add a container instance of `Sprite` class to the scene. All nested blocks will be added to this container and positioned one after another depending on the value of `flow` style property.

There are aliases for `block`:

`block` - vertical block, child elements are located from top to bottom
`hblock` - horizontal block, child elements are arranged from left to right
`vtile` - vertical tile block, child elements are located from top to bottom, wrapped on the bottom border of the parent
`htile` - horizontal tile block, child elements are arranged from left to right, wrapping on the right border of the parent
`reverse` - vertical block with a reverse order of elements in the block, child elements are located from bottom to top
`hreverse` - horizontal block with reverse order of elements in the block, child elements are located from right to left

```python
(hblock
    (block
        (style
            (height = 100px)
            (width = 100px)
            (backgroundColor = "0xFF00FF00")
        )
    )
  
    (block
        (style
            (height = 100px)
            (width = 100px)
            (marginLeft = 10px)
            (backgroundColor = "0xFFFFFFFF")
        )
    )
)
```

## backgroundImage

Add an instance of `Bitmap` class to the scene.
- pass the path to the file (for this, `R-class` is used - the resource manager)
- pass texture from atlas - instance of class `BitmapData`
- `url` address to the image on the network

If the block is not specified in `style`, then after the image is loaded the block dimensions will become the same as the image dimensions.

```python
(bind backgroundImage "markerIcon")

(style
	(bind backgroundImage "'bitmap:' + toLower(markerIcon)")
)

(block
	(style
		(backgroundImage = 'url:../aircraft/icon_lock.png')
	)
)
```

## Slider

A component that represents a regular `Slider`.

Have a number of scope variables for configuration:
- `value` (number) - the current value of the slider in units (not a percentage);
- `minimum` (number) - minimum value;
- `maximum` (number) - maximum value;
- `enabled` (true/false) - whether the slider is available.
 
Can send event:
- `evValueChanged` - the slider value has changed.

The default parameter values ​​are shown in the example below:

::: details
```python
(def element Slider (_value:number, _min:number, _max:number, _enabled:bool=true) layout=true
    (scope
        (var enabled:bool = "_enabled")

        (event evValueChanged)
        (var value:number = "$event.value" init=false watch=false (event "evValueChanged"))
    )

    (mc slider_default
        (bind minimum "_min")
        (bind maximum "_max")
        (bind value "_value")
        (bind enabled "enabled")
        (dispatch evValueChanged args="{value: $event.value}" dir=1 on='valueChange')
    )
)
```
:::
