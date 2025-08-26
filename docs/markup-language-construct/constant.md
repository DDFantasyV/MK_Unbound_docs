# Constant

[[toc]]

Constants have the same purpose as in other languages and are used to store immutable values.

In unbound you can use 2 types of constant:

- Global constant
- Local constant

## Global constant

To declare a global constant, use the `def` function. The argument field is passed the content that the variable can accept when declared.

### Example
::: code-group

```python [Example 1]
# declaration
(def constant C_ALLY 0xFF80c0ff)
...
# usage
(style 
    (width = "32px")
    (height = "32px")
    (backgroundColor = "C_ALLY")
)
```
```python [Example 2]
# declaration
(def constant ModuleNames   [   
                            'engine',
                            'maingun',
                            'atba',
                            'aviation',
                            'airdefence',
                            'none',
                            'torpedoes',
                            'wheel',
                            'none',
                            'none',
                            'fire',
                            'flood'
                           ]
)
...
# usage
(var damagedModuleName:str = "(moduleState == 3 ? 'module_dead_' : 'module_crit_') + ModuleNames[$index]")
```
```python [Example 3]
(def constant BTN_PRIMARY {
        up : {font: ButtonTextStyle, image: {source: 'bitmap:button_normal_bg', scale9: "Rect(15, 7, 135, 5)"} },
        hover : {font: ButtonTextStyle, image: {source: 'bitmap:button_normal_bg_hover', scale9: "Rect(15, 7, 135, 5)"} },
        down : {font: ButtonTextStyle, image: {source: 'bitmap:button_normal_bg_press', scale9: "Rect(15, 7, 135, 5)"} },
        disabled : {font: ButtonTextDisabledStyle, image: {source: 'bitmap:button_normal_bg_disabled', scale9: "Rect(15, 7, 135, 5)"} },
        disabledOverlay : {style: 'BtnNormalDisabledOverlayStyle'},
        focusOverlay : {image: {source: 'bitmap:button_normal_focus', scale9: "Rect(15, 7, 135, 5)"}},
        upSelected : {font: ButtonTextStyle, image: {source: 'bitmap:button_normal_bg_press', scale9: "Rect(15, 7, 135, 5)"} },
        hoverSelected : {font: ButtonTextStyle, image: {source: 'bitmap:button_normal_bg_press', scale9: "Rect(15, 7, 135, 5)"} },
        downSelected : {font: ButtonTextStyle, image: {source: 'bitmap:button_normal_bg_press', scale9: "Rect(15, 7, 135, 5)"} }
    }
)
(macro ComponentStateBase "BTN_PRIMARY")
```
:::

## Local constant

These constants are declared in the `scope` of `element` and can only be used within `element`.

### Example
```python
(def element TestView() layout = true
    (scope
        (const STATE_AVAILABLE:number = 0)
        (const STATE_UNAVAILABLE:number = 1)
        (const STATE_LOCKED:number = 2)
  
  
        (var currentState:number = 1)
    )
  
    (tf
        (bind class "currentState == STATE_AVAILABLE ? 'EpicTitleYellowTextStyle' : 'GrandTitleYellowTextStyle'")
        (text = 'Hello Unbound!!!')
    )
)
```
