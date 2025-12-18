const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const { readExcel } = require("../utilities/readExcel");
const { getBorrowerPairsForLoan } = require("../utilities/borrowerPairs");

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

test.only("New loan creation using Borrower Pairs", async ({ page, context }) => {
    const excelData = readExcel("./test_Data/NewLoan.xlsm");
    const loansSheet = excelData["Loans"];
    const borrowerPairsSheet = excelData["Borrower Pairs"];
    console.log("Total loans in loansSheet:", loansSheet.length);

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
        const borrowerPairs = await getBorrowerPairsForLoan(borrowerPairsSheet, loanNumber);
        const validPairs = borrowerPairs.filter(row =>
            Object.keys(row).some(key => key.includes("First Name") && row[key])
        );
        console.log(`Borrower Pairs found for Loan ${loanNumber}: ${borrowerPairs.length}`);
        console.log(`Valid Borrower Pairs: ${validPairs.length}`);
        if (validPairs.length === 0) {
            console.warn(`Skipping Loan ${loanNumber}: No valid borrower pairs found`);
            continue; // move to next loan
        }
        await encompassPage.fillingBorrowerPairs(borrowerPairs);
        await encompassPage.fillingPropertyTitleandTrustFromPairs(loanData);
        await encompassPage.fillingLoanInfoFromPairs(loanData);
        await encompassPage.fillAcknowledgmentAgreement();
        console.log(`\n--- LOAN ${loanNumber} CREATED SUCCESSFULLY ---\n`);
        await page.waitForTimeout(parseInt(process.env.smallWait));
    }
});