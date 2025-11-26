const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { readExcel } = require("../utilities/readExcel");
require("dotenv").config();

test.only("New loan creation using borrower Pairs", async ({ page, context }) => {
    const excelData = readExcel("./test_Data/Loan.xlsx");
    const loanRows = excelData["Loans Info"];

    const loginPage = new sections.LoginPage(test, page);
    await loginPage.launchingApplication([process.env.baseURL]);
    await loginPage.loginWithValidCredentials(
        [process.env.userEmail],
        [process.env.password]
    );
    await loginPage.scrollTillEncompass();

    const pagePromise = context.waitForEvent('page');
    await loginPage.clickOnEncompass();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    const encompassPage = new sections.EncompassPage(test, newPage);
    await encompassPage.fillInstanceid();
    for (let i = 0; i < loanRows.length; i++) {
        const loanData = [loanRows[i]];
        console.log(`Number of Loans: ${loanRows.length}`);
        console.log(`\n STARTING LOAN ${i + 1} \n`);
        await encompassPage.movingtoApplicationView();
        await encompassPage.fillingBorrowerPairs(loanData);
        await encompassPage.newLoanCreationUsingPairs(loanData);
        console.log(`\n LOAN ${i + 1} CREATED SUCCESSFULLY \n`);
        await page.waitForTimeout(parseInt(process.env.smallWait));
    };
})
