# Layout

[[toc]]

Unbound has a `layout system` that deals with the positioning of blocks located in one container according to certain parameters. To enable the `layout system`, `layout=true|false` attribute of the element definition is used. The description of an element with `layout=true` attribute is equivalent to `def layout`.

Attribute of the `element` object. Most often used to mark several elements relative to each other. That is, the second child element will be built after the first, etc. The coordinates of all child elements are relative to each other, i.e. all `DisplayObjects` know about each other's sizes and are built accordingly. Conveniently used for designing complex objects consisting of several objects.

It also allows you to use `style` attribute to change the appearance and dynamically change the parameters of blocks.

## Example

:::code-group
```python [Example 1]
(def element TestView() layout = true
    (block
        (style
            (width = 1024px)
            (height = 768px)
            (backgroundColor = 0xff191711)
            (marginLeft = 200px)
        )
        (tf
            (style
                (textColor = 0xffffffff)
            )
            (text = 'SandBox')
        )
    )
)
  
#or
  
(def layout TestView()
    (block
        (style
            (width = 1024px)
            (height = 768px)
            (backgroundColor = 0xff191711)
            (marginLeft = 200px)
        )
        (tf
            (style
                (textColor = 0xffffffff)
            )
            (text = 'SandBox')
        )
    )
)
```

```python [Example 2]
(controller $Instance renderer='SimpleElement'
    (args "150")    # Pass a number to the scope of the called element
)
...
(def element SimpleElement(posX:number) layout=true     # Declare the element, declare a variable and its type, 
                                                        # which stores the received number and specify that 
                                                        # the element has a `layout`.
    (scope
        (var posY:number = 150)
        (var isVisible:boolean = true)
    )

    (hblock                                 # child objects must be stacked horizontally within the block
        (bind visible "isVisible")          # block visibility conditions
        (style
            (x = posX)
            (y = posY)
        )

        (block
            (style
                (width = 100px)
                (height = 20%)
                (backgroundColor = "0xFF000000")    # COLOR CODE → 0xAARRGGBB
            )
        )

        (tf
            (style
                (textColor = "0xFF00FF00")
                (textSize = 16)
            )
            (text = 'Hello world!')
        )
    )
)
```
:::

## Position of blocks

`layout system` positions blocks according to the value of `position` property. Position can take the following values:
- `flow` - `layout system` positions nested blocks one after another (the position of one block depends on the position of the previous one), by default `position="flow"`.
- `absolute` - `layout system` excludes the block from the flow (positioning list).

>[!NOTE]
> The size of the block whose parameter `position="flow"` is equal to the sizes of the blocks nested in it.
>
> The size of the block whose parameter `position="absolute"` is `0` by default.

### flow

To position blocks relative to each other with `position="flow"`, you can use the following style properties:
- `paddingLeft`/`paddingRight`/`paddingTop`/`paddingBottom` - padding left/right/top/bottom for nested blocks.

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 1024px)    # element width
        (height = 768px)    # element height
        (backgroundColor = 0xff191711)
        (paddingLeft = 20px)    # left padding in pixels for the nested block
        (paddingTop = 10%)      # top padding in percent of the current height for the nested block
    )
  
  
    # The coordinates of the nested block are x:20px(`paddingLeft` of the parent block), y:768*0.1=76.8(10 % of the height of the parent block).
    (block
        (style
            (width = 100px)
            (height = 100px)
            (backgroundColor = 0xff0000ff)
        )
    )
      
    # The coordinates of the nested block are x:20px(`paddingLeft` of the parent block), y:76.8(y-coordinate of the block above)+100(height of the block above)=176.8.
    (block
        (style
            (width = 100px)
            (height = 100px)
            (backgroundColor = 0xffff0000)
        )
    )
)
```
:::

If you need to set all 4 parameters at once, you can use the following construction:

::: details Example
```python
(style
    (padding = [5, 10, 15, 20]) # [paddingLeft, paddingTop, paddingRight, paddingBottom]
)
```
:::

- `marginLeft`/`marginRight`/`marginTop`/`marginBottom` - margin left/right/top/bottom for the current block.

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 1024px)
        (height = 768px)
        (backgroundColor = 0xff191711)
    )
      
    # Block coordinates x:10px(`marginLeft` of current block), y:20px(`marginTop` of current block).
    (block
        (style
            (width = 100px)
            (height = 100px)
            (backgroundColor = 0xff0000ff)
            (marginLeft = 10px)
            (marginTop = 20px)
        )
    )
  
    # Block coordinates x:20px(`marginLeft` of current block), y:20px(y-coordinate of block above)+100px(height of block above)+5px(`margineTop` of current block)=125px.
    (block
        (style
            (width = 50px)
            (height = 50px)
            (backgroundColor = 0xffff0000)
            (marginLeft = 20px)
            (marginTop = 5px)
        )
    )
)
```
:::

If you need to set all 4 parameters at once, you can use the following construction:

::: details Example
```python
(style
    (margin = [5, 10, 15, 20]) # [marginLeft, marginTop, marginright, bottom]
)
```
:::

>[!NOTE]
> The main difference between `margin` and `padding` is that `padding` is set in the parent block and affects the positioning of nested blocks. `margin` affects the positioning of the current block.

- `gap`,`hgap`,`vgap` - horizontal/vertical gap between each nested block.

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 1024px)
        (height = 768px)
        (backgroundColor = 0xff191711)
        (vgap = 20px)
        (paddingTop = 40px)
        (paddingLeft = 40px)
    )
      
    # Block coordinates x:40px(`paddingLeft` of the parent block), y:40px(`paddingTop` of the parent block)
    (block
        (style
            (width = 20px)
            (height = 20px)
            (backgroundColor = 0xffff0000)
        )
    )
  
    # Block coordinates x:40px(`paddingLeft` of the parent block), y:40px(y-coordinate of the block above)+20px(height of the block above)+20px(`vgap`)=80px
    (block
        (style
            (width = 30px)
            (height = 30px)
            (backgroundColor = 0xff00ff00)
        )
    )
      
    # Block coordinates x:40px(`paddingLeft` of parent block), y:80px (y-coordinate of block above)+30px(height of block above)+20px(`vgap`)=130px
    (block
        (style
            (width = 40px)
            (height = 40px)
            (backgroundColor = 0xff0000ff)
        )
    )
)
```
:::

If the horizontal and vertical spacing between blocks is the same, then you can use `gap` parameter.

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 1024px)
        (height = 768px)
        (backgroundColor = 0xff191711)
        (paddingLeft = 100px)
        (paddingTop = 100px)
    )
      
    # Block in which `layout system` places elements horizontally one after another, if the next block does not fit, the block is moved below.
    # The width of the block is 80px , the total width of all nested blocks is 20px+30px+40px=90px, so the third block will be located below the rest.
    # `gap=10px`, therefore, the distance between the blocks vertically and horizontally will be 10px.
    (htile
        (style
            (width = 80px)
            (gap = 10px)
            (backgroundColor = 0x44ffffff)
        )
        (block
            (style
                (width = 20px)
                (height = 20px)
                (backgroundColor = 0xffff0000)
            )
        )
  
        (block
            (style
                (width = 30px)
                (height = 30px)
                (backgroundColor = 0xff00ff00)
            )
        )
  
        (block
            (style
                (width = 40px)
                (height = 40px)
                (backgroundColor = 0xff0000ff)
            )
        )
    )
)
```
:::

As a result we get:

![An image](https://forum-cdn.korabli.su/monthly_2019_05/unbound2_htile_gap.PNG.bc7384fe40cb5be57a433bd820afb3d6.PNG)

- `align` - positioning all nested blocks as a single block. Can take the following values: 
    - `left` - align content to the left edge
    - `right` - align content to the right edge
    - `top` - align content to the top edge 
    - `bottom` - align content to the bottom edge
    - `center` - align content to the center horizontally
    - `middle` - align content to the center vertically

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 1024px)
        (height = 768px)
        (backgroundColor = 0xff191711)
        (align = "left")
    )
      
    (block
        (style
            (width = 20px)
            (height = 20px)
            (backgroundColor = 0xffff0000)
        )
    )
)
```
:::

You can use several values ​​at once separated by `|`. For example, if you want to align to the center both vertically and horizontally:

```python
(align = "center | middle")
```

### absolute

To position blocks with `position="absolute"` the above properties are not applied, you need to use the following:
- `left`/`right`/`top`/`bottom` - indent from the left/right/top/bottom edge of the container in which the block is located.

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 400px)
        (height = 200px)
        (backgroundColor = 0xff191711)
        (align = "center|middle")
    )
  
    (block
        (style
            (width = 20px)
            (height = 20px)
            (backgroundColor = 0xffff0000)
        )
    )
  
    # Remove `layout system` from the positioning list. The block has coordinates x:40px(`left` parameter of the current block), y:50px(`top` parameter of the current block)
    (block
        (style
            (position = "absolute")
            (width = 30px)
            (height = 30px)
            (left = 40px)
            (top = 50px)
            (backgroundColor = 0xff00ff00)
        )
    )
  
    (block
        (style
            (width = 40px)
            (height = 40px)
            (backgroundColor = 0xff0000ff)
        )
    )
)
```
:::

As a result we get:

![An image](https://forum-cdn.korabli.su/monthly_2019_05/unbound2_position_absolute.PNG.85e94718163d48f9ddf7cf9c4733fb7e.PNG)

- `hcenter`/`vcenter` - horizontal/vertical

::: details Example
```python
(def element TestView() layout = true
    (style
        (width = 400px)
        (height = 200px)
        (backgroundColor = 0xff191711)
    )
  
    (block
        (style
            (width = 20px)
            (height = 20px)
            (backgroundColor = 0xffff0000)
        )
    )
  
    # Remove `layout system` from the positioning list. Vertical and horizontal center margins are `0` , so the block is positioned exactly in the center.
    (block
        (style
            (position = "absolute")
            (width = 30px)
            (height = 30px)
            (hcenter = 0px)
            (vcenter = 0px)
            (backgroundColor = 0xff00ff00)
        )
    )
  
    (block
        (style
            (width = 40px)
            (height = 40px)
            (backgroundColor = 0xff0000ff)
        )
    )
)
```
:::

As a result we get:

![An image](https://forum-cdn.korabli.su/monthly_2019_05/unbound2_position_absolute_center.png.a64c375bc951ecfe1342b6718d533692.png)
