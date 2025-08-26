# Style and CSS

[[toc]]

## General

Blocks support setting `layout` parameters via `style`. Each block has its own set of style parameters.

Set the style for `tf` block:

```python
(tf
    (style
        (fontSize = 32)
        (textColor = 0xFFFFFFFF)
    )
    (text = 'Hello world!!!')
)
```

Set the style for `block` block:

```python
(block
    (style
        (backgroundColor = 0xffff0000)
        (width = 100px)
        (height = 100px)
    )
)
```

Set the style for `mc` block:

```python
(mc 'Window_BG'
    (style
        (width=100)
        (height=50)
        ...
    )
)
```

Styles can be described in a separate definition and passed as a parameter to the block in `class` property.

::: details
```python
(def element TestView() layout = true
    (block
        (class BlockStyle)
    )
)
  
(def css BlockStyle()
    (backgroundColor = 0xffff0000)
    (width = 100px)
    (height = 100px)
)
```
:::

The value for `class` property can be evaluated in an expression, so you can style blocks based on conditions.

::: details
```python
(def element TestView() layout = true
    (scope
        (event onClick)
        (var switcher:bool = false)
        (bind switcher "!switcher" init=false watch=false (event "onClick"))
    )
      
    (block
        (bind class "switcher ? 'BlockStyle_1' : 'BlockStyle_2'")
    )
  
    (element ButtonPrimary
        (scope
            (label = 'change style')
        )
        (dispatch onClick on='click')
    )
)
  
(def css BlockStyle_1()
    (backgroundColor = 0xffff0000)
    (width = 100px)
    (height = 100px)
)
  
(def css BlockStyle_2()
    (backgroundColor = 0xff00ff00)
    (width = 120px)
    (height = 130px)
    (alpha = 0.5)
)
```
:::

If several styles with the same properties are applied to a block, the subsequent ones will overwrite the values ​​of the previous ones. The order of application is important.

::: details
```python
(block
    (class BlockStyle_1)    # [!code --]
    (class BlockStyle_2)    # [!code ++]
)
```
:::

> [!NOTE]
> But if you change the style property directly in `style` and pass `css` as a parameter with the same property. Then the order of the styles is not important. `style` block will be executed last.
::: details
```python
(def element TestView() layout = true
    (block
        (style
            (backgroundColor = 0xffff0000)
            (width = 100px)
            (height = 100px)
        )
        (class BlockStyle_2)
    )
)
  
(def css BlockStyle_2()
    (backgroundColor = 0xff00ff00)
    (width = 120px)
    (height = 130px)
    (alpha = 0.5)
)
```
:::

## Style sheet

Block types:
- Basic blocks: `tf`, `mc`, `image`, `text_input`;
- Container blocks (inherited from base block): `block` (and all aliases `hblock`, `vtile`, `gtile`, `reverse`, `hreverse`), `list`, `view_holder`, `slider`, `scroll_bar`, `progress`, `scrollArea`.

| Property | CSS Analogue | Support | Accepted Value |
| :------: | :----------: | :-----: | :------------: |
| width | width | All | number, %, px |
| minWidth | min-width | All | number, %, px |
| maxWidth | max-width | All | number, %, px |
| height | height | All | number, %, px |
| minHeight | min-height | All | number, %, px |
| maxHeight | max-height | All | number, %, px |
| position | position | All | absolute, flow |
| left | left | All | number, %, px |
| right | right | All | number, %, px |
| top | top | All | number, %, px |
| bottom | bottom | All | number, %, px |
| center | offset from center | All | number, %, px |
| hcenter | horizontal offset from center | All | number, %, px |
| vcenter | vertical offset from center | All | number, %, px |
| marginLeft | margin-left | All | number, %, px |
| marginRight | margin-right | All | number, %, px |
| marginTop	 | margin-top | All | number, %, px |
| marginBottom | margin-bottom | All | number, %, px |
| paddingLeft | padding-left | container blocks | number, %, px |
| paddingRight | padding-right	 | container blocks | number, %, px |
| paddingTop | padding-top | container blocks | number, %, px |
| paddingBottom | padding-bottom | container blocks | number, %, px |
| padding | padding | container blocks | number, %, px |
| backgroundColor | background-color | container blocks | 0xARGB |
| backgroundImage | background-image | container blocks | str, 'url: {url}', 'bitmap: {linkage}', 'symbol: {linkage}' |
| backgroundSize | background-size<br>background-repeat | container blocks | fill, crop, cover, repeat, autosize |
| flow | flex-direction | container blocks | Flow.HORISONTAL, Flow.VERTICAL, Flow.TILE_HORIZONTAL, Flow.TILE_VERTICAL |
| align | justify-content<br>align-items | container blocks | left, right, bottom, top, center, middle |
| alpha | opacity | All | number from 0 to 1 |
| fontSize | font-size | tf | number |
| leading | line spacing | tf | number |
| letterSpacing | letter-spacing | tf | number |
| fontFamily | font-family | tf | str |
| textColor | color | tf | 0xRGB |
| textAlign | text-align | tf | left, right, center |
| multiline | white-space | tf | bool |
| ubScaleX | transform: scaleX() | All | number |
| ubScaleY | transform: scaleY() | All | number |
| rotation | rotate block if its position is absolute | All with absolute position | number (rotation angle values ​​in degrees) |
| pivotX | zero point on X<br>used for rotation, scale, absolute position | All with absolute position | number, %, px |
| pivotY | zero point on Y<br>used for rotation, scale, absolute position | All with absolute position | number, %, px |
| scaleX | X-axis scale<br>can be negative, applies to the block and its children | All | double |
| scaleY | Y-axis scale<br>can be negative, applies to the block and its children | All | double |

## backgroundSize

```python
(def element NationFlagsSmall () layout=true
    (style
        (bind backgroundImage "'url:../nation_flags/small/flag_USA.png'" init=false)
        (backgroundSize = "fill")
        (width = 117)
        (height = 72)
    )
)
```

::: details
- `cover` - stretch the texture to fit the container while maintaining the texture's proportions so that it fills the entire area, cutting off the texture outside the container.
- `crop` - crop the image to fit the container size.
- `fill` - stretch the image to fit the container without preserving the proportions.
- `align` - position the image in the center of the container, cutting off the texture outside the container.
:::

## backgroundRepeatX/backgroundRepeatY

```python
(block
    (style
        (width = 42) (height = 42)
        (backgroundImage = 'url:../service_kit/icons/icon_warning_red.png')
        (backgroundRepeatX = true)
        (backgroundRepeatY = false)
    )
)
```

Repeat image horizontally and/or vertically. Disabled by default.

## substitute

`substitute` - a textblock method that allows you to replace substrings with images. 

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

`init=true` - required argument

## outline

Set the outline style for text.

> [!CAUTION]
> Cannot be used for large amounts of text of varying sizes - the texture with glyphs quickly fills up and will affect performance.
>
> It is not advisable to apply animation with scale to such text - there may be artifacts, etc.

```python
(tf
    (class $TextDefault)
    (style
        (outlineColor = 0x08222A)   # outline color
        (outlineAlpha = 0.4)        # outline transparency
        (outlineThickness = 1)      # outline thickness
        (outlineScaled = false)     # whether the scale affect the outline thickness. When animating the text scale, always set it to `false`
    )
     
    (text = 'The quick brown fox jumps over the lazy dog. 1234567890?!-+')
)
```

## scale9grid

The set of parameters is identical to `background9Slice` in `unbound1`.

```python
(def element TestElement() layout=true
    (mc wows_logo
        (style
            (width = "500")
            (height = "500")
            (scale9grid = "rect(30)")
        )
    )
)
```
