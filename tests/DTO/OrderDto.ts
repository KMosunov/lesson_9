export class OrderDTO {
  status: string | undefined
  customerName: string | undefined
  customerPhone: string | undefined
  comment: string | undefined
  id: number | undefined
  courierId: number | undefined

  constructor(
    status: string | undefined,
    customerName: string | undefined,
    customerPhone: string | undefined,
    comment: string | undefined,
    id?: number,
    courierId?: number,
  ) {
    this.status = status
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
    this.courierId = courierId
  }

  static generateRandomOrderDto(): OrderDTO {
    return new OrderDTO('OPEN', 'David', '9494949494', 'no')
  }
  static generateFirstRandomOrderDto(): OrderDTO {
    return new OrderDTO(undefined, 'David', 'Anna', '909090999999')
  }
  static generateEmptyOrderDto(): OrderDTO {
    return {
      comment: undefined,
      courierId: undefined,
      customerName: undefined,
      customerPhone: undefined,
      id: undefined,
      status: undefined,
    }
  }

  static serializeResponse(json: any): OrderDTO {
    return new OrderDTO(
      json.status,
      json.customerName,
      json.customerPhone,
      json.comment,
      json.id,
      json.courierId,
    )
  }
}
