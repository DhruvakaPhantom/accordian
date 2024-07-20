import { useState } from "react";
import { data } from "./data.js";
function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultipleSelection, setMultipleSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  function handleSingleSelect(getId) {
    setSelected(getId === selected ? null : getId);
  }
  function handleMultipleSelect(getId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getId);
    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getId);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(copyMultiple);
  }
  return (
    <div className="wrapper">
      <button onClick={() => setMultipleSelection(!enableMultipleSelection)}>
        Select Multiple
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                className="title"
                onClick={
                  enableMultipleSelection
                    ? () => handleMultipleSelect(dataItem.id)
                    : () => handleSingleSelect(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultipleSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data present</div>
        )}
      </div>
    </div>
  );
}
export default Accordian;
