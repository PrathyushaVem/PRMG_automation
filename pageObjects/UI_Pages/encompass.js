const { excuteSteps } = require("../../utilities/actions");
const { test, expect } = require("@playwright/test");
const testData = require("../../test_Data/testData.json");
const path = require("path");
const { scrollToElement } = require("../../utilities/scrollInView");

const filePath = path.resolve(__dirname, "../../test_Data/Loan.xlsx");
const {
  highlightElement,
  highlighterRemove,
} = require("../../utilities/highlight_element");
const { exec } = require("child_process");
const { escape } = require("querystring");
const { ECDH } = require("crypto");
const { th } = require("@faker-js/faker");
const { threadCpuUsage } = require("process");

// let borrowerinfo = readExcel(filePath, "Borrower Information");
// const borrowerData=borrowerinfo[0];
// let propertyinfo = readExcel(filePath, "Property Title");
// const propertyData=propertyinfo[0];
// let loaninfo = readExcel(filePath, "Loan Information");
// const loanData=loaninfo[0];

exports.EncompassPage = class EncompassPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    const frame0 = this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.allAppsHeader = page.locator("//h2[text()='Welcome to Encompass Admin!']");
    this.instanceId = page.locator("//input[@id='instance-id']");
    this.nextBtn = page.locator("//button[@name='next']");
    this.apps = page.locator("//button[@title='Apps']");
    this.pipeline = page.locator("//button[@label='Pipeline']");
    this.loadFolder = page.locator("//button[@aria-label='Loan Folder']");
    this.newLoan = frame0.locator("//button[@aria-label='New Loan']");
    this.publicLoanTemplate = page.locator("//span[contains(text(),'Public Loan Templates')]");
    this.companyWide = page.locator("//span[contains(text(),'Companywide')]");
    this.retailPurchaseLoan = page.locator("//span[contains(text(),'RETAIL PURCHASE Loans')]");
    this.applyBtn = page.locator("//button[text()='Apply']");
    this.borrowerInfo = frame.locator("//div[@aria-label='Borrower Information']");
    this.borrowerFirstName = frame.locator("(//label[contains(@aria-label,'First Name')]/following::input)[1]");
    this.coborrowerFirstName = frame.locator("((//label[contains(@aria-label,'First Name')])[2]/following::input)[1]");
    this.borrowerMiddleName = frame.locator("(//label[contains(@aria-label,'Middle Name')]/following::input)[1]");
    this.coborrowerMiddleName = frame.locator("((//label[contains(@aria-label,'Middle Name')])[2]/following::input)[1]");
    this.borrowerLastName = frame.locator("(//label[contains(@aria-label,'Last Name')]/following::input)[1]");
    this.coborrowerLastName = frame.locator("((//label[contains(@aria-label,'Last Name')])[2]/following::input)[1]");
    this.ssnInfo = frame.locator("(//label[contains(@aria-label,'SSN')]/following::input)[1]");
    this.cossnInfo = frame.locator("((//label[contains(@aria-label,'SSN')])[2]/following::input)[1]");
    this.citizenship = frame.locator("(//label[@aria-label='Citizenship']/following::button)[1]");
    this.cocitizenship = frame.locator("((//label[@aria-label='Citizenship'])[2]/following::button)[1]");
    this.dobBorrower = frame.locator("(//input[@placeholder='MM'])[1]");
    this.codobBorrower = frame.locator("(//input[@placeholder='MM'])[2]");
    this.maritalStatus = frame.locator("(//label[@aria-label='Marital Status']/following::button)[1]");
    this.comaritalStatus = frame.locator("((//label[@aria-label='Marital Status'])[2]/following::button)[1]");
    this.homePhone = frame.locator("(//label[@aria-label='Home Phone']/following::input)[1]");
    this.workPhone = frame.locator("(//label[@aria-label='Work Phone']/following::input)[1]");
    this.cellPhone = frame.locator("(//label[@aria-label='Cell Phone']/following::input)[1]")
    this.emailBorrower = frame.locator("(//label[@aria-label='Email']/following::input)[1]");
    this.borrowerInformation = frame.locator("//div[text()='Borrower Information']");

    this.cohomePhone = frame.locator("((//label[@aria-label='Home Phone'])[2]/following::input)[1]");
    this.coworkPhone = frame.locator("((//label[@aria-label='Work Phone'])[2]/following::input)[1]");
    this.cocellPhone = frame.locator("((//label[@aria-label='Cell Phone'])[2]/following::input)[1]")
    this.coemailBorrower = frame.locator("((//label[@aria-label='Email'])[2]/following::input)[1]");
    this.estimatedValue = frame.locator("(//label[contains(@aria-label,'Estimated Value')]/following::input)[1]");
    this.appraisedValue = frame.locator("(//label[contains(@aria-label,'Appraised Value')]/following::input)[1]");
    this.borrowerStreetAddress = frame.locator("(//label[contains(@aria-label,'Street Address')]/following::input)[1]");
    this.coBorrowerStreetAddress = frame.locator("((//label[contains(@aria-label,'Street Address')])[4]/following::input)[1]");
    this.coEmpStreetAddress = frame.locator("((//label[contains(@aria-label,'Street Address')])[2]/following::input)[1]");
    this.zipCode = frame.locator("(//label[contains(@aria-label,'Zip')]/following::input)[1]");
    this.coBorrowerZipCode = frame.locator("((//label[@aria-label='Zip Code'])[4]/following::input)[1]");
    this.coZipCode = frame.locator("((//label[@aria-label='Zip Code'])[2]/following::input)[1]");
    this.years = frame.locator("(//label[@aria-label='Years']/following::input)[1]");
    this.coBorrowYears = frame.locator("((//label[@aria-label='Years'])[3]/following::input)[1]");
    this.coEmpYears = frame.locator("(//label[text()='Years'])[2]/following::input[1]");
    this.months = frame.locator("(//label[@aria-label='Months']/following::input)[1]");
    this.coBorrowMonths = frame.locator("((//label[@aria-label='Months'])[3]/following::input)[1]");
    this.coEmpMonths = frame.locator("((//label[@aria-label='Months'])[2]/following::input)[1]");
    this.borrowerHousing = frame.locator("(//label[@aria-label='Housing']/following::button)[1]");
    this.coBorrowerHousing = frame.locator("((//label[@aria-label='Housing'])[3]/following::button)[1]");
    this.borrowerHousingOwnOption = frame.locator("//span[text()='Own']");
    this.coBorrowerHousingOwnOption = frame.locator("(//span[text()='Own'])[2]");
    this.mailingCopyFromCurrent = frame.locator("(//span[text()='Copy from Current'])[1]");
    this.mailingCopyFromCurrentCheckbox = frame.locator("(//span[text()='Copy from Current'])[1]/preceding::input[1]");
    this.coMailingCopyFromCurrent = frame.locator("(//span[text()='Copy from Current'])[2]");
    this.coMailingCopyFromCurrentCheckbox = frame.locator("(//span[text()='Copy from Current'])[2]/preceding::input[1]");
    this.pageMenu = frame.locator("//div[@data-testid='ds-page-header-menu']");
    this.creditInformation = frame.locator("//div[contains(text(),'Credit Information & Ordering')]");
    this.propertyTitle = frame.locator("//div[contains(text(),'Property, Title & Trust')]");
    this.attachmentType = frame.locator("(//label[@aria-label='Attachment Type']/following::button)[1]");
    this.dettached = frame.locator("//li//span[text()='Detached']");
    this.propertyType = frame.locator("(//label[@aria-label='Property Type']/following::button)[1]");
    this.noOfUnits = frame.locator("(//label[@aria-label='Number of Units']/following::input)[1]");
    this.yearBuilt = frame.locator("(//label[@aria-label='Year Built']/following::input)[1]");
    this.unmarriedStatus = frame.locator("//span[text()='Exclude Unmarried Addendum']");
    this.saveBtn = frame1.locator("//button[text()='Save']")

    this.loanInfoPage = frame.locator("//div[contains(text(),'Loan Information')]");
    this.purchasePrice = frame.locator("(//label[@aria-label='Purchase Price']/following::input)[1]");
    this.downPayment = frame.locator("(//label[@aria-label='Down Payment']/following::input)[1]");
    this.noteRate = frame.locator("(//label[@aria-label='Note Rate']/following::input)[1]");
    this.loanTerm = frame.locator("(//label[@aria-label='Loan Term']/following::input)[1]");
    this.dueIn = frame.locator("(//label[@aria-label='Due In']/following::input)[1]");

    this.employmentAndIncome = frame.locator("//div[contains(text(),'Employment & Income')]");
    this.employerBusinessName = frame.locator("(//label[contains(@aria-label,'Employer or Business Name')]/following::input)[1]");
    this.coemployerBusinessName = frame.locator("((//label[contains(@aria-label,'Employer or Business Name')])[2]/following::input)[1]");
    this.positionOrTitle = frame.locator("(//label[contains(@aria-label,'Position')]/following::input)[1]");
    this.startDate = frame.locator("(//input[@placeholder='MM'])[1]");
    this.coStartDate = frame.locator("(//input[@placeholder='MM'])[2]");
    this.baseMonthlyPay = frame.locator("(//label[contains(@aria-label,'Base')]/following::input)[1]");
    this.coBaseMonthlyPay = frame.locator("((//label[contains(@aria-label,'Base')])[2]/following::input)[1]");
    this.demographicInformation = frame.locator("//div[contains(text(),'Demographic Information')]");
    this.demographicInfoProvided = frame.locator("(//label[contains(@aria-label,'The Demographic Information was provided')]/following::button)[1]");
    this.coDemographicInfoProvided = frame.locator("((//label[contains(@aria-label,'The Demographic Information was provided')])[2]/following::button)[1]");
    this.telephoneInterviewOption = frame.locator("//span[text()='Telephone Interview']");
    this.coTelephoneInterviewOption = frame.locator("(//span[text()='Telephone Interview'])[2]");
    this.ethnicityCheckbox = frame.locator("(//span[text()='Hispanic or Latino'])[1]/preceding::input[1]");
    this.coEthnicityCheckbox = frame.locator("(//span[text()='Hispanic or Latino'])[2]/preceding::input[1]");
    this.ethnicityMexicanCheckbox = frame.locator("(//span[text()='Mexican'])[1]/preceding::input[1]");
    this.coEthnicityMexicanCheckbox = frame.locator("(//span[text()='Mexican'])[2]/preceding::input[1]");
    this.raceCheckbox = frame.locator("(//span[text()='White'])[1]/preceding::input[1]");
    this.coRaceCheckbox = frame.locator("(//span[text()='White'])[2]/preceding::input[1]");
    this.sexCheckbox = frame.locator("(//span[text()='Male'])[1]/preceding::input[1]");
    this.coSexCheckbox = frame.locator("(//span[text()='Male'])[2]/preceding::input[1]");

    this.homeownershipEducation = frame.locator("//div[contains(text(),'Homeownership Education')]");
    this.homeOwnershipCheckbox = frame.locator("(//span[text()='No'])[1]/preceding::input[1]");
    this.borrowerHousingCounseling = frame.locator("(//span[text()='No'])[3]");
    this.housingCounselingCheckbox = frame.locator("(//span[text()='No'])[3]/preceding::input[1]");
    this.coBorrowerHomeownership = frame.locator("(//span[text()='No'])[2]");
    this.cohomeOwnershipCheckbox = frame.locator("(//span[text()='No'])[2]/preceding::input[1]");
    this.cohousingCounselingCheckbox = frame.locator("(//span[text()='No'])[4]/preceding::input[1]");

    this.militaryService = frame.locator("//div[contains(text(),'Military Service & Language Preference')]");
    this.militaryServiceArrow = frame.locator("(//label[@aria-label='Military Service']/following::button)[1]");
    this.coMilitaryServiceArrow = frame.locator("((//label[@aria-label='Military Service'])[2]/following::button)[1]");
    this.militaryServiceNoOption = frame.locator("//span[text()='No']");
    this.coMilitaryServiceNoOption = frame.locator("(//span[text()='No'])[2]");
    this.languagePreferenceArrow = frame.locator("(//label[@aria-label='Language Preference']/following::button)[1]");
    this.coLanguagePreferenceArrow = frame.locator("((//label[@aria-label='Language Preference'])[2]/following::button)[1]");
    this.languagePreferenceEnglishOption = frame.locator("//span[text()='English']");
    this.coLanguagePreferenceEnglishOption = frame.locator("(//span[text()='English'])[2]");

    this.acknowledgmentAgreements = frame.locator("//div[contains(text(),'Acknowledgments & Agreements')]");
    this.acknowledgmentAgreementsButton = frame.locator("//button[@aria-label='Acknowledgments and Agreements']");
    this.closeButton = frame1.locator("//button[normalize-space()='Close']");

    this.spinner = frame0.locator("//div[contains(@aria-label,'Please wait.')]");
    this.loanFieldsSpinner = frame.locator("//span[contains(text(),'please wait')]");
    this.zipCountryCheck = frame.locator("//input[@value='US']");
    this.loanNumber = frame1.locator("//div[@class='headerSpacing loan-number']");

    this.downArrow = frame1.locator("//span[contains(@class,'down-arrow')]");
    this.pencilIcon = frame1.locator("//a[contains(@class,'icon-edit-pencil')]");
    this.yesBtn = frame1.locator("//button[text()='Yes']");
    this.vestingTypeDropdown = frame1.locator("(//label[text()='Vesting Type'])[1]/following::select[1]");
    this.vestingTypeOptions = frame1.locator("(//label[text()='Vesting Type'])[1]/following::select[1]/option");
    this.coVestingTypeDropdown = frame1.locator("(//label[text()='Vesting Type'])[2]/following::select[1]");
    this.firstName = frame1.locator("(//label[text()='First Name'])[1]/following::input[1]");
    this.coFirstName = frame1.locator("(//label[text()='First Name'])[2]/following::input[1]");
    this.middleName = frame1.locator("(//label[text()='Middle Name'])[1]/following::input[1]");
    this.coMiddleName = frame1.locator("(//label[text()='Middle Name'])[2]/following::input[1]");
    this.lastName = frame1.locator("(//label[text()='Last Name'])[1]/following::input[1]");
    this.coLastName = frame1.locator("(//label[text()='Last Name'])[2]/following::input[1]");
    this.ssnId = frame1.locator("(//label[text()='SSN']/following::input)[1]");
    this.coSsnId = frame1.locator("((//label[text()='SSN'])[2]/following::input)[1]");
    this.newPair = frame1.locator("//button[contains(text(),'New Pair')]");
    this.nextButton = frame1.locator("//button[text()='Next']");
    this.saveButton = frame1.locator("(//button[text()='Save'])[2]");
    this.borrowersList = frame1.locator("//h3[text()='Borrowers']/following::ul//a");
  };

  clickOnDownArrow = async () => {
    await excuteSteps(this.test, this.downArrow, "click", `Clicking on down arrow`);
  };

  clickYesBtn = async () => {
    await excuteSteps(this.test, this.yesBtn, "click", `Clicking on Yes Button`);
  };

  clickOnPencilIcon = async () => {
    await excuteSteps(this.test, this.pencilIcon, "click", `Clicking on pencil icon to edit`);
  };

  clickOnVestingType = async () => {
    await excuteSteps(this.test, this.vestingTypeDropdown, "click", `Clicking on borower vesting type dropdown`);
  };

  clickOnCoVestingType = async () => {
    await excuteSteps(this.test, this.coVestingTypeDropdown, "click", `Clicking on coborrower vesting type dropdown`);
  };

  selectVestingType = async (vestingType) => {
    await this.vestingTypeDropdown.selectOption({ label: vestingType });
  };

  selectCoVestingType = async (vestingType) => {
    await this.coVestingTypeDropdown.selectOption({ label: vestingType });
  };

  fillFirstName = async (firstName) => {
    await excuteSteps(this.test, this.firstName, "fill", `filling borrower first name`, firstName);
  };

  fillMiddleName = async (middleName) => {
    await excuteSteps(this.test, this.middleName, "fill", `filling borrower middle name`, middleName);
  };

  fillLastName = async (lastName) => {
    await excuteSteps(this.test, this.lastName, "fill", `filling borrower last name`, lastName);
  };

  fillCoFirstName = async (firstName) => {
    await excuteSteps(this.test, this.coFirstName, "fill", `filling coborrower first name`, firstName);
  };

  fillCoMiddleName = async (middleName) => {
    await excuteSteps(this.test, this.coMiddleName, "fill", `filling coborrower middle name`, middleName);
  };

  fillCoLastName = async (lastName) => {
    await excuteSteps(this.test, this.coLastName, "fill", `filling coborrower last name`, lastName);
  };

  clickOnSsnId = async () => {
    await excuteSteps(this.test, this.ssnId, "click");
  };

  clickOnCoSsnId = async () => {
    await excuteSteps(this.test, this.coSsnId, "click");
  };

  addNewPair = async () => {
    await excuteSteps(this.test, this.newPair, "click", `Clicking on add new pair`);
  };

  clickOnNextButton = async () => {
    await excuteSteps(this.test, this.nextButton, "click", `Clicking on next button`);
  };

  clickOnSaveButton = async () => {
    await excuteSteps(this.test, this.saveButton, "click", `Clicking on save button`);
  };

  refillBorrowerFirstName = async (firstName) => {
    await excuteSteps(this.test, this.borrowerFirstName, "refill", `Refilling borrower first name`, firstName, this.page);
  };

  refillBorrowerMiddleName = async (middleName) => {
    await excuteSteps(this.test, this.borrowerMiddleName, "refill", `Refilling borrower middle name`, middleName, this.page);
  };

  refillBorrowerLastName = async (lastName) => {
    await excuteSteps(this.test, this.borrowerLastName, "refill", `Refilling borrower last name`, lastName, this.page);
  };

  refillBorrowerEmail = async (emailAddress) => {
    await excuteSteps(this.test, this.emailBorrower, "refill", `Refilling borrower email`, emailAddress, this.page, "email");
  };

  clickOnBorrowerInformation = async () => {
    await excuteSteps(this.test, this.borrowerInformation, "click", `Clicking on Borrower Information in Page Menu`);
  };

  fillBorrowerNamesAndEmail = async (borrowerData) => {
    await scrollToElement(this.borrowerFirstName);
    await this.refillBorrowerFirstName([borrowerData["First Name"]]);
    await scrollToElement(this.borrowerMiddleName);
    await this.refillBorrowerMiddleName([borrowerData["Middle Name"]]);
    await scrollToElement(this.borrowerLastName);
    await this.refillBorrowerLastName([borrowerData["Last Name"]]);
    await scrollToElement(this.emailBorrower);
    await this.refillBorrowerEmail([borrowerData["Email"]]);
  };

  refillCoBorrowerFirstName = async (firstName) => {
    await excuteSteps(this.test, this.coborrowerFirstName, "refill", `Refilling co borrower first name`, firstName, this.page);
  };

  refillCoBorrowerMiddleName = async (middleName) => {
    await excuteSteps(this.test, this.coborrowerMiddleName, "refill", `Refilling co borrower middle name`, middleName, this.page);
  };

  refillCoBorrowerLastName = async (lastName) => {
    await excuteSteps(this.test, this.coborrowerLastName, "refill", `Refilling co borrower last name`, lastName, this.page);
  };

  refillCoBorrowerEmail = async (emailAddress) => {
    await excuteSteps(this.test, this.coemailBorrower, "refill", `Refilling co borrower email`, emailAddress, this.page, "email");
  };

  fillCoBorrowerNamesAndEmail = async (coborrowerData) => {
    await scrollToElement(this.coborrowerFirstName);
    await this.refillCoBorrowerFirstName([coborrowerData["Co First Name"]]);
    await scrollToElement(this.coborrowerMiddleName);
    await this.refillCoBorrowerMiddleName([coborrowerData["Co Middle Name"]]);
    await scrollToElement(this.coborrowerLastName);
    await this.refillCoBorrowerLastName([coborrowerData["Co Last Name"]]);
    await scrollToElement(this.coemailBorrower);
    await this.refillCoBorrowerEmail([coborrowerData["Co Email"]]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  fillBorrowerPersonalDetails = async (borrowerData) => {
    await scrollToElement(this.ssnInfo);
    await this.clickOnSsn();
    await this.ssnInfo.pressSequentially(String(borrowerData["SSN"]));
    await scrollToElement(this.citizenship);
    await this.clickOnCitizenship();
    await scrollToElement(this.citizenshipUSdropdown);
    await this.clickOnUSCitizenship();
    await scrollToElement(this.dobBorrower);
    await this.clickOnDateOfBirth();
    await this.dobBorrower.pressSequentially(String(borrowerData["Dob"]));
    await scrollToElement(this.maritalStatus);
    await this.clickOnMaritalStatus();
    await scrollToElement(this.maritalStatusOption);
    await this.clickOnMaritalStatusOption();
  };

  fillCoBorrowerPersonalDetails = async (coborrowerData) => {
    await scrollToElement(this.cossnInfo);
    await this.clickOnCoSsn();
    await this.cossnInfo.pressSequentially(String(coborrowerData["Co SSN"]));
    await scrollToElement(this.cocitizenship);
    await this.clickOnCoCitizenship();
    await scrollToElement(this.cocitizenshipUSdropdown);
    await this.clickOnCoUSCitizenship();
    await scrollToElement(this.codobBorrower);
    await this.clickOnCoDateOfBirth();
    await this.codobBorrower.pressSequentially(String(coborrowerData["Co Dob"]));
    await scrollToElement(this.comaritalStatus);
    await this.clickOnCoMaritalStatus();
    await scrollToElement(this.comaritalStatusOption);
    await this.clickOnCoMaritalStatusOption();
  };

  refillHomePhoneNo = async (homePhone) => {
    await excuteSteps(this.test, this.homePhone, "refill", `Refilling Home Phone num`, homePhone, this.page);
  };

  refillWorkPhoneNo = async (workPhone) => {
    await excuteSteps(this.test, this.workPhone, "refill", `Refilling Work Phone num`, workPhone, this.page);
  };

  refillCellPhoneNo = async (cellPhone) => {
    await excuteSteps(this.test, this.cellPhone, "refill", `Refilling Cell Phone num`, cellPhone, this.page);
  };

  fillWorkPhoneNo = async (workPhone) => {
    await excuteSteps(this.test, this.workPhone, "fill", `filling Work Phone num`, workPhone, this.page);
  };

  fillCellPhoneNo = async (cellPhone) => {
    await excuteSteps(this.test, this.cellPhone, "fill", `filling Cell Phone num`, cellPhone, this.page);
  };

  fillBorrowerContact = async (borrowerData) => {
    await scrollToElement(this.homePhone);
    await this.refillHomePhoneNo([String(borrowerData["Home Phone"])]);
    await scrollToElement(this.workPhone);
    await this.refillWorkPhoneNo([String(borrowerData["Work Phone"])]);
    await scrollToElement(this.cellPhone);
    await this.refillCellPhoneNo([String(borrowerData["Cell Phone"])]);
  };

  refillCoHomePhoneNo = async (homePhone) => {
    await excuteSteps(this.test, this.cohomePhone, "refill", `Refilling Co borrower Home Phone num`, homePhone, this.page);
  };

  refillCoWorkPhoneNo = async (workPhone) => {
    await excuteSteps(this.test, this.coworkPhone, "refill", `Refilling Co borrower Work Phone num`, workPhone, this.page);
  };

  refillCoCellPhoneNo = async (cellPhone) => {
    await excuteSteps(this.test, this.cocellPhone, "refill", `Refilling Co borrower Cell Phone num`, cellPhone, this.page);
  };

  fillCoBorrowerContact = async (coborrowerData) => {
    await scrollToElement(this.cohomePhone);
    await this.refillCoHomePhoneNo([String(coborrowerData["Co Home Phone"])]);
    await scrollToElement(this.coworkPhone);
    await this.refillCoWorkPhoneNo([String(coborrowerData["Co Work Phone"])]);
    await scrollToElement(this.cocellPhone);
    await this.refillCoCellPhoneNo([String(coborrowerData["Co Cell Phone"])]);
  };

  refillYears = async (years) => {
    await excuteSteps(this.test, this.years, "refill", `Refilling years`, years, this.page);
  };

  refillMonths = async (months) => {
    await excuteSteps(this.test, this.months, "refill", `Refilling months`, months, this.page);
  };

  fillBorrowerAddress = async (borrowerData) => {
    await scrollToElement(this.zipCode);
    await this.refillZipCode([String(borrowerData["Zip"])]);
    await scrollToElement(this.borrowerStreetAddress);
    await this.refillStreetAddress([borrowerData["Street Address"]]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await scrollToElement(this.years);
    await this.refillYears([String(borrowerData["Years"])]);
    await scrollToElement(this.months);
    await this.refillMonths(String(borrowerData["Months"]));
  };

  refillCoBorrowerStreetAddress = async (streetAddress) => {
    await excuteSteps(this.test, this.coBorrowerStreetAddress, "refill", "Refilling co borrower Street Address", streetAddress, this.page);
  };

  refillCoBorrowerZipCode = async (zipCode) => {
    await excuteSteps(this.test, this.coBorrowerZipCode, "refill", `Refilling co borrower Zip Code`, zipCode, this.page);
  };

  refillCoBorrowYears = async (years) => {
    await excuteSteps(this.test, this.coBorrowYears, "refill", `Refilling co borrower years`, years, this.page);
  };

  refillCoBorrowMonths = async (months) => {
    await excuteSteps(this.test, this.coBorrowMonths, "refill", `Refilling co borrower months`, months, this.page);
  };

  fillCoBorrowerAddress = async (coborrowerData) => {
    await scrollToElement(this.coBorrowerZipCode);
    await this.refillCoBorrowerZipCode([String(coborrowerData["Co Zip"])]);
    await scrollToElement(this.coBorrowerStreetAddress);
    await this.refillCoBorrowerStreetAddress([coborrowerData["Co Street Address"]]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await scrollToElement(this.coBorrowYears);
    await this.refillCoBorrowYears([String(coborrowerData["Co Years"])]);
    await scrollToElement(this.coBorrowMonths);
    await this.refillCoBorrowMonths([String(coborrowerData["Co Months"])]);
  };

  handleBorrowerHousing = async () => {
    await scrollToElement(this.borrowerHousing);
    while (!(await this.borrowerHousingOwnOption.isVisible())) {
      await this.clickOnBorrowerHousing();
      await this.page.waitForTimeout(200);
    }
    await this.clickOnHousingOwnOption();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.borrowerHousingOwnOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await scrollToElement(this.borrowerHousing);
      await this.clickOnBorrowerHousing();
      await scrollToElement(this.borrowerHousingOwnOption);
      await this.clickOnHousingOwnOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    }
  };

  handleCoBorrowerHousing = async () => {
    await scrollToElement(this.coBorrowerHousing);
    while (!(await this.coBorrowerHousingOwnOption.isVisible())) {
      await this.clickOnCoBorrowerHousing();
      await this.page.waitForTimeout(200);
    }
    await this.clickOnCoHousingOwnOption();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.coBorrowerHousingOwnOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.coBorrowerHousing.waitFor({ state: 'visible' });
      await scrollToElement(this.coBorrowerHousing);
      await this.clickOnCoBorrowerHousing();
      await scrollToElement(this.coBorrowerHousingOwnOption);
      await this.clickOnCoHousingOwnOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    }
  };

  handleMailingCopy = async () => {
    await scrollToElement(this.mailingCopyFromCurrent);
    await this.clickUntilChecked(this.mailingCopyFromCurrentCheckbox);
  };

  handleCoMailingCopy = async () => {
    await scrollToElement(this.coMailingCopyFromCurrent);
    await this.clickUntilChecked(this.coMailingCopyFromCurrentCheckbox);
  };

  refillStreetAddress = async (streetAddress) => {
    await excuteSteps(this.test, this.borrowerStreetAddress, "refill", "Refilling Street Address", streetAddress, this.page);
  };

  refillZipCode = async (zipCode) => {
    await excuteSteps(this.test, this.zipCode, "refill", `Refilling Zip Code`, zipCode, this.page);
  };

  refillNoOfUnits = async (noOfUnits) => {
    await excuteSteps(this.test, this.noOfUnits, "refill", `Refilling Number of Units`, noOfUnits, this.page);
  };

  fillNoOfUnits = async (noOfUnits) => {
    await excuteSteps(this.test, this.noOfUnits, "fill", `filling Number of Units`, noOfUnits);
  };

  fillPropertyAddress = async (propertyData) => {
    await scrollToElement(this.zipCode);
    await this.refillZipCode([String(propertyData["Zip"])]);
    await scrollToElement(this.borrowerStreetAddress);
    await this.refillStreetAddress([propertyData["Street Address"]]);
    await scrollToElement(this.noOfUnits);
    await this.refillNoOfUnits([String(propertyData["Number of Units"])]);
  };

  fillPropertyDetails = async () => {
    await this.clickOnAttachmentType();
    await this.clickOnAttachmentDettached();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnPropertyType();
    await this.clickOnPropertyDettached();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  };

  refillEstimatedValue = async (estimatedValue) => {
    await excuteSteps(this.test, this.estimatedValue, "refill", `Refilling estimated value`, estimatedValue, this.page);
  };

  refillAppraisedValue = async (appraisedValue) => {
    await excuteSteps(this.test, this.appraisedValue, "refill", `Refilling appraised value`, appraisedValue, this.page);
  };

  fillPropertyValues = async (propertyData) => {
    await scrollToElement(this.estimatedValue);
    await this.refillEstimatedValue([String(propertyData["Estimated Value"])]);
    await scrollToElement(this.appraisedValue);
    await this.refillAppraisedValue([String(propertyData["Appraised Value"])]);
  };

  clickOnAcknowledgementAgreement = async () => {
    await excuteSteps(this.test, this.acknowledgmentAgreements, "click", `Clicking on acknowledgment page`);
  };

  clickOnAgreementBtn = async () => {
    await excuteSteps(this.test, this.acknowledgmentAgreementsButton, "click", `Clicking on agreement button`);
  };

  clickOnCloseBtn = async () => {
    await excuteSteps(this.test, this.closeButton, "click", `Clicking on 'Close' button`);
  };

  clickOnMilitaryService = async () => {
    await excuteSteps(this.test, this.militaryService, "click", `Clicking on military service page`);
  };

  clickOnMilitaryServiceArrow = async () => {
    await excuteSteps(this.test, this.militaryServiceArrow, "click", `Clicking on military service arrow`);
  };

  clickOnCoMilitaryServiceArrow = async () => {
    await excuteSteps(this.test, this.coMilitaryServiceArrow, "click", `Clicking on co military service arrow`);
  };

  clickOnMilitaryServiceNoOption = async () => {
    await excuteSteps(this.test, this.militaryServiceNoOption, "click", `Clicking on no option`);
  };

  clickOnCoMilitaryServiceNoOption = async () => {
    await excuteSteps(this.test, this.coMilitaryServiceNoOption, "click", `Clicking on no option`);
  };

  clickOnLanguagePreferenceArrow = async () => {
    await excuteSteps(this.test, this.languagePreferenceArrow, "click", `Clicking on language peference arrow option`);
  };

  clickOnLanguagePreferenceEnglish = async () => {
    await excuteSteps(this.test, this.languagePreferenceEnglishOption, "click", `Clicking on language peference as english`);
  };

  clickOnCoLanguagePreferenceArrow = async () => {
    await excuteSteps(this.test, this.coLanguagePreferenceArrow, "click", `Clicking on co language peference arrow option`);
  };

  clickOnCoLanguagePreferenceEnglish = async () => {
    await excuteSteps(this.test, this.coLanguagePreferenceEnglishOption, "click", `Clicking on co language peference as english`);
  };

  clickOnDemographicInfo = async () => {
    await excuteSteps(this.test, this.demographicInformation, "click", `Clicking on demographic information`);
  };

  clickOnDemographicInfoBtn = async () => {
    await excuteSteps(this.test, this.demographicInfoProvided, "click", `Clicking on demographic btn`);
  };

  clickOnCoDemographicInfoBtn = async () => {
    await excuteSteps(this.test, this.coDemographicInfoProvided, "click", `Clicking on co demographic btn`);
  };

  clickonTelephoneInterview = async () => {
    await excuteSteps(this.test, this.telephoneInterviewOption, "click", `Clicking on telephone interview option`);
  };

  clickonCoTelephoneInterview = async () => {
    await excuteSteps(this.test, this.coTelephoneInterviewOption, "click", `Clicking on co telephone interview option`);
  };

  clickOnHomeOnwnershipEducation = async () => {
    await excuteSteps(this.test, this.homeownershipEducation, "click", `Clicking on homeownership education`);
  };

  clickOnEmploymentAndIncome = async () => {
    await excuteSteps(this.test, this.employmentAndIncome, "click", `Clicking on employment and income`);
  };

  fillPurchasePrice = async (price) => {
    await excuteSteps(this.test, this.purchasePrice, "refill", `Refilling purchase price`, price, this.page);
  };

  fillDownPayment = async (downPayment) => {
    await excuteSteps(this.test, this.downPayment, "refill", `Refilling down payment`, downPayment, this.page);
  };

  fillNoteRate = async (rate) => {
    await excuteSteps(this.test, this.noteRate, "refill", `Refilling note rate`, rate, this.page);
  };

  fillLoanTerm = async (term) => {
    await excuteSteps(this.test, this.loanTerm, "refill", `Refilling loan terms in months`, term, this.page);
  };

  fillDueIn = async (due) => {
    await excuteSteps(this.test, this.dueIn, "refill", `Refilling due in field`, due, this.page);
  };

  clickOnLoanInfoPage = async () => {
    await excuteSteps(this.test, this.loanInfoPage, "click", `Clicking on Loan Information page`)
  };

  clickOnSaveBtn = async () => {
    await excuteSteps(this.test, this.saveBtn, "click", `Clicking on save button`);
  };

  clickOnPropertyType = async () => {
    await excuteSteps(this.test, this.propertyType, "click", `Clicking on property type`);
  };

  clickOnPropertyDettached = async () => {
    await excuteSteps(this.test, this.dettached, "click", `Clicking on property dettached`);
  };

  clickOnAttachmentType = async () => {
    await excuteSteps(this.test, this.attachmentType, "click", `Clicking on attachment type`);
  };

  clickOnAttachmentDettached = async () => {
    await excuteSteps(this.test, this.dettached, "click", `Clicking on dettached as attachment type`);
  };

  fillBorrowerStreetAddress = async (stadd) => {
    await excuteSteps(this.test, this.borrowerStreetAddress, "fill", `Filling borrower street address`, stadd);
  };

  fillZipCode = async (zip) => {
    await excuteSteps(this.test, this.zipCode, "fill", `Filling zip code`, zip);
  };

  fillYears = async (year) => {
    await excuteSteps(this.test, this.years, "fill", `Filling in years of stay`, year);
  };

  fillMonths = async (months) => {
    await excuteSteps(this.test, this.months, "fill", `Filing in months of stay`, months);
  };

  clickOnBorrowerHousing = async () => {
    await excuteSteps(this.test, this.borrowerHousing, "click", `Clicking on housing `);
  };

  clickOnCoBorrowerHousing = async () => {
    await excuteSteps(this.test, this.coBorrowerHousing, "click", `Clicking on co housing `);
  };

  clickOnHousingOwnOption = async () => {
    await excuteSteps(this.test, this.borrowerHousingOwnOption, "click", `Clicking on own housing option`);
  };

  clickOnCoHousingOwnOption = async () => {
    await excuteSteps(this.test, this.coBorrowerHousingOwnOption, "click", `Clicking on own co housing option`);
  };

  clickOnPageMenu = async () => {
    await excuteSteps(this.test, this.pageMenu, "click", `Clicking on page menu`);
  };

  clickOnCreditInfoPage = async () => {
    await excuteSteps(this.test, this.creditInformation, "click", `Clicking on credit information`);
  };

  clickOnPropertyTitlePage = async () => {
    await excuteSteps(this.test, this.propertyTitle, "click", `Clicking on property title and trust page`);
  }

  clickOnborrowerInfo = async () => {
    await excuteSteps(this.test, this.borrowerInfo, "click", `Clicking on borrower Information`);
  };

  fillBorrowerFirstName = async (fname) => {
    await excuteSteps(this.test, this.borrowerFirstName, "fill", `Filling borrower first name`, fname);
  };

  fillBorrowerMiddleName = async (mName) => {
    await excuteSteps(this.test, this.borrowerMiddleName, "fill", `Filling borrower middle name`, mName);
  };

  fillBorrowerLastName = async (lName) => {
    await excuteSteps(this.test, this.borrowerLastName, "fill", `Filling borrower last name`, lName);
  };

  clickOnCitizenship = async () => {
    await excuteSteps(this.test, this.citizenship, "click", `Clicking on citizenship`);
  };

  clickOnCoCitizenship = async () => {
    await excuteSteps(this.test, this.cocitizenship, "click", `Clicking on co citizenship`);
  };

  clickOnUSCitizenship = async () => {
    await excuteSteps(this.test, this.citizenshipUSdropdown, "click", `clicking on US citizenship`);
  };

  clickOnCoUSCitizenship = async () => {
    await excuteSteps(this.test, this.cocitizenshipUSdropdown, "click", `clicking on co Us citizenship option`);
  };

  clickOnMaritalStatus = async () => {
    await excuteSteps(this.test, this.maritalStatus, "click", `Clicking on marital status dropdown`);
  };

  clickOnCoMaritalStatus = async () => {
    await excuteSteps(this.test, this.comaritalStatus, "click", `Clicking on marital status dropdown`);
  };

  clickOnMaritalStatusOption = async () => {
    await excuteSteps(this.test, this.maritalStatusOption, "click", `Clicking on unmarried option`);
  };

  clickOnCoMaritalStatusOption = async () => {
    await excuteSteps(this.test, this.comaritalStatusOption, "click", `Clicking on unmarried option`);
  };

  fillHomePhoneNo = async (pNo) => {
    await excuteSteps(this.test, this.homePhone, "fill", `Filling phone number`, pNo);
  };

  fillEmail = async (email) => {
    await excuteSteps(this.test, this.emailBorrower, "fill", `Filling email of borrwer`, email);
  };

  clickonAllApps = async () => {
    await excuteSteps(this.test, this.apps, "click", `Clicking on all apps`);
  };

  clickOnPipeline = async () => {
    await excuteSteps(this.test, this.pipeline, "click", `Click on pipeline`);
  };

  fillInstance = async (insId) => {
    await excuteSteps(this.test, this.instanceId, "fill", `Filing instance id`, insId);
  };

  clickOnNextBtn = async () => {
    await excuteSteps(this.test, this.nextBtn, "click", `Clicking on next button`);
  };

  clickOnNewLoan = async () => {
    await excuteSteps(this.test, this.newLoan, "click", `Clicking on new loan`);
  };

  clickOnPublicLoanTemplate = async () => {
    await excuteSteps(this.test, this.publicLoanTemplate, "click", `Clicking on public loan template`);
  };

  scrollTillSSn = async () => {
    await excuteSteps(this.test, this.ssnInfo, "scroll", `Scroll into view`);
  };

  clickOnCompanyWide = async () => {
    await excuteSteps(this.test, this.companyWide, "click", `Clicking on company wide`);
  };

  clickOnRetailPurchaseLoan = async () => {
    await excuteSteps(this.test, this.retailPurchaseLoan, "click", `Clicking on retail purchase loan`);
  };

  clickOnApplyBtn = async () => {
    await excuteSteps(this.test, this.applyBtn, "click", `Clicking on apply button`);
  };

  clickOnSsn = async () => {
    await excuteSteps(this.test, this.ssnInfo, "click");
  };
  clickOnCoSsn = async () => {
    await excuteSteps(this.test, this.cossnInfo, "click");
  };
  clickOnDateOfBirth = async () => {
    await excuteSteps(this.test, this.dobBorrower, "click", `Clicking on date of birth field`);
  };
  clickOnCoDateOfBirth = async () => {
    await excuteSteps(this.test, this.codobBorrower, "click", `Clicking on co date of birth field`);
  };
  clickOnMailingCurrent = async () => {
    await excuteSteps(this.test, this.mailingCopyFromCurrent, "click", `Clicking on copy from current option formailing address`);
  };
  clickOnCoMailingCurrent = async () => {
    await excuteSteps(this.test, this.coMailingCopyFromCurrent, "click", `Clicking on copy from current option formailing address`);
  };

  clickUntilChecked = async (checkboxLocator) => {
    let isChecked = await checkboxLocator.isChecked();
    while (!isChecked) {
      await excuteSteps(this.test, checkboxLocator, "click", `clicking checkbox until checked`);
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      isChecked = await checkboxLocator.isChecked();
    }
  };

  selectLoanPurpose = async (loanPurpose) => {
    if (!loanPurpose) return;
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.loanPurpose = frame.locator(`//label[normalize-space(span)='${loanPurpose}']`);
    this.loanPurposeCheckbox = frame.locator(`//label[normalize-space(span)='${loanPurpose}']/preceding::input[1]`);
    await scrollToElement(this.loanPurpose);
    await this.clickUntilChecked(this.loanPurposeCheckbox);
  };

  selectMortgageType = async (mortgageType) => {
    if (!mortgageType) return;
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.mortgageType = frame.locator(`//span[text()='${mortgageType}']`);
    this.mortgageTypeCheckbox = frame.locator(`//span[text()='${mortgageType}']/preceding::input[1]`);
    await scrollToElement(this.mortgageType);
    await this.clickUntilChecked(this.mortgageTypeCheckbox);
  };

  setAmortizationType = async (amortizationType) => {
    if (!amortizationType) return;
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.amortizationType = frame.locator(`//input[@label='${amortizationType}']`);
    await scrollToElement(this.amortizationType);
    await this.clickUntilChecked(this.amortizationType);
  };

  setMortgageLienType = async (mortgageLienType) => {
    if (!mortgageLienType) return;
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.mortgageLienType = frame.locator(`//input[@label='${mortgageLienType}']`);
    await scrollToElement(this.mortgageLienType);
    await this.clickUntilChecked(this.mortgageLienType);
  };

  fillLoanFields = async (loanData) => {
    if ("Purchase Price" in loanData) {
      await scrollToElement(this.purchasePrice);
      await this.fillPurchasePrice([String(loanData["Purchase Price"])]);
    }
    if ("Down Payment" in loanData) {
      await this.fillDownPayment([String(loanData["Down Payment"])]);
    }
    if ("Note Rate" in loanData) {
      await this.fillNoteRate([String(loanData["Note Rate"])]);
    }
    if ("Loan Term" in loanData) {
      await scrollToElement(this.loanTerm);
      await this.fillLoanTerm([String(loanData["Loan Term"])]);
    }
    if ("Due In" in loanData) {
      await this.fillDueIn([String(loanData["Due In"])]);
    }
  };

  refillEmployerBusinessName = async (businessName) => {
    await excuteSteps(this.test, this.employerBusinessName, "refill", `Refilling business name`, businessName, this.page);
  };

  refillCoEmployerBusinessName = async (businessName) => {
    await excuteSteps(this.test, this.coemployerBusinessName, "refill", `Refilling co business name`, businessName, this.page);
  };

  fillEmploymentAddress = async (employmentData) => {
    await scrollToElement(this.zipCode);
    await this.refillZipCode([String(employmentData["Zip"])]);
    await scrollToElement(this.borrowerStreetAddress);
    await this.refillStreetAddress([employmentData["Street Address"]]);
  };

  refillCoEmpStreetAddress = async (streetAddress) => {
    await excuteSteps(this.test, this.coEmpStreetAddress, "refill", `Refilling co borrower Employment street address`, streetAddress, this.page);
  };
  refillCoEmpZipCode = async (zipCode) => {
    await excuteSteps(this.test, this.coZipCode, "refill", `Refilling co borrower Employment zipCode`, zipCode, this.page);
  }

  fillCoEmploymentAddress = async (coemploymentData) => {
    await scrollToElement(this.coZipCode);
    await this.refillCoEmpZipCode([String(coemploymentData["Co Zip"])]);
    await scrollToElement(this.coEmpStreetAddress);
    await this.refillCoEmpStreetAddress([coemploymentData["Co Street Address"]]);
  };

  fillStartDate = async (startDate) => {
    await this.startDate.pressSequentially(String(startDate));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  fillCoStartDate = async (costartDate) => {
    await this.coStartDate.pressSequentially(String(costartDate));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  refillEmpYears = async (years) => {
    await excuteSteps(this.test, this.years, "refill", `Refilling employment years`, years, this.page);
  };

  refillCoEmpYears = async (years) => {
    await excuteSteps(this.test, this.coEmpYears, "refill", `Refilling co employment years`, years, this.page);
  };

  refillEmpMonths = async (months) => {
    await excuteSteps(this.test, this.months, "refill", `Refilling employment months`, months, this.page);
  };

  refillCoEmpMonths = async (months) => {
    await excuteSteps(this.test, this.coEmpMonths, "refill", `Refilling co employment months`, months, this.page);
  };

  fillEmploymentDates = async (employmentData) => {
    await scrollToElement(this.years);
    await this.refillEmpYears([String(employmentData["Years"])]);
    await scrollToElement(this.months);
    await this.refillEmpMonths([String(employmentData["Months"])]);
  };

  fillCoEmploymentDates = async (coemploymentData) => {
    await scrollToElement(this.coEmpYears);
    await this.refillCoEmpYears([String(coemploymentData["Co Years"])]);
    await scrollToElement(this.coEmpMonths);
    await this.refillCoEmpMonths([String(coemploymentData["Co Months"])]);
  };

  refillEmploymentPay = async (basePay) => {
    await excuteSteps(this.test, this.baseMonthlyPay, "refill", `Refilling base pay`, basePay, this.page);
  };

  refillCoEmploymentPay = async (basePay) => {
    await excuteSteps(this.test, this.coBaseMonthlyPay, "refill", `Refilling co borrower base pay`, basePay, this.page);
  };

  ensureHomeOwnershipChecked = async () => {
    await this.clickUntilChecked(this.homeOwnershipCheckbox);
  };

  ensureCoHomeOwnershipChecked = async () => {
    await this.clickUntilChecked(this.cohomeOwnershipCheckbox);
  };

  ensureHousingCounselingChecked = async () => {
    await this.clickUntilChecked(this.housingCounselingCheckbox);
  };

  ensureCoHousingCounselingChecked = async () => {
    await this.clickUntilChecked(this.cohousingCounselingCheckbox);
  };

  fillInstanceid = async () => {
    await highlightElement(this.page, this.instanceId);
    await this.fillInstance([process.env.instanceId]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.extraSmallWait));
    });
    await highlightElement(this.page, this.nextBtn);
    await this.clickOnNextBtn();
  }

  movingtoApplicationView = async () => {
    const frame0 = this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']")
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.newLoan = frame0.locator("//button[@aria-label='New Loan']");
    await this.apps.waitFor({ state: 'visible' });
    while (!(await this.pipeline.isVisible())) {
      await this.clickonAllApps();
      await this.page.waitForTimeout(200);
    }
    await highlightElement(this.page, this.pipeline);
    await this.pipeline.waitFor({ state: 'visible' });
    await this.clickOnPipeline();
    await highlightElement(this.page, this.newLoan);
    await this.newLoan.waitFor({ state: 'visible' });
    await this.clickOnNewLoan();
    await this.publicLoanTemplate.waitFor({ state: 'visible' });
    await this.clickOnPublicLoanTemplate();
    await highlightElement(this.page, this.companyWide);
    await this.companyWide.waitFor({ state: 'visible' });
    await this.clickOnCompanyWide();
    await highlightElement(this.page, this.retailPurchaseLoan);
    await this.retailPurchaseLoan.waitFor({ state: 'visible' });
    await this.clickOnRetailPurchaseLoan();
    await highlightElement(this.page, this.applyBtn);
    await this.applyBtn.waitFor({ state: 'visible' });
    await this.clickOnApplyBtn();
    await this.loanFieldsSpinner.waitFor({ state: 'hidden' });
  }

  unMarriedStatusCheck = async () => {
    await highlightElement(this.page, this.borrowerInfo);
    await this.clickOnborrowerInfo();
    await highlightElement(this.page, this.borrowerFirstName);
    await this.fillBorrowerFirstName([testData.encompass.borrowerInformation.name.firstName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page, this.borrowerMiddleName);
    await this.fillBorrowerMiddleName([testData.encompass.borrowerInformation.name.middleName]);
    await highlightElement(this.page, this.borrowerLastName);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerLastName([testData.encompass.borrowerInformation.name.lastName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.scrollTillSSn();
    await highlightElement(this.page, this.ssnInfo);
    await this.clickOnSsn();
    await this.ssnInfo.pressSequentially(testData.encompass.borrowerInformation.ssn.value);
    await highlightElement(this.page, this.citizenship);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnCitizenship();
    await highlightElement(this.page, this.citizenshipUSdropdown);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUSCitizenship();
    await highlightElement(this.page, this.dobBorrower);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDateOfBirth();
    await this.dobBorrower.pressSequentially(testData.encompass.borrowerInformation.dateOfBirth.value);
    await highlightElement(this.page, this.maritalStatus);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatus();
    await highlightElement(this.page, this.maritalStatusOption);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatusOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
  }

  fillingBorrowerInfo = async (borrowerData) => {
    const frame0 = this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.citizenshipUSdropdown = frame.locator(`//h3[text()='Borrower']/following::span[text()='${[borrowerData["Citizenship"]]}']`);
    this.maritalStatusOption = frame.locator(`//h3[text()='Borrower']/following::span[text()='${[borrowerData["Marital Status"]]}']`);
    await this.borrowerInfo.waitFor({ state: 'visible' });
    await this.clickOnborrowerInfo();
    await this.loanFieldsSpinner.waitFor({ state: 'hidden' });
    await this.fillBorrowerNamesAndEmail(borrowerData);
    await this.fillBorrowerPersonalDetails(borrowerData);
    await this.fillBorrowerContact(borrowerData);
    await this.fillBorrowerAddress(borrowerData);
    await this.handleBorrowerHousing();
    await this.handleMailingCopy();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  }

  fillingCoBorrowerInfo = async (coborrowerData) => {
    const frame0 = this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.cocitizenshipUSdropdown = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${[coborrowerData["Co Citizenship"]]}']`);
    this.comaritalStatusOption = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${[coborrowerData["Co Marital Status"]]}']`);
    await this.fillCoBorrowerNamesAndEmail(coborrowerData);
    await this.fillCoBorrowerPersonalDetails(coborrowerData);
    await this.fillCoBorrowerContact(coborrowerData);
    await this.fillCoBorrowerAddress(coborrowerData);
    await this.handleCoBorrowerHousing();
    await this.handleCoMailingCopy();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  }

  fillingPropertyTitleandTrust = async (propertyData) => {
    const frame0 = this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    await this.clickOnPageMenu();
    await this.clickOnPropertyTitlePage();
    await this.loanFieldsSpinner.waitFor({ state: "hidden" });
    await this.fillPropertyAddress(propertyData);
    await this.fillPropertyDetails();
    await this.fillPropertyValues(propertyData)
    await this.clickOnSaveBtn();
  }

  fillingLoanInfo = async (loanData) => {
    await this.clickOnPageMenu();
    await this.clickOnLoanInfoPage();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectLoanPurpose(loanData["Loan Purpose"]);
    await this.selectMortgageType(loanData["Mortgage Type"]);
    await this.setAmortizationType(loanData["Amortization Type"]);
    await this.setMortgageLienType(loanData["Mortgage Lien Type"]);
    await this.fillLoanFields(loanData);
    await this.clickOnSaveBtn();
  }

  fillingEmploymentIncome = async (employmentData) => {
    await this.clickOnPageMenu();
    await this.clickOnEmploymentAndIncome();
    await scrollToElement(this.employerBusinessName);
    await this.refillEmployerBusinessName([employmentData["Business Name"]]);
    await this.fillEmploymentAddress(employmentData);
    await scrollToElement(this.startDate);
    await this.fillStartDate(employmentData["Start Date"]);
    await this.fillEmploymentDates(employmentData);
    await scrollToElement(this.baseMonthlyPay);
    await this.refillEmploymentPay([String(employmentData["Base Pay"])]);
    const loanNumber = await this.loanNumber.innerText();
    console.log("Loan Number:", loanNumber);
  }

  fillingCoEmploymentIncome = async (coemploymentData) => {
    await scrollToElement(this.coemployerBusinessName);
    await this.refillCoEmployerBusinessName([coemploymentData["Co Business Name"]]);
    await this.fillCoEmploymentAddress(coemploymentData);
    await scrollToElement(this.coStartDate);
    await this.fillCoStartDate(coemploymentData["Co Start Date"]);
    await this.fillCoEmploymentDates(coemploymentData);
    await scrollToElement(this.coBaseMonthlyPay);
    await this.refillCoEmploymentPay([String(coemploymentData["Co Base Pay"])]);
    await this.clickOnSaveBtn();
  };

  selectInterviewOption = async () => {
    await excuteSteps(this.test, this.interviewOption, "click", `Clicking on Demographic Interview Option`);
  };

  selectCoInterviewOption = async () => {
    await excuteSteps(this.test, this.coInterviewOption, "click", `Clicking on Co Demographic Interview Option`);
  };

  fillingDemographicInfo = async () => {
    await this.clickOnPageMenu();
    await this.clickOnDemographicInfo();
    await this.clickOnDemographicInfoBtn();
    await this.clickonTelephoneInterview();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.telephoneInterviewOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.clickOnDemographicInfoBtn();
      await this.clickonTelephoneInterview();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    };
    await scrollToElement(this.ethnicityCheckbox);
    await this.clickUntilChecked(this.ethnicityCheckbox);
    await scrollToElement(this.ethnicityMexicanCheckbox);
    await this.clickUntilChecked(this.ethnicityMexicanCheckbox);
    await scrollToElement(this.raceCheckbox);
    await this.clickUntilChecked(this.raceCheckbox);
    await scrollToElement(this.sexCheckbox);
    await this.clickUntilChecked(this.sexCheckbox);
    await this.clickOnSaveBtn();
  }

  fillingCoDemographicInfo = async () => {
    await this.clickOnCoDemographicInfoBtn();
    await this.clickonCoTelephoneInterview();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.coTelephoneInterviewOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.clickOnCoDemographicInfoBtn();
      await this.clickonCoTelephoneInterview();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    };
    await scrollToElement(this.coEthnicityCheckbox);
    await this.clickUntilChecked(this.coEthnicityCheckbox);
    await scrollToElement(this.coEthnicityMexicanCheckbox);
    await this.clickUntilChecked(this.coEthnicityMexicanCheckbox);
    await scrollToElement(this.coRaceCheckbox);
    await this.clickUntilChecked(this.coRaceCheckbox);
    await scrollToElement(this.coSexCheckbox);
    await this.clickUntilChecked(this.coSexCheckbox);
    await this.clickOnSaveBtn();
  }

  fillHomeOwnershipAndEducation = async () => {
    await this.clickOnPageMenu();
    await this.clickOnHomeOnwnershipEducation();
    await this.ensureHomeOwnershipChecked();
    await this.ensureHousingCounselingChecked();
  }

  ensureBorrowerHomeOwnershipChecked = async () => {
    if (this.borrowerHomeOwnershipCheckbox) {
      await this.clickUntilChecked(this.borrowerHomeOwnershipCheckbox);
    }
  };

  ensureBorrowerHousingCounselingChecked = async () => {
    if (this.borrowerHouseCounsellingCheckbox) {
      await this.clickUntilChecked(this.borrowerHouseCounsellingCheckbox);
    }
  };

  ensureCoBorrowerHomeOwnershipChecked = async () => {
    if (this.coborrowerHomeOwnershipCheckbox) {
      await this.clickUntilChecked(this.coborrowerHomeOwnershipCheckbox);
    }
  };

  ensureCoBorrowerHousingCounselingChecked = async () => {
    if (this.coborrowerHouseCounsellingCheckbox) {
      await this.clickUntilChecked(this.coborrowerHouseCounsellingCheckbox);
    }
  };

  /*fillHomeOwnershipAndEducationFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const borrowerHomeOwnership = pairsData[`Borrower Home Ownership ${i}`];
    const borrowerHouseCounselling = pairsData[`Borrower House Counselling ${i}`];
    if (borrowerHomeOwnership) {
      this.borrowerHomeOwnershipCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Borrower completed home')]/following::div[1]`
        + `//span[text()='${borrowerHomeOwnership}']/preceding::input[1]`);
    }
    if (borrowerHouseCounselling) {
      this.borrowerHouseCounsellingCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Borrower completed housing')]/following::div[1]`
        + `//span[text()='${borrowerHouseCounselling}']/preceding::input[1]`);
    }
    await this.clickOnPageMenu();
    await this.clickOnHomeOnwnershipEducation();
    if (borrowerHomeOwnership) {
      await this.ensureBorrowerHomeOwnershipChecked();
    }
    if (borrowerHouseCounselling) {
      await this.ensureBorrowerHousingCounselingChecked();
    }
  };*/

  fillHomeOwnershipAndEducationFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const borrowerHomeOwnership = pair[`Borrower Home Ownership`];
    const borrowerHouseCounselling = pair[`Borrower House Counselling`];

    if (borrowerHomeOwnership) {
      this.borrowerHomeOwnershipCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Borrower completed home')]/following::div[1]`
        + `//span[text()='${borrowerHomeOwnership}']/preceding::input[1]`
      );
    }

    if (borrowerHouseCounselling) {
      this.borrowerHouseCounsellingCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Borrower completed housing')]/following::div[1]`
        + `//span[text()='${borrowerHouseCounselling}']/preceding::input[1]`
      );
    }

    await this.clickOnPageMenu();
    await this.clickOnHomeOnwnershipEducation();

    if (borrowerHomeOwnership) {
      try {
        await this.ensureBorrowerHomeOwnershipChecked();
      } catch {
        console.log(`Home Ownership option '${borrowerHomeOwnership}' not found, skipping.`);
      }
    }

    if (borrowerHouseCounselling) {
      try {
        await this.ensureBorrowerHousingCounselingChecked();
      } catch {
        console.log(`House Counseling option '${borrowerHouseCounselling}' not found, skipping.`);
      }
    }
  };

  fillCoHomeOwnershipAndEducation = async () => {
    await this.ensureCoHomeOwnershipChecked();
    await this.ensureCoHousingCounselingChecked();
  };

  /*fillCoHomeOwnershipAndEducationFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const coborrowerHomeOwnership = pairsData[`Co Borrower Home Ownership ${i}`];
    const coborrowerHouseCounselling = pairsData[`Co Borrower House Counselling ${i}`];
    if (coborrowerHomeOwnership) {
      this.coborrowerHomeOwnershipCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Co-Borrower completed home')]/following::div[1]` +
        `//span[text()='${coborrowerHomeOwnership}']/preceding::input[1]`);
    }
    if (coborrowerHouseCounselling) {
      this.coborrowerHouseCounsellingCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Co-Borrower completed housing')]/following::div[1]` +
        `//span[text()='${coborrowerHouseCounselling}']/preceding::input[1]`);
    }
    if (coborrowerHomeOwnership) {
      await this.ensureCoBorrowerHomeOwnershipChecked();
    }
    if (coborrowerHouseCounselling) {
      await this.ensureCoBorrowerHousingCounselingChecked();
    }
  };*/

  fillCoHomeOwnershipAndEducationFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const coborrowerHomeOwnership = pair[`Co Borrower Home Ownership`];
    const coborrowerHouseCounselling = pair[`Co Borrower House Counselling`];

    if (coborrowerHomeOwnership) {
      this.coborrowerHomeOwnershipCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Co-Borrower completed home')]/following::div[1]` +
        `//span[text()='${coborrowerHomeOwnership}']/preceding::input[1]`
      );
    }

    if (coborrowerHouseCounselling) {
      this.coborrowerHouseCounsellingCheckbox = frame.locator(
        `//label[contains(@aria-label,'the Co-Borrower completed housing')]/following::div[1]` +
        `//span[text()='${coborrowerHouseCounselling}']/preceding::input[1]`
      );
    }

    if (coborrowerHomeOwnership) {
      try {
        await this.ensureCoBorrowerHomeOwnershipChecked();
      } catch {
        console.log(`Co-Borrower Home Ownership option '${coborrowerHomeOwnership}' not found, skipping.`);
      }
    }

    if (coborrowerHouseCounselling) {
      try {
        await this.ensureCoBorrowerHousingCounselingChecked();
      } catch {
        console.log(`Co-Borrower House Counseling option '${coborrowerHouseCounselling}' not found, skipping.`);
      }
    }
  };

  fillMilitaryServiceLanguagePreference = async () => {
    await this.clickOnPageMenu();
    await this.clickOnMilitaryService();
    await this.clickOnMilitaryServiceArrow();
    await this.clickOnMilitaryServiceNoOption();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.militaryServiceNoOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.clickOnMilitaryServiceArrow();
      await this.clickOnMilitaryServiceNoOption();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    }
    await this.clickOnLanguagePreferenceArrow();
    await this.clickOnLanguagePreferenceEnglish();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.languagePreferenceEnglishOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.clickOnLanguagePreferenceArrow();
      await this.clickOnLanguagePreferenceEnglish();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    }
  }

  fillCoMilitaryServiceLanguagePreference = async () => {
    await this.clickOnCoMilitaryServiceArrow();
    await this.clickOnCoMilitaryServiceNoOption();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.coMilitaryServiceNoOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.clickOnCoMilitaryServiceArrow();
      await this.clickOnCoMilitaryServiceNoOption();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    }
    await this.clickOnCoLanguagePreferenceArrow();
    await this.clickOnCoLanguagePreferenceEnglish();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.coLanguagePreferenceEnglishOption.isVisible())) {
      console.log("option disappeared — reselecting.");
      await this.clickOnCoLanguagePreferenceArrow();
      await this.clickOnCoLanguagePreferenceEnglish();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    }
    await this.clickOnSaveBtn();
  }

  fillAcknowledgmentAgreement = async () => {
    await this.clickOnPageMenu();
    await this.clickOnAcknowledgementAgreement();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnAgreementBtn();
    await scrollToElement(this.closeButton);
    await this.clickOnCloseBtn();
    await this.clickOnSaveBtn();
    if (await this.yesBtn.isVisible()) {
      await this.clickYesBtn();
    };
  }

  validationsOfUserDetails = async () => {
    await highlightElement(this.page, this.borrowerInfo);
    await this.clickOnborrowerInfo();
    await highlightElement(this.page, this.borrowerFirstName);
    await this.fillBorrowerFirstName([testData.encompass.borrowerInformation.name.firstName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page, this.borrowerMiddleName);
    await this.fillBorrowerMiddleName([testData.encompass.borrowerInformation.name.middleName]);
    await highlightElement(this.page, this.borrowerLastName);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerLastName([testData.encompass.borrowerInformation.name.lastName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.scrollTillSSn();
    await highlightElement(this.page, this.ssnInfo);
    await this.clickOnSsn();
    await this.ssnInfo.pressSequentially(testData.encompass.borrowerInformation.ssn.value);
    await highlightElement(this.page, this.citizenship);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnCitizenship();
    await highlightElement(this.page, this.citizenshipUSdropdown);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUSCitizenship();
    await highlightElement(this.page, this.dobBorrower);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDateOfBirth();
    await this.dobBorrower.pressSequentially(testData.encompass.borrowerInformation.dateOfBirth.value);
    await highlightElement(this.page, this.maritalStatus);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatus();
    await highlightElement(this.page, this.unmarriedOption);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatusOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page, this.homePhone);
    await this.fillHomePhoneNo([testData.encompass.borrowerInformation.homePhone.num]);
    await highlightElement(this.page, this.emailBorrower);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page, this.emailBorrower);
    await this.fillEmail([testData.encompass.borrowerInformation.email.mail]);
    await highlightElement(this.page, this.borrowerStreetAddress);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerStreetAddress(["174 street"]);
    await highlightElement(this.page, this.zipCode);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillZipCode(["20013"]);
    await highlightElement(this.page, this.years);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillYears(["10"]);
    await highlightElement(this.page, this.months);
    await this.fillMonths(["0"]);
    await highlightElement(this.page, this.borrowerHousing);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnBorrowerHousing();
    await highlightElement(this.page, this.borrowerHousingOwnOption);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnHousingOwnOption();
    await highlightElement(this.page, this.mailingCopyFromCurrent);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMailingCurrent();
    const bfname = await this.borrowerFirstName.inputValue();
    const bmname = await this.borrowerMiddleName.inputValue();
    const blname = await this.borrowerLastName.inputValue();
    const ssn = await this.ssnInfo.inputValue();
    const bstreetAddress = await this.borrowerStreetAddress.inputValue();
    const bzipCode = await this.zipCode.inputValue();
    await highlightElement(this.page, this.pageMenu)
    await this.clickOnPageMenu();
    await highlightElement(this.page, this.creditInformation);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnCreditInfoPage();
    const cfname = await this.borrowerFirstName.inputValue();
    const cmname = await this.borrowerMiddleName.inputValue();
    const clname = await this.borrowerLastName.inputValue();
    const cssn = await this.ssnInfo.inputValue();
    const cstreetAddress = await this.borrowerStreetAddress.inputValue();
    const czipCode = await this.zipCode.inputValue();
    expect(bfname, "Validating first name is matching").toBe(cfname);
    expect(bmname, "Validating middle name is matching").toBe(cmname);
    expect(blname, "Validating if last name is matching").toBe(clname);
    expect(ssn, "Validating ssn is matching").toBe(cssn);
    expect(bstreetAddress, "Validating if street address is matching").toBe(cstreetAddress);
    expect(bzipCode, "Validating if zip code is matching").toBe(czipCode);
  }

  /*fillingBorrowerPairs = async (allPairsData) => {
    await this.downArrow.waitFor({ state: 'visible' });
    await this.clickOnDownArrow();
    await this.pencilIcon.waitFor({ state: 'visible' });
    await this.clickOnPencilIcon();
    await this.yesBtn.waitFor({ state: 'visible' });
    await this.clickYesBtn();
    for (let k = 0; k < allPairsData.length; k++) {
      const pairsData = allPairsData[k];
      const noOfPairs = pairsData["No of Pairs"];
      console.log(`Filling data for borrower pair ${k + 1} of ${noOfPairs}`);
      for (let i = 1; i <= noOfPairs; i++) {
        await this.vestingTypeDropdown.waitFor({ state: 'visible' });
        const vestingType = pairsData[`Vesting Type ${i}`];
        if (vestingType) {
          await this.clickOnVestingType();
          await this.selectVestingType(vestingType);
        }
        if (`First Name ${i}` in pairsData) {
          await this.fillFirstName([pairsData[`First Name ${i}`]] || '');
        }
        if (`Middle Name ${i}` in pairsData) {
          await this.fillMiddleName([pairsData[`Middle Name ${i}`]] || '');
        }
        if (`Last Name ${i}` in pairsData) {
          await this.fillLastName([pairsData[`Last Name ${i}`]] || '');
        }
        if (`SSN ${i}` in pairsData) {
          await scrollToElement(this.ssnId);
          await this.clickOnSsnId();
          await this.ssnId.pressSequentially(String(pairsData[`SSN ${i}`]) || '');
        }
        const coVestingType = pairsData[`Co Vesting Type ${i}`];
        if (coVestingType) {
          await this.clickOnCoVestingType();
          await this.selectCoVestingType(coVestingType);
        }
        if (`Co First Name ${i}` in pairsData) {
          await this.fillCoFirstName([pairsData[`Co First Name ${i}`]] || '');
        }
        if (`Co Middle Name ${i}` in pairsData) {
          await this.fillCoMiddleName([pairsData[`Co Middle Name ${i}`]] || '');
        }
        if (`Co Last Name ${i}` in pairsData) {
          await this.fillCoLastName([pairsData[`Co Last Name ${i}`]] || '');
        }
        if (`Co SSN ${i}` in pairsData) {
          await scrollToElement(this.coSsnId);
          await this.clickOnCoSsnId();
          await this.coSsnId.pressSequentially(String(pairsData[`Co SSN ${i}`]) || '');
        }
        if (i < noOfPairs) {
          await scrollToElement(this.newPair);
          await this.addNewPair();
        } else {
          await this.clickOnNextButton();
        }
      };
    };
    const isVisible = await this.saveButton.isVisible();
    if (isVisible) {
      await this.clickOnSaveButton();
    };
  }*/

  fillingBorrowerPairs = async (borrowerPairsRows) => {
    // Filter out completely empty rows
    const validPairs = borrowerPairsRows.filter(row =>
      Object.keys(row).some(key => key.includes("First Name"))
    );
    console.log(`Total borrower pairs to fill: ${validPairs.length}`);
    if (validPairs.length === 0) {
      console.warn("No valid borrower pairs found. Skipping Borrower Pairs section.");
      return;
    }
    await this.borrowerInfo.waitFor({ state: 'visible' });
    await this.clickOnborrowerInfo();
    await this.loanFieldsSpinner.waitFor({ state: 'hidden' });
    await this.downArrow.waitFor({ state: 'visible' });
    await this.clickOnDownArrow();
    while (!(await this.pencilIcon.isVisible())) {
      await this.clickOnDownArrow();
      await this.page.waitForTimeout(200);
    };
    await this.clickOnPencilIcon();
    await this.yesBtn.waitFor({ state: 'visible' });
    await this.clickYesBtn();
    await this.loanFieldsSpinner.waitFor({ state: "hidden" });

    for (let i = 0; i < validPairs.length; i++) {
      const pair = validPairs[i];
      const pairNumber = i + 1;
      console.log(`Filling Borrower Pair ${pairNumber}`);

      if (pair[`Vesting Type`])
        await this.clickOnVestingType().then(() => this.selectVestingType(pair[`Vesting Type`]));

      if (pair[`First Name`]) await this.fillFirstName([pair[`First Name`]]);
      if (pair[`Middle Name`]) await this.fillMiddleName([pair[`Middle Name`]]);
      if (pair[`Last Name`]) await this.fillLastName([pair[`Last Name`]]);

      if (pair[`SSN`]) {
        await scrollToElement(this.ssnId);
        await this.clickOnSsnId();
        await this.ssnId.pressSequentially(String(pair[`SSN`]));
      }

      if (pair[`Co Vesting Type`])
        await this.clickOnCoVestingType().then(() => this.selectCoVestingType(pair[`Co Vesting Type`]));

      if (pair[`Co First Name`]) await this.fillCoFirstName([pair[`Co First Name`]]);
      if (pair[`Co Middle Name`]) await this.fillCoMiddleName([pair[`Co Middle Name`]]);
      if (pair[`Co Last Name`]) await this.fillCoLastName([pair[`Co Last Name`]]);

      if (pair[`Co SSN`]) {
        await scrollToElement(this.coSsnId);
        await this.clickOnCoSsnId();
        await this.coSsnId.pressSequentially(String(pair[`Co SSN`]));
      }

      if (pairNumber < validPairs.length) {
        await scrollToElement(this.newPair);
        await this.addNewPair();
      }
    }

    await this.clickOnNextButton();
    const saveIsVisible = await this.saveButton.isVisible();
    if (saveIsVisible) await this.clickOnSaveButton();

    for (let i = 0; i < validPairs.length; i++) {
      const pair = validPairs[i];
      const pairNumber = i + 1;
      console.log(`Filling detailed info for Borrower Pair ${pairNumber}`);
      await this.fillingBorrowerInfoFromPairs(pair);
      await this.fillingCoBorrowerInfoFromPairs(pair);
      await this.fillingEmploymentIncomeFromPairs(pair);
      await this.fillingCoEmploymentIncomeFromPairs(pair);
      await this.fillingDemographicInfoFromPairs(pair);
      await this.fillingCoDemographicInfoFromPairs(pair);
      await this.fillHomeOwnershipAndEducationFromPairs(pair);
      await this.fillCoHomeOwnershipAndEducationFromPairs(pair);
      await this.fillMilitaryServiceLanguagePreferenceFromPairs(pair);
      await this.fillCoMilitaryServiceLanguagePreferenceFromPairs(pair);

      if (i < validPairs.length - 1) {
        await this.clickOnDownArrow();
        await this.borrowersList.nth(i + 1).click();
        await this.clickOnPageMenu();
        await this.clickOnBorrowerInformation();
      }
    }
  };

  validateBorrowerPairs = async (allPairsData) => {
    await this.borrowerInfo.waitFor({ state: 'visible' });
    await this.clickOnborrowerInfo();
    await this.downArrow.waitFor({ state: 'visible' });
    await this.clickOnDownArrow();
    const noOfBorrowers = await this.borrowersList.count();
    for (let j = 0; j < noOfBorrowers; j++) {
      await this.borrowersList.nth(j).click();
      const firstNameValue = await this.borrowerFirstName.getAttribute('value');
      expect(firstNameValue).toBe(allPairsData[j][`First Name ${j + 1}`]);
      console.log(`validated first name ${j + 1}: ${firstNameValue}`);
      const middleNameValue = await this.borrowerMiddleName.getAttribute('value');
      expect(middleNameValue).toBe(allPairsData[j][`Middle Name ${j + 1}`]);
      console.log(`validated middle name ${j + 1}: ${middleNameValue}`);
      const lastNameValue = await this.borrowerLastName.getAttribute('value');
      expect(lastNameValue).toBe(allPairsData[j][`Last Name ${j + 1}`]);
      console.log(`validated last name ${j + 1}: ${lastNameValue}`);
      const coFirstNameValue = await this.coborrowerFirstName.getAttribute('value');
      expect(coFirstNameValue).toBe(allPairsData[j][`Co First Name ${j + 1}`]);
      console.log(`validated coborrower first name ${j + 1}: ${coFirstNameValue}`);
      const coMiddleNameValue = await this.coborrowerMiddleName.getAttribute('value');
      expect(coMiddleNameValue).toBe(allPairsData[j][`Co Middle Name ${j + 1}`]);
      console.log(`validated coborrower middle name ${j + 1}: ${coMiddleNameValue}`);
      const coLastNameValue = await this.coborrowerLastName.getAttribute('value');
      expect(coLastNameValue).toBe(allPairsData[j][`Co Last Name ${j + 1}`]);
      console.log(`validated coborrower last name ${j + 1}: ${coLastNameValue}`);
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      await this.clickOnDownArrow();
    };
  };

  /*fillBorrowerEmailFromPairs = async (pairsData, i) => {
    if (`Email ${i}` in pairsData) {
      await scrollToElement(this.emailBorrower);
      await this.refillBorrowerEmail([pairsData[`Email ${i}`]]);
    }
  };
   
  fillBorrowerPersonalDetailsFromPairs = async (pairsData, i) => {
    if (`Citizenship ${i}` in pairsData) {
      await scrollToElement(this.citizenship);
      await this.clickOnCitizenship();
      await this.citizenshipUSdropdown.click();
    }
    if (`Dob ${i}` in pairsData) {
      await scrollToElement(this.dobBorrower);
      await this.clickOnDateOfBirth();
      await this.dobBorrower.pressSequentially(String(pairsData[`Dob ${i}`]));
    }
    if (`Marital Status ${i}` in pairsData) {
      await scrollToElement(this.maritalStatus);
      await this.clickOnMaritalStatus();
      await this.maritalStatusOption.click();
    }
  };
   
  fillBorrowerContactFromPairs = async (pairsData, i) => {
    if (`Home Phone ${i}` in pairsData) {
      await scrollToElement(this.homePhone);
      await this.refillHomePhoneNo([String(pairsData[`Home Phone ${i}`])]);
    };
    if (`Work Phone ${i}` in pairsData) {
      await scrollToElement(this.workPhone);
      await this.refillWorkPhoneNo([String(pairsData[`Work Phone ${i}`])]);
    };
    if (`Cell Phone ${i}` in pairsData) {
      await scrollToElement(this.cellPhone);
      await this.refillCellPhoneNo([String(pairsData[`Cell Phone ${i}`])]);
    };
  };
   
  fillBorrowerAddressFromPairs = async (pairsData, i) => {
    if (`Zip ${i}` in pairsData) {
      await scrollToElement(this.zipCode);
      await this.refillZipCode([String(pairsData[`Zip ${i}`])]);
    };
    if (`Street Address ${i}` in pairsData) {
      await scrollToElement(this.borrowerStreetAddress);
      await this.refillStreetAddress([pairsData[`Street Address ${i}`]]);
    };
    if (`Years ${i}` in pairsData) {
      await scrollToElement(this.years);
      await this.refillYears([String(pairsData[`Years ${i}`])]);
    };
    if (`Months ${i}` in pairsData) {
      await scrollToElement(this.months);
      await this.refillMonths([String(pairsData[`Months ${i}`])]);
    };
  };
   
  fillingBorrowerInfoFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    if (`Citizenship ${i}` in pairsData) {
      const citizenshipValue = pairsData[`Citizenship ${i}`];
      this.citizenshipUSdropdown = frame.locator(`//h3[text()='Borrower']/following::span[text()='${citizenshipValue}']`);
    };
    if (`Marital Status ${i}` in pairsData) {
      const maritalStatusValue = pairsData[`Marital Status ${i}`];
      this.maritalStatusOption = frame.locator(`//h3[text()='Borrower']/following::span[text()='${maritalStatusValue}']`);
    };
    await this.fillBorrowerEmailFromPairs(pairsData, i);
    await this.fillBorrowerPersonalDetailsFromPairs(pairsData, i);
    await this.fillBorrowerContactFromPairs(pairsData, i);
    await this.fillBorrowerAddressFromPairs(pairsData, i);
    await this.handleBorrowerHousing();
    await this.handleMailingCopy();
  };*/

  fillingBorrowerInfoFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");

    if (pair["Citizenship"]) {
      const citizenshipDropdown = frame.locator(`//h3[text()='Borrower']/following::span[text()='${pair["Citizenship"]}']`);
      try {
        await scrollToElement(this.citizenship);
        await this.clickOnCitizenship();
        await citizenshipDropdown.click({ timeout: 2000 });
      } catch {
        console.log(`Citizenship '${pair["Citizenship"]}' not found, skipping.`);
      }
    }

    if (pair["Marital Status"]) {
      const maritalStatusOption = frame.locator(`//h3[text()='Borrower']/following::span[text()='${pair["Marital Status"]}']`);
      try {
        await scrollToElement(this.maritalStatus);
        await this.clickOnMaritalStatus();
        await maritalStatusOption.click({ timeout: 2000 });
      } catch {
        console.log(`Marital Status '${pair["Marital Status"]}' not found, skipping.`);
      }
    }

    if (pair["Email"]) {
      await scrollToElement(this.emailBorrower);
      await this.refillBorrowerEmail([pair["Email"]]);
    }

    if (pair["Dob"]) {
      await scrollToElement(this.dobBorrower);
      await this.clickOnDateOfBirth();
      await this.dobBorrower.pressSequentially(String(pair["Dob"]));
    }

    if (pair["Home Phone"]) {
      await scrollToElement(this.homePhone);
      await this.refillHomePhoneNo([String(pair["Home Phone"])]);
    }
    if (pair["Work Phone"]) {
      await scrollToElement(this.workPhone);
      await this.refillWorkPhoneNo([String(pair["Work Phone"])]);
    }
    if (pair["Cell Phone"]) {
      await scrollToElement(this.cellPhone);
      await this.refillCellPhoneNo([String(pair["Cell Phone"])]);
    }

    if (pair["Zip"]) {
      await scrollToElement(this.zipCode);
      await this.refillZipCode([String(pair["Zip"])]);
    }
    if (pair["Street Address"]) {
      await scrollToElement(this.borrowerStreetAddress);
      await this.refillStreetAddress([pair["Street Address"]]);
    }
    if (pair["Years"]) {
      await scrollToElement(this.years);
      await this.refillYears([String(pair["Years"])]);
    }
    if (pair["Months"]) {
      await scrollToElement(this.months);
      await this.refillMonths([String(pair["Months"])]);
    }
    if (pair["Street Address"]) {
      await this.handleBorrowerHousing().catch(() => console.log("No housing info to handle."));
      await this.handleMailingCopy().catch(() => console.log("No mailing copy to handle."));
    }
  };

  /*fillCoBorrowerEmailFromPairs = async (pairsData, i) => {
    if (`Co Email ${i}` in pairsData) {
      await scrollToElement(this.coemailBorrower);
      await this.refillCoBorrowerEmail([pairsData[`Co Email ${i}`]]);
    }
  };
   
  fillCoBorrowerPersonalDetailsFromPairs = async (pairsData, i) => {
    if (`Co Citizenship ${i}` in pairsData) {
      await scrollToElement(this.cocitizenship);
      await this.clickOnCoCitizenship();
      await this.clickOnCoUSCitizenship();
    }
    if (`Co Dob ${i}` in pairsData) {
      await scrollToElement(this.codobBorrower);
      await this.clickOnCoDateOfBirth();
      await this.codobBorrower.pressSequentially(String(pairsData[`Co Dob ${i}`]));
    }
    if (`Co Marital Status ${i}` in pairsData) {
      await scrollToElement(this.comaritalStatus);
      await this.clickOnCoMaritalStatus();
      await this.comaritalStatusOption.click();
    }
  };
   
  fillCoBorrowerContactFromPairs = async (pairsData, i) => {
    if (`Co Home Phone ${i}` in pairsData) {
      await scrollToElement(this.cohomePhone);
      await this.refillCoHomePhoneNo([String(pairsData[`Co Home Phone ${i}`])]);
    }
    if (`Co Work Phone ${i}` in pairsData) {
      await scrollToElement(this.coworkPhone);
      await this.refillCoWorkPhoneNo([String(pairsData[`Co Work Phone ${i}`])]);
    }
    if (`Co Cell Phone ${i}` in pairsData) {
      await scrollToElement(this.cocellPhone);
      await this.refillCoCellPhoneNo([String(pairsData[`Co Cell Phone ${i}`])]);
    }
  };
   
  fillCoBorrowerAddressFromPairs = async (pairsData, i) => {
    if (`Co Zip ${i}` in pairsData) {
      await scrollToElement(this.coBorrowerZipCode);
      await this.refillCoBorrowerZipCode([String(pairsData[`Co Zip ${i}`])]);
    }
    if (`Co Street Address ${i}` in pairsData) {
      await scrollToElement(this.coBorrowerStreetAddress);
      await this.refillCoBorrowerStreetAddress([pairsData[`Co Street Address ${i}`]]);
    }
    if (`Co Years ${i}` in pairsData) {
      await scrollToElement(this.coBorrowYears);
      await this.refillCoBorrowYears([String(pairsData[`Co Years ${i}`])]);
    }
    if (`Co Months ${i}` in pairsData) {
      await scrollToElement(this.coBorrowMonths);
      await this.refillCoBorrowMonths([String(pairsData[`Co Months ${i}`])]);
    }
  };
   
  fillingCoBorrowerInfoFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    if (`Co Citizenship ${i}` in pairsData) {
      const coCitizenshipValue = pairsData[`Co Citizenship ${i}`];
      this.cocitizenshipUSdropdown = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${coCitizenshipValue}']`);
    };
    if (`Co Marital Status ${i}` in pairsData) {
      const coMaritalStatusValue = pairsData[`Co Marital Status ${i}`];
      this.comaritalStatusOption = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${coMaritalStatusValue}']`);
    };
    await this.fillCoBorrowerEmailFromPairs(pairsData, i);
    await this.fillCoBorrowerPersonalDetailsFromPairs(pairsData, i);
    await this.fillCoBorrowerContactFromPairs(pairsData, i);
    await this.fillCoBorrowerAddressFromPairs(pairsData, i);
    await this.handleCoBorrowerHousing();
    await this.handleCoMailingCopy();
  };*/

  fillingCoBorrowerInfoFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");

    if (pair["Co Citizenship"]) {
      const coCitizenshipDropdown = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${pair["Co Citizenship"]}']`);
      try {
        await scrollToElement(this.cocitizenship);
        await this.clickOnCoCitizenship();
        await coCitizenshipDropdown.click({ timeout: 2000 });
      } catch {
        console.log(`Co-Citizenship '${pair["Co Citizenship"]}' not found, skipping.`);
      }
    }

    if (pair["Co Marital Status"]) {
      const coMaritalStatusOption = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${pair["Co Marital Status"]}']`);
      try {
        await scrollToElement(this.comaritalStatus);
        await this.clickOnCoMaritalStatus();
        await coMaritalStatusOption.click({ timeout: 2000 });
      } catch {
        console.log(`Co-Marital Status '${pair["Co Marital Status"]}' not found, skipping.`);
      }
    }

    if (pair["Co Email"]) {
      await scrollToElement(this.coemailBorrower);
      await this.refillCoBorrowerEmail([pair["Co Email"]]);
    }

    if (pair["Co Dob"]) {
      await scrollToElement(this.codobBorrower);
      await this.clickOnCoDateOfBirth();
      await this.codobBorrower.pressSequentially(String(pair["Co Dob"]));
    }

    if (pair["Co Home Phone"]) {
      await scrollToElement(this.cohomePhone);
      await this.refillCoHomePhoneNo([String(pair["Co Home Phone"])]);
    }
    if (pair["Co Work Phone"]) {
      await scrollToElement(this.coworkPhone);
      await this.refillCoWorkPhoneNo([String(pair["Co Work Phone"])]);
    }
    if (pair["Co Cell Phone"]) {
      await scrollToElement(this.cocellPhone);
      await this.refillCoCellPhoneNo([String(pair["Co Cell Phone"])]);
    }

    if (pair["Co Zip"]) {
      await scrollToElement(this.coZipCode);
      await this.refillCoBorrowerZipCode([String(pair["Co Zip"])]);
    }
    if (pair["Co Street Address"]) {
      await scrollToElement(this.coBorrowerStreetAddress);
      await this.refillCoBorrowerStreetAddress([pair["Co Street Address"]]);
    }
    if (pair["Co Years"]) {
      await scrollToElement(this.coBorrowYears);
      await this.refillCoBorrowYears([String(pair["Co Years"])]);
    }
    if (pair["Co Months"]) {
      await scrollToElement(this.coBorrowMonths);
      await this.refillCoBorrowMonths([String(pair["Co Months"])]);
    }

    if (pair["Co Street Address"]) {
      await this.handleCoBorrowerHousing().catch(() => console.log("No co-borrower housing info to handle."));
      await this.handleCoMailingCopy().catch(() => console.log("No co-borrower mailing copy to handle."));
    }
  };

  fillingPropertyTitleandTrustFromPairs = async (pairsData) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");

    if ("Attachment Type" in pairsData && pairsData["Attachment Type"]) {
      const attachmentType = pairsData["Attachment Type"];
      this.attachmentTypeOption = frame.locator(
        `//label[text()='Attachment Type']/following::span[text()='${attachmentType}']`
      );
    }

    if ("Property Type" in pairsData && pairsData["Property Type"]) {
      const propertyType = pairsData["Property Type"];
      this.propertyTypeOption = frame.locator(
        `//label[text()='Property Type']/following::span[text()='${propertyType}']`
      );
    }

    await this.clickOnPageMenu();
    await this.clickOnPropertyTitlePage();
    await this.loanFieldsSpinner.waitFor({ state: "hidden" });

    await this.fillPropertyAddressFromPairs(pairsData);
    await this.fillPropertyDetailsFromPairs();
    await this.fillPropertyValuesFromPairs(pairsData);
  };

  fillPropertyAddressFromPairs = async (pairsData) => {
    if ("Property Zip" in pairsData && pairsData["Property Zip"]) {
      await scrollToElement(this.zipCode);
      await this.refillZipCode([String(pairsData["Property Zip"])]);
    }
    if ("Property Street Address" in pairsData && pairsData["Property Street Address"]) {
      await scrollToElement(this.borrowerStreetAddress);
      await this.refillStreetAddress([pairsData["Property Street Address"]]);
    }
    if ("Number of Units" in pairsData && pairsData["Number of Units"]) {
      await scrollToElement(this.noOfUnits);
      await this.fillNoOfUnits([String(pairsData["Number of Units"])]);
    }
  };

  fillPropertyValuesFromPairs = async (pairsData) => {
    if ("Estimated Value" in pairsData && pairsData["Estimated Value"]) {
      await scrollToElement(this.estimatedValue);
      await this.refillEstimatedValue([String(pairsData["Estimated Value"])]);
    }
    if ("Appraised Value" in pairsData && pairsData["Appraised Value"]) {
      await scrollToElement(this.appraisedValue);
      await this.refillAppraisedValue([String(pairsData["Appraised Value"])]);
    }
  };

  fillPropertyDetailsFromPairs = async () => {
    if (this.attachmentTypeOption) {
      await this.clickOnAttachmentType();
      await this.clickOnAttachmentTypeOption();
    }
    if (this.propertyTypeOption) {
      await this.clickOnPropertyType();
      await this.clickOnPropertyTypeOption();
    }
  };

  clickOnPropertyTypeOption = async () => {
    await excuteSteps(this.test, this.propertyTypeOption, "click", `Clicking on Property Type Option`);
  };

  clickOnAttachmentTypeOption = async () => {
    await excuteSteps(this.test, this.attachmentTypeOption, "click", `Clicking on Property Type Option`);
  };

  fillingLoanInfoFromPairs = async (pairsData) => {
    await this.clickOnPageMenu();
    await this.clickOnLoanInfoPage();

    if ("Loan Purpose" in pairsData && pairsData["Loan Purpose"]) {
      await this.selectLoanPurpose(pairsData["Loan Purpose"]);
    }
    if ("Mortgage Type" in pairsData && pairsData["Mortgage Type"]) {
      await this.selectMortgageType(pairsData["Mortgage Type"]);
    }
    if ("Amortization Type" in pairsData && pairsData["Amortization Type"]) {
      await this.setAmortizationType(pairsData["Amortization Type"]);
    }
    if ("Mortgage Lien Type" in pairsData && pairsData["Mortgage Lien Type"]) {
      await this.setMortgageLienType(pairsData["Mortgage Lien Type"]);
    }

    await this.fillLoanFieldsFromPairs(pairsData);
    await this.clickOnSaveBtn();
  };

  fillLoanFieldsFromPairs = async (pairsData) => {
    if ("Purchase Price" in pairsData && pairsData["Purchase Price"]) {
      await scrollToElement(this.purchasePrice);
      await this.fillPurchasePrice([String(pairsData["Purchase Price"])]);
    }
    if ("Down Payment" in pairsData && pairsData["Down Payment"]) {
      await this.fillDownPayment([String(pairsData["Down Payment"])]);
    }
    if ("Note Rate" in pairsData && pairsData["Note Rate"]) {
      await this.fillNoteRate([String(pairsData["Note Rate"])]);
    }
    if ("Loan Term" in pairsData && pairsData["Loan Term"]) {
      await scrollToElement(this.loanTerm);
      await this.fillLoanTerm([String(pairsData["Loan Term"])]);
    }
    if ("Due In" in pairsData && pairsData["Due In"]) {
      await this.fillDueIn([String(pairsData["Due In"])]);
    }
  };

  fillEmploymentAddressFromPairs = async (pairsData, i) => {
    if (`Emp Zip ${i}` in pairsData) {
      await scrollToElement(this.zipCode);
      await this.refillZipCode([String(pairsData[`Emp Zip ${i}`])]);
    }
    if (`Emp Street Address ${i}` in pairsData) {
      await scrollToElement(this.borrowerStreetAddress);
      await this.refillStreetAddress([pairsData[`Emp Street Address ${i}`]]);
    }
  };

  fillEmploymentDatesFromPairs = async (pairsData, i) => {
    if (`Emp Years ${i}` in pairsData) {
      await scrollToElement(this.years);
      await this.refillEmpYears([String(pairsData[`Emp Years ${i}`])]);
    }
    if (`Emp Months ${i}` in pairsData) {
      await scrollToElement(this.months);
      await this.refillEmpMonths([String(pairsData[`Emp Months ${i}`])]);
    }
  };

  fillCoEmploymentAddressFromPairs = async (pairsData, i) => {
    if (`Co Emp Zip ${i}` in pairsData) {
      await scrollToElement(this.coZipCode);
      await this.refillCoEmpZipCode([String(pairsData[`Co Emp Zip ${i}`])]);
    }
    if (`Co Emp Street Address ${i}` in pairsData) {
      await scrollToElement(this.coEmpStreetAddress);
      await this.refillCoEmpStreetAddress([pairsData[`Co Emp Street Address ${i}`]]);
    }
  };

  fillCoEmploymentDatesFromPairs = async (pairsData, i) => {
    if (`Co Emp Years ${i}` in pairsData) {
      await scrollToElement(this.coEmpYears);
      await this.refillCoEmpYears([String(pairsData[`Co Emp Years ${i}`])]);
    }
    if (`Co Emp Months ${i}` in pairsData) {
      await scrollToElement(this.coEmpMonths);
      await this.refillCoEmpMonths([String(pairsData[`Co Emp Months ${i}`])]);
    }
  };

  /*fillingEmploymentIncomeFromPairs = async (pairsData, i) => {
    await this.clickOnPageMenu();
    await this.clickOnEmploymentAndIncome();
    if (`Business Name ${i}` in pairsData) {
      await scrollToElement(this.employerBusinessName);
      await this.refillEmployerBusinessName([pairsData[`Business Name ${i}`]]);
    }
    await this.fillEmploymentAddressFromPairs(pairsData, i);
    if (`Start Date ${i}` in pairsData) {
      await scrollToElement(this.startDate);
      await this.fillStartDate(pairsData[`Start Date ${i}`]);
    }
    await this.fillEmploymentDatesFromPairs(pairsData, i);
    if (`Base Pay ${i}` in pairsData) {
      await scrollToElement(this.baseMonthlyPay);
      await this.refillEmploymentPay([String(pairsData[`Base Pay ${i}`])]);
    }
    const loanNumber = await this.loanNumber.innerText();
    console.log("Loan Number:", loanNumber);
  };*/

  fillingEmploymentIncomeFromPairs = async (pair) => {
    await this.clickOnPageMenu();
    await this.clickOnEmploymentAndIncome();

    if (pair["Business Name"]) {
      try {
        await scrollToElement(this.employerBusinessName);
        await this.refillEmployerBusinessName([pair["Business Name"]]);
      } catch {
        console.log(`Business Name '${pair["Business Name"]}' not found, skipping.`);
      }
    }

    if (pair["Emp Zip"]) {
      try {
        await scrollToElement(this.zipCode);
        await this.refillZipCode([String(pair["Emp Zip"])]);
      } catch {
        console.log(`Zip Code '${pair["Emp Zip"]}' not found, skipping.`);
      }
    }

    if (pair["Emp Street Address"]) {
      try {
        await scrollToElement(this.borrowerStreetAddress);
        await this.refillStreetAddress([pair["Emp Street Address"]]);
      } catch {
        console.log(`Street Address '${pair["Emp Street Address"]}' not found, skipping.`);
      }
    }

    if (pair["Start Date"]) {
      try {
        await scrollToElement(this.startDate);
        await this.fillStartDate(pair["Start Date"]);
      } catch {
        console.log(`Start Date '${pair["Start Date"]}' not found, skipping.`);
      }
    }

    if (pair["Emp Years"]) {
      try {
        await scrollToElement(this.years);
        await this.refillEmpYears([String(pair["Emp Years"])]);
      } catch {
        console.log(`Employment Years '${pair["Emp Years"]}' not found, skipping.`);
      }
    }

    if (pair["Emp Months"]) {
      try {
        await scrollToElement(this.months);
        await this.refillEmpMonths([String(pair["Emp Months"])]);
      } catch {
        console.log(`Employment Months '${pair["Emp Months"]}' not found, skipping.`);
      }
    }

    if (pair["Base Pay"]) {
      try {
        await scrollToElement(this.baseMonthlyPay);
        await this.refillEmploymentPay([String(pair["Base Pay"])]);
      } catch {
        console.log(`Base Pay '${pair["Base Pay"]}' not found, skipping.`);
      }
    }

    const loanNumber = await this.loanNumber.innerText();
    console.log("Loan Number:", loanNumber);
  };

  /*fillingCoEmploymentIncomeFromPairs = async (pairsData, i) => {
    if (`Co Business Name ${i}` in pairsData) {
      await scrollToElement(this.coemployerBusinessName);
      await this.refillCoEmployerBusinessName([pairsData[`Co Business Name ${i}`]]);
    }
    await this.fillCoEmploymentAddressFromPairs(pairsData, i);
    if (`Co Start Date ${i}` in pairsData) {
      await scrollToElement(this.coStartDate);
      await this.fillCoStartDate(pairsData[`Co Start Date ${i}`]);
    }
    await this.fillCoEmploymentDatesFromPairs(pairsData, i);
    if (`Co Base Pay ${i}` in pairsData) {
      await scrollToElement(this.coBaseMonthlyPay);
      await this.refillCoEmploymentPay([String(pairsData[`Co Base Pay ${i}`])]);
    }
    await this.clickOnSaveBtn();
  };*/

  fillingCoEmploymentIncomeFromPairs = async (pair) => {
    if (pair["Co Business Name"]) {
      try {
        await scrollToElement(this.coemployerBusinessName);
        await this.refillCoEmployerBusinessName([pair["Co Business Name"]]);
      } catch {
        console.log(`Co Business Name '${pair["Co Business Name"]}' not found, skipping.`);
      }
    }

    if (pair["Co Emp Zip"]) {
      try {
        await scrollToElement(this.coZipCode);
        await this.refillCoEmpZipCode([String(pair["Co Emp Zip"])]);
      } catch {
        console.log(`Co Emp Zip '${pair["Co Emp Zip"]}' not found, skipping.`);
      }
    }

    if (pair["Co Emp Street Address"]) {
      try {
        await scrollToElement(this.coEmpStreetAddress);
        await this.refillCoEmpStreetAddress([pair["Co Emp Street Address"]]);
      } catch {
        console.log(`Co Emp Street Address '${pair["Co Emp Street Address"]}' not found, skipping.`);
      }
    }

    if (pair["Co Start Date"]) {
      try {
        await scrollToElement(this.coStartDate);
        await this.fillCoStartDate(pair["Co Start Date"]);
      } catch {
        console.log(`Co Start Date '${pair["Co Start Date"]}' not found, skipping.`);
      }
    }

    if (pair["Co Emp Years"]) {
      try {
        await scrollToElement(this.coEmpYears);
        await this.refillCoEmpYears([String(pair["Co Emp Years"])]);
      } catch {
        console.log(`Co Emp Years '${pair["Co Emp Years"]}' not found, skipping.`);
      }
    }

    if (pair["Co Emp Months"]) {
      try {
        await scrollToElement(this.coEmpMonths);
        await this.refillCoEmpMonths([String(pair["Co Emp Months"])]);
      } catch {
        console.log(`Co Emp Months '${pair["Co Emp Months"]}' not found, skipping.`);
      }
    }

    if (pair["Co Base Pay"]) {
      try {
        await scrollToElement(this.coBaseMonthlyPay);
        await this.refillCoEmploymentPay([String(pair["Co Base Pay"])]);
      } catch {
        console.log(`Co Base Pay '${pair["Co Base Pay"]}' not found, skipping.`);
      }
    }

    await this.clickOnSaveBtn();
  };

  /*fillingDemographicInfoFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const interviewOption = pairsData[`Interview Option ${i}`];
    const ethnicity = pairsData[`Ethnicity ${i}`];
    const race = pairsData[`Race ${i}`];
    const sex = pairsData[`Sex ${i}`];
    if (interviewOption) {
      this.interviewOption = frame.locator(`//h3[text()='Borrower']/following::span[text()='${interviewOption}']`);
    }
    if (ethnicity) {
      this.ethnicityCheckbox = frame.locator(`(//span[text()='${ethnicity}'])[1]/preceding::input[1]`);
    }
    if (race) {
      this.raceCheckbox = frame.locator(`(//span[text()='${race}'])[1]/preceding::input[1]`);
    }
    if (sex) {
      this.sexCheckbox = frame.locator(`(//span[text()='${sex}'])[1]/preceding::input[1]`);
    }
    await this.clickOnPageMenu();
    await this.clickOnDemographicInfo();
    //await this.clickOnDemographicInfoBtn();
    await this.demographicInfoProvided.waitFor({ state: 'visible' });
    await retryClick(this.demographicInfoProvided);
    if (interviewOption) {
      await this.selectInterviewOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      while (!(await this.interviewOption.isVisible())) {
        console.log("option disappeared — reselecting.");
        await this.clickOnDemographicInfoBtn();
        await this.selectInterviewOption();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      }
    }
    if (ethnicity) {
      await scrollToElement(this.ethnicityCheckbox);
      await this.clickUntilChecked(this.ethnicityCheckbox);
    }
    if (race) {
      await scrollToElement(this.raceCheckbox);
      await this.clickUntilChecked(this.raceCheckbox);
    }
    if (sex) {
      await scrollToElement(this.sexCheckbox);
      await this.clickUntilChecked(this.sexCheckbox);
    }
  };*/

  fillingDemographicInfoFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const interviewOption = pair[`Interview Option`];
    const ethnicity = pair[`Ethnicity`];
    const race = pair[`Race`];
    const sex = pair[`Sex`];

    await this.clickOnPageMenu();
    await this.clickOnDemographicInfo();

    if (interviewOption) {
      this.interviewOption = frame.locator(`//h3[text()='Borrower']/following::span[text()='${interviewOption}']`);
      await this.clickOnDemographicInfoBtn();
      while (!(await this.interviewOption.isVisible())) {
        await this.clickOnDemographicInfoBtn();
        await this.page.waitForTimeout(200);
      }
      await this.selectInterviewOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      while (!(await this.interviewOption.isVisible())) {
        console.log("option disappeared — reselecting.");
        await this.clickOnDemographicInfoBtn();
        await this.selectInterviewOption();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      }
    }

    if (ethnicity) {
      try {
        this.ethnicityCheckbox = frame.locator(`(//span[text()='${ethnicity}'])[1]/preceding::input[1]`);
        await scrollToElement(this.ethnicityCheckbox);
        await this.clickUntilChecked(this.ethnicityCheckbox);
      } catch {
        console.log(`Ethnicity '${ethnicity}' option not found, skipping.`);
      }
    }

    if (race) {
      try {
        this.raceCheckbox = frame.locator(`(//span[text()='${race}'])[1]/preceding::input[1]`);
        await scrollToElement(this.raceCheckbox);
        await this.clickUntilChecked(this.raceCheckbox);
      } catch {
        console.log(`Race '${race}' option not found, skipping.`);
      }
    }

    if (sex) {
      try {
        this.sexCheckbox = frame.locator(`(//span[text()='${sex}'])[1]/preceding::input[1]`);
        await scrollToElement(this.sexCheckbox);
        await this.clickUntilChecked(this.sexCheckbox);
      } catch {
        console.log(`Sex '${sex}' option not found, skipping.`);
      }
    }
  };

  /*fillingCoDemographicInfoFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const interviewOption = pairsData[`Co Interview Option ${i}`];
    const ethnicity = pairsData[`Co Ethnicity ${i}`];
    const race = pairsData[`Co Race ${i}`];
    const sex = pairsData[`Co Sex ${i}`];
    if (interviewOption) this.coInterviewOption = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${interviewOption}']`);
    if (ethnicity) this.coEthnicityCheckbox = frame.locator(`(//span[text()='${ethnicity}'])[2]/preceding::input[1]`);
    if (race) this.coRaceCheckbox = frame.locator(`(//span[text()='${race}'])[2]/preceding::input[1]`);
    if (sex) this.coSexCheckbox = frame.locator(`(//span[text()='${sex}'])[2]/preceding::input[1]`);
    //await this.clickOnCoDemographicInfoBtn();
    await this.coDemographicInfoProvided.waitFor({ state: 'visible' });
    await retryClick(this.coDemographicInfoProvided);
    if (interviewOption) {
      await this.selectCoInterviewOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      while (!(await this.coInterviewOption.isVisible())) {
        console.log("Co-Borrower interview option disappeared — reselecting.");
        //await this.clickOnCoDemographicInfoBtn();
        await retryClick(this.coDemographicInfoProvided);
        await this.selectCoInterviewOption();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      }
    }
    if (ethnicity) {
      await scrollToElement(this.coEthnicityCheckbox);
      await this.clickUntilChecked(this.coEthnicityCheckbox);
    }
    if (race) {
      await scrollToElement(this.coRaceCheckbox);
      await this.clickUntilChecked(this.coRaceCheckbox);
    }
    if (sex) {
      await scrollToElement(this.coSexCheckbox);
      await this.clickUntilChecked(this.coSexCheckbox);
    }
  };*/

  fillingCoDemographicInfoFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const coInterviewOption = pair[`Co Interview Option`];
    const coEthnicity = pair[`Co Ethnicity`];
    const coRace = pair[`Co Race`];
    const coSex = pair[`Co Sex`];

    if (coInterviewOption) {
      this.coInterviewOption = frame.locator(`//h3[text()='Co-Borrower']/following::span[text()='${coInterviewOption}']`);
      await this.clickOnCoDemographicInfoBtn();
      while (!(await this.coInterviewOption.isVisible())) {
        await this.clickOnCoDemographicInfoBtn();
        await this.page.waitForTimeout(200);
      }
      await this.selectCoInterviewOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));

      while (!(await this.coInterviewOption.isVisible())) {
        console.log("Co Interview Option disappeared — reselecting.");
        await this.clickOnCoDemographicInfoBtn();
        await this.selectCoInterviewOption();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      }
    }

    if (coEthnicity) {
      try {
        this.coEthnicityCheckbox = frame.locator(`(//span[text()='${coEthnicity}'])[2]/preceding::input[1]`);
        await scrollToElement(this.coEthnicityCheckbox);
        await this.clickUntilChecked(this.coEthnicityCheckbox);
      } catch {
        console.log(`Co Ethnicity '${coEthnicity}' option not found, skipping.`);
      }
    }

    if (coRace) {
      try {
        this.coRaceCheckbox = frame.locator(`(//span[text()='${coRace}'])[2]/preceding::input[1]`);
        await scrollToElement(this.coRaceCheckbox);
        await this.clickUntilChecked(this.coRaceCheckbox);
      } catch {
        console.log(`Co Race '${coRace}' option not found, skipping.`);
      }
    }

    if (coSex) {
      try {
        this.coSexCheckbox = frame.locator(`(//span[text()='${coSex}'])[2]/preceding::input[1]`);
        await scrollToElement(this.coSexCheckbox);
        await this.clickUntilChecked(this.coSexCheckbox);
      } catch {
        console.log(`Co Sex '${coSex}' option not found, skipping.`);
      }
    }
  };

  /*fillMilitaryServiceLanguagePreferenceFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const militaryService = pairsData[`Military Service ${i}`];
    if (militaryService) {
      this.militaryServiceOption = frame.locator(
        `//h3[text()='Borrower']/following::label[@aria-label='Military Service']/following::span[text()='${militaryService}']`
      );
    }
    await this.clickOnPageMenu();
    await this.clickOnMilitaryService();
    //await this.clickOnMilitaryServiceArrow();
    await this.militaryServiceArrow.waitFor({ state: 'visible' });
    await retryClick(this.militaryServiceArrow);
    if (militaryService) {
      await this.clickOnMilitaryServiceOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    }
    if (militaryService) {
      while (!(await this.militaryServiceOption.isVisible())) {
        console.log("Military Service option disappeared — reselecting.");
        //await this.clickOnMilitaryServiceArrow();
        await retryClick(this.militaryServiceArrow);
        await this.clickOnMilitaryServiceOption();
        await this.test.step("The page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
      }
    }
    await this.clickOnLanguagePreferenceArrow();
    await this.clickOnLanguagePreferenceEnglish();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.languagePreferenceEnglishOption.isVisible())) {
      console.log("Language Preference option disappeared — reselecting.");
      await this.clickOnLanguagePreferenceArrow();
      await this.clickOnLanguagePreferenceEnglish();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    }
  };*/

  fillMilitaryServiceLanguagePreferenceFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const militaryService = pair[`Military Service`];

    if (militaryService) {
      this.militaryServiceOption = frame.locator(
        `//h3[text()='Borrower']/following::label[@aria-label='Military Service']/following::span[text()='${militaryService}']`
      );
    }

    await this.clickOnPageMenu();
    await this.clickOnMilitaryService();

    if (militaryService) {
      try {
        while (!(await this.militaryServiceOption.isVisible())) {
          await this.clickOnMilitaryServiceArrow();
          await this.page.waitForTimeout(200);
        }
        await this.militaryServiceOption.click();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        while (!(await this.militaryServiceOption.isVisible())) {
          console.log("Military Service option disappeared — reselecting.");
          await this.clickOnMilitaryServiceArrow();
          await this.militaryServiceOption.click();
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        }
      } catch (error) {
        console.log(`Error while selecting Military Service option: ${error.message}`);
      }

      try {
        while (!(await this.languagePreferenceEnglishOption.isVisible())) {
          await this.clickOnLanguagePreferenceArrow();
          await this.page.waitForTimeout(200);
        }
        await this.clickOnLanguagePreferenceEnglish();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        while (!(await this.languagePreferenceEnglishOption.isVisible())) {
          console.log("Language Preference option disappeared — reselecting.");
          await this.clickOnLanguagePreferenceArrow();
          await this.clickOnLanguagePreferenceEnglish();
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        }
      } catch (error) {
        console.log(`Error while selecting Language Preference option: ${error.message}`);
      }
    }
  };

  /*fillCoMilitaryServiceLanguagePreferenceFromPairs = async (pairsData, i) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const militaryService = pairsData[`Co Military Service ${i}`];
    if (militaryService) {
      this.coMilitaryServiceOption = frame.locator(
        `//h3[text()='Co-Borrower']/following::label[@aria-label='Military Service']/following::span[text()='${militaryService}']`
      );
    }
    if (militaryService) {
      //await this.clickOnCoMilitaryServiceArrow();
      await this.coMilitaryServiceArrow.waitFor({ state: 'visible' });
      await retryClick(this.coMilitaryServiceArrow);
      await this.clickOnCoMilitaryServiceOption();
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      while (!(await this.coMilitaryServiceOption.isVisible())) {
        console.log("Co-Borrower Military Service option disappeared — reselecting.");
        //await this.clickOnCoMilitaryServiceArrow();
        await retryClick(this.coMilitaryServiceArrow);
        await this.clickOnCoMilitaryServiceOption();
        await this.test.step("The page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
      }
    }
    await this.clickOnCoLanguagePreferenceArrow();
    await this.clickOnCoLanguagePreferenceEnglish();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    while (!(await this.coLanguagePreferenceEnglishOption.isVisible())) {
      console.log("Co-Borrower Language Preference option disappeared — reselecting.");
      await this.clickOnCoLanguagePreferenceArrow();
      await this.clickOnCoLanguagePreferenceEnglish();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
    }
  };*/

  fillCoMilitaryServiceLanguagePreferenceFromPairs = async (pair) => {
    const frame1 = this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']");
    const frame = frame1.frameLocator("//iframe[@title='Forms Frame']");
    const coMilitaryService = pair[`Co Military Service`];

    if (coMilitaryService) {
      this.coMilitaryServiceOption = frame.locator(
        `//h3[text()='Co-Borrower']/following::label[@aria-label='Military Service']/following::span[text()='${coMilitaryService}']`
      );
    }

    if (coMilitaryService) {
      try {
        while (!(await this.coMilitaryServiceOption.isVisible())) {
          await this.clickOnCoMilitaryServiceArrow();
          await this.page.waitForTimeout(200);
        }
        await this.coMilitaryServiceOption.click();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        while (!(await this.coMilitaryServiceOption.isVisible())) {
          console.log("Co Military Service option disappeared — reselecting.");
          await this.clickOnCoMilitaryServiceArrow();
          await this.coMilitaryServiceOption.click();
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        }
      } catch (error) {
        console.log(`Error while selecting Co Military Service option: ${error.message}`);
      }

      try {
        while (!(await this.coLanguagePreferenceEnglishOption.isVisible())) {
          await this.clickOnCoLanguagePreferenceArrow();
          await this.page.waitForTimeout(200);
        }
        await this.clickOnCoLanguagePreferenceEnglish();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));

        while (!(await this.coLanguagePreferenceEnglishOption.isVisible())) {
          console.log("Co Language Preference option disappeared — reselecting.");
          await this.clickOnCoLanguagePreferenceArrow();
          await this.clickOnCoLanguagePreferenceEnglish();
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        }
      } catch (error) {
        console.log(`Error while selecting Co Language Preference option: ${error.message}`);
      }
    }
  };

  newLoanCreationUsingPairs = async (loanData) => {
    await this.borrowerInfo.waitFor({ state: 'visible' });
    await this.clickOnborrowerInfo();
    await this.loanFieldsSpinner.waitFor({ state: 'hidden' });
    const pairsData = loanData[0];
    const noOfPairs = pairsData["No of Pairs"];
    console.log(`no of borrower pairs: ${noOfPairs}`);
    for (let i = 1; i <= noOfPairs; i++) {
      console.log(`Filling Borrower Pair ${i}`);
      await this.fillingBorrowerInfoFromPairs(pairsData, i);
      await this.fillingCoBorrowerInfoFromPairs(pairsData, i);
      await this.fillingEmploymentIncomeFromPairs(pairsData, i);
      await this.fillingCoEmploymentIncomeFromPairs(pairsData, i);
      await this.fillingDemographicInfoFromPairs(pairsData, i);
      await this.fillingCoDemographicInfoFromPairs(pairsData, i);
      await this.fillHomeOwnershipAndEducationFromPairs(pairsData, i);
      await this.fillCoHomeOwnershipAndEducationFromPairs(pairsData, i);
      await this.fillMilitaryServiceLanguagePreferenceFromPairs(pairsData, i);
      await this.fillCoMilitaryServiceLanguagePreferenceFromPairs(pairsData, i);
      if (i < noOfPairs) {
        await this.clickOnDownArrow();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.borrowersList.nth(i).click();
        await this.clickOnPageMenu();
        await this.clickOnBorrowerInformation();
      };
    };
    await this.fillingPropertyTitleandTrustFromPairs(pairsData);
    await this.fillingLoanInfoFromPairs(pairsData);
    await this.fillAcknowledgmentAgreement();
  };
};
