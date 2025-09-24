const { excuteSteps } = require("../../utilities/actions");
const { test,expect } = require("@playwright/test");
const testData = require("../../test_Data/testData.json");
const path = require("path");
const{scrollToElement} = require("../../utilities/scrollInView");

const filePath = path.resolve(__dirname, "../../test_Data/Loan.xlsx");
const {
  highlightElement,
  highlighterRemove,
} = require("../../utilities/highlight_element");
const { exec } = require("child_process");

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
    const frame0=this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1=this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']")
    const frame=frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.allAppsHeader=page.locator("//h2[text()='Welcome to Encompass Admin!']");
    this.instanceId=page.locator("//input[@id='instance-id']");
    this.nextBtn=page.locator("//button[@name='next']");
    this.apps=page.locator("//button[@title='Apps']");
    this.pipeline=page.locator("//button[@label='Pipeline']");
    this.loadFolder=page.locator("//button[@aria-label='Loan Folder']");
    this.newLoan=frame0.locator("//button[@aria-label='New Loan']");
    this.publicLoanTemplate=page.locator("//span[contains(text(),'Public Loan Templates')]");
    this.companyWide=page.locator("//span[contains(text(),'Companywide')]");
    this.retailPurchaseLoan=page.locator("//span[contains(text(),'RETAIL PURCHASE Loans')]");
    this.applyBtn=page.locator("//button[text()='Apply']");
    this.borrowerInfo=frame.locator("//div[@aria-label='Borrower Information']");
    this.borrowerFirstName=frame.locator("(//label[contains(@aria-label,'First Name')]/following::input)[1]");
    this.borrowerMiddleName=frame.locator("(//label[contains(@aria-label,'Middle Name')]/following::input)[1]");
    this.borrowerLastName=frame.locator("(//label[contains(@aria-label,'Last Name')]/following::input)[1]");
    this.ssnInfo=frame.locator("(//label[contains(@aria-label,'SSN')]/following::input)[1]");
    this.citizenship=frame.locator("(//label[@aria-label='Citizenship']/following::button)[1]");
     this.dobBorrower=frame.locator("(//input[@placeholder='MM'])[1]");
    this.maritalStatus=frame.locator("(//label[@aria-label='Marital Status']/following::button)[1]");
    // this.citizenshipUSdropdown=frame.locator(`//span[text()='${[borrowerData["Citizenship"]]}']`);
    // this.maritalStatusOption=frame.locator(`//span[text()='${[borrowerData["Marital Status"]]}']`);
    this.homePhone=frame.locator("(//label[@aria-label='Home Phone']/following::input)[1]");
    this.workPhone=frame.locator("(//label[@aria-label='Work Phone']/following::input)[1]");
    this.cellPhone=frame.locator("(//label[@aria-label='Cell Phone']/following::input)[1]")
    this.emailBorrower=frame.locator("(//label[@aria-label='Email']/following::input)[1]");
    this.applicationViewHeader=frame.locator("//div[text()='Application View']");
    this.estimatedValue=frame.locator("(//label[contains(@aria-label,'Estimated Value')]/following::input)[1]");
    this.appraisedValue=frame.locator("(//label[contains(@aria-label,'Appraised Value')]/following::input)[1]");

    
    this.borrowerStreetAddress=frame.locator("(//label[contains(@aria-label,'Street Address')]/following::input)[1]");
    this.zipCode=frame.locator("(//label[contains(@aria-label,'Zip')]/following::input)[1]");
    this.years=frame.locator("(//label[@aria-label='Years']/following::input)[1]");
    this.months=frame.locator("(//label[@aria-label='Months']/following::input)[1]");
    this.borrowerHousing=frame.locator("(//label[@aria-label='Housing']/following::button)[1]");
    this.borrowerHousingOwnOption=frame.locator("//span[text()='Own']");
    this.mailingCopyFromCurrent=frame.locator("(//span[text()='Copy from Current'])[1]");

    this.pageMenu=frame.locator("//div[@data-testid='ds-page-header-menu']");
    this.creditInformation=frame.locator("//div[contains(text(),'Credit Information & Ordering')]");
    this.propertyTitle=frame.locator("//div[contains(text(),'Property, Title & Trust')]");
    this.attachmentType=frame.locator("(//label[@aria-label='Attachment Type']/following::button)[1]");
    this.dettached=frame.locator("//li//span[text()='Detached']");
    this.propertyType=frame.locator("(//label[@aria-label='Property Type']/following::button)[1]");
    this.noOfUnits=frame.locator("(//label[@aria-label='Number of Units']/following::input)[1]");
    this.yearBuilt=frame.locator("(//label[@aria-label='Year Built']/following::input)[1]");
    this.unmarriedStatus=frame.locator("//span[text()='Exclude Unmarried Addendum']");
    this.saveBtn=frame1.locator("//button[text()='Save']")
    this.city=frame.locator("(//label[@aria-label='City']/following::input)[1]");
    this.borrowerState=frame.locator("((//h3[text()='Borrower'])[2]/following::label[@aria-label='State']/following::input)[1]")
    this.state=frame.locator("(//label[@aria-label='State']/following::input)[1]");
    this.country=frame.locator("(//label[@aria-label='County']/following::input)[1]");
    this.noOfUnits=frame.locator("(//label[@aria-label='Number of Units']/following::input)[1]");

    this.loanInfoPage=frame.locator("//div[contains(text(),'Loan Information')]");
    // this.loanPurpose=frame.locator(`//label[normalize-space(span)='${[loanData["Loan Purpose"]]}']`);
    // this.mortgageType=frame.locator(`//span[text()='${loanData["Mortgage Type"]}']`);
    // this.amortizationType=frame.locator(`//input[@label='${loanData["Amortization Type"]}']`);
    // this.mortgageLienType=frame.locator(`//input[@label='${loanData["Mortgage Lien Type"]}']`);
    this.purchasePrice=frame.locator("(//label[@aria-label='Purchase Price']/following::input)[1]");
    this.downPayment=frame.locator("(//label[@aria-label='Down Payment']/following::input)[1]");
    this.noteRate=frame.locator("(//label[@aria-label='Note Rate']/following::input)[1]");
    this.loanTerm=frame.locator("(//label[@aria-label='Loan Term']/following::input)[1]");
    this.dueIn=frame.locator("(//label[@aria-label='Due In']/following::input)[1]");

    this.employmentAndIncome=frame.locator("//div[contains(text(),'Employment & Income')]");
    this.employerBusinessName=frame.locator("(//label[contains(@aria-label,'Employer or Business Name')]/following::input)[1]");
    this.positionOrTitle=frame.locator("(//label[contains(@aria-label,'Position')]/following::input)[1]");
    this.startDate=frame.locator("(//input[@placeholder='MM'])[1]");
    this.baseMonthlyPay=frame.locator("(//label[contains(@aria-label,'Base')]/following::input)[1]");

    this.demographicInformation= frame.locator("//div[contains(text(),'Demographic Information')]");
    this.demographicInfoProvided=frame.locator("(//label[contains(@aria-label,'The Demographic Information was provided')]/following::button)[1]");
    this.telophoneInterviewOption=frame.locator("//span[text()='Telephone Interview']");
    this.ethnicity=frame.locator("(//span[text()='Hispanic or Latino'])[1]");
    this.ethnicityMexican=frame.locator("(//span[text()='Mexican'])[1]");
    this.race=frame.locator("(//span[text()='White'])[1]");
    this.sex=frame.locator("(//span[text()='Male'])[1]");
    
    this.homeownershipEducation=frame.locator("//div[contains(text(),'Homeownership Education')]");
    this.borrowerHomeownership=frame.locator("(//span[text()='No'])[1]");
    this.borrowerHousingCounseling=frame.locator("(//span[text()='No'])[3]")

    this.militaryService=frame.locator("//div[contains(text(),'Military Service & Language Preference')]");

    this.spinner=frame0.locator("//div[contains(@aria-label,'Please wait.')]");
    this.loanFieldsSpinner=frame.locator("//span[contains(text(),'please wait')]");
    this.zipCountryCheck=frame.locator("//input[@value='US']");
    this.loanNumber=frame1.locator("//div[@class='headerSpacing loan-number']");

  }

  clickOnDemographicInfo=async()=>{
    await excuteSteps(this.test,this.demographicInformation,"click",`Clicking on demographic information`);
  };
  clickOnDemographicInfoBtn=async()=>{
    await excuteSteps(this.test,this.demographicInfoProvided,"click",`Clicking on demographic btn`);
  };
  clickonTelephoneInterview=async()=>{
    await excuteSteps(this.test,this.telophoneInterviewOption,"click",`Clicking on telephone interview option`);
  };
  
  clickonEthnicity=async()=>{
    await excuteSteps(this.test,this.ethnicity,"click",`Clicking on ethnicity option`);
  };

  fillBorrowerState=async(state)=>{
    await excuteSteps(this.test,this.borrowerState,"fill",`Filling state name`,state);
  };

  clickonMexicanOption=async()=>{
    await excuteSteps(this.test,this.ethnicityMexican,"click",`Clicking on ethnicity mexican`);
  };
  clickonRace=async()=>{
    await excuteSteps(this.test,this.race,"click",`Clicking on race`);
  };

  clickonSex=async()=>{
    await excuteSteps(this.test,this.sex,"click",`Clicking on sex of the person`);
  };
  clickonBorrowerHousingCounselingOpt=async()=>{
    await excuteSteps(this.test,this.borrowerHousingCounseling,"click",`Clicking on housing counseling no`);
  };

  clickOnHomeOnwnershipEducation=async()=>{
    await excuteSteps(this.test,this.homeownershipEducation,"click",`Clicking on homeownership education`);
  };
  
  clickonborrowerHomeOwnershipOpt=async()=>{
    await excuteSteps(this.test,this.borrowerHomeownership,"click",`Clicking on home ownership no`);
  };
  clickonBorrowerHousingCounselingOpt=async()=>{
    await excuteSteps(this.test,this.borrowerHousingCounseling,"click",`Clicking on borrower housing counseling`);
  };
  clickOnEmploymentAndIncome=async()=>{
    await excuteSteps(this.test,this.employmentAndIncome,"click",`Clicking on employment and income`);
  };

  fillBusinessName=async(name)=>{
    await excuteSteps(this.test,this.employerBusinessName,"fill",`Filing employer business name`,name);
  };

  fillPositionOrTitle=async(position)=>{
    await excuteSteps(this.test,this.positionOrTitle,"fill",`Filling position / title`,position);
  };
 
  fillBasePay=async(pay)=>{
    await excuteSteps(this.test,this.baseMonthlyPay,"fill",`Filling base pay per month`,pay);
  };

  scrollTillCitizenship =async()=>{
    await excuteSteps(this.test,this.citizenship,"scroll",`Scrolling till citizenship is visible`);
  };

  clickOnLoanPurpose=async()=>{
    await excuteSteps(this.test,this.loanPurpose,"click",`Clicking on Loan purchase`);
  };
  
  clickOnMortgageType=async()=>{
    await excuteSteps(this.test,this.mortgageType,"click",`Clicking on mortgage type`);
  };

  clickOnAmortizationType=async()=>{
    await excuteSteps(this.test,this.amortizationType,"click",`Clicking on amortization type`);
  };

  clickOnmortgageLienType=async()=>{
    await excuteSteps(this.test,this.mortgageLienType,"click",`Clicking on mortgage lien type`);
  };

  fillPurchasePrice=async(price)=>{
    await excuteSteps(this.test,this.purchasePrice,"fill",`Filling purchase price`,price);
  };

  fillDownPayment=async(downPayment)=>{
    await excuteSteps(this.test,this.downPayment,"fill",`Filling down payment`,downPayment);
  };

  fillNoteRate=async(rate)=>{
    await excuteSteps(this.test,this.noteRate,"fill",`filling note rate`,rate);
  };
  
  fillLoanTerm = async(term)=>{
    await excuteSteps(this.test,this.loanTerm,"fill",`Filling loan terms in months`,term);
  };

  fillDueIn=async(due)=>{
    await excuteSteps(this.test,this.dueIn,"fill",`Filling due in field`,due);
  };

  clickOnLoanInfoPage = async()=>{
    await excuteSteps(this.test,this.loanInfoPage,"click",`Clicking on Loan Information page`)
  };

  clickOnSaveBtn=async()=>{
    await excuteSteps(this.test,this.saveBtn,"click",`Clicking on save button`);
  };

  fillEstimatedValue=async(value)=>{
    await excuteSteps(this.test,this.estimatedValue,"fill",`Filling estimated value`,value);
  };

  fillAppraisedValue=async(value)=>{
    await excuteSteps(this.test,this.appraisedValue,"fill",`Filling appraised value`,value);
  };

  fillWorkPhone=async(num)=>{
    await excuteSteps(this.test,this.workPhone,"fill",`Filling work phone number`,num);
  };

  fillCellPhone=async(num)=>{
    await excuteSteps(this.test,this.cellPhone,"fill",`Filing cell phone number`,num);
  };

  clickOnPropertyType=async()=>{
    await excuteSteps(this.test,this.propertyType,"click",`Clicking on property type`);
  };

  fillCity=async(city)=>{
    await excuteSteps(this.test,this.city,"fill",`Filling city name`,city);
  };

  fillState=async(state)=>{
    await excuteSteps(this.test,this.state,"fill",`Filling state name`,state);
  };

  fillCountry=async(country)=>{
    await excuteSteps(this.test,this.country,"fill",`Filling country name`,country);
  };

  clickOnPropertyDettached=async()=>{
    await excuteSteps(this.test,this.dettached,"click",`Clicking on property dettached`);
  };

  clickOnAttachmentType=async()=>{
    await excuteSteps(this.test,this.attachmentType,"click",`Clicking on attachment type`);
  };

  clickOnAttachmentDettached = async()=>{
    await excuteSteps(this.test,this.dettached,"click",`Clicking on dettached as attachment type`);
  };

  fillBorrowerStreetAddress= async(stadd)=>{
    await excuteSteps(this.test,this.borrowerStreetAddress,"fill",`Filling borrower street address`,stadd);
  };
  
  fillZipCode=async(zip)=>{
    await excuteSteps(this.test,this.zipCode,"fill",`Filling zip code`,zip);
  };

  fillYears = async(year)=>{
    await excuteSteps(this.test,this.years,"fill",`Filling in years of stay`,year);
  };

  fillMonths=async(months)=>{
    await excuteSteps(this.test,this.months,"fill",`Filing in months of stay`,months);
  };

  clickOnBorrowerHousing = async()=>{
    await excuteSteps(this.test,this.borrowerHousing,"click",`Clicking on housing `);
  };

  fillNoOfUnits=async(units)=>{
    await excuteSteps(this.test,this.noOfUnits,"fill",`Filling number of untis`,units);
  };

  clickOnHousingOwnOption=async()=>{
    await excuteSteps(this.test,this.borrowerHousingOwnOption,"click",`Clicking on own housing option`);
  };

  clickOnPageMenu=async()=>{
    await excuteSteps(this.test,this.pageMenu,"click",`Clicking on page menu`);
  };
  
  clickOnCreditInfoPage=async()=>{
    await excuteSteps(this.test,this.creditInformation,"click",`Clicking on credit information`);
  };

  clickOnPropertyTitlePage=async()=>{
    await excuteSteps(this.test,this.propertyTitle,"click",`Clicking on property title and trust page`);
  }

  clickOnborrowerInfo=async()=>{
    await excuteSteps(this.test,this.borrowerInfo,"click",`Clicking on borrower Information`);
  };

  fillBorrowerFirstName= async(fname)=>{
    await excuteSteps(this.test,this.borrowerFirstName,"fill",`Filling borrower firt name`,fname);
  };

  fillBorrowerMiddleName=async(mName)=>{
    await excuteSteps(this.test,this.borrowerMiddleName,"fill",`Filling borrower middle name`,mName);
  };

  fillBorrowerLastName=async(lName)=>{
    await excuteSteps(this.test,this.borrowerLastName,"fill",`Filling borrower last name`,lName);
  };

  fillSSN=async(ssn)=>{
    await excuteSteps(this.test,this.ssnInfo,"fill",`Filling SSN number`,ssn);
  };

  clickOnCitizenship=async()=>{
    await excuteSteps(this.test,this.citizenship,"click",`Clicking on citizenship`);
  };

  clickOnUSCitizenship = async()=>{
    await excuteSteps(this.test,this.citizenshipUSdropdown,"click",`clicking on us citizenship`);
  };

  fillDateOfBirth=async(dob)=>{
    await excuteSteps(this.test,this.dobBorrower,"fill",`Filling date of birth`,dob);
  };

  clickOnMaritalStatus=async()=>{
    await excuteSteps(this.test,this.maritalStatus,"click",`Clicking on marital status dropdown`);
  };

  clickOnMaritalStatusOption=async()=>{
    await excuteSteps(this.test,this.maritalStatusOption,"click",`Clicking on unmarried option`);
  };

  fillHomePhoneNo=async(pNo)=>{
    await excuteSteps(this.test,this.homePhone,"fill",`Filling phone number`,pNo);
  };

  fillEmail=async(email)=>{
    await excuteSteps(this.test,this.emailBorrower,"fill",`Filling email of borrwer`,email);
  };

  clickonAllApps = async()=>{
    await excuteSteps(this.test,this.apps,"click",`Clicking on all apps`);
  };

  clickOnPipeline = async()=>{
    await excuteSteps(this.test,this.pipeline,"click",`Click on pipeline`);
  };

  fillInstance = async(insId)=>{
    await excuteSteps(this.test,this.instanceId,"fill",`Filing instance id`,insId);
  };

  clickOnNextBtn = async()=>{
    await excuteSteps(this.test,this.nextBtn,"click",`Clicking on next button`);
  };
  
  clickOnNewLoan = async()=>{
    await excuteSteps(this.test,this.newLoan,"click",`Clicking on new loan`);
  };

  clickOnPublicLoanTemplate = async()=>{
    await excuteSteps(this.test,this.publicLoanTemplate,"click",`Clicking on public loan template`);
  };
  scrollTillMaritalStatus =async()=>{
    await excuteSteps(this.test,this.maritalStatus,"scroll",`Scrolling till marital status`);
  }
  scrollTillSSn =async()=>{
    await excuteSteps(this.test,this.ssnInfo,"scroll",`Scroll into view`);
  };

  clickOnCompanyWide = async()=>{
    await excuteSteps(this.test,this.companyWide,"click",`Clicking on company wide`);
  };

  clickOnRetailPurchaseLoan=async()=>{
    await excuteSteps(this.test,this.retailPurchaseLoan,"click",`Clicking on retail purchase loan`);
  };
  clickOnApplyBtn = async()=>{
    await excuteSteps(this.test,this.applyBtn,"click",`Clicking on apply button`);
  };
  clickOnSsn=async()=>{
    await excuteSteps(this.test,this.ssnInfo,"click");
  }
  clickOnDateOfBirth=async()=>{
    await excuteSteps(this.test,this.dobBorrower,"click",`Clicking on date of birth field`);
  };
  clickOnMailingCurrent = async()=>{
    await excuteSteps(this.test,this.mailingCopyFromCurrent,"click",`Clicking on copy from current optin formailing address`);
  };
  clickonZipCode=async()=>{
    await excuteSteps(this.test,this.zipCode,"click",`Clicking on zip code`);
  }

  fillInstanceid=async()=>{
    await highlightElement(this.page,this.instanceId);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillInstance([process.env.instanceId]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await highlightElement(this.page,this.nextBtn);
    await this.clickOnNextBtn();
  }
  
  movingtoApplicationView = async()=>{
    const frame0=this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1=this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']")
    const frame=frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.newLoan=frame0.locator("//button[@aria-label='New Loan']");
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickonAllApps();
    await highlightElement(this.page,this.pipeline);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnPipeline();
    await highlightElement(this.page,this.newLoan);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnNewLoan();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnPublicLoanTemplate();
    await highlightElement(this.page,this.companyWide);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnCompanyWide();
    await highlightElement(this.page,this.retailPurchaseLoan);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnRetailPurchaseLoan();
    await highlightElement(this.page,this.applyBtn);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnApplyBtn();
  }

  unMarriedStatusCheck=async()=>{
    await highlightElement(this.page,this.borrowerInfo);
    await this.clickOnborrowerInfo();
    await highlightElement(this.page,this.borrowerFirstName);
    await this.fillBorrowerFirstName([testData.encompass.borrowerInformation.name.firstName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page,this.borrowerMiddleName);
    await this.fillBorrowerMiddleName([testData.encompass.borrowerInformation.name.middleName]);
    await highlightElement(this.page,this.borrowerLastName);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerLastName([testData.encompass.borrowerInformation.name.lastName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.scrollTillSSn();
    await highlightElement(this.page,this.ssnInfo);
    await this.clickOnSsn();
    await this.ssnInfo.pressSequentially(testData.encompass.borrowerInformation.ssn.value);
    await highlightElement(this.page,this.citizenship);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnCitizenship();
    await highlightElement(this.page,this.citizenshipUSdropdown);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUSCitizenship();
    await highlightElement(this.page,this.dobBorrower);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDateOfBirth();
    await this.dobBorrower.pressSequentially(testData.encompass.borrowerInformation.dateOfBirth.value);
    await highlightElement(this.page,this.maritalStatus);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatus();
    await highlightElement(this.page,this.maritalStatusOption);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatusOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

  };


  fillingBorrowerInfo=async(borrowerData)=>{
    const frame0=this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1=this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']")
    const frame=frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.citizenshipUSdropdown=frame.locator(`//span[text()='${[borrowerData["Citizenship"]]}']`);
    this.maritalStatusOption=frame.locator(`//span[text()='${[borrowerData["Marital Status"]]}']`);
    await this.clickOnborrowerInfo();
    await this.loanFieldsSpinner.waitFor({ state: 'hidden' });
    await this.fillBorrowerFirstName([borrowerData["First Name"]]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  await this.fillBorrowerMiddleName([borrowerData["Middle Name"]]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerLastName([borrowerData["Last Name"]]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.ssnInfo);
    await this.clickOnSsn();
    await this.ssnInfo.pressSequentially(String([borrowerData["SSN"]]));
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.citizenship);
    await this.clickOnCitizenship();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUSCitizenship();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDateOfBirth();
    await this.dobBorrower.pressSequentially(String([borrowerData["Dob"]]));
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.maritalStatus);
    await this.clickOnMaritalStatus();
    await this.clickOnMaritalStatusOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.homePhone);
    await this.fillHomePhoneNo([String([borrowerData["Home Phone"]])]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillWorkPhone(["2222222222"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillCellPhone(["3333333333"]);
    await this.clickOnSaveBtn();
    await scrollToElement(this.emailBorrower);
    await this.fillEmail([borrowerData["Email"]]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.borrowerStreetAddress);
    await this.fillBorrowerStreetAddress(["174 street"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.city);
    //  await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.smallWait));
    // });
    await this.fillCity(["Washington"]);
    // await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.smallWait));
    // });
    await this.fillBorrowerState(["DC"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillZipCode(["20013"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.fillYears(["10"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillMonths(["0"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSaveBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.borrowerHousing);
    await this.clickOnBorrowerHousing();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnHousingOwnOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSaveBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.mailingCopyFromCurrent);
    await this.clickOnMailingCurrent();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSaveBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  };

  fillingPropertyTitleandTrust = async(propertyData)=>{
    const frame0=this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1=this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']")
    const frame=frame1.frameLocator("//iframe[@title='Forms Frame']");
    await this.clickOnPageMenu();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnPropertyTitlePage();
    await expect(this.loanFieldsSpinner).toBeHidden();
    await this.fillBorrowerStreetAddress([propertyData["Street Address"]]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillCity([propertyData["City"]]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillState([propertyData["State"]]);
    await this.fillZipCode([String(propertyData["Zip"])]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillCountry([propertyData["Country"]]);
    await this.fillNoOfUnits([String(propertyData["Number of Units"])]);

    await this.clickOnAttachmentType();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnAttachmentDettached();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnPropertyType();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnPropertyDettached();
    await scrollToElement(this.estimatedValue);
    await this.fillEstimatedValue([String(propertyData["Estimated Value"])]);
    //await this.clickOnSaveBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillAppraisedValue([String(propertyData["Appraised Value"])]);
    await this.clickOnSaveBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
  }

  filingLoanInfo = async(loanData)=>{
    const frame0=this.page.frameLocator("//iframe[@id='pui-iframe-container-pipelineui']");
    const frame1=this.page.frameLocator("//iframe[@id='pui-iframe-container-encompassweb']")
    const frame=frame1.frameLocator("//iframe[@title='Forms Frame']");
    this.loanPurpose=frame.locator(`//label[normalize-space(span)='${[loanData["Loan Purpose"]]}']`);
    this.mortgageType=frame.locator(`//span[text()='${loanData["Mortgage Type"]}']`);
    this.amortizationType=frame.locator(`//input[@label='${loanData["Amortization Type"]}']`);
    this.mortgageLienType=frame.locator(`//input[@label='${loanData["Mortgage Lien Type"]}']`);
    await this.clickOnPageMenu();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnLoanInfoPage();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnLoanPurpose();
    await this.clickOnMortgageType();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    let amortizationChecked=await this.amortizationType.getAttribute('aria-checked');
    if(amortizationChecked === 'false'){
      await this.clickOnAmortizationType();
    }
    else{
      console.log("no action taken");
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    let lienchecked = await this.mortgageLienType.getAttribute('aria-checked');
    if(lienchecked === 'false'){
    await this.clickOnmortgageLienType();
    }
    else{
      console.log("no action taken");
    }
    await scrollToElement(this.purchasePrice);
    await this.fillPurchasePrice([String(loanData["Purchase Price"])]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillDownPayment([String(loanData["Down Payment"])]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillNoteRate([String(loanData["Note Rate"])]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.loanTerm);
    await this.fillLoanTerm([String(loanData["Loan Term"])]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillDueIn([String(loanData["Due In"])]);
    await this.clickOnSaveBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
  }

  fillingEmploymentIncome = async()=>{
    
    await this.clickOnPageMenu();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnEmploymentAndIncome();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBusinessName(["My Business"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.borrowerStreetAddress);
    await this.fillBorrowerStreetAddress(["174 street"])
    await this.fillCity(["Corona"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillState(["CA"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillZipCode(["92879"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.startDate);
    await this.startDate.pressSequentially("08012014");
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillYears(["10"]);
    await this.fillMonths(["0"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.baseMonthlyPay);
    await this.fillBasePay(["25000"]);
    await this.clickOnSaveBtn();
    const loanNumber=await this.loanNumber.innerText();
    console.log(loanNumber);
  }


  fillingDemographicInfo=async()=>{
    await this.clickOnPageMenu();
    await this.clickOnDemographicInfo();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDemographicInfoBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickonTelephoneInterview();
    await scrollToElement(this.ethnicity);
    await this.clickonEthnicity();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickonMexicanOption();
    await scrollToElement(this.race);
    await this.clickonRace();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await scrollToElement(this.sex);
    await this.clickonSex();
    await this.clickOnSaveBtn();
  }

  fillHomeOwnershipAndEducation=async()=>{
    await this.clickOnPageMenu();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnHomeOnwnershipEducation();
    await this.clickonborrowerHomeOwnershipOpt();
    await this.clickonBorrowerHousingCounselingOpt();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSaveBtn();
  }

  validationsOfUserDetails=async()=>{
    
    await highlightElement(this.page,this.borrowerInfo);
    await this.clickOnborrowerInfo();
    await highlightElement(this.page,this.borrowerFirstName);
    await this.fillBorrowerFirstName([testData.encompass.borrowerInformation.name.firstName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page,this.borrowerMiddleName);
    await this.fillBorrowerMiddleName([testData.encompass.borrowerInformation.name.middleName]);
    await highlightElement(this.page,this.borrowerLastName);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerLastName([testData.encompass.borrowerInformation.name.lastName]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.scrollTillSSn();
    await highlightElement(this.page,this.ssnInfo);
    await this.clickOnSsn();
    await this.ssnInfo.pressSequentially(testData.encompass.borrowerInformation.ssn.value);
    await highlightElement(this.page,this.citizenship);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnCitizenship();
    await highlightElement(this.page,this.citizenshipUSdropdown);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUSCitizenship();
    await highlightElement(this.page,this.dobBorrower);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDateOfBirth();
    await this.dobBorrower.pressSequentially(testData.encompass.borrowerInformation.dateOfBirth.value);
    await highlightElement(this.page,this.maritalStatus);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatus();
    await highlightElement(this.page,this.unmarriedOption);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMaritalStatusOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page,this.homePhone);
    await this.fillHomePhoneNo([testData.encompass.borrowerInformation.homePhone.num]);
    await highlightElement(this.page,this.emailBorrower);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await highlightElement(this.page,this.emailBorrower);
    await this.fillEmail([testData.encompass.borrowerInformation.email.mail]);
    await highlightElement(this.page,this.borrowerStreetAddress);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillBorrowerStreetAddress(["174 street"]);
    await highlightElement(this.page,this.zipCode);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillZipCode(["20013"]);
    await highlightElement(this.page,this.years);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillYears(["10"]);
    await highlightElement(this.page,this.months);
    await this.fillMonths(["0"]);
    await highlightElement(this.page,this.borrowerHousing);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnBorrowerHousing();
    await highlightElement(this.page,this.borrowerHousingOwnOption);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnHousingOwnOption();
    await highlightElement(this.page,this.mailingCopyFromCurrent);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnMailingCurrent();
    const bfname=await this.borrowerFirstName.inputValue();
    const bmname=await this.borrowerMiddleName.inputValue();
    const blname=await this.borrowerLastName.inputValue();
    const ssn=await this.ssnInfo.inputValue();
    const bstreetAddress=await this.borrowerStreetAddress.inputValue();
    const bzipCode=await this.zipCode.inputValue();
    await highlightElement(this.page,this.pageMenu)
    await this.clickOnPageMenu();
    await highlightElement(this.page,this.creditInformation);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnCreditInfoPage();
    const cfname=await this.borrowerFirstName.inputValue();
    const cmname=await this.borrowerMiddleName.inputValue();
    const clname=await this.borrowerLastName.inputValue();
    const cssn=await this.ssnInfo.inputValue();
    const cstreetAddress=await this.borrowerStreetAddress.inputValue();
    const czipCode=await this.zipCode.inputValue();
    await expect(bfname,"Validating first name is matching").toBe(cfname);
    await expect(bmname,"Validating middle name is matching").toBe(cmname);
    await expect(blname,"Validating if last name is matching").toBe(clname);
    await expect(ssn,"Validating ssn is matching").toBe(cssn);
    await expect(bstreetAddress,"Validating if street address is matching").toBe(cstreetAddress);
    await expect(bzipCode,"Validating if zip code is matching").toBe(czipCode);
  }

}