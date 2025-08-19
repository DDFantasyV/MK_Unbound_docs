# Binding

[[toc]]

## General

Bindings are responsible for simple data synchronization (property, method call, event dispatch). There are three synchronization elements:
- property
- method call
- event

To do their job, bindings take a snapshot of the execution data and use that snapshot when evaluating expressions so that all the data that was available at the time the binding was initialized is available in those expressions.

### DO list

| Top level method | Description |
| :--------------: | :---------: |
| scope → object |  |
| bind | Write a value to an object property |
| bindcall | Call a method on an object |
| object → scope |  |
| sync | Synchronize the value of the variable in the scope with the value of the object property |
| dispatch | Synchronize (Dispatched) an event in the scope with an event on the object |

### Property & Method

All bindings have common properties:

| Property name | Description |
| :-----------: | :---------: |
| watch | whether to watch for changes in the value of scope properties that are used in expressions |
| init | whether to perform an action (corresponding to the binding type) when initializing the binding |
| on | the target object event that will trigger the binding |
| enabled | can be used to enable and disable the trigger, can accept expressions like (enabled = "$event.buttonIdx == 1") |

and public method:

| Method name | Description |
| :---------: | :---------: |
| event | Add a custom event as a trigger to the binding |

## Bind

You can synchronize both a variable from the scope and a property of the target object. 

### Usage

```
(bind scopeVar|property "scopeVar|$target|$event.field" [init=false|true] [watch=false|true] [on='scopeEventName|flashEventName|cppEventName']|[(event "scopeEventName")] [(enabled "expression")])
```

> [!NOTE]
> Default: init=true, watch=true

### Example

- To synchronize a variable from a scope, bind must be placed in the scope.
::: details
```python
(scope
    (var count:number = 30)
    (var total:number = 100)
    (var percent:number = 0)
    (bind percent "count / total")
)
```
:::
- To synchronize a property of a target object, bind must be called on the target object whose property we are synchronizing.
::: details
```python
(scope
    (var vehicleType:str = 'vehicleHeavy')
)
(tf
    (bind text "vehicleType")
)
```
:::
In both cases, changing any variable in the expression causes it to be evaluated, and the result is written to the synchronized variable or property. This behavior can be controlled via the `watch=true|false` parameter.

The second way to trigger expression synchronization is to subscribe to an event. There are 2 supported ways to subscribe to an event.

- Pass the event name as a string to the `on` argument. Used to subscribe to flash events or events that are propagated from core c++. If this event has arguments, they can be accessed through the `$event` object. At the time of execution of the expression in bind, all variables must already be known. But the arguments will get into `$event` if the event is propagated. Since there was no event yet, but `$event` is not defined at the start, for this purpose all types of bindings have the `init=true|false` parameter, which allows you to configure the execution of the expression during initialization.
::: details
```python
(tf
    (class GrandTitleTextStyle)
    (text = 'default text')
    (bind text "$event.localX" init=false on='click')
)
```
:::
- Pass event object from scope.
::: details
```python
(scope
    (event onCustomEvent)
)
(tf
    (bind text "$event.localY" (event "onCustomEvent"))
    (dispatch onCustomEvent on='click')
)
```
:::
> [!NOTE]
> You can subscribe to an event of a specific instance of an element in its scope. Then you need to pass event using the on argument. 
::: details Example
```python
(element ButtonPrimary
    (scope
        (bind label "$event.localX+ $event.localY" init=false on='evBtnLeftClickEvent')
    )
)
```
:::
> [!NOTE]
> You can control the execution of synchronization through the nested `enabled` construct , which takes an expression that must evaluate to a Boolean value. In turn, if you need to subscribe a change in `enabled` to an event or expression, you need to use `bind`.
::: details Example
```python
(scope
    # Declare event
    (event changedToogle)
  
    # Declare a boolean variable - condition for disabling/enabling the condition for executing the bind
    (var toogleFlag:bool = true)
    (bind toogleFlag "!toogleFlag" watch=false init=false (event "changedToogle"))
)

# Create a button, upon clicking which will display the mouse coordinate
(element ButtonPrimary
    (scope
        # Subscribe the scope variable label to synchronization upon clicking the button. The subscription execution condition is if toogleFlag is true
        (bind label "'localX: ' + $event.localX" init=false on='evBtnLeftClickEvent' (bind enabled "toogleFlag"))
    )
)

# Create a button, upon clicking which an event will be dispatched that toggles the toogleFlag flag
(element ButtonPrimary
    (scope
        (bind label "'toogleFlag: ' + toogleFlag")
        (dispatch changedToogle on='evBtnLeftClickEvent')
    )
)
```
:::

### Incremental counter by event

| Parameter | Description |
| :-------: | :---------: |
| watch | whether or not to subscribe to the event of changing variables in an expression |
| init | whether to calculate the expression when creating a variable |

::: details Example
```python
(def element TestElement() layout=true
    (scope
        (var counter:number = 100)
        (bind counter "counter-10" watch=false init=false (event "evMouseClick"))
        # with watch = false calculation by event is possible
    )
    (style (backgroundColor = 0xFF00FF00) (width = 200) (height = 100) )
    (macro trace "counter")
)
```
:::

## Bindcall

Used to call a method on a target object based on conditions (event, argument change).

### Usage

```
(bindcall functionName "scopeVar|$target"* [init=false|true] [watch=false|true] [on='scopeEventName|flashEventName|cppEventName']|[(event "scopeEventName")] [(enabled "expression")])
```
> [!NOTE]
> Default: init=false, watch=true

### Example
```python
(mc 'CloseBtnCrossAnim'
    (bindcall gotoAndPlay "stateFrame")
)
```

Thus, when the stateFrame variable changes, the gotoAndPlay method will be called. 

::: details Another example of calling methods on controllers
```python
(controller $Animation
    (bindcall play duration=0.2 from={alpha:0} to={alpha:0.5} (event "evBtnOverEvent") (bind enabled "_isPressed"))
)
```
:::

The behavior of the `event`, `enabled` parameters is the same as that of the `bind` construct.

## Dispatch

Broadcasting an event on an event that is generated by scaleform or core c++ unbound. Before broadcasting an event, it must be declared in scope.

### Usage

```python
(dispatch scopeEventName delay=0.1 on='flashEventName|scopeEventName|cppEventName'|[(event "scopeEventName")] [args="{key1: value1, ...}"] [dir=0|1|2] [(enabled "expression")])
```

> [!NOTE]
> Default: dir = 0

### Example
```python
(scope
    (event onClick)
)
(dispatch onClick on='click')
```

### Passing arguments

When sending an event, you can pass arguments. Arguments are passed as `dict`. By default, if `args` parameter is not specified, all properties of the original event (the event that acts as a trigger) are passed to the sent event.

::: details Example
```python
(scope
    (event onClick)
) 
(element ButtonPrimary
    (dispatch onClick on='click')
)
(trace "$event" init=false (event "onClick"))
```
:::

::: details Result in `ub_player_errors.log`
```python
UBTRACE: {altKey:false,bubbles:true,buttonDown:false,buttonIdx:0,cancelable:false,clickCount:0,commandKey:false,controlKey:false,ctrlKey:false,currentTarget:'FЧ',delta:0,eventPhase:2,localX:41,localY:18,mouseIdx:0,nestingIdx:0,relatedObject:[null],shiftKey:false,stageX:41,stageY:18,target:'FЧ',type:click}
```
:::

If you pass arguments, the properties of the original event are not passed.

### Delay in sending an event

To solve the issue of delayed event sending, you need to add the `delay` parameter.

::: details Example
```python
(scope
    (event onClick)
    (var argument:number = 100)
)
(element ButtonPrimary
    (dispatch onClick delay=0.15 args="{param: argument}" on='click')
)
 
(macro eventChecker "onClick")
(trace "$event" init=false (event "onClick"))
```
:::

::: details Result in `ub_player_errors.log`
```python
UBTRACE: {param:100}
```
:::

### Direction of event propagation

The direction of event propagation can be controlled by the dir parameter. Three values are supported:
- 0 - event propagates inside element. By default dir=0.
- 1 - event propagates from child to parent.

::: details
```python
(def element TestView() layout = true  
    (scope
       (event onClick)
    )
  
    (element ChildElement)
  
    (tf
        (class HeroTitleYellowTextStyle)
        (text = 'default text')
        (bind text "$event.key" init=false (event "onClick"))
    )
)
  
(def element ChildElement() layout=true
    (scope
        (event onClick)
    )
    (element ButtonPrimary
        (dispatch onClick args={key: 100} dir=1 on='click')
    )
)
```
:::

> [!NOTE]
> It is important to remember that before an event can be used, it must be declared in the scope. Even though the event is already declared in the scope definition of the ChildElement element, it must also be declared in the TestView.
- 2 - event propagates from parent to child.

### Separation of events

In the examples given, the nested element propagates the event and there was only one instance on the stage in the parent. But there are often cases when several identical elements are at the same nesting level. Then it will be difficult to distinguish from whom exactly the event came.

::: details Example
```python
(def element TestView() layout = true  
    (scope
       (event onClick)
    )
  
    (element ChildElement id=0)
    (element ChildElement id=1)
    (element ChildElement id=2)
    (element ChildElement id=3)
  
    (tf
        (class HeroTitleYellowTextStyle)
        (text = 'default text')
        (bind text "'click button id=' + $event.buttonId" init=false (event "onClick"))
    )
)
  
(def element ChildElement(id:number) layout=true
    (scope
        (event onClick)
    )
    (element ButtonPrimary
        (scope
            (label = "'button_' + id")
        )
        (dispatch onClick args="{buttonId: id}" dir=1 on='click')
    )
)
```
:::

There are 4 ChildElement instances on the stage, and each of them broadcasts an onClick event. The text block will catch events from each element. Of course, you can check the button id in the bind expression. But you can also re-patch events from the scope of the nested element to a unique event of the parent.

::: details Example
```python
(def element TestView() layout = true  
    (scope
       (event onClickChild1)
    )
  
    (element ChildElement id=0
        (scope
            (dispatch onClickChild1 on='onClick')
        )
    )
    (element ChildElement id=1)
    (element ChildElement id=2)
    (element ChildElement id=3)
  
    (tf
        (class HeroTitleYellowTextStyle)
        (text = 'default text')
        (bind text "'click button id=' + $event.buttonId" init=false (event "onClickChild1"))
    )
)
  
(def element ChildElement(id:number) layout=true
    (scope
        (event onClick)
    )
    (element ButtonPrimary
        (scope
            (label = "'button_' + id")
        )
        (dispatch onClick args="{buttonId: id}" dir=1 on='click')
    )
)
```
:::

That is, the onClickChild1 event is synchronized with the onClick event only for the button with id=0, so the text field of the text block will be updated only when you click on this button.

### Dispatch when enabled=true

The event does not fire when enabled is switched to true, but continues to fire when trigger is switched to true.

::: details Example
```python
(def element MainTestElement() layout=true
    (scope
        (event evMouseClick)
        (event evTestEvent)
        (event evTestTriggerEvent)
  
        (var count:number = "0")
        (bind count "count+1" watch=false init=false (event "evMouseClick"))
  
        (var testCount:number = "count" watch=false init=false (event "evTestEvent"))
        (var testTriggerCount:number = "count" watch=false init=false (event "evTestTriggerEvent"))
    )
    (style
        (width = 500px)
        (height = 300px)
        (backgroundColor = 0x88FF00FF)
    )
  
    (dispatch evMouseClick on='click')
  
    (dispatch evTestEvent (bind enabled "count%2 == 0" )) # не будет срабатывать
    (dispatch evTestTriggerEvent (bind trigger "count" )) # будет срабатывать
  
    (macro trace "'count: ' + count")
    (macro trace "'must always be zero:' + testCount")
    (macro trace "'must be triggered:' + testTriggerCount")
)
```
:::

### Dispatch property change event

A side effect of the changes to dispatch is that the expression change event is now monitored.

::: details Example
```python
(dispatch evUpdateMouse (bind enabled "isActive") (bind trigger "isActive"))
```
:::
With this order of bindings, enabled will be recalculated first and the event will only fire when isActive=true.
