# Scope

[[toc]]

`Scope` is a data storage at the disposal of the element. It is not inherited from parent elements. The markup uses strong typing - all used variables and their types, as well as events, must be declared before use in the calculated expression, or passed from the external `scope` when calling the element.

May contain:
- variables `(var)`
- event announcement
- call `bind`
- `dispatch` event
- `$Animation` controller for animating variables in `scope`

>[!NOTE]
> If you sent variables without a name - the send list and the receive list must be consistent, i.e. the first variable sent goes into the first declared variable.

## Example

:::code-group
```python [Example 1]
# Declare an element with `level` argument
(def element LevelView(textStyle:str = 'MainTextStyle') layout=true
    (scope
        # Declare event
        (event __onParamChange)
  
  
        # Declare variables with a default value and dispatching the `__onParamChange` event on value change.
        # The `evChanged` event is an internal `core unbound` event.
        (var radius:number = 13              
            (dispatch __onParamChange on='evChanged')
        )
        (var color:number = 0xfff2ad
            (dispatch __onParamChange on='evChanged')
        )
    )
  
  
    (style
        (bind width "radius * 2")
        (bind height "radius * 2")
        (align = "center|middle")
    )
    (.graphics
        (bindcall clear init=true (event "__onParamChange"))
        (bindcall lineStyle 1 "color" 0.3 init=true watch=false (event "__onParamChange"))
        (bindcall drawCircle "radius" "radius" "radius" init=true watch=false (event "__onParamChange"))
        (bindcall endFill init=true (event "__onParamChange"))
    )
    (scope
        # Declaring a variable with a default value
        (var level:number = 0)
    )
    (tf
        (name = 'level')
        (class "textStyle")
        (bind text "level" init=false)
        (selectable = false)
    )
)
```

```python [Example 2]
(def element PlaneMarker()
    (scope
        (var entity:cpp = "$datahub.getEntity(13426)")
        (var iconHeight:number = "30")
        (var barHeight:number = 4)
    )

    (element PlaneIcon "iconHeight")    # send variable to first position
)

(def element PlaneIcon ( planeIconHeight:number )   # Recieve and declare type of variable,
                                                    # which automatically get into scope.

    (symbol "(isConsumable ? 'catapult': 'fighter') + '_c'"
        (bind scaleX "isSelected ? 2 : 1")
        (bind scaleY "isSelected ? 2 : 1")
    )
)
```
:::

`Scope` can be described in different parts of the element (example: variable `level`) . As a result, during execution, all parts will be combined into one `scope`. Displaying the contents of `scope`:

::: details trace "$scope"
```python
UBTRACE: Scope:
        Events: __onParamChange
        Vars:
            color : 1.67738e+07
            level : 0
            radius : 13
```
:::

> [!NOTE]
> Variables passed to an element as definition arguments are NOT in scope. In the example above, `textStyle` variable is not in `scope`.

When you create an instance of an element, you can change its `scope` variable values:

::: details Create an instance of an element
```python
(element LevelView 'PromoTitleTextStyle'
    (scope
        (level = 10)
        (radius = 40)
    )
)
```
:::

The scope variables can be synchronized with the parent `scope` variables when calling an element.

::: details Create an instance of an element
```python
(scope
    (var parentLevel:number = 15)
)
  
(element LevelView 'PromoTitleTextStyle'
    (scope
        (bind level "parentLevel")
    )
)
```
:::

Variables can be named when called directly, so there is no need to set them sequentially.

::: details
```
(element MinimapBG  _boolEnter="boolEnterParent" _scaleRatio="scaleRatioParent)
...
(def element MinimapBG (_scaleRatio:number, _boolEnter:bool))
```
:::

or via `$Instance` controller:

::: details
```
(controller $Instance renderer='MinimapBG'
    (args
        _boolEnter  = "boolEnterParent"
        _scaleRatio = "scaleRatioParent"
    )
)
...
(def element MinimapBG (_scaleRatio:number, _boolEnter:bool))
```
:::

In the examples above, the variables are scoped to the element only once, on call. To further update the variables at runtime, you can use this construct:

::: details
```
(element MinimapBG 
    (scope 
        (bind scaleRatio="scaleRatioParent")
    )
)
...
(def element MinimapBG ()
    (scope
        (var scaleRatio:number = 0)
    )
)
```
:::

or via `$Instance` controller:

::: details
```
(controller $Instance renderer='MinimapBG'
    (exprs
        (scope
            (bind scaleRatio="scaleRatioParent")
        )
    )
)
...
(def element MinimapBG ()
    (scope
        (var scaleRatio:number = 0)
    )
)
```
:::
