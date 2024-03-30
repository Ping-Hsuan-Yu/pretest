export default function PriceInput({ data, setList }) {
  const addComma = (num) => {
    const [integer, decimal] = num.toString().split(".");
    return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${decimal ? "." + decimal : ""}`;
  };

  const handlePriceOnChange = (value, id) => {
    console.log("addComma",addComma(value));
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, price: value } : item)));
  };
  return (
    <>
      <label htmlFor="">入住費用(每人每晚)</label>
      <div className="input-group">
        <span className="input-group-text">TWD</span>
        <input
          type="text"
          className="form-control"
          placeholder="請輸入費用"
          value={data.price}
          onChange={(e) => {
            handlePriceOnChange(e.target.value, data.id);
          }}
        />
      </div>
    </>
  );
}
