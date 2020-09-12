const ddMMyyyy = (date) => {
  var data = new Date(date),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
    ano = data.getFullYear();
  return dia + "/" + mes + "/" + ano;
}

const yyyyMMdd = (date) => {
  var data = new Date(date),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
    ano = data.getFullYear();
  return ano + "/" + mes + "/" + dia;
}

export default { ddMMyyyy , yyyyMMdd };
