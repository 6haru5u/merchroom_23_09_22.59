"""Convert the four SVG diagrams to editable native Excalidraw elements."""
import json
import re
import uuid
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent
COLORS = {'url(#purple)': '#7653df', 'url(#orange)': '#ff7046', 'url(#lime)': '#d8ff3e'}


def color(value):
    return COLORS.get(value, value if value != 'none' else 'transparent')


def base(kind, x, y, w, h, attrs):
    return dict(id=uuid.uuid4().hex, type=kind, x=x, y=y, width=w, height=h,
                angle=0, strokeColor=color(attrs.get('stroke', 'none')),
                backgroundColor=color(attrs.get('fill', 'none')), fillStyle='solid',
                strokeWidth=float(attrs.get('stroke-width', 1)),
                strokeStyle='dashed' if 'stroke-dasharray' in attrs else 'solid',
                roughness=0, opacity=round(float(attrs.get('opacity', 1))*100),
                groupIds=[], frameId=None, roundness=None, seed=123456,
                version=1, versionNonce=1, isDeleted=False, boundElements=None,
                updated=1, link=None, locked=False)


def points(data):
    tokens = re.findall(r'[MLQHVZ]|-?\d+(?:\.\d+)?', data)
    result = []
    i = 0
    while i < len(tokens):
        cmd = tokens[i]
        i += 1
        if cmd in ('M', 'L'):
            result.append([float(tokens[i]), float(tokens[i+1])]); i += 2
        elif cmd == 'H':
            result.append([float(tokens[i]), result[-1][1]]); i += 1
        elif cmd == 'V':
            result.append([result[-1][0], float(tokens[i])]); i += 1
        elif cmd == 'Q':
            start = result[-1]
            control = [float(tokens[i]), float(tokens[i+1])]
            end = [float(tokens[i+2]), float(tokens[i+3])]; i += 4
            for step in range(1, 9):
                t = step / 8
                result.append([(1-t)**2*start[j]+2*(1-t)*t*control[j]+t*t*end[j] for j in (0, 1)])
        elif cmd == 'Z':
            result.append(result[0][:])
        else:
            raise ValueError(f'Unsupported SVG path command: {cmd}')
    return result


def convert(source):
    svg = source.read_text(encoding='utf-8')
    svg = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-fA-F]+;)', '&amp;', svg)
    root = ET.fromstring(svg)
    elements = []

    def walk(node):
        tag = node.tag.split('}')[-1]
        a = node.attrib
        if tag == 'defs':
            return
        if tag in ('svg', 'g'):
            for child in node:
                walk(child)
            return
        if tag == 'rect':
            # Excalidraw canvas provides the SVG's full-page background.
            if a.get('width') == '100%':
                return
            e = base('rectangle', float(a.get('x', 0)), float(a.get('y', 0)), float(a['width']), float(a['height']), a)
            if float(a.get('rx', 0)):
                e['roundness'] = {'type': 3}
        elif tag == 'circle':
            r = float(a['r'])
            e = base('ellipse', float(a['cx'])-r, float(a['cy'])-r, r*2, r*2, a)
        elif tag == 'text':
            text = ''.join(node.itertext())
            size = float(a.get('font-size', 16))
            width = max(size, sum(0.29 if c in ' il.,:!|\'' else 0.86 if c in 'MW@' else 0.56 for c in text)*size)
            x = float(a.get('x', 0))
            align = 'center' if a.get('text-anchor') == 'middle' else 'left'
            if align == 'center':
                x -= width/2
            e = base('text', x, float(a.get('y', 0))-size, width, size*1.25, a)
            e.update(text=text, originalText=text, fontSize=size, fontFamily=2,
                     textAlign=align, verticalAlign='top', lineHeight=1.25,
                     autoResize=True, containerId=None, strokeColor=color(a.get('fill', '#ffffff')),
                     backgroundColor='transparent')
        elif tag == 'path':
            pts = points(a['d'])
            x, y = pts[0]
            e = base('arrow' if 'marker-end' in a else 'line', x, y,
                     max(p[0] for p in pts)-min(p[0] for p in pts),
                     max(p[1] for p in pts)-min(p[1] for p in pts), a)
            e.update(points=[[p[0]-x, p[1]-y] for p in pts],
                     lastCommittedPoint=None, startBinding=None, endBinding=None,
                     startArrowhead=None, endArrowhead='triangle' if 'marker-end' in a else None)
        else:
            raise ValueError(f'Unsupported element: {tag}')
        elements.append(e)

    walk(root)
    result = dict(type='excalidraw', version=2, source='https://excalidraw.com',
                  elements=elements, appState={'viewBackgroundColor': '#111014', 'gridSize': None}, files={})
    target = source.with_suffix('.excalidraw')
    target.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    loaded = json.loads(target.read_text(encoding='utf-8'))
    assert len({e['id'] for e in loaded['elements']}) == len(elements)
    assert not any(e['type'] == 'image' for e in elements)
    original_texts = [''.join(e.itertext()) for e in root.iter() if e.tag.endswith('}text')]
    assert original_texts == [e['text'] for e in elements if e['type'] == 'text']
    print(f'{target.name}: {len(elements)} editable elements, all {len(original_texts)} text labels preserved')


if __name__ == '__main__':
    for source in sorted(ROOT.glob('0*-latest.svg')):
        convert(source)
