# Style Display Object

[[toc]]

`Elements` and `blocks` have `Style`, which allows you to customize their visual presentation, such as changing sizes, applying filters, etc.

## DO list

| Top level method | Description |
| :--------------: | :---------: |
| style | Return the style of the current DO for further work |

## Example

Each block has its own set of `style` properties. For example, `tf` block can be assigned `font`, `size` and `color`.

```python
(tf
    (style
        (fontFamily = $TitleFont)
        (fontSize = 36)
        (textColor = 0xf5eed5)
    )
)
```

Also, by changing `style` properties: `paddings`, `margins`, `position`, `flow`, etc., you can control the positioning of the block.

```python
(block
    (style
        (position = "absolute")
        (bottom = 18px)
        (paddingLeft = 24px)
        (paddingRight = 24px)
    )
)
```

> [!WARNING]
> `Style` is only available to objects with `layout-system`, namely element with the layout=true parameter and various blocks inherited from `BaseBlock` in `c++`.

> [!CAUTION]
> Accessing the style property of DO without layout system results in an error: 
>
> access of undefined method 'style' through a reference with type element
