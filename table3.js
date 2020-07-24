
function myFunction() {
    var input, filter, tabela, row, span, i, txtValue;
    input = document.getElementById("search-input");
    console.log(input);
    filter = input.value.toUpperCase();
    console.log(filter);
    tabela = document.getElementById("myTable");
    console.log(tabela);
    row = tabela.getElementsByTagName("div");

    for (i = 0; i < row.length; i++) {
        span = row[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            row[i].style.display = "flex; align-items: center; margin-bottom: 0.25rem;";
        } else {
            row[i].style.display = "none";
        }
    }
};

document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') {
        myFunction.init();
    }
})