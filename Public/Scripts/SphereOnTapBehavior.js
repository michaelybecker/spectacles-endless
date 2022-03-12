//@input Component.InteractionComponent interactionComponent

// Subscribe to the onTap event
var onTapEvent = script.interactionComponent.onTap.add(function (tapEventArgs) {
    print("onTap!");
});

// Unsubscribe from the onTap event
script.interactionComponent.onTap.remove(onTapEvent);