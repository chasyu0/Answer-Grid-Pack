function generateGrid() {
    const count = parseInt(document.getElementById("countOption").value);
    const border = document.getElementById("borderOption").checked;
    const number = document.getElementById("numberOption").checked;

    const grid = document.getElementById("grid");
    const wrapper = document.getElementById("result");

    grid.innerHTML = "";  // 초기화

    // 옵션 적용
    wrapper.classList.toggle("border", border);
    grid.classList.toggle("no-number", !number);

    // 총 count개의 문제 → num + ans
    for (let i = 0; i < count; i++) {
        const num = document.createElement("div");
        num.classList.add("cell", "num");
        grid.appendChild(num);

        const ans = document.createElement("div");
        ans.classList.add("cell", "ans");
        grid.appendChild(ans);
    }
}

document.getElementById("generateBtn").addEventListener("click", generateGrid);

// 첫 렌더 → 기본 20문항 생성
generateGrid();
