# Computed Expression

Expressions are intended for simple data processing, forming the value of properties or method call parameters. Expressions can use `variables` and `events` declared in scope, as well as numeric, string, logical literals and use operators.

::: code-group
```python [Example 1]
(tf
    (text = "' ' + tankmanName + ' — '")
)
```

```python [Example 2]
(mc forsage_progress_bar
	(style (position  = "absolute"))
	...
)
```
:::

Such expressions will be evaluated during layout execution, directly when calling methods. The expression can be used both for calling a method, as an example `gotoAndStop`, and for calling `s-expression`:

```python
(def element AircraftForsage(activeSquadron:number) layout=true
	(scope
		(event evForsageFinishedAnimate)
	...
    )
)
```

> [!IMPORTANT]
> It is important to understand that these expressions will be calculated once and no one will monitor the data update; to monitor the data update, you need to use the binding mechanism.

Since `action script` syntax is taken as a basis, the corresponding operators can be used in expressions.

::: code-group
```[+, -, /, *, %]
(text = "2 + 4")
(text = "name + 'HorScrlBar'")
```

```[==, >, <, >=, <=, !=]
(text = "keyCode == 13")
```

```[&&, !, ||, &, ~, |]
(text = "isFocused && keyCode == 13")
```

```[>>, <<]
(width = "400 >> 1")
```

```[Dict]
(scope
    (var testDict:dict = "{
        'up' : 'bitmap:button_black_bg',
        'hover' : 'bitmap:button_black_bg_hover',
        'down' : 'bitmap:button_black_press'
    }")
)
(text = "testDict['up']")
```

```[num/num]
(text = "(count1 + count2) + '/' + (total1 + total2)")
```

```[?, :]
(bind class "currStateClass ? currStateClass.style ? currStateClass.style : [] : []")
```

```[str/str]
(text = "(str)count + '/' + (str)total")
```
:::

You can also call functions in expressions.

```python
(bind text "toUpper('Skorpion G')")
```
