
export default function AgeGroupSelect({ data, setList, overlap }) {
  const ageStartOption = Array.from({ length: 21 }, (_, i) => i);
  const ageEndOption = Array.from({ length: 21 }, (_, i) => i);

  const handleAgeOnChange = (startOrEnd, value, id) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ageGroup: item.ageGroup.map((age, idx) => (idx === startOrEnd ? Number(value) : age)) }
          : item
      )
    );
  };
  return (
    <>
      <label htmlFor="">年齡</label>
      <div className={`input-group${overlap ? " is-invalid" : ""}`}>
        <select
          className="form-select"
          value={data.ageGroup[0]}
          onChange={(e) => {
            handleAgeOnChange(0, e.target.value, data.id);
          }}
        >
          {ageStartOption.map((item) => (
            <option key={`s${data.id}${item}`} value={item} disabled={item > data.ageGroup[1]}>
              {item}
            </option>
          ))}
        </select>
        <span className="input-group-text">~</span>
        <select
          className="form-select"
          value={data.ageGroup[1]}
          onChange={(e) => {
            handleAgeOnChange(1, e.target.value, data.id);
          }}
        >
          {ageEndOption.map((item) => (
            <option key={`e${data.id}${item}`} value={item} disabled={item < data.ageGroup[0]}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div
        className="invalid-feedback bg-danger py-1 px-3 mt-0 rounded"
        style={{ "--bs-bg-opacity": ".1" }}
      >
        年齡區間不可重疊
      </div>
    </>
  );
}
