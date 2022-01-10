const DateUtils = require("./DateUtils");

describe("test method 'isValid'", () => {
  test("should date object be true", () => {
    const result = DateUtils.isValid(new Date());
    expect(result).toBe(true);
  });
  test("should time string ('yyyy-MM-dd') be true", () => {
    const result = DateUtils.isValid("2021-12-01");
    expect(result).toBe(true);
  });
  test("should time string ('yyyy-MM-ddTHH:mm:ss') be truea", () => {
    const result = DateUtils.isValid("2021-12-01T00:00:00");
    expect(result).toBe(true);
  });
  test("should time string ('yyyy-MM-ddTHH:mm:ss.ffffffk') be truea", () => {
    const result = DateUtils.isValid("2021-12-01T00:00:00.000000Z");
    expect(result).toBe(true);
  });
  test("should time string ('yyyy-MM-ddTHH:mm:ss.000Z') be truea", () => {
    const result = DateUtils.isValid("2021-12-01T00:00:00.000Z");
    expect(result).toBe(true);
  });
  test("should non-time string be false", () => {
    const result = DateUtils.isValid("2021-1201");
    expect(result).toBe(false);
  });
  test("should empty string be false", () => {
    const result = DateUtils.isValid("");
    expect(result).toBe(false);
  });
});

describe("test method 'getDateObject'", () => {
  test("should return origin date (1969-12-31) with null param", () => {
    // origin date 1 January 1970 UTC.
    const temp = new Date(null);
    const date = DateUtils.getDateObject(null);
    expect(date.getFullYear()).toBe(temp.getFullYear());
    expect(date.getMonth()).toBe(temp.getMonth());
    expect(date.getDate()).toBe(temp.getDate());
  });
  test("should return current date with undefined param", () => {
    /** current date */
    const temp = new Date();
    const date = DateUtils.getDateObject(undefined);
    expect(date.getFullYear()).toBe(temp.getFullYear());
    expect(date.getMonth()).toBe(temp.getMonth());
    expect(date.getDate()).toBe(temp.getDate());
  });
  test("should return date with string param", () => {
    const str = "2021-12-01";
    const temp = DateUtils.getDateObject(str);
    const year = temp.getUTCFullYear(str);
    const month = temp.getUTCMonth(str) + 1;
    const date = temp.getUTCDate(str);
    expect(year).toBe(2021);
    expect(month).toBe(12);
    expect(date).toBe(1);
  });
  test("should return date with date object param", () => {
    const tempDate = new Date();
    const temp = DateUtils.getDateObject(tempDate);

    expect(temp.getFullYear()).toBe(tempDate.getFullYear());
    expect(temp.getMonth()).toBe(tempDate.getMonth());
    expect(temp.getDate()).toBe(tempDate.getDate());
  });
});

describe("test method 'append0'", () => {
  test("should return '0x' where x is from 0 to 9", () => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
      expect(DateUtils.append0(number)).toBe(`0${number}`);
    });
  });
  test("should return 'x' where X is greater than 10", () => {
    [10, 11].forEach((number) => {
      expect(DateUtils.append0(number)).toBe(`${number}`);
    });
  });
});

describe("test method 'getLocalDate'", () => {
  const timestamp0 = "2021-12-01 00:00:00";
  test("should return current date with empty params", () => {
    const temp = new Date();
    const date = DateUtils.getLocalDate();
    expect(temp.getFullYear()).toBe(date.getFullYear());
    expect(temp.getMonth()).toBe(date.getMonth());
    expect(temp.getDate()).toBe(date.getDate());
    expect(temp.getHours()).toBe(date.getHours());
    expect(temp.getMinutes()).toBe(date.getMinutes());
  });

  test(`should return local date with date = '${timestamp0}'`, () => {
    const temp = new Date(timestamp0);

    const date = DateUtils.getLocalDate(timestamp0);

    expect(date.getUTCFullYear()).toBe(temp.getUTCFullYear());
    expect(date.getUTCMonth()).toBe(temp.getUTCMonth());
    expect(date.getUTCDate()).toBe(temp.getUTCDate());
    expect(date.getUTCHours()).toBe(temp.getUTCHours());
    expect(date.getUTCMinutes()).toBe(temp.getUTCMinutes());
  });
  test(`should return local date with date = '${timestamp0}' and isUTCDate = 'true'`, () => {
    const temp = new Date(timestamp0);
    temp.setHours(temp.getHours() - (2 * temp.getTimezoneOffset()) / 60);

    const date = DateUtils.getLocalDate(timestamp0, true);

    expect(date.getFullYear()).toBe(temp.getFullYear());
    expect(date.getMonth()).toBe(temp.getMonth());
    expect(date.getDate()).toBe(temp.getDate());
    expect(date.getHours()).toBe(temp.getHours());
    expect(date.getMinutes()).toBe(temp.getMinutes());
  });
  test("should return current local date with invalid date string", () => {
    const temp = new Date();
    const date = DateUtils.getLocalDate("");

    expect(date.getFullYear()).toBe(temp.getFullYear());
    expect(date.getMonth()).toBe(temp.getMonth());
    expect(date.getDate()).toBe(temp.getDate());
    expect(date.getHours()).toBe(temp.getHours());
    expect(date.getMinutes()).toBe(temp.getMinutes());
  });
});

describe("test method 'getyyyyMMdd", () => {
  const dateString = "2021-12-01";
  const timeStamp = "00:00:00";

  const dateTimestamp = dateString + " " + timeStamp;
  test("should return string in form of 'yyyy-MM-dd' with empty params", () => {
    const resultString = DateUtils.getyyyyMMdd();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    const monthString = month > 9 ? "" + month : "0" + month;

    const dateString = date > 9 ? "" + date : "0" + date;

    const expectedString = `${year}-${monthString}-${dateString}`;

    expect(resultString).toBe(expectedString);
  });
  test(`should return string in form of 'yyyy-MM-dd' with date = '${dateTimestamp}'`, () => {
    const resultString = DateUtils.getyyyyMMdd(dateTimestamp);
    expect(resultString).toBe(dateString);
  });
  test(`should return string in form of 'yyyy-MM-dd' with date = '${dateTimestamp}' and isUTCDate = 'true'`, () => {
    const resultString = DateUtils.getyyyyMMdd(dateTimestamp, true);

    const dateObj = new Date(dateTimestamp);
    dateObj.setHours(dateObj.getHours() - dateObj.getTimezoneOffset() / 60);

    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    const monthString = month > 9 ? "" + month : "0" + month;
    const dateString = date > 9 ? "" + date : "0" + date;

    const expectedString = `${dateObj.getFullYear()}-${monthString}-${dateString}`;

    expect(resultString).toBe(expectedString);
  });
  test(`should return string in form of 'yyyy-MM-dd' with javascript date object`, () => {
    const dateObj = new Date();
    const resultString = DateUtils.getyyyyMMdd(dateObj);

    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    const monthString = month > 9 ? "" + month : "0" + month;
    const dateString = date > 9 ? "" + date : "0" + date;

    const expectedString = `${dateObj.getFullYear()}-${monthString}-${dateString}`;

    expect(resultString).toBe(expectedString);
  });

  test(`should return string in form of 'yyyy-MM-dd' with javascript date object and isUTCDate = 'true'`, () => {
    const dateObj = new Date();
    const resultString = DateUtils.getyyyyMMdd(dateObj, true);
    dateObj.setHours(dateObj.getHours() - dateObj.getTimezoneOffset() / 60);

    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();

    const monthString = month > 9 ? "" + month : "0" + month;
    const dateString = date > 9 ? "" + date : "0" + date;

    const expectedString = `${dateObj.getFullYear()}-${monthString}-${dateString}`;

    expect(resultString).toBe(expectedString);
  });
});

describe("test method 'getTimeFormat24'", () => {
  const testDateString = "2021-12-01";
  const testTimeString = "14:00:00";
  const timestamp = testDateString + " " + testTimeString;

  test(`should return '14:00:00' with param ${timestamp}`, () => {
    const resultTimeString = DateUtils.getTimeFormat24(timestamp);
    expect(testTimeString).toBe(resultTimeString);
  });
  const timezoneOffset = new Date().getTimezoneOffset() / 60;
  if (timezoneOffset !== 0) {
    test(`time zone offset = '${timezoneOffset} 'should return time string other than ${testTimeString} with date = '${timestamp}, and isUTCDate = 'true'`, () => {
      const resultTimeString = DateUtils.getTimeFormat24(timestamp, true);
      expect(resultTimeString).not.toBe(testTimeString);
    });
  } else {
    test(`time zone offset = '${timezoneOffset}' should return time string ${testTimeString} with date = '${timestamp}, and isUTCDate = 'true'`, () => {
      const resultTimeString = DateUtils.getTimeFormat24(timestamp, true);
      expect(resultTimeString).not.toBe(testTimeString);
    });
  }

  const dateObject = new Date(2021, 11, 1, 14);
  test(`should return time in 24 hour format with date object ${dateObject.toLocaleString()}`, () => {
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const hourString = hours > 9 ? "" + hours : "0" + hours;
    const minuteString = minutes > 9 ? "" + minutes : "0" + minutes;
    const secondString = seconds > 9 ? "" + seconds : "0" + seconds;

    const expectedString = `${hourString}:${minuteString}:${secondString}`;

    const resultString = DateUtils.getTimeFormat24(dateObject);
    expect(resultString).toBe(expectedString);
  });

  test(`should return time in 24 hour format with date object ${dateObject.toLocaleString()}, isUTCDate = 'true'`, () => {
    const hours = (24 + dateObject.getHours() - timezoneOffset) % 24;
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const hourString = hours > 9 ? "" + hours : "0" + hours;
    const minuteString = minutes > 9 ? "" + minutes : "0" + minutes;
    const secondString = seconds > 9 ? "" + seconds : "0" + seconds;

    const expectedString = `${hourString}:${minuteString}:${secondString}`;
    const resultString = DateUtils.getTimeFormat24(dateObject, true);
    expect(resultString).toBe(expectedString);
  });
});

describe("test method 'getTimeFormat12'", () => {
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  const amHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const pmHours = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const amSuffix = ":00:00 a.m.";
  const pmSuffix = ":00:00 p.m.";
  test("should 'am' when hour is between 0 - 11", () => {
    amHours.forEach((hour) => {
      now.setHours(hour);
      const expectedString =
        hour > 9 ? "" + hour + amSuffix : "0" + hour + amSuffix;
      expect(expectedString).toBe(DateUtils.getTimeFormat12(now));
    });
  });
  test("should 'pm' when hour is between 12 and 23", () => {
    pmHours.forEach((hour) => {
      now.setHours(hour);
      let modHour = hour % 12;
      let expectedString = "";
      if (modHour === 0) {
        expectedString = 12 + pmSuffix;
      } else {
        modHour %= 12;
        expectedString =
          modHour > 9 ? modHour + pmSuffix : "0" + modHour + pmSuffix;
      }

      expect(expectedString).toBe(DateUtils.getTimeFormat12(now));
    });
  });
});

describe("test method 'getyyyyMMddHHmmss'", () => {
  const morningDateObject = new Date(2021, 11, 1, 10, 0, 0, 0);
  const afternoonDateObject = new Date(2021, 11, 1, 13, 0, 0, 0);
  test(`should return '2021-12-01 13:00:00' with ${afternoonDateObject.toString()}`, () => {
    const resultString = DateUtils.getyyyyMMddHHmmss(afternoonDateObject);
    const expectedString = "2021-12-01 13:00:00";
    expect(resultString).toBe(expectedString);
  });
  test(`should return '2021-12-01 10:00:00' with ${morningDateObject.toString()}`, () => {
    const resultString = DateUtils.getyyyyMMddHHmmss(morningDateObject);
    const expectedString = "2021-12-01 10:00:00";
    expect(resultString).toBe(expectedString);
  });

  const testString0 = "2021-12-01 13:00:00";
  const expectedString0 = "2021-12-01 13:00:00";

  test(`should return '${expectedString0}' with datetime string = '${testString0}'`, () => {
    const result = DateUtils.getyyyyMMddHHmmss(testString0);
    expect(result).toBe(expectedString0);
  });
  const testString1 = "2021-12-01 13:00:00.000Z";
  const expectedString1 = "2021-12-01 08:00:00";

  test(`should return '${expectedString1}' with datetime string = '${testString1}'`, () => {
    const result = DateUtils.getyyyyMMddHHmmss(testString1);
    expect(result).toBe(expectedString1);
  });

  const testString2 = "2021-12-01 03:00:00.000Z";
  const expectedString2 = "2021-11-30 22:00:00";

  test(`should return '${expectedString2}' with datetime string = '${testString2}'`, () => {
    const result = DateUtils.getyyyyMMddHHmmss(testString2);
    expect(result).toBe(expectedString2);
  });
});
describe("test method 'getyyyyMMddhhmmss'", () => {
  const morningDateObject = new Date(2021, 11, 1, 13, 0, 0, 0);
  const afterDateObject = new Date(2021, 11, 1, 10, 0, 0, 0);
  const middleDateObject = new Date(2021, 11, 1, 12, 0, 0, 0);
  test(`should return '2021-12-01 01:00:00 pm' with ${morningDateObject.toString()}`, () => {
    const resultString = DateUtils.getyyyyMMddhhmmss(morningDateObject);
    const expectedString = "2021-12-01 01:00:00 p.m.";
    expect(resultString).toBe(expectedString);
  });
  test(`should return '2021-12-01 12:00:00 pm' with ${middleDateObject.toString()}`, () => {
    const resultString = DateUtils.getyyyyMMddhhmmss(middleDateObject);
    const expectedString = "2021-12-01 12:00:00 p.m.";
    expect(resultString).toBe(expectedString);
  });
  test(`should return '2021-12-01 10:00:00 am' with ${afterDateObject.toString()}`, () => {
    const resultString = DateUtils.getyyyyMMddhhmmss(afterDateObject);
    const expectedString = "2021-12-01 10:00:00 a.m.";
    expect(resultString).toBe(expectedString);
  });

  const testString0 = "2021-12-01 12:00:00";

  test(`should return '2021-12-01 12:00:00 pm' with datetime string = ${testString0}`, () => {
    const resultString = DateUtils.getyyyyMMddhhmmss(testString0);
    const expectedString = "2021-12-01 12:00:00 p.m.";
    expect(resultString).toBe(expectedString);
  });
  const testString1 = "2021-12-01 12:00:00.000Z";
  const expectedString1 = "2021-12-01 07:00:00 a.m.";

  test(`should return '${expectedString1}' with datetime string = ${testString1}`, () => {
    const resultString = DateUtils.getyyyyMMddhhmmss(testString1);
    expect(resultString).toBe(expectedString1);
  });

  const testString2 = "2021-12-01 03:00:00.000Z";
  const expectedString2 = "2021-11-30 10:00:00 p.m.";
  test(`should return ${expectedString2} with datetime string = ${testString2}`, () => {
    const resultString = DateUtils.getyyyyMMddhhmmss(testString2);
    expect(resultString).toBe(expectedString2);
  });
});
