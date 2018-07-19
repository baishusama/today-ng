export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = 24 * ONE_HOUR;

export const getCurrentTime = function(): number {
  return new Date().getTime();
};

export const getTodayTime = function(): number {
  return floorToDate(new Date());
};

export const floorToDate = function(time: any): number {
  const t = new Date(time);
  t.setHours(0, 0, 0, 0);
  return t.getTime();
};

export const floorToMinute = function(time: any): number {
  const t = new Date(time);
  t.setSeconds(0, 0);
  return t.getTime();
};

export const lessThanADay = function(
  later: number,
  earlier: number = getCurrentTime()
) {
  return later - earlier < ONE_DAY;
};

/**
 * 获取时间字符串的函数
 * @param date e.g. '2020-08-08', new Date('2020-08-08')
 * @param accurateToMilliSec 默认假，精确到分钟；如果真，精确到毫秒
 */
export const getDaytimeStr = function(
  date?: any,
  accurateToSec: boolean = true,
  accurateToMilliSec: boolean = false
) {
  let now;
  if (date && typeof date === 'string') {
    now = new Date(date.replace(/-/g, '/'));
  } else if (date) {
    now = new Date(date);
  } else {
    now = new Date();
  }
  const yyyy = now.getFullYear();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();
  const HH = now.getHours();
  const MM = now.getMinutes();
  const SS = now.getSeconds();
  const milliSec = now.getMilliseconds();
  const timeStrArr = [yyyy];

  timeStrArr.push('-');
  if (mm < 10) {
    timeStrArr.push('0');
  }
  timeStrArr.push(mm);

  timeStrArr.push('-');
  if (dd < 10) {
    timeStrArr.push('0');
  }
  timeStrArr.push(dd);

  if (accurateToSec) {
    timeStrArr.push(' ');
    if (HH < 10) {
      timeStrArr.push('0');
    }
    timeStrArr.push(HH);

    timeStrArr.push(':');
    if (MM < 10) {
      timeStrArr.push('0');
    }
    timeStrArr.push(MM);

    timeStrArr.push(':');
    if (SS < 10) {
      timeStrArr.push('0');
    }
    timeStrArr.push(SS);

    // 如果不精确到秒，肯定也不精确到毫秒
    if (accurateToMilliSec) {
      timeStrArr.push('.', milliSec);
    }
  }

  return timeStrArr.join('');
};
