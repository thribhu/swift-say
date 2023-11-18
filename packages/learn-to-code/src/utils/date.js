import {format} from 'date-fns'

/**
 * 
 * @param {Date} date - Date to format UI Friendly 
 * @returns 
 */
export function formatUiDate(date) {
    if(!date){
        return null
    }
    else {
        return format(date, 'MMMM d, yyyy')
    }
}