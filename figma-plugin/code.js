figma.showUI(__html__, { width: 440, height: 540 });
var FAMILY = 'Inter';
function styleFor(w, it) {
  var s = w >= 800 ? 'Extra Bold' : w >= 700 ? 'Bold' : w >= 600 ? 'Semi Bold' : w >= 500 ? 'Medium' : 'Regular';
  return it ? (s === 'Regular' ? 'Italic' : s + ' Italic') : s;
}
var loaded = {};
async function font(style) {
  if (loaded[style]) return style;
  try { await figma.loadFontAsync({ family: FAMILY, style: style }); loaded[style] = 1; return style; }
  catch (e) { if (style !== 'Regular') return font(style.indexOf('Italic') >= 0 ? 'Italic' : 'Regular'); throw e; }
}
function paint(c) { return { type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: c.a }; }
function imgPaint(src, fit) {
  var img = figma.createImage(figma.base64Decode(src.slice(src.indexOf(',') + 1)));
  return { type: 'IMAGE', imageHash: img.hash, scaleMode: fit || 'FILL' };
}
function gradPaint(g) { // shortcut: chi ho tro 3 huong; neu huong sai khi xem thi doi ma tran
  var T = g.dir === 'right' ? [[1, 0, 0], [0, 1, 0]] : g.dir === 'diag' ? [[0.5, 0.5, 0], [-0.5, 0.5, 0.5]] : [[0, 1, 0], [-1, 0, 1]];
  var n = g.stops.length;
  return { type: 'GRADIENT_LINEAR', gradientTransform: T,
    gradientStops: g.stops.map(function (c, i) { return { position: n > 1 ? i / (n - 1) : 0, color: { r: c.r, g: c.g, b: c.b, a: c.a } }; }) };
}
function setRadius(n, r) { if (!r) return; n.topLeftRadius = r[0]; n.topRightRadius = r[1]; n.bottomRightRadius = r[2]; n.bottomLeftRadius = r[3]; }
async function make(n) {
  var node = null;
  if (n.t === 'box' || n.t === 'img') {
    node = figma.createRectangle(); node.resize(Math.max(n.w, 0.01), Math.max(n.h, 0.01));
    node.fills = n.t === 'img' ? [imgPaint(n.src, n.fit)] :
      n.fills.map(function (f) { return f.k === 'solid' ? paint(f.c) : f.k === 'grad' ? gradPaint(f.g) : imgPaint(f.src, f.fit); });
    setRadius(node, n.radius);
    if (n.border) {
      var b = n.border, first = b.filter(Boolean)[0];
      node.strokes = [paint(first.c)]; node.strokeAlign = 'INSIDE';
      node.strokeTopWeight = b[0] ? b[0].w : 0; node.strokeRightWeight = b[1] ? b[1].w : 0;
      node.strokeBottomWeight = b[2] ? b[2].w : 0; node.strokeLeftWeight = b[3] ? b[3].w : 0;
    }
    if (n.shadow) {
      var s = n.shadow;
      node.effects = [{ type: 'DROP_SHADOW', color: { r: s.c.r, g: s.c.g, b: s.c.b, a: s.c.a }, offset: { x: s.x, y: s.y },
        radius: s.blur, spread: s.spread, visible: true, blendMode: 'NORMAL' }];
    }
  } else if (n.t === 'svg') {
    try { node = figma.createNodeFromSvg(n.svg); } catch (e) { return null; }
  } else if (n.t === 'text') {
    var st = await font(styleFor(n.weight, n.italic));
    node = figma.createText(); node.fontName = { family: FAMILY, style: st };
    node.characters = n.s; node.fontSize = Math.max(1, n.size);
    if (n.c) node.fills = [paint(n.c)];
    if (n.lh) node.lineHeight = { unit: 'PIXELS', value: n.lh };
    if (n.ls) node.letterSpacing = { unit: 'PIXELS', value: n.ls };
    if (n.u) node.textDecoration = 'UNDERLINE'; else if (n.strike) node.textDecoration = 'STRIKETHROUGH';
    if (n.lines > 1) {
      node.textAutoResize = 'HEIGHT'; node.resize(Math.max(n.w + 1, 1), Math.max(n.h, 1));
      node.textAlignHorizontal = ({ center: 'CENTER', right: 'RIGHT', end: 'RIGHT', justify: 'JUSTIFIED' })[n.align] || 'LEFT';
    } else node.textAutoResize = 'WIDTH_AND_HEIGHT';
  }
  if (!node) return null;
  node.name = n.name || n.t; if (n.o < 1) node.opacity = n.o;
  return node;
}
async function build(screens) {
  await font('Regular');
  figma.currentPage.children.slice().forEach(function (n) { if (n.getPluginData('h2f') === '1') n.remove(); });
  var frames = {}, hot = [], x = 0, all = [];
  for (var i = 0; i < screens.length; i++) {
    var s = screens[i];
    var f = figma.createFrame(); f.name = s.name; f.resize(s.width, s.height); f.x = x; f.y = 0; x += s.width + 120;
    f.clipsContent = true; f.setPluginData('h2f', '1'); f.fills = [paint(s.bg || { r: 1, g: 1, b: 1, a: 1 })];
    f.exportSettings = [{ format: 'PNG', suffix: '', constraint: { type: 'SCALE', value: 2 } }];
    for (var j = 0; j < s.nodes.length; j++) {
      var n = s.nodes[j], node = await make(n);
      if (node) { f.appendChild(node); node.x = n.x; node.y = n.y; }
    }
    s.links.forEach(function (l) {
      if (l.to === s.id) return;
      var h = figma.createRectangle(); h.name = 'Hotspot → ' + l.to; h.resize(Math.max(l.w, 1), Math.max(l.h, 1));
      h.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
      f.appendChild(h); h.x = l.x; h.y = l.y; hot.push({ node: h, to: l.to });
    });
    frames[s.id] = f; all.push(f);
  }
  for (var k = 0; k < hot.length; k++) {
    var d = frames[hot[k].to]; if (!d) { hot[k].node.remove(); continue; }
    await hot[k].node.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: d.id,
      navigation: 'NAVIGATE', transition: { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.25 }, preserveScrollPosition: false }] }]);
  }
  figma.currentPage.flowStartingPoints = [{ nodeId: all[0].id, name: 'Demo – ' + screens[0].name }];
  figma.viewport.scrollAndZoomIntoView(all);
  return all.length;
}
figma.ui.onmessage = async function (m) {
  if (m.type === 'build') {
    try { var c = await build(m.screens); figma.ui.postMessage({ type: 'done', count: c }); figma.notify('Đã tạo ' + c + ' màn hình'); }
    catch (e) { figma.ui.postMessage({ type: 'error', message: String(e && e.stack || e) }); }
  }
  if (m.type === 'close') figma.closePlugin();
};
