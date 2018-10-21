const maxNodes = 200;
const dpi = 113.5;
const dotsPerCentimeter = dpi / 2.54;
const pixelsPerMeter = 10;
const gravityFactor = 9.81;
const precision = 3;
const fps = 60;
const boxes = [];
let gravity;
let world;
let bd_ground;
let ground;
let groundShape;
let box2d;
let documentWidth;
let documentHeight;
let stopped = false;

Box2D().then(function (b) {
  box2d = b;
  gravity = new box2d.b2Vec2(0.0, -gravityFactor);
  world = new box2d.b2World(gravity);
  bd_ground = new box2d.b2BodyDef();
  ground = world.CreateBody(bd_ground);
  groundShape = new box2d.b2EdgeShape();
});

function triggerFall() {
  if (typeof gravity === 'undefined' || typeof box2d === 'undefined') {
    return;
  }
  documentWidth = window.innerWidth;
  documentHeight = window.innerHeight;
  groundShape.Set(new box2d.b2Vec2(0.0, 0.0), new box2d.b2Vec2(documentWidth / pixelsPerMeter, 0.0));
  ground.CreateFixture(groundShape, 0.0);
  getNNodes({maxNodes}).map(function (el) {
    // CSS transform properties don't seem to have effect on inline elements,
    // so we replace `inline` by `inline-block`.
    const computedStyle = window.getComputedStyle(el)
    const displayProp = computedStyle.getPropertyValue('display')
    if (displayProp === 'inline') {
      el.style.display = 'inline-block'
    }
    // Also, hard-code the width and height to avoid surprises...
    el.style.width = computedStyle.getPropertyValue('width');
    el.style.height = computedStyle.getPropertyValue('height');
    const box = el.getBoundingClientRect();
    const left = box.left;
    const top = box.top;
    const width = box.width;
    const height = box.height;
    if (width === 0 || height === 0) {
      return;
    }
    const originalCenter = {
      x: left + width / 2,
      y: top + height / 2
    };
    const shape = new box2d.b2PolygonShape();
    shape.SetAsBox((width / 2) / pixelsPerMeter, (height / 2) / pixelsPerMeter);
    const bodyDefinition = new box2d.b2BodyDef();
    bodyDefinition.set_type(box2d.b2_dynamicBody);
    bodyDefinition.set_position(
      new box2d.b2Vec2(
        originalCenter.x / pixelsPerMeter,
        (documentHeight - originalCenter.y) / pixelsPerMeter
      )
    );
    const body = world.CreateBody(bodyDefinition);
    body.CreateFixture(shape, 5.0);
    boxes.push({
      originalCenter,
      domElement: el,
      body: body
    });
  });
  let previous = undefined;

  function step(timestamp) {
    if (!previous) previous = timestamp;
    const progress = timestamp - previous;
    previous = timestamp;
    world.Step(progress / 1000, precision, precision);
    let x, y, position, angle;
    for (const box of boxes) {
      position = box.body.GetPosition();
      angle = -box.body.GetAngle();
      x = position.get_x() * pixelsPerMeter - box.originalCenter.x;
      y = documentHeight - position.get_y() * pixelsPerMeter - box.originalCenter.y;
      box.domElement.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad)';
    }
    if (!stopped) requestAnimationFrame(step);
  }
  // Disable scrolling
  document.body.style.transform = 'translateY(-' + window.scrollY + 'px)';
  document.body.style.overflow = 'hidden';
  window.scroll(0, 0);
  window.requestAnimationFrame(step);
}

// Get tree nodes going as deep as possible in the tree before surpassing a certain limit in the number of nodes
function getNNodes({ nodes = [document.body], maxNodes = 10 }) {
  let newNodes = [];
  let someHasChildren = false;
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
      continue;
    }
    const box = node.getBoundingClientRect();
    if (box.top - window.scrollY > documentHeight || box.right - window.scrollX > documentWidth) {
      continue;
    }
    if (node.childElementCount && !(hasOwnText(node))) {
      // Keep walking through the node's children
      someHasChildren = node.childElementCount;
      [].slice.call(node.children).map((child) => {
        newNodes.push(child);
      })
    } else {
      // Just add the node
      node.classList.add('with-mass')
      newNodes.push(node);
    }
  }
  if (someHasChildren && nodes.length < maxNodes) {
    return getNNodes({ nodes: newNodes, maxNodes })
  } else {
    // The new result surpasses the limit. Return the previous one.
    return newNodes;
  }
}

function hasOwnText(node) {
  const text = getOwnText(node)
  return text.trim() !== ''
}

function getOwnText(node) {
  // Get the immediately contained text in a node, ignoring the children nodes.
  // By web developer Visa Kopu:
  // https://medium.com/@roxeteer/javascript-one-liner-to-get-elements-text-content-without-its-child-nodes-8e59269d1e71
  return [].reduce.call(node.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '')
}

function stop() {
  stopped = true
}

document.addEventListener('keyup', (event) => {
  document.body.classList.add('with-gravity')
  switch (event.key) {
    case 'Escape':
      stop()
      break
    case 'g':
      triggerFall()
  }
});
