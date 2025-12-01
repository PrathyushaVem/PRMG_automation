exports.excuteSteps = async (test, element, action, description, data = [], page, type = 'text') => {
  await test.step(description, async () => {
    try {
      const options = { timeout: 70000 };
      const refillIfCleared = async (fillFunc, locator, value, fieldName, type = "text", maxRetries = 3) => {
        if (!page) throw new Error("Page is required for refill action");
        const expectedValue = String(value).trim();
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            await fillFunc(value);
            await page.waitForTimeout(parseInt(process.env.smallWait));
            let currentValue = '';
            if (locator.inputValue) currentValue = (await locator.inputValue())?.trim() || '';
            if (!currentValue && locator.innerText) currentValue = (await locator.innerText())?.trim() || '';
            const isMatch =
              type === "email"
                ? currentValue === expectedValue
                : (() => {
                  const normalizedCurrent = currentValue.replace(/\D/g, '');
                  const normalizedExpected = expectedValue.replace(/\D/g, '');
                  return currentValue === expectedValue || normalizedCurrent === normalizedExpected;
                })();
            if (isMatch) return;
          } catch (err) {
            console.log(`Attempt ${attempt} failed for ${fieldName}:`, err.message);
          }
        }
        throw new Error(`Failed to keep ${fieldName} filled after ${maxRetries} attempts`);
      };

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
          await element.type(data[0], { delay: 5 });
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
        case "refill":
          const fillFunc = async (val) => await element.fill(val, options);
          await refillIfCleared(fillFunc, element, data[0], description, type);
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

