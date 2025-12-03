async function retryClick(locator, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await locator.click();
      return;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      console.log(`Retry click ${attempt}/${retries} failed, retrying...`);
      await locator.page().waitForTimeout(400);
    }
  }
}

module.exports = { retryClick };