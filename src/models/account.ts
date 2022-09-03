export interface IAccount {

    id: string,
    type: string,
    balance: number,
    transactions?: string[],
    maximumOverdraftLimit?: number,
    allowedOverdraftLimit?: number,
    minimumBalance?: number,   
}
