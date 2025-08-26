# Scope

[[toc]]

`Scope` is a storage of data and events available in the body of an element definition. Only `Element` can have a `Scope`, other DOs can only work with `scope` of the parent `Element`.

> [!WARNING]
> All variables and events used in `element` body must be declared in `scope`. 

> [!CAUTION]
> Attempting to access a non-existent property or event causes an error:
> 
> access of undefined scope event 'nameEvent'

## DO list

| Top level method | Description |
| :--------------: | :---------: |
| scope | Return the scope of the element for further work |

## Usage

```python
(scope
    (var lvlVal:str = '')
    (var title:str = '')
    (var cost:str = '')
    (var text:str = '')
    (var lvlTextColor:number = 0xffcac8c1)
    (var imageUrl:str = '')
)
```
