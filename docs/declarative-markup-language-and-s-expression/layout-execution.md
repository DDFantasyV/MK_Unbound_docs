# Layout Execution

[[toc]]

The engine that performs the layout is maximally abstracted from any specific functionality. It has no knowledge of sprites, scopes, etc.

There is such a thing as a target object. This is the current object on which the actions described by s-expressions are performed. S-expressions differ by type (method, setter, getter) and nothing more (even `definition` at this level will be just a method).

The first execution of the layout occurs after loading the file text into the framework. After parsing the file, we have a list of s-expressions that are contained in the file (usually these are definitions, assignments of global constants). To execute this list of s-expressions, a fake object is created (although in fact these methods do not need it).

Another frequent case of starting the engine to execute a list of s-expressions is the construction of a definition, here an object corresponding to the definition is created and the s-expressions contained in the body of the definition are executed over it.

During the execution of s-expressions, the target object changes. This happens when executing nested s-expressions; for them, the target object will be the object returned by the parent s-expression. If the s-expression did not return anything or did not return an object, then the nested s-expressions will not be executed. Methods and getters can return values (including objects).

## Example

```python
# `def` method does not return anything, so its nested s-expressions will not be executed
# `def` method will save them for further use when constructing the definition
# s-expressions in the body of `CommanderPersonalInfo` definition will be executed on `sprite` object
# when constructing `CommanderPersonalInfo` element
(def element CommanderPersonalInfo (command:str, toggle:bool = false) layout=true
    # target-object - `Sprite`
    # `tf` method will create `TextField` , add it to `display list` of the current `target-object`
    # return created object
    (tf
        # target-object - `TextField`, which the `tf` method returned
        # `style` returns `StylePreset` for `target-object`
        # `style` will have `width` property set to 100
        (style
            (width = 100px)
        )
    )
  
  
    # `mc` method will create an object of `ResearchPageBGFlags` class from `linkage` library
    # add it to `display list` of the current target-object, which is now `Sprite`
    # return created object
    (mc 'ResearchPageBGFlags'
        # target-object - `ResearchPageBGFlags` (inherited from `MovieClip`)
        # method is called with string argument `ussr`
        (gotoAndStop 'ussr')
    )
```
