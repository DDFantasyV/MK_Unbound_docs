# Declarative Markup Language and S-Expression

[[toc]]

The layout consists of S-expressions. There are 4 types of S-expressions, each of which is intended for a specific action.

## Call method

### Usage

```python
(<method name> <positional argument value>* <named argument>*
    <nested s-expression>+
)
<named argument> := <argument name> = <argument value>
```
### Example

```
(bind isEnabled "$event.enabled" init=false
    (event "isEnableChanged")
)
```

> [!NOTE]
> `bind` - `<method name>`
>
> `isEnabled`, `"$event.enabled"` - `<positional argument value>*`
>
> `init=false` - `<named argument>*`
>
> `(event "isEnableChanged")` - `nested s-expression+`

## Add definition

### Usage

```python
(def <definition type> <difinition name> (<declaration argument>*) <named argument>*
    <nested s-expression>+
)
<declaration argument> := <argument name> : <argument type> [ = <default value> ]
<named argument> := <argument name> = <argument value>
```

In essence, it is a special case of a method s-expression and was introduced only for the sake of special syntax for parameter declaration.

### Example

```python
(def element TestView(name:str = '', count:number) layout=true
    (block      
    )
)
```

## Set property value

### Usage

```python
(<property name> = <property value>)
```

### Example

```python
(style
    (width = 100px)
)
  
(tf
    (text = 'Hello world!')
)
```

## Get property value

### Usage

```python
(.<property name>
    <nested s-expression>+
)
```

### Example

```python
(.graphics
    (lineStyle 1 0xffffdc84 1)
    (beginFill "0xff414141" "0")
    (drawRect 0 0 450 64)
    (endFill)
)
```

## Example

All markup is built on these 4 types of expressions.

```python
# definition
(def element CommanderPersonalInfo(name:str = '') layout=true
    (mc 'ResearchPageBGFlags'
        # set property
        (name = 'flags')
  
  
        # call method with argument
        (gotoAndStop "nation")
    )
  
    (block
        # get property
        (.graphics
            # nested s-expressions
            (beginFill "0xFF0000" "1")
            (drawCircle 40 40 10)
            (endFill)
        )
    )
)
```
