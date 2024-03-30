import { useState } from "react";

export default function PriceInput({ data, setList }) {
  const [isInvalid, setIsInvalid] = useState(false);

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

  const isValidFormat = (string) => {
    const regex = /^-?(\d{1,3})(,\d{3})*(\.\d+)?$/;
    return regex.test(string);
  };

  const handlePriceOnChange = (value, id) => {
    const formattedValue = addComma(value);
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: formattedValue } : item))
    );
    setIsInvalid(value === "" || !isValidFormat(formattedValue));
  };
  return (
    <>
      <label htmlFor="">入住費用(每人每晚)</label>
      <div className={`input-group${isInvalid ? " is-invalid" : ""}`}>
        <span className="input-group-text">TWD</span>
        <input
          type="text"
          className={`form-control${isInvalid ? " is-invalid" : ""}`}
          placeholder="請輸入費用"
          value={data.price}
          onChange={(e) => {
            handlePriceOnChange(e.target.value, data.id);
          }}
        />
      </div>
      <div
        className="invalid-feedback bg-danger py-1 px-3 mt-0 rounded"
        style={{ "--bs-bg-opacity": ".1" }}
      >
        {data.price === "" ? "不可為空白" : "格式不正確"}
      </div>
    </>
  );
}
