export default function AgeGroupSelect({data}) {
  return (
    <>
      <label htmlFor="">年齡</label>
      <div className="input-group">
        <select name="currency" className="form-select" id="">
          <option value=""></option>
        </select>
        <span className="input-group-text">~</span>
        <select name="currency" className="form-select" id="">
          <option value=""></option>
        </select>
      </div>
    </>
  );
}
