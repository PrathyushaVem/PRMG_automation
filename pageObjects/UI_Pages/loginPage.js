const { excuteSteps } = require("../../utilities/actions");
const { test,expect } = require("@playwright/test");
const {
  highlightElement,
  highlighterRemove,
} = require("../../utilities/highlight_element");
exports.LoginPage = class LoginPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.username=page.locator("//input[@name='identifier']");
    this.nextBtn=page.locator("//input[@value='Next']");
    this.password=page.locator("//input[@name='credentials.passcode']");
    this.verifyBtn=page.locator("//input[@value='Verify']");
    this.encompass=page.locator("//span[text()='LO Connect']");
    this.myappHeader=page.locator("//h1[text()='My Apps']");
  }
  launchingApplication = async (baseUrl) => {
    await excuteSteps(
      this.test,
      await this.page,
      "navigate",
      `Navigate to the Revflow url`,
      baseUrl
    );
  };
  fillingUsername = async (email) => {
    await excuteSteps(
      this.test,
      this.username,
      "fill",
      `Enter username in username field`,
      email
    );
  };
  fillingPassword = async (pwd) => {
    await excuteSteps(
      this.test,
      this.password,
      "fill",
      `Entering password in password field`,
      pwd
    );
  };
  
  clickOnNextBtn = async()=>{
    await excuteSteps(this.test,this.nextBtn,"click",`Clicking on next button`);
  };

  scrollTillEncompass = async()=>{
    await excuteSteps(this.test,this.encompass,"scroll",`Scrolling till encompass application`);
  };

  clickOnEncompass = async()=>{
    await excuteSteps(this.test,this.encompass,"click",`Clicking on ecompass application`);
  };

  clickOnVerifyButton = async () => {
    await excuteSteps(
      this.test,
      this.verifyBtn,
      "click",
      `click on the submit button`
    );
  };

  loginWithValidCredentials = async (email, pwd) => {
    await highlightElement(this.page,this.username);
    await this.fillingUsername(email);
    await highlightElement(this.page,this.nextBtn);
    await this.clickOnNextBtn();
    await highlightElement(this.page,this.password);
    await this.fillingPassword(pwd);
    await highlightElement(this.page,this.verifyBtn);
    await this.clickOnVerifyButton(); 
  };

};
