// @input Component.ScriptComponent InstantiatorReference;

function onFocusStart() {
    if (script.InstantiatorReference)
        print("User is focusing on this object.");
    script.InstantiatorReference.api.selectedObject = script.getSceneObject();


    // change material colors on focus
    // var _mmvisual = script.getSceneObject().getComponent("Component.RenderMeshVisual");
    // var mat = _mmvisual.getMaterial(0);
    // mat.mainPass._voroColor1 = new vec4(Math.random(), Math.random(), Math.random(), 1);
    // mat.mainPass._voroColor2 = new vec4(Math.random(), Math.random(), Math.random(), 1);
}

var interactionComponent = script.getSceneObject().getComponent("Component.InteractionComponent");
interactionComponent.onFocusStart.add(onFocusStart);