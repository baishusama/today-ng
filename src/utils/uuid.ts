export function generateUUID(): string {
  /**
   * ImoNote:
   * - 进制:
   *   - 进制小抄:
   *     - `0b` or `0B` is Binary
   *     - `0o` or `0O` is Octal
   *     - 啥也没的是 decimal
   *     - `0x` or `0X` is heXadecimal
   *   - 进制举例:
   *     - 0x3 表示十六进制的 3，即十进制的 3，二进制的 0b0011
   *     - 0x8 表示十六进制的 8，即十进制的 8，二进制的 0b0100
   * - [按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
   *   - `(Math.random() * 16) | 0`:
   *     - [This is truncation as opposed to flooring](https://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number#answer-7488079)
   *     - [In ES6, the equivalent of `|0` is `Math.trunc`](https://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number#answer-34706108)
   *   - `(r & 0x3) | 0x8`: 即 y 位的结果会是二进制的 0b01**（其中 * 表示 0 或 1）
   * - [Number.prototype.toString([])](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
   *   - `.toString(16)`: 即将十进制数字转换成十六进制数字对应的字符串
   * TODO: uuid vs id？ what is UUID exactly ?
   */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
