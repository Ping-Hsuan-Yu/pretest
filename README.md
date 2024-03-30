### addComma
/src/components/PriceInput.jsx
```
const addComma = (string) => {
    const num = string.replace(/,/g, "");

    const [integer, decimal] = num.split(".");

    const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimal !== undefined) {
      return `${integerWithCommas}.${decimal}`;
    } else {
      return integerWithCommas;
    }
  };
```

### getNumberIntervals
/src/App.jsx
```
const getNumberIntervals = (array) => {
    const finalResult = { overlap: [], notInclude: [] };

    const extendArray = (arr) => {
      const result = [];
      for (let i = arr[0]; i <= arr[1]; i++) {
        result.push(i);
      }
      return result;
    };

    const getOverLap = (arr) => {
      const result = [];
      let min = arr[0];
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === max + 1) {
          max = arr[i];
        } else {
          result.push([min, max]);
          min = arr[i];
          max = arr[i];
        }
      }
      result.push([min, max]);
      return result;
    };

    const flattenedArray = array.map((item) => extendArray(item)).flatMap((arr) => arr);

    const repeat = flattenedArray
      .filter((item, index, arr) => arr.indexOf(item) !== index)
      .filter((item, index, arr) => arr.indexOf(item) === index);

    finalResult.overlap = getOverLap(repeat);

    const include = flattenedArray.filter((item, index, arr) => arr.indexOf(item) === index);
    const zeroToTwenty = Array.from({ length: 21 }, (_, i) => i);

    finalResult.notInclude = getOverLap(zeroToTwenty.filter((item) => !include.includes(item)));

    return finalResult;
  };
```
