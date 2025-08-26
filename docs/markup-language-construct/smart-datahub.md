# Smart Datahub

[[toc]]

Represented in `UB2` by the following data types: `dh`, `dhEntity`, `dhComponent` and `dhCollection`. Provide the ability to automatically subscribe to events and fine-tune interaction with them.

## Automatic subscription

One of the main features of `Smart Datahub` is the ability to automatically subscribe to common events, such as `collection.evChildAdded` and `collection.evChildRemoved`, for example.

> [!IMPORTANT]
> By default it is ON! Don't forget to turn it off in places where it is not needed.

To disable automatic subscription, simply specify `autoUpdate=false` in the binding (similar to `(watch=true)` or `(init=true)`). Then no subscriptions will be created and the binding will only work with events specified manually.

### Example

```python
(scope
    (var myEntity:dhComponent= "getSingleComponent(CC.testComponent)" autoUpdate=false)
)
```

## Data types

### Entity object

`Entities` are stored in `Collections` and can also be retrieved by ID from a datahub object. In `Smart datahub`, entities are of type `dhEntity`. You can access the components of an object with the `.dot` syntax , i.e.:

```python
(var myAutoEntity:dhEntity = "getPrimaryEntity(CC.test, 'id')")
(var myComponent:dhComponent = "myAutoEntity.test")
```

Entities have two events:
- `evAdded` - called when a component is added to an entity. Automatic subscription by variables.
- `evRemoved` - called when a component is removed from an entity. Automatic subscription by variables.

::: details Example
```python
(var waveHitDanger:dhComponent = "entity.waveHitDanger" autoUpdate=false (event "entity.evAdded"))
(var diplomacyRelationComponent:dhComponent = "entity.diplomacyRelation" autoUpdate=false (event "entity.evAdded") (event "entity.evRemoved"))
```
:::

### Collection object

A collection is a set of entities that share a common component. Collections and components are very similar, but a collection contains only entities and does not contain any properties.

In `Smart datahub`, collections are of type `dhCollection`.

#### Usage

- getCollection()
    ```python
    getCollection(CC.someComponentName)
    ```
    Return a collection of entities containing the specified component.
    ::: details Example
    ```python
    (var markersCollection:dhCollection = "$datahub.getCollection(CC.worldMarker)")
    ```
    :::

- getChildByPath()
    ```python
    getChildByPath('collectionName')
    ```
    Provide access to subcollections by their names.
    ::: details Example
    ```python
    (var visibleDangers:dhCollection = "getCollection(CC.visibleDanger)")
    (var searchPointCol:dhCollection = "visibleDangers.getChildByPath('submarineSearchPoints')")
    ```
    :::

- firstEntity()
    ```python
    firstEntity()
    ```
    Allow you to get the first entity that includes the specified component (suitable for use if there is only one element in collection `(getSingleEntity)`, or if you need to take any element)
    ::: details Example
    ```python
    (var visibleDangers:dhCollection = "getCollection(CC.visibleDanger)")
    (var firstVisibleDanger:dhEntity = "visibleDangers.firstEntity()")
    ```
    :::

#### Events

- evAdded
    Called when an object is added to the collection. Automatic subscription by variables.
    ```python
    (var diplomacyRelationCollection:dhCollection = "getCollection(CC.diplomacyRelation)")
    (var diplomacyRelationComponent:dhComponent = "entity.diplomacyRelationComponent" autoUpdate=false (event "diplomacyRelationCollection.evAdded"))
    ```

- evRemoved
    Called when an object is removed from the collection. Automatic subscription to variables.
    ```python
    (var diplomacyRelationCollection:dhCollection = "getCollection(CC.diplomacyRelation)")
    (var diplomacyRelationComponent:dhComponent = "entity.diplomacyRelation" autoUpdate=false (event "diplomacyRelationCollection.evAdded") (event "diplomacyRelationCollection.evRemoved"))
    ```

- evUpdated
    A sorted collection is a type of collection whose components are organized in a specific order. In all other respects, it is a regular collection. Called when the sorting is updated. Automatic subscription to variables.
    ```python
    (var itemsList:array = "col.items" autoUpdate=false (event "col.evUpdated"))
    ```

- evChildAdded
    Called when a child collection is added.
    ```python
    (var realPlayersCollection:dhCollection = "collection.getChildByPath('realPlayers')"  autoUpdate=false(event "collection.evChildAdded") (event "collection.evChildRemoved"))
    ```

- evChildRemoved
    Called when a child collection is removed.
    ```python
    (var allyCollection:dhCollection = "collection ? collection.getChildByPath('team.ally.alive') : null"  autoUpdate=false(event "collection.evChildAdded") (event "collection.evChildRemoved"))
    ```

List of events that methods are automatically subscribed to:

::: details
| Method | Return Type | Description | Subscription to events when `autoUpdate="true"` |
| :----: | :---------: | :---------: | :----------------------------------------------: |
| collection[index] | dhEntity | Get entity by index | baseCollection.evAdded (for all except sorting)<br>baseCollection.evRemoved (for all except sorting)<br>baseCollection.evUpdated (for sorting) |
| collection.length | Number | Get collection size | baseCollection.evAdded (for all except sorting)<br>baseCollection.evRemoved (for all except sorting)<br>baseCollection.evUpdated (for sorting) |
| collection.items | Array[GFX] | Get an array of elements from a collection.<br>Deprecated! The method is still available, but there are plans to remove it! |  |
| getEntityByKey | dhEntity | Get an entity from a collection by primary key | baseCollection.evAdded (for all except sorting)<br>baseCollection.evRemoved (for all except sorting)<br>baseCollection.evUpdated (for sorting) |
| getEntityAtIndex | dhEntity | Get entity by index | baseCollection.evAdded (for all except sorting)<br>baseCollection.evRemoved (for all except sorting)<br>baseCollection.evUpdated (for sorting) |
| child | dhCollection | Get child collection by `id` | If the subcollection does not yet exist:<br>baseCollection.evСhildAdded<br>If the subcollection already exists:<br>baseCollection.evСhildRemoved |
| getChildByPath | dhCollection | Get child collection by path | If the subcollection does not yet exist:<br>baseCollection.evСhildAdded<br>If the subcollection already exists:<br>baseCollection.evСhildRemoved |
| hasChildByPath | dhCollection | Check for child collection on path | If the subcollection does not yet exist:<br>baseCollection.evСhildAdded<br>If the subcollection already exists:<br>baseCollection.evСhildRemoved |
| getFullPath | String | Get the full path to a collection |  |
:::

### Component object

Components are objects that contain the actual data. You can access the properties of a component using the `.dot` syntax:

```python
(var myEntity:dhEntity = "getEntity(123)")
(var goodComponent:dhComponent = "myEntity.goodComponent")
(var propertyOfGoodComponent:int = "goodComponent.someProperty")
```

Any arithmetic operation involving `null` will return `null` result.

```python
# Let's consider a situation when an element exists, but some entity or component does not.
(scope
    # Here, `ownCarrierComponent` will be set to `Null` if we are not on an aircraft carrier or a hybrid with an air group
    (var ownCarrierComponent:dhComponent = "getSingleComponent(CC.aircarrier)")

    # Even if `ownCarrierComponent` is `Null`, then the expression `ownCarrierComponent.activeSquadron` will also return `Null`
    # Also, instead of a full ternary, you can use a shortened form
    (var activeSquadron:number = "ownCarrierComponent.activeSquadron ?: ActiveSquadron.NONE" (event "ownCarrierComponent.evStateChanged"))
```
