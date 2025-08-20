# Enum

[[toc]]

In expressions you can use enumerations that are defined in the core c++ part of Unbound.

## Flow

`flow` determines how nested DO will be laid out.

### Property

- `HORIZONTAL`
- `VERTICAL` (Default)
- `TILE_HORIZONTAL`
- `TILE_VERTICAL`
- `REVERSE_HORIZONTAL`
- `REVERSE_VERTICAL`

### Example

```python
(block 
    (style
        (flow = "Flow.HORISONTAL")
    )
)
  
  
# Equivalent to the above
(hblock
)
```

::: details
For a block with the flow property set in the style, there are aliases:

- `block` - vertical block
- `hblock` - horizontal block
- `vtile` - vertical tile block
- `htile`- horizontal tile block
- `reverse` - vertical block with reverse order of elements in the block
- `hreverse` - horizontal block with reverse order of elements in the block

Block has parameter `flow = Flow.VERTICAL`
:::

## Easing

Types of easing for animation.

### Property

- `line`
- `elastic_in`
- `elastic_out`
- `bounce_in`
- `bounce_out`
- `back_in`
- `back_out`
- `cubic_in`
- `cubic_out`
- `quint_in`
- `quint_out`
- `expo_in`
- `expo_out`
- `expo_in_out`
- `sine_in`
- `sine_out`
- `sine_in_out`

### Example

```python
(controller $Animation
    (play duration=0.3 to={alpha:0} easing="Easing.cubic_out")
)
```
