import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";
import { XLg } from "react-bootstrap-icons";

export default function AgeGroupPriceList({ index, data, setList, lastItem, overlap }) {
  const handleRemoveRow = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="fw-bold">價格設定 - {index + 1}</div>
        {index !== 0 && (
          <div
            className="d-flex align-items-center gap-1 text-danger fw-bold cursor-pointer "
            onClick={() => {
              handleRemoveRow(data.id);
            }}
          >
            <XLg />
            <span>移除</span>
          </div>
        )}
      </div>
      <div className="row gx-3 mt-2">
        <div className="col-6">
          <AgeGroupSelect data={data} setList={setList} overlap={overlap} />
        </div>
        <div className="col-6">
          <PriceInput data={data} setList={setList} />
        </div>
      </div>
      <div className="text-end text-secondary mt-1">輸入0表示免費</div>
      {!lastItem && <hr />}
    </div>
  );
}
