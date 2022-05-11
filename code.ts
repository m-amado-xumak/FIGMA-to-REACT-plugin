
/**
 * 
 * @param c - An integer between 0 and 255
 * @returns - Hex value
 */
 const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

figma.showUI(__html__);

// Default application function
figma.ui.onmessage = msg => {
  if (msg.type === 'create-rectangles') {
    // Get all the color styles
    let colors = figma.getLocalPaintStyles();
    /**
     * Create a new Array with the css variable names and its corresponding hex values
     * 
     * @param col:PaintStyle - A PaintStyle color
     * @constant name - The name defined in FIGMA. It's converted to lowercase, and all spaces are replaced with a dash '-'
     * @constant paint - The color itself as Paint
     * @constant localPaint - A conversion to SolidPaint to access the color values
     * @constant color - The RGB array that contains the color
     * @returns - A variable with this format: '--name: #00000000'. A hex color in a css variable with opacity
     * 
     */
    const cssColors = colors.map((col: PaintStyle) => {
      const name = col.name.toLowerCase().replace(" ", "-");
      const paint: Paint = col.paints[0];
      const localPaint: SolidPaint = paint as SolidPaint;
      const color = localPaint.color;
      return (
        "--" + name + ": #" + componentToHex(Math.round(color.r * 255.0)) + componentToHex(Math.round(color.g * 255.0)) + componentToHex(Math.round(color.b * 255.0)) + componentToHex(Math.round(paint.opacity * 255.0))
      );
    })
    console.log(cssColors);
  }

};
