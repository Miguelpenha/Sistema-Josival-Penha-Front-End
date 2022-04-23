export interface IreceitaMonth {
    preco: string
    precoBruto: number
    pago: boolean
    observação: string
    fixaDay: string
}

export interface IreceitaMonths {
    '01': IreceitaMonth
    '02': IreceitaMonth
    '03': IreceitaMonth
    '04': IreceitaMonth
    '05': IreceitaMonth
    '06': IreceitaMonth
    '07': IreceitaMonth
    '08': IreceitaMonth
    '09': IreceitaMonth
    '10': IreceitaMonth
    '11': IreceitaMonth
    '12': IreceitaMonth
}

export interface Ireceita {
    nome: string
    preco: string
    precoBruto: number
    data?: string
    fixa?: boolean
    fixaDay?: string
    auto?: boolean
    pago?: boolean
    months: IreceitaMonths
}

export interface Idespesa {
    nome: string
    preco: string
    precoBruto: number
    data?: string
    fixa?: boolean
    fixaDay?: string
    auto?: boolean
    pago?: boolean
    months: IreceitaMonths
}