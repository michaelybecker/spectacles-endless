//editor variables 

//@input Component.Camera camera;
//@input Asset.ObjectPrefab prefab;
//@input float lerpTime;
//@input Asset.Material PrefabMaterial;

// private variables

var isTouching = false;
var forward = false;
var forwardOffset = 0;

// public variable

script.api.selectedObject = undefined;


function onTouchMove(e) {
  if (script.camera) {
    const touchPosition = e.getTouchPosition();
    touchPosition.x > 0.5 ? forward = true : forward = false;
  }
}

function createObjectFromPrefab() {
  if (script.prefab) {
    var instancedObj = script.prefab.instantiate(script.getSceneObject());

    // clone new material and assign to new prefab - otherwise colors are identical for every instance
    var newMat = script.PrefabMaterial.clone();
    var _mv = instancedObj.getComponent("Component.RenderMeshVisual");
    _mv.clearMaterials();
    _mv.addMaterial(newMat);

    // randomize mesh colors
    var _mat = _mv.getMaterial(0);
    _mat.mainPass._voroColor1 = new vec4(Math.random(), Math.random(), Math.random(), 1);
    _mat.mainPass._voroColor2 = new vec4(Math.random(), Math.random(), Math.random(), 1);
    _mat.mainPass._voroScale = (Math.random() * (10 - 2) + 2) * 10;

    return instancedObj;
  }
  else {
    return undefined;
  }
}

function Update() {
  if (isTouching) {
    forwardOffset += forward ? 1 : -1;
    if (script.api.selectedObject) {
      var worldPosition = script.camera.screenSpaceToWorldSpace(new vec2(0.5, 0.5), 100 + forwardOffset * 2);
      var lVec = vec3.lerp(script.api.selectedObject.getTransform().getWorldPosition(), worldPosition, script.lerpTime);
      script.api.selectedObject.getTransform().setWorldPosition(lVec);
    }
  }
}

function onTouchStart(e) {
  if (e.getTouchId() != 0) { // Double Tap
    CreateNewSphere();
  }
  else {
    isTouching = true;
  }
}

function onTouchEnd(e) {
  isTouching = false;
}

function CreateNewSphere() {
  print("creating new sphere");
  script.api.selectedObject = createObjectFromPrefab();
  script.api.selectedObject.getTransform().setWorldPosition(script.camera.getTransform().getWorldPosition());
}

script.createEvent("UpdateEvent").bind(Update);
script.createEvent("TouchMoveEvent").bind(onTouchMove);
script.createEvent("TouchStartEvent").bind(onTouchStart);
script.createEvent("TouchEndEvent").bind(onTouchEnd);