# Data Type

Strict typing has been introduced in the layout (definitions parameters, scope properties), type checking occurs at the execution stage (except for macros, for them at the substitution stage, i.e. at the parsing stage)

The introduction of typing allows for better error control.

| Type | Description | Syntax | Note |
| :--: | :---------: | :----: | :--: |
| number | number | 12.34 | for the number type you can specify units |
|        | percent | 12.34% |  |
|        | pixels | 12px |  |
| bool | boolean expression | true / false |  |
| str | string | 'text123' | single quotes |
| dict | dictionary | `{a: 1, b: 2}` |  |
| array | array | `[1, 2, 3]` |  |
| expression | expression to be calculated | `a ? 1 : 2` | in double quotes <br> constant cannot be defined in expressions |
| gfx | pointer to any GFx::Value | - | constant cannot be defined in markups and in expressions |
| cpp | a complex object such as a collection or entity | - |  |

> [!NOTE]
> An important feature when working with string literals and variables is that single quotes can be omitted, since the parser interprets the values as a string when parsing. Therefore, there is duality when declaring string variables.

::: details Example
```python
# Initialize variable variable with string
(var vehicleName:str = Skorpion)
  
  
# Declare key in dict
(var testDict:dict = "{
    up : 'bitmap:button_black_bg',
    hover : 'bitmap:button_black_bg_hover',
    down : 'bitmap:button_black_press'
}")
(trace "toUpper(testDict['up'])")
```
:::
