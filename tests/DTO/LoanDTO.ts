import { ResponseLoan } from './ResponseLoan'

export class LoanDTO {
  income: number | undefined;
  debt: number | undefined;
  age: number| undefined;
  employed: boolean | undefined;
  loanAmount: number | undefined;
  loanPeriod: number | undefined;

  constructor(income: number | undefined , debt: number | undefined, age: number | undefined, employed: boolean | undefined, loanAmount: number | undefined, loanPeriod: number | undefined) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static generateRandomLoanDto_1 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (1000000 - 1) + 1)),
      +Math.floor( (Math.random() * (100000))),
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }
  static generateRandomLoanDto_2 (): LoanDTO {
    return new LoanDTO(
      0,
      +Math.floor( (Math.random() * (100000))),
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_3 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (1000000 - 1) + 1)),
      -1,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_4 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (1000000 - 1) + 1)),
      +Math.floor( (Math.random() * (100000))),
      Math.floor( (Math.random() * (16 - 0.5) + 0.5)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_5 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (1000000 - 1) + 1)),
      +Math.floor( (Math.random() * (100000))),
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      -100,
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_6 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (1000000 - 1) + 1)),
      +Math.floor( (Math.random() * (100000))),
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      -1,
    )
  }

  static generateRandomLoanDto_7 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (1000 - 1) + 1)),
      0,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_8 (): LoanDTO {
    return new LoanDTO(
      100,
      0,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      100,
      +Math.floor( (Math.random() * (100 - 30) + 30)),
    )
  }

  static generateRandomLoanDto_9 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      0,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (10000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_10 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (150000 - 100000) + 100000)),
      0,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (5 - 3) + 3)),
    )
  }

  static generateRandomLoanDto_11 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (150000 - 100000) + 100000)),
      0,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (20 - 15) + 15)),
    )
  }

  static generateRandomLoanDto_12 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (200000 - 190000) + 190000)),
      0,
      Math.floor( (Math.random() * (50 - 30) + 30)),
      true,
      +Math.floor( (Math.random() * (10000 - 1) + 1)),
      +Math.floor( (Math.random() * (15 - 12) + 12)),
    )
  }

  static generateRandomLoanDto_13 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (20000 - 10000) + 10000)),
      0,
      Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (10000 - 1) + 1)),
      +Math.floor( (Math.random() * (2 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_14 (): LoanDTO {
    return new LoanDTO(
      undefined,
      +Math.floor( (Math.random() * (100000))),
      +Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }
  static generateRandomLoanDto_15 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (20000 - 10000) + 10000)),
      undefined,
      +Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }
  static generateRandomLoanDto_16 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (20000 - 10000) + 10000)),
      +Math.floor( (Math.random() * (100000))),
      undefined,
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }
  static generateRandomLoanDto_17 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (20000 - 10000) + 10000)),
      +Math.floor( (Math.random() * (100000))),
      +Math.floor( (Math.random() * (100 - 16) + 16)),
      undefined,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }
  static generateRandomLoanDto_18 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (20000 - 10000) + 10000)),
      +Math.floor( (Math.random() * (1000))),
      +Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      undefined,
      +Math.floor( (Math.random() * (30 - 1) + 1)),
    )
  }

  static generateRandomLoanDto_19 (): LoanDTO {
    return new LoanDTO(
      +Math.floor( (Math.random() * (20000 - 10000) + 10000)),
      +Math.floor( (Math.random() * (1000))),
      +Math.floor( (Math.random() * (100 - 16) + 16)),
      true,
      +Math.floor( (Math.random() * (100000 - 1) + 1)),
      undefined,
    )
  }

  static serializeResponse (json: any): ResponseLoan {
    return new ResponseLoan(
      json.riskScore,
      json.riskLevel,
      json.riskPeriods,
      json.applicationId,
      json.riskDecision,
    )
  }
}
//console.log(LoanDTO.generateRandomLoanDto())