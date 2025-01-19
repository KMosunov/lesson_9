export class OrderDTO {
  status: string | undefined
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(
    status: string | undefined,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  static generateRandomOrderDto(): OrderDTO {
    return new OrderDTO(
      'OPEN',
      +Math.floor(Math.random()),
      'Anna',
      '909090999999',
      '7',
      +Math.floor(Math.random()),
    )
  }
  static generateFirstRandomOrderDto(): OrderDTO {
    return new OrderDTO(
      undefined,
      +Math.floor(Math.random()),
      'Anna',
      '909090999999',
      '7',
      +Math.floor(Math.random()),
    )
  }

  static serializeResponse(json: any): OrderDTO {
    return new OrderDTO(
      json.status,
      json.courierId,
      json.customerName,
      json.customerPhone,
      json.comment,
      json.id,
    )
  }
}
