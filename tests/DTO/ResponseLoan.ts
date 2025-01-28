export class ResponseLoan {
  riskScore: number
  riskLevel: string
  riskPeriods: number
  applicationId: string
  riskDecision: string

  constructor(
    riskScore: number,
    riskLevel: string,
    riskPeriods: number,
    applicationId: string,
    riskDecision: string,
  ) {
    this.riskScore = riskScore
    this.riskLevel = riskLevel
    this.riskPeriods = riskPeriods
    this.applicationId = applicationId
    this.riskDecision = riskDecision
  }
  static serializeResponse1(json: any): ResponseLoan {
    return new ResponseLoan(
      json.riskScore,
      json.riskLevel,
      json.riskPeriods,
      json.applicationId,
      json.riskDecision,
    )
  }
}
