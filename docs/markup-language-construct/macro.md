# Macro

[[toc]]

Macro is a named parameterized fragment of layout, which the place of call replaces with the content of the macro at the parsing stage. However, it cannot work with the parent scope and variables for work must be passed as when calling the element. It allows you to reuse the same code blocks several times.

## Usage

```python
# declaration
(def macro trace(expr:expression)
    (block
        (tf
            (class $TextHUD16Bold)
            (bind text "expr")
        )
    )
)
...
# usage
(macro trace expr="variable")
```

## Example

```python
# Macro definition
(def macro trace(expr:expression)
    (block
        (style
            (backgroundColor = "0x50000000")
        )
        (tf
        (class $TextHUD16Bold)
            (style (textColor = "0xFFFF00FF"))
            (autoSize='left')
            (bind text "expr")
        )
    )
)
```

Once a macro has been defined, it can be called anywhere.

```python
# Call macro
(macro trace expr="variable")
```

This mechanism is used to auto-generate `scope` that will be associated with `python`:

::: details Example
```python
(def macro ButtonModel()
    (scope
        (event onClicked)
  
        (var rawLabel:str = '')
        (var label:str = '')
        (var isEnabled:bool = true)
        (var icon:gfx = null)
        (var iconAfterText:bool = true)
    )
)
```
:::
