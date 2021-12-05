import React, { useState } from "react";
import "./App.css";

function App() {

  const [isShow, setShow] = useState(false);
  const [count, setCount] = useState(8);
  const [predicted, setPredicted] = useState(2);
  const [startpoint, setFirst] = useState(3);
  const [coeff, setCoeff] = useState(4);
  const [start, setStart] = useState(false);

  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const onChangeCount = (event) => {
    setCount(event.target.value);
    let temp = [];
    for (let i = 0; i < count; i++) {
      temp[i] = 0;
    }
    setNumbers(temp);
  }

  const onChangePredicted = (event) => {
    setPredicted(event.target.value);
  }

  const onChangeFirst = (event) => {
    setFirst(event.target.value);
  }

  const onChangeCoef = (event) => {
    setCoeff(event.target.value);
  }

  const reducer = (previousValue, currentValue) => previousValue * currentValue;

  if (start) {
    document.getElementById('start').style.display = "block";
    const inputArr = document.getElementsByClassName('values');
    let temp = [];
    for (let i = 0; i < inputArr.length; i++) {
      temp[i] = parseInt(inputArr[i].value);
    }
    document.getElementById("input-values").innerHTML = temp;
    let matrix = [];
    for (let i = 0, t = 0; i < temp.length - startpoint + 1; i++, t++) {
      matrix[i] = [];
      for (let j = 0; j < coeff; j++) {
        if (j === 0) {
          matrix[i].push(temp[coeff - 2 + t]);
        } else if (j === 1) {
          matrix[i].push(1);
        } else if (j !== coeff) {
          let temp2 = [];
          for (let c = 0; c < coeff + 1 - 3; c++) {
            matrix[i].push(temp[t + c]);
            temp2.push(temp[t + c]);
          }
          matrix[i].push(temp2.reduce(reducer));
          break;
        }
      }
    }

    const tempMatrix = matrix;
    DrawMatrix(tempMatrix);

    let a = matrix;
    let n = matrix[0].length;
    for (let i = 0; i < a.length * a[0].length / n; i++) {
      for (let j = 0; j < n; j++) {
        // console.log(a[i][j] + "x" + j + " ");
      }
      // console.log("= " + a[i][n - 1]);
      // console.log("");
    }
    let x = [];
    for (let z = 0; z < a.length * a[0].length / n; z++) {
      x[z] = a[z][n - 1];
    }
    let m;
    for (let k = 1; k < a.length * a[0].length / n; k++) {
      for (let j = k; j < a.length * a[0].length / n; j++) {
        m = a[j][k - 1] / a[k - 1][k - 1];
        for (let i = 0; i < n; i++) {
          a[j][i] = a[j][i] - m * a[k - 1][i];
        }
        x[j] = x[j] - m * x[k - 1];
      }
    }
    for (let i = 0; i < a.length * a[0].length / n; i++) {
      for (let j = 0; j < n; j++) {
        // console.log(a[i][j] + "x" + j + " ");
      }
      // console.log("= " + a[i][n - 1]);
      // console.log("");
    }
    for (let i = a.length * a[0].length / n - 1; i >= 0; i--) {
      for (let j = i + 1; j < a.length * a[0].length / n; j++) {
        x[i] -= (a[i][j] * x[j]);
        x[i] = x[i] / a[i][i];
      }
    }
    const temtTri = a;
    DrawTriM(temtTri);

    const xT = x;
    DrawCoef(xT);

    const resultsD = document.getElementById('results');
    if (!resultsD.innerHTML) {
      const startpoint_ = startpoint;
      for (let c = 0; c < predicted; c++) {
        let res = 'F_predicted = ';
        let cres = 0;
        for (let i = 0; i < x.length; i++) {
          if (i === 0) {
            cres = cres + x[i];
            res = res + ' ' + x[i];
          } else if (i !== 0 && i !== x.length - 1) {
            cres = cres + x[i] * temp[startpoint_ + i - 1 + i];
            res = res + ' + ' + x[i] + ' * ' + temp[startpoint_ + i - 1];
          } else {
            const mulA = temp.slice(startpoint_ + i - 1, startpoint_ + i + 1);
            const mul = mulA.reduce((acc, rec) => acc * rec);
            cres = cres + (mul * x[i]);
            res = res + ' + ' + mul + ' * ' + x[i] + ' = ' + cres;
          }
        }
        const tempLi = document.createElement('li');
        tempLi.innerHTML = res;
        resultsD.appendChild(tempLi);
        const tempDif = document.createElement('li');
        const t = temp[startpoint_ + 1] - cres
        tempDif.innerHTML = 'diff = ' + t.toString();
        resultsD.appendChild(tempDif);
      }
    }

  }

  function DrawMatrix(matrix) {
    const div = document.getElementById('matrix');
    if (!div.innerHTML) {
      for (let i = 0; i < matrix.length; i++) {
        const li = document.createElement('li');
        let inner = '';
        for (let j = 0; j < matrix[i].length; j++) {
          if (j === 0) {
            inner = inner + matrix[i][j] + ' = ';
          } else if (j !== matrix[i].length - 1) {
            inner = inner + matrix[i][j] + '*a' + j + '+';
          } else {
            inner = inner + matrix[i][j];
          }
        }
        li.innerHTML = inner;
        div.appendChild(li);
      }
    }
  }

  function DrawTriM(matrix) {
    const tri = document.getElementById('triangular');
    if (!tri.innerHTML) {
      for (let i = 0; i < matrix.length; i++) {
        const li = document.createElement('li');
        let inner = '';
        for (let j = 0; j < matrix[i].length; j++) {
          let t = parseInt(matrix[i][j]).toFixed(2);
          inner = inner + t + ' ';
        }
        li.innerHTML = inner;
        tri.appendChild(li);
      }
    }
  }

  function DrawCoef(x) {
    const xx = x;
    const x_ = x;
    const coefs = document.getElementById('coefs');
    if (!coefs.innerHTML) {
      for (let i = 0; i < x_.length; i++) {
        const li = document.createElement('li');
        let inner = 'a' + i + ' = ';
        inner = inner + parseFloat(x_[i]).toFixed(2);
        li.innerHTML = inner;
        coefs.appendChild(li);
      }
    }
    const fmodel = document.getElementById('fmodel');
    if (!fmodel.innerHTML) {
      let inner = "Fb = ";
      for (let i = 0; i < xx.length; i++) {
        if (i === 0) {
          inner = inner + parseFloat(xx[i]).toFixed(2);
        } else if (i !== 0 && i !== xx.length - 1) {
          inner = inner + parseFloat(xx[i]).toFixed(2) + '*F' + i + ' + ';
        } else {
          let f = 'F1F2F3F4f5F6F7F8F9';
          inner = inner + parseFloat(xx[i]).toFixed(2) + '*' + f.substring(0, 4);
          fmodel.innerHTML = inner;
        }
      }
    }
  }


  return (
    <div className="App">
      <div className="input-data">
        <h2>
          Predictive model
        </h2>
        <div className="param">
          <div>
            Number of educated elements
            <input type="number" onChange={onChangeCount} value={count} />
          </div>
          <div>
            Number of predicted elements
            <input type="number" onChange={onChangePredicted} value={predicted} />
          </div>
          <div>
            Inpoint
            <input type="number" onChange={onChangeFirst} value={startpoint} />
          </div>
          <div>
            Number of predicted model coefficient
            <input type="number" onChange={onChangeCoef} value={coeff} />
          </div>
        </div>
        <div>
          input values
          <button onClick={() => setShow(true)}>add</button>
        </div>
        {
          isShow ? <div className="rozp" id="rozp">
            <div>
              {/* Values [10, 15, 13, 19, 14, 18, 17, 11] */}
              <div id="values">
                {numbers.map((n, index) =>
                  <div key={index}>
                    {index + 1}.
                    <input type="number" className="values" key={index} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <button onClick={() => setStart(true)}>
                count
              </button>
              {
                start ?
                  <div></div> : <></>
              }
            </div>
          </div> : <></>
        }
      </div>
      <div id="start" style={{ display: 'none' }}>
        <div>
          Start values:
          <div id="input-values"></div>
        </div>
        <div>
          Matrix:
          <ul id="matrix" style={{ listStyle: 'none' }}></ul>
        </div>
        <div>
          Normalize matrix:
          triangular matrix:
          <ul id="triangular" style={{ listStyle: 'none' }}></ul>
        </div>
        <div>
          Coefficients:
          <ul id="coefs" style={{ listStyle: 'none' }}></ul>
        </div>
        <div>
          Model:
          <div id="fmodel"></div>
        </div>
        <div>
          Results:
          <ul id="results" style={{ listStyle: 'none' }}></ul>
        </div>
      </div>
    </div>
  );
}

export default App;
