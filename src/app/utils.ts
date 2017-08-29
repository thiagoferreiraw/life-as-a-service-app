export class DateUtils{
    static addDays(dt, days) {  
        var dat = new Date(dt.valueOf())  
        dat.setDate(dat.getDate() + days);
        return dat;
    }
}
