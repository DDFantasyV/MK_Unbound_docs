# Function

[[toc]]

## abs()

```python
abs(number)
```
Mathematical module.

## ceil()

```python
ceil(number)
```
Return the largest integer from given `number`.

## countdownFormat()

```python
countdownFormat(numberSeconds, numberOfDigits, isShowMinutes)
```
Format the given number of seconds to `min:seconds` format.

If minutes are `0`, `00` will be displayed.

::: details Example
```python
countdownFormat(125, 0, true)
```
:::

## floor()

```python
floor(number)
```
Return the smallest integer from given `number`.

## formatFloatingPoint()

```python
formatFloatingPoint(number, numberOfDigits=1)
```
Round of fractional part to `numberOfDigits` decimal places.

By default `numberOfDigits=1`.

> [!IMPORTANT]
> Don't take into account regional format settings.
>
> There is no decimal separator.

::: details Example
```python
formatFloatingPoint(1.193454334123) # result 1.2

formatFloatingPoint(0.423456, 3)    # result 0.423
```
:::

## formatSeparator()

```python
formatSeparator(number)
```
Group the integer part into groups of 3 digits separated by spaces. Round the fractional part to the second digit.

> [!IMPORTANT]
> Don't take into account regional format settings.
>
> Integer numbers are displayed without a fractional part, and fractional numbers are displayed with 2 decimal places.

::: details Example
```python
formatSeparator(1103569353.789254232)   # result 1 103 569 353.79
```
:::

## max()

```python
max(x, y)
```
Return the maximum of two numbers.

 `x > y ? x : y`

::: details Example
```python
number = max(smth, smth2)
```
:::

## min()

```python
min(x, y)
```
Return the minimum of two numbers. 

`x < y ? x : y`

::: details Example
```python
number = min(smth, smth2)
```
:::

## pow()

```python
pow(basis, exponent)
```
Raise a number `basis` to the power `exponent`.

## radToGrad()

```python
radToGrad(radNumber)
```
Convert radians to degrees.

## gradToRad()

```python
gradToRad(gradNumber)
```
Convert degrees to radians.

## round()

```python
round(number)
```
Mathematical round to the nearest whole number.

::: details Example
```python
round(0.423456) # result 0
```
:::

## roundToDecimal()

```python
roundToDecimal(number, decimal_place)
```
Mathematical round to a specified number of `decimal_place`.

::: details Example
```python
roundToDecimal(12.1645, 1)  # result 12.2
```
:::

## subst()

```python
subst(str, array_values, dict_values)
```
Substitute passed arguments into placeholders.

::: details Example
```python
subst('first number is %d, second is %d', [50, 51])

subst('%(min)d - %(max)d', [], {min:1, max:2})
```
:::

## sin()

```python
sin(radNumber)
```
Sine of an angle in radians.

## cos()

```python
cos(radNumber)
```
Cosine of an angle in radians.

## tan()

```python
tan(radNumber)
```
Tangent of an angle in radians.

## atan2()

```python
atan2(y, x)
```
Arctangent of `y/x` in radians.

## toLower()

```python
toLower(str)
```
Convert uppercase characters to lowercase.

## toUpper()

```python
toUpper(str)
```
Convert lowercase characters to uppercase.

## tr()

```python
tr(str)
```
Return the localization of strings by `IDS`.

## gradToRad()

```python
gradToRad(gradNumber)
```
Convert degrees to radians.

## isMatch()

```python
isMatch(str, regular_expression)
```
Return whether `str` matches `regular_expression`.

## indexOf()

```python
indexOf(value, array)
```
Return what `index` is `value` in `array` (`-1` if it is not there).

## isIn()

```python
isIn(value, array)
```
Return whether `value` in `array`.

## isStr()

```python
isStr(value)
```
Check `value` type.

## isNumber()

```python
isNumber(value)
```
Check `value` type.

## isBool()

```python
isBool(value)
```
Check `value` type.

## toNumber()

```python
toNumber(value)
```
Convert `value` to a number.

::: details Example
```python
toNumber('5')   # result 5
```
:::

## toString()

```python
toString(value)
```
Convert `value` to a string, without any settings.

Can print not only `number`, but also `array` and `dict`.

## toBool()

```python
toBool(value)
```
Convert `value` to a Boolean value.

::: details Example
```python
toBool(null)    # result false
toBool(5)       # result true
toBool(0)       # result false
toBool('hi')    # result true
toBool('')      # result false
toBool(['hi'])  # result true
toBool([])      # result false
toBool({'key': 'val'})  # result true
toBool({})      # result false
```
:::

## toHex()

```python
toHex(number, width)
```
Print a hexadecimal integer to a string, with the given width.

If the resulting number is shorter than the given width, it is padded with zeros on the left; if it is longer, the most significant bits are truncated (useful for cutting off the alpha channel when printing color).

## shipLevelsToRoman()

```python
shipLevelsToRoman(levels, super_ship=false)
```
Print ship levels (an array of integers) as Roman numerals, sorted by ranges (i.e. the array [1, 2, 4, 5, 6, 7] would be printed as "I, II, IV-VII"). If `super_ship=true`, then level 11 is excluded from the range, and appended at the end as "★".

::: details Example
```python
shipLevelsToRoman([8, 9,10,11], false)  # result VIII, IX, X, XI

shipLevelsToRoman([8, 9,10,11], true)   # result VIII, IX, X, ★
```
:::

## callExternal()

```python
callExternal(command_name, argument_array)
```
Call the given Python command with the given arguments.

## log()

```python
log(message)
```
Call the `inputMapping.onMsg` command with the given message; simultaneously print the message and debug information to a string.

::: details Example
```python
log('message')
```
:::

## clamp()

```python
clamp(number, lower_bound, upper_bound)
```
Reduces `number` to a range from `lower_bound` to `upper_bound`. The principle of operation is similar to the `clamp()` function in `css`.

## sqrt()

```python
sqrt(number)
```
Square root.

## random()

```python
random()
```
Return a random real number between `0` and `1` (inclusive).

## randomFloor()

```python
randomFloor(max)
```
Return a random integer from `0` to `max` (inclusive).

## currentServerSeconds()

```python
currentServerSeconds()
```
Return server time, in seconds and fractions of seconds.

## currentClientSeconds()

```python
currentClientSeconds()
```
Return the time elapsed since the game client was launched, in seconds.

## formatTime()

```python
formatTime(seconds, format, locale, local_time)
```
Format the time (in seconds), depending on `format`.
The options are as follows:
- `yyyy.MM.dd hh:mm:ss`
    - `yyyy` – full year
    - `yy` – year, 2 digits
    - `M`, `MM` – month of the year, 1 or 2 digits
    - `d`, `dd` – day of the month
    - `H`, `HH` – total number of hours (including days)
    - `h`, `hh` – hours (from the beginning of the day)
    - `m`, `mm` – minutes (from the beginning of the hour)
    - `s`, `ss` – seconds (from the beginning of the minute), 1 or 2 digits
- `HIGHEST` – the senior non-zero element of the date-time, starting with the month: if the interval is greater than a month, it prints months, if greater than a day, it prints days, and so on down to seconds.
- `HIGHESTDAYS` - the highest non-zero element of the date-time, starting with days (i.e. it will print "63 days" instead of "2 months").
- `HIGHEST,WITH_DAYS` - the highest non-zero date-time element, starting with months AND days (i.e. it will print not "2 months", but "2 months 3 days").
 
`locale` – localization suffix, added after `IDS_PL_HOUR_FULL` in `HIGHEST*` modes. Special value `ABB`: then abbreviated localizations are used, `IDS_PL_HOUR`. Empty by default.

`local_time` - if `true`, then the date in the `yyyy.MM.dd hh:mm:ss` mode is printed in the client's local time, if `false` - then in `UTC`. Ignored in `HIGHEST*` modes. By default, `false` (`UTC`).

::: details Example
```python
formatTime(time, 'dd.MM.yy', '', true)
formatTime(time, 'dd.MM.yyyy hh:mm', '', true)
formatTime(time, 'HIGHEST,WITH_DAYS')
```
:::

## in

```python
{} in {}
```
`in` operator will search:
- substring in a string,
- element in array,
- key in keys (not elements!) of the dictionary,
- subarray or set of keys in array or dictionary keys.

::: details Example
```python
'abc' in 'dfgabc1tyu'
8 in [7, 8, 9]
'szh' in {'bbb':1, 'szh':2, 'vvv':3}
['8', '7'] in {'7':6, '8':0, '9':'aa'}
```
:::
