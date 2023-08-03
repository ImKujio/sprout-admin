/**
 * 日期转时间
 * @param {Date} date
 * @return {string}
 */
export function date2Hms(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return hours + ':' + minutes + ':' + seconds;
}

/**
 * 时间转日期
 * @param {string} time
 * @return {Date}
 */
export function hms2Date(time) {
    if (time == null || time.trim().length === 0) return null
    const arr = time.split(":")
    if (arr.length === 1) return new Date(2000, 1, 1, Number.parseInt(arr[0]), 0, 0)
    if (arr.length === 2) return new Date(2000, 1, 1, Number.parseInt(arr[0]), Number.parseInt(arr[1]), 0)
    if (arr.length >= 3) return new Date(2000, 1, 1, Number.parseInt(arr[0]), Number.parseInt(arr[1]), Number.parseInt(arr[2]))
    return null
}