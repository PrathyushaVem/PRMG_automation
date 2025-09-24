exports.excuteSteps = async (test, element, action, description, data) => {
  await test.step(description, async () => {
    try {
      const options = { timeout: 30000 }; 

      switch (action) {
        case "click":
          await element.click(options);
          break;
        case "fill":
          await element.fill(data[0], options);
          break;
        case "dblclick":
          await element.dblclick(options);
          break;
        case "navigate":
          await element.goto(data[0]);
          break;
        case "type":
          await element.type(data[0]);
          break;
        case "check":
          await element.check(options);
          break;
        case "tap":
          await element.tap(options);
          break;
        case "hover":
          await element.hover(options);
          break;
        case "scroll":
          await element.scrollIntoViewIfNeeded(options);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (err) {
      throw new Error(
        `Step Failed: "${description}" | Action: ${action}\n` +
        `Playwright Message: ${err.message}`
      );
    }
  });
};
