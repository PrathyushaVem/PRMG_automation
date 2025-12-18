async function getBorrowerPairsForLoan(borrowerPairsSheet, loanNumber) {
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

module.exports = { getBorrowerPairsForLoan };