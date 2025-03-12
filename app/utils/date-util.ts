/**
 * 日付を文字列に変換する。
 * @param date
 * @param sep e.g. "/"
 * @returns
 */
export const formatDate = (date: Date, sep = '') => {
  const yyyy = date.getFullYear();
  const mm = `00${date.getMonth() + 1}`.slice(-2);
  const dd = `00${date.getDate()}`.slice(-2);

  return `${yyyy}${sep}${mm}${sep}${dd}`;
};

/**
 * 与えられた日付文字列が有効な日付かどうかをチェックする。
 * @param dateString 検証する日付文字列、例: "2022-01-01"
 * @returns 日付文字列が有効な場合はtrue、そうでない場合はfalse
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !Number.isNaN(date.getTime());
};
