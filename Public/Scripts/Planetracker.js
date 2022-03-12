script.createEvent("SinglePlaneTrackingUpdatedEvent").bind(onSinglePlaneUpdated)
function onSinglePlaneUpdated(eventData) {
    // print(eventData.plane.transform);
    var plane = eventData.plane;
    if (!plane) {
        return;
    }

    var planeWorldMat = plane.transform;
    script.getTransform().setWorldTransform(planeWorldMat);
}
