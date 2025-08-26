# Datahub

[[toc]]

`Datahub` is a medium for transferring data from `Game Logic` to `Unbound`.

## $datahub object

`$datahub` object is the entry point for using datahub in markup. To access `datahub` in `*.unbound`, use `$datahub` keyword inside an `eval-statement`:

```python
(scope)
    (var myEntity:cpp = "$datahub.getEntity(123)")
(scope)
```

## Entity object

`Entities` are stored in `Collections` and can also be retrieved by ID from `$datahub` object. You can access the components of an object with `.dot` syntax, i.e.:

```python
(scope
    (var myEntity:cpp = "$datahub.getEntity(123)")
    (var goodComponent:cpp = "myEntity.goodComponent")
)
```

## Component object

Components are objects that contain real data. You can access the properties of a component using `.dot` syntax, that is:

```python
(scope
    (var myEntity:cpp = "$datahub.getEntity(123)")
    (var goodComponent:cpp = "myEntity.goodComponent")
    (var propertyOfGoodComponent:int = "goodComponent.someProperty")
)
```
