// Developer Handoff Plugin - Main Logic
// Complete advanced Figma plugin for dev handoff

interface DesignSpecs {
  name: string;
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fills?: any[];
  strokes?: any[];
  effects?: any[];
  cornerRadius?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  characters?: string;
  color?: string;
  textColor?: string;
  autoLayout?: any;
}

function extractSpecs(node: SceneNode): DesignSpecs {
  const base: any = {
    name: node.name,
    type: node.type,
    width: (node as any).width || 0,
    height: (node as any).height || 0,
    x: node.x,
    y: node.y
  };

  if ("fills" in node && Array.isArray(node.fills) && node.fills[0]?.type === "SOLID") {
    const color = (node.fills[0] as SolidPaint).color;
    base.fills = node.fills;
    base.color = `rgb(${Math.round(color.r*255)}, ${Math.round(color.g*255)}, ${Math.round(color.b*255)})`;
  }

  if ("cornerRadius" in node) {
    base.cornerRadius = (node as any).cornerRadius;
  }

  if ("effects" in node) {
    base.effects = (node as any).effects;
  }

  if (node.type === "TEXT") {
    const textNode = node as TextNode;
    base.fontSize = textNode.fontSize;
    base.fontFamily = (textNode.fontName as FontName).family;
    base.fontWeight = (textNode.fontName as FontName).style;
    base.characters = textNode.characters;
    if (textNode.fills && (textNode.fills[0] as any)?.color) {
      const c = (textNode.fills[0] as any).color;
      base.textColor = `rgb(${Math.round(c.r*255)}, ${Math.round(c.g*255)}, ${Math.round(c.b*255)})`;
    }
  }

  if ("layoutMode" in node) {
    base.autoLayout = {
      mode: (node as any).layoutMode,
      spacing: (node as any).itemSpacing,
      padding: (node as any).paddingLeft
    };
  }

  return base;
}

function generateCSS(specs: DesignSpecs): string {
  let css = `/* ${specs.name} */\n.${specs.name.toLowerCase().replace(/\s+/g, '-')} {\n`;
  if (specs.width) css += `  width: ${specs.width}px;\n`;
  if (specs.height) css += `  height: ${specs.height}px;\n`;
  if (specs.color) css += `  background: ${specs.color};\n`;
  if (specs.cornerRadius) css += `  border-radius: ${specs.cornerRadius}px;\n`;
  if (specs.fontSize) css += `  font-size: ${specs.fontSize}px;\n`;
  if (specs.fontFamily) css += `  font-family: ${specs.fontFamily};\n`;
  if (specs.fontWeight) css += `  font-weight: ${specs.fontWeight};\n`;
  if (specs.textColor) css += `  color: ${specs.textColor};\n`;
  css += `}\n`;
  return css;
}

function generateReactJSX(specs: DesignSpecs): string {
  const style = {
    width: specs.width,
    height: specs.height,
    background: specs.color,
    borderRadius: specs.cornerRadius,
    fontSize: specs.fontSize,
    fontFamily: specs.fontFamily
  };
  return `<div style={${JSON.stringify(style, null, 2)}}>\n  {/* ${specs.name} */}\n</div>`;
}

figma.showUI(__html__, { width: 420, height: 600 });

figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  
  if (selection.length > 0) {
    const allSpecs = selection.map(node => extractSpecs(node));
    const css = allSpecs.map(s => generateCSS(s)).join('\n');
    const jsx = allSpecs.map(s => generateReactJSX(s)).join('\n');
    
    figma.ui.postMessage({
      type: "selection",
      specs: allSpecs,
      css: css,
      jsx: jsx,
      count: selection.length
    });
  } else {
    figma.ui.postMessage({ type: "empty" });
  }
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'export-png') {
    const node = figma.currentPage.selection[0];
    if (node) {
      const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
      figma.ui.postMessage({ type: 'export-result', bytes: Array.from(bytes), format: 'PNG' });
    }
  }
  
  if (msg.type === 'export-svg') {
    const node = figma.currentPage.selection[0];
    if (node) {
      const svg = await node.exportAsync({ format: 'SVG' });
      figma.ui.postMessage({ type: 'export-result', bytes: Array.from(svg), format: 'SVG' });
    }
  }
};
