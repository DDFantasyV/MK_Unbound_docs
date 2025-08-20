# Element

[[toc]]

Top-level object. Has its own name, can be called (including from outside the document in which it is located) and reused (using `Controllers` or direct declaration) . Has its own separate `scope`, into which it can accept values sent from outside. An element can be of 2 types: participate in `layout` (have styles) and do not participate.

## Example

This is regulated by the `layout=true` property or by using `def layout` alias:

```python
(def element PlaneMarker() layout=true
    # Direct call
    (element PlaneIcon)
)
  
# or
  
#(def layout PlaneMarker()
#    (element PlaneIcon)
#)
  
(def element PlaneIcon()
    (symbol "(isConsumable ? 'catapult': 'fighter') + '_c'"
        (scaleX = 1)
        (scaleY = 1)
    )  
)
(block
     (element DangerItemContainer "dangersCollectionPath")
)
```
