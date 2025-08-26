import { Decimal } from "decimal.js";
import Currency from "../enums/Currency";

export function formatMoney(currency: Currency, money: string) {
    const moneyDecimal = new Decimal(money);
    const [intPart, fracPart] = moneyDecimal.toFixed().split(".");

    const options: Intl.NumberFormatOptions = {
        style: "currency",
        minimumFractionDigits: 0,
    };

    switch (currency) {
        case Currency.IDR:
            options.currency = "IDR";
            const formattedInt = new Intl.NumberFormat("id-ID", options).format(+intPart);
            return fracPart ? `${formattedInt},${fracPart}` : `${formattedInt},00`;
    }
}
