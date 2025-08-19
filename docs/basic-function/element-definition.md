# Element Definition

[[toc]]

The top-level DO of the layout is element. Element is a named parameterized fragment of the layout based on a sprite. Element can have a Scope, which contains data available in the element body. Working with an element is divided into 2 stages: definition and create instance. The def method is used to define an element.

## Usage

```python
(def element CommanderPersonalInfo() layout=true
)
```

## Example
::: details Creating an instance

```python
(element CommanderPersonalInfo
)
```
