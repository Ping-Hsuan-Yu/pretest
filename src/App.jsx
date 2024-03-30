import { useEffect, useState } from "react";
import AgeGroupPriceList from "./components/AgeGroupPriceList";
import { PlusLg } from "react-bootstrap-icons";

export default function App() {
  const [list, setList] = useState([{ id: 1, age: [0, 20], price: "" }]);

  const handleAddRow = () => {
    setList((prev) => [...prev, { id: prev[prev.length - 1].id + 1, age: [0, 20], price: "" }]);
  };

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

  

  useEffect(() => {
    console.log("AgeGroupPriceList", list);
  }, [list]);

  return (
    <div className="container">
      <h1 className="text-center my-3">價格設定</h1>
      <div className="d-flex flex-column gap-4">
        {list.map((item, index) => (
          <AgeGroupPriceList
            key={`${index}-${item.id}`}
            index={index}
            data={item}
            setList={setList}
            lastItem={list.length === index + 1}
            overlap={getNumberIntervals(list.map((item)=>item.age)).overlap[0][0]!==undefined}
          />
        ))}
      </div>
      <button
        className="btn text-info border-0 d-flex align-items-center gap-1 mt-4 cursor-pointer"
        onClick={handleAddRow}
        disabled={getNumberIntervals(list.map((item)=>item.age)).notInclude[0][0]===undefined}
      >
        <PlusLg />
        <span>新增價格設定</span>
      </button>
    </div>
  );
}
