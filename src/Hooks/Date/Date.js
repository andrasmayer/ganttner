
export const dayNameShort = ["H", "K", "Sze", "Cs", "P", "Szo", "V"]
export const dayNameLong = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnak"]
//export const monthNamesShort = ["","","","","","","","","","","",""]
//export const monthNamesLong = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnak"]




export const dateFormat = (e) =>{
    let yy = e.getFullYear()
    let mm = e.getMonth()+1
    if(mm<10){ mm = `0${mm}` }
    let dd = e.getDate()
    if(dd<10){ dd = `0${dd}` }

    let monthNameShort = e.toLocaleDateString(navigator.language,{ month: "short" }).split(".").join("")
    monthNameShort = monthNameShort.split(monthNameShort[0]).join(monthNameShort[0].toUpperCase())
    let monthNameLong = e.toLocaleDateString(navigator.language,{ month: "long" }).split(".").join("")
    monthNameLong = monthNameLong.split(monthNameLong[0]).join(monthNameLong[0].toUpperCase())



    return({
        date:`${yy}-${mm}-${dd}`,
        year:yy,
        month:mm,
        day: dd,
        dayNameShort:dayNameShort[ e.getDay() == 0 ? 6 : e.getDay()-1],
        dayNameLong:dayNameLong[ e.getDay() == 0 ? 6 : e.getDay()-1],
        dayOfWeek:e.getDay(),
        monthNameShort:monthNameShort,
        monthNameLong:monthNameLong       

    })
}
export const dateDiff = (date1,date2) =>{
    date1 = new Date(date1)
    date2 = new Date(date2)
    const Difference_In_Time = date2.getTime() - date1.getTime()
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days
}
export const firstDateOfMonth = (e) =>{
    const date = e == null ? new Date() : new Date(e)
    const month = date.getMonth(); // January
    const d = new Date(date.getFullYear(), month, 1);
    return  dateFormat(d)
}
export const lastDateOfMonth = (e) =>{
    const date = e == null ? new Date() : new Date(e)
    const month = date.getMonth(); // January
    const d = new Date(date.getFullYear(), month + 1, 0);
   return  dateFormat(d)
}

export const addXDays = (obj)=>{
    const dateTime =  obj.date.setDate(    obj.date.getDate() + obj.days)
    return dateFormat( new Date(dateTime) )
}

export const calendar = (date) =>{
    date == null ? new Date() : new Date(date)
    const cal = {}
    const first = firstDateOfMonth(date)
    const last = lastDateOfMonth(date)
    for(let i= parseInt(first.day); i <= parseInt(last.day); i++){
       cal[i] = dateFormat( new Date(`${first.year}-${first.month}-${i}`) )
    }
    return cal
}