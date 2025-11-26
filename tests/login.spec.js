const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
const { highlightElement } = require("../utilities/highlight_element");
const { readExcel } = require("../utilities/readExcel");


require("dotenv").config();

test("New loan creation standard flow", async ({ page, context }) => {

  const excelData = readExcel("./test_Data/Loan.xlsx");
  const borrowerRows = excelData["Borrower Information"];
  const propertyRows = excelData["Property Title"];
  const loanRows = excelData["Loan Information"];
  const employmentRows = excelData["Employment Income"]
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

  for (let i = 0; i < borrowerRows.length; i++) {
    const borrowerData = borrowerRows[i];
    const propertyData = propertyRows[i];
    const loanData = loanRows[i];
    const employmentData = employmentRows[i];
    await encompassPage.movingtoApplicationView();
    await encompassPage.fillingBorrowerInfo(borrowerData);
    await encompassPage.fillingCoBorrowerInfo(borrowerData);
    await encompassPage.fillingPropertyTitleandTrust(propertyData);
    await encompassPage.fillingLoanInfo(loanData);
    await encompassPage.fillingEmploymentIncome(employmentData);
    await encompassPage.fillingCoEmploymentIncome(employmentData);
    await encompassPage.fillingDemographicInfo();
    await encompassPage.fillingCoDemographicInfo();
    await encompassPage.fillHomeOwnershipAndEducation();
    await encompassPage.fillCoHomeOwnershipAndEducation();
    await encompassPage.fillMilitaryServiceLanguagePreference();
    await encompassPage.fillCoMilitaryServiceLanguagePreference();
    await encompassPage.fillAcknowledgmentAgreement();
  }

});

// test("Marital status validations",async({page,context})=>{
//   const loginPage = new sections.LoginPage(test, page);
//       await loginPage.launchingApplication([process.env.baseURL]);
//       await loginPage.loginWithValidCredentials(
//         [process.env.userEmail],
//         [process.env.password]
//       );
//      await loginPage.scrollTillEncompass();
//      const pagePromise = context.waitForEvent('page');
//      await loginPage.clickOnEncompass();
//      const newPage = await pagePromise;
//      await page.waitForTimeout(parseInt(process.env.mediumWait));
//      await newPage.waitForLoadState();
//      const encompassPage=new sections.EncompassPage(test,newPage);
//      await encompassPage.fillInstance([process.env.instanceId]);
//      await encompassPage.clickOnNextBtn();
//      await encompassPage.movingtoApplicationView();
//      await encompassPage.unMarriedStatusCheck();
// });

// test("Validation of user details",async({page,context})=>{
// const loginPage = new sections.LoginPage(test, page);
//       await loginPage.launchingApplication([process.env.baseURL]);
//       await page.waitForTimeout(parseInt(process.env.mediumWait));
//       await loginPage.loginWithValidCredentials(
//         [process.env.userEmail],
//         [process.env.password]
//       );
//       await page.waitForTimeout(parseInt(process.env.mediumWait));
//      await loginPage.scrollTillEncompass();
//      const pagePromise = context.waitForEvent('page');
//      await loginPage.clickOnEncompass();
//      const newPage = await pagePromise;
//      await page.waitForTimeout(parseInt(process.env.mediumWait));
//      await newPage.waitForLoadState();
//      const encompassPage=new sections.EncompassPage(test,newPage);
//      await encompassPage.fillInstance([process.env.instanceId]);
//      await encompassPage.clickOnNextBtn();
//      await page.waitForTimeout(parseInt(process.env.mediumWait));
//      await encompassPage.movingtoApplicationView();
//      await page.waitForTimeout(parseInt(process.env.mediumWait));
//      await encompassPage.validationsOfUserDetails();
// });
