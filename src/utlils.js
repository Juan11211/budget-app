export const currencyformatter = new Intl.NumberFormat(undefined, {
    currency: "usd", 
    style: "currency",
    minimumFractionDigits: 0
})

// pass undefinded, to define language 
// set minFraction digits to not return 00 at the end of every #