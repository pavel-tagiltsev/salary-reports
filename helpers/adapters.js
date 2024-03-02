export const pieceworkAdapter = (arr) => {
  return arr.map((row) => ({
    name: row['ФИО'],
    filial: row['Филиал'],
    group: row['Группа'],
    date: row['Занятие'],
    sum: row['Начислено всего'],
    duration: row['Время ас.ч.'],
    visits: row['Посещений'],
    records: row['Записей'],
  }))
}

export const incrementAdapter = (arr) => {
  return arr.map((row) => ({
    name: row['ФИО'],
    desc: row['Описание'],
    sum: row['Сумма'],
  }))
}

export const decrementAdapter = (arr) => {
  return arr.map((row) => ({
    name: row['ФИО'],
    desc: row['Описание'],
    sum: row['Сумма'],
  }))
}