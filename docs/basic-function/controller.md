# Controller

[[toc]]

`Controller` is an atomic functionality over `target-object`. Allow you to extend the functionality by executing custom logic over the object. 

`Controller` is implemented in `C++`. 

## DO list

| Top level method | Description |
| :--------------: | :---------: |
| controller | Return the style of the current DO for further work |

## Example

```python
(controller $Animation
    (play duration=0.2 to="{
    alpha:(isMouseOver ? 1.0 : 0.0),
    visible:(isMouseOver ? true : false)
    }")
)
```
