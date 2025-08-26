# Toplevel Def

[[toc]]

## `(def)` or Definition

The `(def object Name)` construct allows you to declare a global object that is callable from anywhere in the working directory .

> [!IMPORTANT]
> The object name must be unique. It does not matter whether these declarations are made in one or different files. Otherwise, there will be an error and only the first object will be created.

## Example

``` python
(def element TestView())
  
(def element TestView())    # [!code warning]

ERROR: Duplicate element definition: 'TestView' # [!code error]
```