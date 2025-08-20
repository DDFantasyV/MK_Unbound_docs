# Controller

[[toc]]

Controller is an entity that performs one type of action with a given object. For `$Instance`, `$FxInstance` and `$Repeat` controllers, the object is specified in the renderer field; the `$Animation` controller is directed to the parent object; the `$Sector` controller is an object itself.

## $Instance

Add an instance of element to the scene.

### Example
```python
(controller $Instance renderer='PlayerListTextLine' layout=false
    (args entityId="13123")
    (exprs
        (scope
            (bind width "290")
            (bind isAlive "isAlive")
            (bind isSelf "isSelf")
        )
    )
    (bind enabled "isBoolTrue")
)
```

::: details
- `renderer` specifies the element that the controller will operate on. Available for binding.
- `layout` controls whether the layout system will work. The default value is `false`.
- `args`, when called, passes to the renderer the value from the scope in which it is located.
- `exprs` is executed on the renderer side, but has access to the parent scope. It can contain expressions and bindings. Through this attribute, it is possible to listen to variables from the parent scope in the child.
- `enabled` specifies the expression for triggering the controller. The controller will trigger if the `expression==true`.
- `trigger` specifies an expression to trigger the controller. The controller will trigger if the expression changes value.
- `event` , similar to enabled, but reacts to `Events`.
:::

In some cases, it is not necessary to select a separate element, then blocks can be nested in an attribute `exprs` and set `layout=true` in the controller.
::: details Example
```python
(controller $Instance layout=true
    (exprs
        (tf
            (name = 'level')
            (class HeroTitleTextStyle)
            (selectable = false)
            (bind text "parentLevel")
        )
    )
)
```
:::

`recreate` - a method that recreates an instance

::: details Example
```python
(controller $Instance renderer='OwnHealthBar'
       (args _entityId="entityId")
       (bindcall recreate (bind trigger "entityId"))        
)
```
:::

## $FxInstance

Temporarily add an instance of the element to the stage, which will be removed from the stage after `lifetime` seconds.

### Example

::: code-group
```python [Example 1]
(controller $FxInstance renderer='DamageDangerFX' lifetime=5
    (args data="$event")
    (bindcall create (event "$datahub.getEntity(entityId).damageDanger.evDamage"))
)
```

```python [Example 2]
(controller $FxInstance renderer='LevelView' lifetime=2
    (args textStyle='HeroTitleTextStyle')
    (exprs
        (scope
            (level = "parentLevel")
            (radius = 40)
        )
    )
    (bindcall create (event "onClick"))
)
```

```python [Example 3]
(def element LevelView(textStyle:str = 'MainTextStyle') layout=true
    (scope
        (event __onParamChange)
        (var radius:number = 13              
            (dispatch __onParamChange on='evChanged')
        )
        (var color:number = 0xfff2ad
            (dispatch __onParamChange on='evChanged')
        )
  
  
        (var index:number = "$index")
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
        (var level:number = 0)
    )
    (tf
        (name = 'level')
        (bind class "textStyle")
        (bind text "level" init=false)
        (selectable = false)
    )
)
```
:::

::: details
- `renderer`, `args`, `exprs`, `enabled`, `layout` - behavior is similar to the behavior in `$Instance` controller.
- `bindcall create` - define the trigger event for the controller. The controller is called when the specified event is caught in the scope. In the example above, we access `$datahub` directly, so there is no need to create a variable or event separately for this event (but this is not recommended, since the component may not be present at the time of initialization and the subscription will not occur. It is better to declare an entity, component and then access the event inside the component variable). 
- `lifetime` defines the lifetime of the element on the stage.
> [!NOTE] 
> If not specified, the default value of `lifetime` is 15 seconds.
:::

## $Repeat

Create the specified number of copies of the renderer.

### Example

::: code-group
```python [Example 1]
(controller $Repeat renderer='MapMarkerItem'
    (bind count "collection.items.length" (event "collection.evAdded"))
    (args size="size" mapScale="mapScale" scaleRatio="scaleRatio")
)
```

```python [Example 2]
(scope
    (event onClick)
    (var countRenderers:number = 5)
)
  
(controller $Repeat layout=true
    (bind count "countRenderers")
    (exprs
        (element ButtonPrimary
            (scope
                (label = "'button_' + $index")
            )
            (dispatch onClick args="{index : $index}" on='click')
        )  
    )
  
    (bindcall removeChildAt "$event.index" init=false (event "onClick"))
)
```
:::

::: details
- `renderer`, `args`, `exprs`, `enabled`, `layout` - behavior is similar to the behavior in `$Instance` controller.
- `count` specifies the number of copies of the renderer. Can be any expression. In the example above, counter is equal to the number of elements in `collection`.
- `removeChildAt(index)` - remove the renderer from the scene by index.
- `$index` - integer, child's number in order from 0 to the final element. The first created element will have `$index=0`, etc. Automatically in the child's scope from the moment of creation.
:::

## $Animation

Animate the parent display object or the value of a variable in a scope.

### Methods

Available controller methods with examples of filling parameters:

- `play` - start one animation.
::: details
::: code-group
```python [Example 1]
(play
    duration=1.0  # Animation duration in seconds. Required and must be greater than zero.
    to={ alpha:1, y:0, visible:true }  # Final animation value. Required if name is not passed (see below), otherwise empty by default.
    from={ alpha:0, y:50, visible:false }  # Animation starting values. If not specified ,the animation will start with the values in the scope. Empty by default.
    name='AnimX'  # Name of a previously declared animation. For example: (def animation AnimX () from={x:0} to={x:300}). Empty by default.
    delay=2.0  # Specify the delay before playing the animation. Default to 0.0.
    easing="Easing.quint_out"  # Function to change the animation. Empty by default (Easing.line).
    repeatCount=1  # Number of animation repetitions. The parameter specifies the number of additional repetitions, i.e. if `repeatCount=0`, the animation will be played once. -1 - The animation will be played continuously. The default value is 0.
    reverse=false  # Condition for playing the animation in the opposite direction, to → from (subject to the presence of both fields, or the presence of name). Default is false.
    callbacks="{  # Animation callback. By default, callbacks are not set.
        onComplete: onCompleteEvent,  # Raise when the animation has finished.
        onStart: onStartEvent,  # Raise when the animation has started.
        onRepeat: onRepeatEvent,  # Raise every time the animation starts from the beginning. The callback is passed `repeatCount` parameter - the number of remaining repetitions. 
        onUpdate: onUpdateEvent,  # Raise every time the animation changes the value of the parameter. The callback is passed a dict with the current values of the parameters passed to `to` and `from` .
    }"
    id='anmId'  # Animation id, by which it can be stopped via the stop method. By default, id = "".
)
```

```python [Example 2]
(scope
    (var longTapArc:number = 0)
    (controller $Animation
        (bindcall play  duration= 0.5
                        from    = { longTapArc:0 }
                        to      = { longTapArc:360 }
                        (bind enabled "keyState == Key.DOWN")
        )
    )
)
# If (keystate == Key.DOWN), then changes the value of longTapArc from 0 to 360 in 0.5 sec
```

```python [Example 3]
(block
    (visible = "tacticalMap")
    (style 
        (height = 100)
        (width = 100)
        (backgroundColor = C_ALLY)
    )

    (controller $Animation
        (bindcall play 
            duration=0.15
            delay="tacticalMap ? 0.1 : 0"
            easing="Easing.cubic_out" 
            from={ alpha:0, y:50, visible:false } 
            to={ alpha:1, y:0, visible:true } 
            reverse="!tacticalMap"
            (bind trigger "tacticalMap")
        )
    )
)
# If the tacticalMap variable changes its value - the appearance is played out
# if the tacticalMap changes its value to the original - the disappearance is played out
```
:::

- `bindcall` specifies that the animation should be started according to the conditions specified in `bind enabled`, `bind trigger`, or `event`.
- `duration` specifies the duration of the animation in seconds.
- `delay` specifies the delay before the animation plays.
- `from` - starting animation value. If not specified, the animation will start from the values that are in the scope.
- `to` final animation value. Required field.
- `reverse` conditions for playing the animation in the opposite direction, to → from (provided that both fields are present).
- `trigger` conditions for triggering the animation when the condition value changes. The difference from  enabled  is that enabled is triggered only when the `expression==toBoolean(true)`.
> [!IMPORTANT]
> At the moment of delay launch, the controller has already accepted the values of all variables at all positions. If the values of the variables have changed by the end of the delay, the controller will not know about it.

- `killAll` - property, when animation starts, destroys all active animations of the object

::: details
```python
(controller $Animation
        (bindcall play  duration = "HEALTH_ANI_MIN"
                        killAll=true
                        watch = false
                        easing="Easing.quad_in"
.....
)
```
:::

### Easing

https://easings.net/

The easing parameter takes the following values:
::: details
- `Easing.line`
- `Easing.elastic_in`
- `Easing.elastic_out`
- `Easing.bounce_in`
- `Easing.bounce_out`
- `Easing.back_in`
- `Easing.back_out`
- `Easing.quad_in`
- `Easing.quad_out`
- `Easing.cubic_in`
- `Easing.cubic_out`
- `Easing.quint_in`
- `Easing.quint_out`
:::

### Example

::: code-group
```python [Example 1]
# Example of launching animation by clicking on a button and displaying changing values in a text block.
(scope
    # Declare the variable we want to animate
    (var animationVariable:number = 0)
  
  
    # `Event` to call the `play`
    (event playAnimationEvent)
  
    # The controller must be located in `scope`
    (controller $Animation
        (bindcall play
            duration = 10
            from     = "{animationVariable:0}"
            to       = "{animationVariable:360}"
            easing   = "Easing.cubic_out"
            (event "playAnimationEvent")
        )
    )
)
  
(tf
    (class HeroTitleYellowTextStyle)
    (bind text "animationVariable")
)
  
(element ButtonPrimary
    (scope
        (label = 'Play')
        (dispatch playAnimationEvent on='evBtnLeftClickEvent')
    )
)
```

```python [Example 2]
# Example of animation of style properties.
(scope
    (event playAnimationEvent)
    (var triggerAnimation:bool = false)
    (bind triggerAnimation "!triggerAnimation" init=false watch=false (event "playAnimationEvent"))
)
  
(block
    (style
        (position = "absolute")
        (width = 50)
        (height = 30)
        (top = 100)
        (left = 100)
        (backgroundColor = 0xFFFF0000)
        (alpha = 0)
    )
  
    (controller $Animation
        (bindcall play
            duration=2
            easing="Easing.cubic_out"
            from="{alpha:0, top:100, width: 50, height: 30}"
            to="{ alpha:1, top:200, width: 100, height: 50 }"
            reverse="!triggerAnimation"
            (bind trigger "triggerAnimation")
        )
    )
)
  
(element ButtonPrimary
    (scope
        (label = 'Play')
        (dispatch playAnimationEvent on='evBtnLeftClickEvent')
    )
)
# `trigger` - the condition for triggering the animation when the condition value changes to the opposite. The difference from  `enabled` is that enabled is triggered only when the expression is `true`.
```

```python [Example 3]
# Trigger vs Enabled
(controller $Animation
        (bindcall play  duration = "HEALTH_ANI_MIN"
                        enabled="isEnabled"
.....
)
 
(controller $Animation
        (bindcall play  duration = "HEALTH_ANI_MIN"
                        trigger="isTarget == 'ally'"
.....
)
```
:::

> [!IMPORTANT]
> A feature of the controller's operation with `delay` parameter. The values of the animated variables in the to parameter are read by the controller without taking into account `delay`. Therefore, if the values of the variables have changed at the end of the delay, the controller will not know about it.

## $Sector

Draw a sector using `flash.display.Graphics` target object.

### Example
```python
(def element SectorControllerSample() layout=true
    (x = 10)
    (y = 10)
    (scope
        (var _circOffset:number = 30)
        (var _circArc:number = 60)
        (var _circRad:number = 200)
        (var _circInRad:number = 50)
        (var _circColor:number = 0xffff0000)
        (var _circGradient:array = [0xffff0000, 0xffff00ff, 0xffffff00])
        (var _circAlphas:array = [1, 0.5, 0.5])
        (var _circRatios:array = [0, 127, 255])
        (var _lineThickness:number = 10)
        (var _lineColor:number = 0xffffffff)
        (var _lineAlpha:number = 0.5)
    )
  
    (block
        (mc 'flash.display.Sprite'
            (controller $Sector
                (offset="_circOffset")
                (color="_circColor" )
                (arc="_circArc" )
                (radius="_circRad" )
                (colors="_circGradient" )
                (alphas="_circAlphas")
                (ratios="_circRatios")
                (lineThickness="_lineThickness")
                (lineColor="_lineColor")
                (lineAlpha="_lineAlpha")
                (innerRadius="_circInRad")
            )
        )
    )
)
```

## $Tooltip

In general, tooltip is an element that appears above the rest of the layout. 
- tooltip: appears when you hover over a certain block, disappears when the mouse leaves.
- context menu: appears when you click on a block, disappears if you click on the screen outside the menu.

### Example
```python
(controller $Tooltip
    (renderer='SimpleTooltip')
    (showAnimation={duration:0.15, from:{alpha:0, scaleX:0.7, scaleY:0.7}, to:{alpha:1, scaleX:1, scaleY:1}}) # same one is used for hiding
    (bindcall show on='rollOver')
    (bindcall hide on='rollOut')
    (offset={x:0, y:20})
    (align="bottom|right")
    (position="trackMouse")
)
```
### Element and argument

How it is implemented: we include it in the block, `controller $Tooltip`, give it the name of the element and arguments for the tooltip:
::: details
```python
(controller $Tooltip
    renderer=...        # Element name for the tooltip, arguments and expressions
                        # -- the same as for any other controller.
    (args ...)
    (exprs ...)
 
    cache=true|false    # Whether to cache the tooltip (default is `true`). 
                        # The cache is local (i.e. each controller caches only its own tooltip,
                        # and the cache is reset if the controller dies).
    priority=0          # If there are multiple tooltips on one element, 
                        # the one with higher priority will hide tooltips with lower priority.
    ...
)
```
:::

### Position

The type of anchor point `position` is specified:

- the tooltip sticks to the edge of the block and then tracks the position of the block,
- the tooltip sticks to the edge of the block and stays at that point (even if the block has moved),
- the tooltip follows the mouse,
- the tooltip appears in the position where the mouse was at the time it appeared, and then stays there.

Then - `align` and `offset` relative to this point, and the minimum distance to the screen border `screenBoundsOffset`.

If the tooltip approaches the screen border (taking into account `screenBoundsOffset`), it will rest against this border and will not move... provided that it does not overlap the anchor point. That is, if the tooltip has the alignment `outerLeft|bottom` (to the left and below the anchor point) - then when approaching the bottom border of the screen, it can rest against it - and not overlap the point. But with the alignment `innerLeft|outerBottom` (under the anchor point, at its left edge), the tooltip cannot simply rest against the bottom edge: the anchor point will be overlapped. Therefore, it "jumps" to the opposite side from the anchor point, i.e. changes the alignment to `inner Right |outerBottom`. The tooltip pins (see below) will also change.

For examples of "pushing" and "jumping", see `Sandbox/Unbound2/TooltipSamples`.

::: details
```python
(controller $Tooltip
    ...
    position="trackMouse|atMouse|border|borderNoTrack" 
                                    # The tooltip follows the mouse, stays at the point where the mouse was when the tooltip was opened,
                                    # sticks to the edge of the parent element (and moves with it), or stops at the point
                                    # where the parent element was when it was opened. By default -- `trackMouse`.
 
    # In which direction the tooltip is offset from the mouse or from the edge of the element (by default `outerRight|outerBottom` ).
    align="innerLeft|left|innerRight|right|center innerTop|top|innerBottom|bottom|middle"
 
    offset={x: ..., y: ...} # How much it is offset along x and y.
 
    # How far the tooltip can move to the edge of the screen (either the same value for all edges, or its own for each edge). 
    screenBoundsOffset=value|{left: ..., top: ..., right: ..., bottom: ...} 
    ...
)
```
:::

### Pin

The tooltip can also have pins (arrows from the edge of the tooltip to the anchor point); the required pin (left, right, top or bottom) is selected automatically. However, there are some difficulties with pins, as indents (margins and paddings) do not work on them. If an indent is needed, then you have to add a background of the required size with a transparent fill (for example, color `0x00000001`) to the pin. And a negative indent (i.e. overlaying the arrow on the tooltip body) can only be set using `pinOffset` parameter.

::: details
```python
(controller $Tooltip
    ...
    (pinLeft='...')     # Names of elements with pins (arrows from the edge of the tooltip to the anchor point).
    (pinTop='...')
    (pinRight='...')
    (pinBottom='...')
    (pinOffset=...)     # Pin offset relative to the anchor point (i.e. how many pixels the pin overlaps the body of the tooltip).
    ...
)
```
:::

Another way to make "pins" is to subscribe the tooltip element to `evPinPositionChanged` event, and switch the background depending on which arrow needs to be shown. This works more reliably and gives more control than setting arrows in separate elements.

::: details
```python
(def element TooltipWithSwitchingBackground() layout=true
    (scope
        (event evPinPositionChanged)    # Even though the event comes from outside (from `controller $Tooltip`)
                                        # it still needs to be explicitly written in the scope, otherwise an error will be thrown :(
    )
 
    (controller $Instance
        (bind renderer
            "$event.pinPosition == 'left' ? # Или 'right', 'top' и 'bottom'
                        'TooltipBackgroundLeft' : 'TooltipBackgroundRight'"
            init=false (event "evPinPositionChanged")
        )
    )
    ...
```
:::

### Appearance/disappearance and animation

Here we specify the events and animations for which the tooltip appears and disappears. The animation is configured in the same way as in the `$Animation` controller.

::: details
```python
(controller $Tooltip
    ...
    showAnimation={duration: ..., delay: ..., easing: ..., from: {...}, to: {...}}
    hideAnimation={...}     # If `hideAnimation` is not set , the same animation is used
                            # as in `showAnimation` (only reversed). You can animate
                            # all parameters supported by controller `$Animation`.
 
    (bindcall show animation={duration: ..., delay: ..., easing: ..., , from: {...}, to: {...}} on='rollOver')
    # Animation settings in binding (if any) have priority over global ones.
 
    (bindcall hide on='rollOut')    # If `hide` animation is not set , the same one is used as in `bindcall show`.
                                    # If you need to remove `animation` , set `animation={}`.
                                    # You can also subscribe to any (event ... ).
    ...
)
```
:::

### Events

The tooltip controller raises events when the tooltip appears, disappears, or is clicked outside of the tooltip.

::: details
```python
(controller $Tooltip
    ...
    (bind ... on='evStartShow')
    (bind ... on='evShow')
    (bind ... on='evStartHide')
    (bind ... on='evHide')
    (bindcall ... on='evClickOutside')
    ...
)
```
:::

The same events can be sent not only to the tooltip controller, but also to its element `renderer`. For this, events with the same names must be manually defined in the renderer scope; the controller will find them there (in the same way as `evPinPositionChanged` event is written – see above).

### Scroll_bar

#### Scrollbar elements

The scroll bar consists of 4 elements: "track" along which "thumbnail" moves, and buttons to the "left" and "right" of the "track":

::: details
```python
(scroll_bar
    ...
    (btn_decr = 'element name')
    (track = 'element name')
    (thumb = 'element name')
    (btn_incr = 'element name')
    ...
)
```
:::

The "thumb" can be picked up with the mouse and dragged, the buttons can be pressed (shift one "line" to the left or right), the "track" can also be pressed (the "thumb" will move to the point you pressed).

Each of the 4 elements in the simplest case can be just a painted block with a given height and width (but the track and thumb will automatically stretch to the size and range of the scroll area). You can register an automatic change in the style of the element when you hover over it and when you click. To do this, we register four styles:

::: details
```python
(def css SBLeftBtnUpStyle()
    (backgroundImage='url:../battle_hud/central_log/lower_log_bg_left.png')
    (scale9grid = "rect(4, 4, 1, 4)")
    (alpha=0.5)
)
(def css SBLeftBtnHoverStyle()
    (alpha=0.7)
)
(def css SBLeftBtnPressStyle()
    (alpha=1)
)
(def css SBLeftBtnDisabledStyle()
    (alpha=0.2)
)
```
:::

we collect them in `dict`:

::: details
```python
(def constant SB_LEFT_BTN {
    up : 'SBLeftBtnUpStyle',
    over : 'SBLeftBtnHoverStyle',
    down : 'SBLeftBtnPressStyle',
    disabled : 'SBLeftBtnDisabledStyle' }
)
```
:::

and subscribe the element to the event `stateChanged`:

::: details
```python
(def element SBLeftBtn() layout=true
    (style
        (width = 12px)
        (height = 13px)
    )
    (bind class "SB_LEFT_BTN[$event.state]" init=false on='stateChanged')
)
```
:::

and then we slip this element in `scroll_bar`:

::: details
```python
(scroll_bar
    (btn_decr = 'SBLeftBtn')
    ...
```
:::

> [!IMPORTANT]
> Keep in mind that some element should catch mouse events - then it should be filled with some color or image (but its alpha can be set to 0). That is, if you need to make a transparent track - then you still need to specify an opaque fill for it, and then write `alpha=0`.

#### Scrollbar parameters and events

When `scroll_bar` working as part of a set `scrollArea`, you only need to specify orientation, other parameters are set automatically (and it also subscribes to events `scrollArea` itself).  

> [!NOTE]
> By the way, if you set `alignThumbToBorders` parameter in `false` and do not set `btn_decr` and `btn_incr`(set only the track and thumb), you will get a slider.

### ScrollArea

An area that can display larger content and scroll it.

::: details
```python
(scrollArea
    (style
        (width=...)
        (height=...)
        ...
    )
 
    (content
        ... # some blocks here
    )
 
    (horizontalSlider='element name')   # The specified element must contain a `scroll_bar`.
    (verticalSlider='element name')     # The `scroll_bar` parameters will be configured automatically.
                                        # If scroll_bar is not specified -- then scrolling will not work
    (vscrollPolicy = 'on|off|auto')     # will work (even with the wheel); if you need to
                                        # remove the bar, but leave scrolling --
    (hscrollPolicy = 'on|off|auto')     # the element can be made invisible.
 
    (drag=true|false)                   # Whether it is possible to scroll by dragging
    ...                                 # content (default is `true`).
)
```
:::

The scroll area can be moved with the mouse wheel (if you hold down the shift key, then horizontally); but for this `scroll_bar` it still needs to be set, since it is responsible for the scroll parameters and animation speed.

#### Scroll area shadows and animations

You can set four shadows and customize the animation when the shadows appear/disappear and when you hover the mouse over the scroll area:

::: details
```python
(scrollArea
    ...
    (leftShadow='element name')     # You can't touch the alpha on these elements ,because it will be changed by
    (rightShadow='element name')    # animation. If the shadow should be semi-transparent (with alpha
    (topShadow='element name')      # less than 1) -- then you need to make a nested block in the element.
    (bottomShadow='element name')   # The shadow is hidden if the area is scrolled to the end (i.e. if
                                    # you scroll all the way up -- then the top shadow is not displayed).
 
    (activeControlsAlpha=1)         # Transparency of scrollbars and shadows when hovering over the mouse.
    (inactiveControlsAlpha=0.5)     # Transparency when the mouse has left.
    (animationDuration=0.2)         # How long it takes for the transparency to change.
    (animationEasing="Easing.cubic_out")
    ...
)
```
:::

#### Methods for scrolling

::: details
```python
(scrollArea
    (bindcall scrollToBegin animated=true (event "..."))        # By default, `animated=true`.
    (bindcall scrollToEnd animated=false (event "..."))         # If both scrollbars are present, then
                                                                # you can use "hScrollTo.../vScrollTo...".
 
    (bindcall scrollLeft (event "..."))                         # Scrolls by one line (similar to
    (bindcall scrollRight (event "..."))                        # pressing the "left" or "right" button).
    (bindcall scrollUp ...)
    (bindcall scrollDown ...)
 
    (bindcall scrollTo index=... animated=true (event "..."))   # Scrolls to the element with the given index.
    (repeatController='имя контроллера')                        # For this, there must be a controller in `scrollArea`
                                                                # with the corresponding name:
                                                                # "(controller $Repeat name='...')".
...
)
```
:::

#### Dynamic scrolling
If you put controller `$Repeat` in `content`, the controller can create its elements dynamically as `scrollArea` scrolls to them. To do this, the controller needs to be told what sizes its elements have:

::: details
```python
(scrollArea
    ...
    (repeatController='имя контроллера')    # The name of the controller that creates
                                            # elements dynamically.
    (scrollPerItem=false|true)              # Scroll to the border of the element (i.e. do not allow
                                            # scrolling to stop in the middle of the element).
                                            # Defaults to `false`.
 
    (content
        (controller $Repeat renderer='...' name='имя контроллера' count=...
            (itemWidth=...)                 # The default sizes of elements . If the sizes
            (itemHeight=...)                # are not set, then the controller works as a regular
                                            # "static" one , i.e. it creates all its elements at once.
 
            (reuseElements=true|false)      # When scrolling, when an element leaves the visible area,
                                            # it can be moved to the beginning. Works faster than if you
                                            # destroy the "missing" elements and recreate the "appeared" ones.
                                            # Defaults to `true`.
 
            (itemOffset="value|{left:..., right:...}") # On what distance from the border
                                            # of the visible area to start creating elements.
                                            # If gaps are visible during fast scrolling
                                            # (elements do not have time to be created) --
                                            # then the value can be increased.
            ...
        )
    )
)
```
:::
