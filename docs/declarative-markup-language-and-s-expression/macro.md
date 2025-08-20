# Macro

[[toc]]

A macro is a named parameterized fragment of markup that is substituted into the call location at the parsing stage. Macros are implemented at the AST (Abstract syntax tree) level. 

## Usage

```python
(def macro <macro name> (<declaration argument>*)
    <nested s-expression>+
)
<declaration argument> := <argument name> : <argument type> [ = <default value> ]
```

## Example

```python
(def macro StatusesVehicleTypes(width:number=100%, height:number=100%, renderer:str='VehicleTypeItem', name:str='statusesVehicleTypes')
    (element List "name" "renderer" "width" "height"
        (scope
            (containerFlow = "Flow.HORIZONTAL")
            (listVscrollPolicy = 'off')
            (listHscrollPolicy = 'off')
        )
    )
)
```

You can use a macro by using the key of `macro`. 

```
(macro <macro name> <positional argument value>* <named argument>*)
```

::: details Example
```python
(macro StatusesVehicleTypes 160 height=32)
```
:::

> [!NOTE]
> Although this looks like a normal method call, it is not. Macro substitution occurs at the parsing stage.

Macro definitions can use previously defined macros. Substitution occurs recursively. 

::: details Example
```python
(def macro ComponentStateBase (statesDict:expression)
    (macro ComponentStateBaseScope "statesDict")
    (macro ComponentStateBaseContent)
)
```
:::
