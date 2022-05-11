figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
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

  if (msg.type === 'create-css') {
    const textStyles = figma.getLocalTextStyles();
    let cssTextClasses: string = '';

    textStyles.forEach((textStyle) => {
      let line = textStyle.lineHeight as {
        readonly value: number;
        readonly unit: 'PIXELS' | 'PERCENT';
      };
      cssTextClasses += `.${textStyle.name} {
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
    console.log(cssTextClasses);
  }
  if (msg.type === 'cancel') {
    figma.closePlugin('Thank u!');
  }
};
