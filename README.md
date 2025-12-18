# PRMG_automation
Playwright - New Loan Creation Using Borrower Pairs
This project automates new loan creation(s) in Encompass using Playwright with Excel-driven data, including dynamic handling of Borrower Pairs.

Prerequisites:
- Node.js
- npm
- Playwright

Tech Stack:
- Playwright (JavaScript)
- Page Object Model (POM)
- Excel (.xlsm) as test data source

Execution timing and environment configuration are controlled via .env variables
Configuration: Environment variables
baseURL=""
userEmail=""
password=""
instanceId=""
extraSmallWait=1000
smallWait=2000
mediumWait=4000

Running the Tests:
npx playwright test

Project Structure:
pageObjects/        # UI page objects
utilities/          # Excel & borrower pair helpers
test_Data/          # Excel test data
tests/              # Playwright specs
.env                # Environment config

Excel Data Rules:
Sheets Used:
- Loans – One row per loan
- Borrower Pairs – Grouped (or Multiple)  rows per loan

Borrower Pair Logic: (Utils)
- Group rows by Loan Number
- getBorrowerPairsForLoan(sheet, loanNumber)
- Skip completely empty borrower rows using Valid Pairs Logic which prevents empty borrower creation and improves execution   time

Execution Notes:
- Encompass opens in a new browser tab; the test explicitly switches page context
- Borrower Pairs are processed in two phases: creation and data filling
- Defensive UI logic is used to handle dynamic page states
- Empty or incomplete borrower rows may be skipped to optimize execution time

Configurable logic:
- Borrower rows are considered valid based on the presence of borrower name columns. Rows without borrower data(First Name) may be skipped to avoid unnecessary UI actions

Functions Used:
Utility Functions:
- readExcel(filePath) - Reads Excel test data and returns sheet-wise JSON
- getBorrowerPairsForLoan(borrowerPairsSheet, loanNumber) - Groups borrower pair rows based on loan number, handling          grouped Excel rows

Page Object Functions:
Login Page: 
- launchingApplication(url)
- loginWithValidCredentials(email, password)
- scrollTillEncompass()
- clickOnEncompass()

Encompass Page:
- fillInstanceid()
- movingtoApplicationView()
- fillingBorrowerPairs(borrowerPairsRows) - Creates borrower pairs dynamically and fills Borrower and Co-Borrower fields      for pages where required
- fillingPropertyTitleandTrustFromPairs(loanData)
- fillingLoanInfoFromPairs(loanData)
- fillAcknowledgmentAgreement()

Key Notes:
- The Encompass application opens in a new tab. The test explicitly waits for and switches to the new page context before     continuing execution
- Loan Number appears only on the first row of each group
- No of Pairs indicates expected borrower sets
- Empty borrower rows are allowed and ignored at runtime
