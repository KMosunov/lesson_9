export class OrderDTO {
  status: string | undefined
  courierId: number | undefined
  customerName: string | undefined
  customerPhone: string | undefined
  comment: string | undefined
  id: number | undefined

  constructor(
    status: string | undefined,
    courierId: number | undefined,
    customerName: string | undefined,
    customerPhone: string | undefined,
    comment: string | undefined,
    id: number | undefined,
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
  static generateEmptyOrderDto(): OrderDTO {
    return {
      comment: undefined,
      courierId: undefined,
      customerName: undefined,
      customerPhone: undefined,
      id: undefined,
      status: undefined
    }
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
