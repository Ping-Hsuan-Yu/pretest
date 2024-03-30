import { useEffect, useState } from "react";
import AgeGroupPriceList from "./components/AgeGroupPriceList";
import { PlusLg } from "react-bootstrap-icons";

export default function App() {
  const [list, setList] = useState([{ id: 1, age: [0, 20], price: "" }]);
  const handleAddRow = () => {
    setList((prev) => [
      ...prev,
      { id: prev[prev.length - 1].id + 1, age: [0, 20], price: "" },
    ]);
  };
  // useEffect(()=>{
  //   console.log(combination)
  // },[combination])
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
            lastItem={list.length  === index + 1}
          />
        ))}
      </div>
      <div
        className="d-flex align-items-center gap-1 mt-4 text-info cursor-pointer"
        onClick={handleAddRow}
      >
        <PlusLg />
        <span>新增價格設定</span>
      </div>
    </div>
  );
}
