/**
 * Helper method for createTicket to get current date in SQL format
 *
 * @author KooiInc
 * (https://stackoverflow.com/users/58186/kooiinc)
 *
 * @adapted from https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
 * @returns Date (YYYY-MM-DD HH:MM:SS)
 */
export const createDate = () => {
  //@ts-ignore
  Number.prototype.padLeft = function (base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
  };
  const d = new Date(Date.now());
  const date =
    [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') +
    ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
  return date;
};
