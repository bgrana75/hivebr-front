export function repCalc(rep) {
    let out = ((Math.log10(Math.abs(rep))-9)*9)+25;
    out = Math.round(out);
    return out;
}