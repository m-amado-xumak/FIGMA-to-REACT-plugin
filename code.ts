// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  const convertUnit = (unit: string) => {
    if (unit === 'PIXELS') return 'px';
    if (unit === 'PERCENT') return '%';
    return '';
  };

  const textTransform = (textCase: string) => {
    if (textCase === 'UPPER') return 'uppercase';
    if (textCase === 'LOWER') return 'lowercase';
    if (textCase === 'TITLE') return 'capitalize';
    return 'none';
  };

  const textDecoration = (textDecoration: string) => {
    if (textDecoration === 'underline') return 'underline';
    if (textDecoration === 'strikethrough') return 'line-through';
    return 'none';
  };

  if (msg.type === 'create-rectangles') {
    const textStyles = figma.getLocalTextStyles();
    console.log(textStyles);
    let cssClasses: string = '';
    textStyles.forEach((textStyle) => {
      let line = textStyle.lineHeight as {
        readonly value: number;
        readonly unit: 'PIXELS' | 'PERCENT';
      };
      cssClasses += `.${textStyle.name} {
        font-family: ${textStyle.fontName.family};
        font-style: ${textStyle.fontName.style};
        font-size: ${textStyle.fontSize}px;
        text-decoration-line: ${textDecoration(
          textStyle.textDecoration.toLowerCase()
        )};
        text-transform: ${textTransform(textStyle.textCase)};
        line-height: ${line.value ? line.value : 'normal'}${convertUnit(
        line.unit
      )};
        letter-spacing: ${textStyle.letterSpacing.value}${convertUnit(
        textStyle.letterSpacing.unit
      )};
        text-indent: ${textStyle.paragraphIndent}px;
    }`;
    });
    console.log(cssClasses);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
