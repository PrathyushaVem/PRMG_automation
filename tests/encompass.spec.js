const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { readExcel } = require("../utilities/readExcel");
require("dotenv").config();

/*test("New loan creation using borrower Pairs", async ({ page, context }) => {
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
})*/

// Utility to get Number of borrower pairs for a loan
function getBorrowerPairsForLoan(borrowerPairsSheet, loanNumber) {
    let currentLoan = null;
    const result = [];
    for (const row of borrowerPairsSheet) {
        if (row["Loan Number"]) {
            currentLoan = row["Loan Number"];
        }
        if (currentLoan === loanNumber) {
            result.push(row);
        }
    }
    return result;
}

test.only("New loan creation using Borrower Pairs", async ({ page, context }) => {
    const excelData = readExcel("./test_Data/NewLoan.xlsx");
    const loansSheet = excelData["Loans"];
    const borrowerPairsSheet = excelData["Borrower Pairs"];

    const loginPage = new sections.LoginPage(test, page);
    await loginPage.launchingApplication([process.env.baseURL]);
    await loginPage.loginWithValidCredentials(
        [process.env.userEmail],
        [process.env.password]
    );
    await loginPage.scrollTillEncompass();

    const pagePromise = context.waitForEvent("page");
    await loginPage.clickOnEncompass();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    const encompassPage = new sections.EncompassPage(test, newPage);
    await encompassPage.fillInstanceid();

    for (let i = 0; i < loansSheet.length; i++) {
        await encompassPage.movingtoApplicationView();
        const loanData = loansSheet[i];
        const loanNumber = loanData["Loan Number"];
        console.log(`STARTING LOAN ${loanNumber}`);
        const borrowerPairs = getBorrowerPairsForLoan(borrowerPairsSheet, loanNumber);
        console.log(`Borrower Pairs found for Loan ${loanNumber}:`, borrowerPairs.length);
        if (borrowerPairs.length > 0) {
            await encompassPage.fillingBorrowerPairs(borrowerPairs);
        } else {
            console.warn(`No borrower pairs found for Loan ${loanNumber}`);
        }
        await encompassPage.fillingPropertyTitleandTrustFromPairs(loanData);
        await encompassPage.fillingLoanInfoFromPairs(loanData);
        await encompassPage.fillAcknowledgmentAgreement();
        console.log(`\n--- LOAN ${loanNumber} CREATED SUCCESSFULLY ---\n`);
        await page.waitForTimeout(parseInt(process.env.smallWait));
    }
});