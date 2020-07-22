
function myFunction() {
    var input, filter, tabela, row, span,i, txtValue;
    input = document.getElementById("search-input");
    console.log(input);
    filter = input.value;
    console.log(filter);
    tabela = document.getElementById("myTable");
    console.log(tabela);
    row = tabela.getElementsByTagName("div");

    for (i = 0; i < row.length; i++) {
        span = row[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.indexOf(filter) > -1) {
            row[i].style.display = "";
        } else {
            row[i].style.display = "none";
        }
    }
};





