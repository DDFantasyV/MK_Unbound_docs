# Drag and Drop

[[toc]]

Allow a block containing `controller $Draggable` to move into blocks containing `controller $Droppable`.
- `controller $Draggable` - the current element/block becomes draggable.
- `controller $Droppable` - the current element/block becomes a slot for draggable elements.

## Example

```python
(def element DraggableObj () layout=true
	(scope
		...
	)
	(style ...)
	
	(block
		(style ...)
		
		(controller $Draggable
			(slotId = ...)  # str, number
			# (bind slotId "...")

			(args
				# arguments that will fly to `$Droppable` with `evDragStarted` event
				...
			)

			(dispatch evBitmapCreated	init=false on='evBitmapCreated')    # The element bitmap is generated, the cursor is at a certain distance from the element's capture point
			(dispatch evDragStarted		init=false on='evDragStarted')      # The element is captured and started moving
			(dispatch evDragEnded		init=false on='evDragEnded')        # The element's movement was interrupted/completed
		)
	)

)

(def element DroppableSlot () layout=true
	(scope
		...
		(var draggableData:dict = {})
		(var isDragActive:bool = false)
		(var isDraggingChild:bool = false)
	)
	(style ...)

	(block
		(style ...)

		(controller $Droppable
			(slotIds = [...])   # List of `id` of elements that can be dropped here
			# (bind slotIds "[...]")

			(bind isDraggingChild "$event.dragChildStatus" init=false on='evDragStarted')   # Write to the variable whether the element that is in this slot is moving
			(bind draggableData "$event.args" init=false on='evDragStarted')    # Get the arguments that arrived in `$Droppable` with `evDragStarted` event

			(dispatch evDragStarted		init=false on='evDragStarted')      # The movement of the element matching `slotIds` has begun
			(dispatch evDraggableOver	init=false on='evDraggableOver')    # The element being moved (bitmap) is above the slot
			(dispatch evDraggableOut	init=false on='evDraggableOut')     # The element being moved (bitmap) has left the slot area
			(dispatch evDragFinished	init=false on='evDragFinished')     # The movement is complete, `isSuccess` parameter arrives with the event, whether the element being moved has landed in this slot
		)
	)
)
```
