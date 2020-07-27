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

    // document.addEventListener('readystatechange', function () {
    //     if (document.readyState === 'complete') {
    //         myFunction.init();
    //     }
    // // })
    document.getElementById("search-input").addEventListener("search", function(event) {
        $(".resultingarticles").empty();  
      });

// const log = document.querySelector('.event-log-contents');
// const reload = document.querySelector('#reload');

// reload.addEventListener('click', () => {
//     log.textContent = '';
//     window.setTimeout(() => {
//         window.location.reload(true);
//     }, 200);
// });

// window.addEventListener('load', (event) => {
//     log.textContent = log.textContent + 'load\n';
// });

// document.addEventListener('readystatechange', (event) => {
//     log.textContent = log.textContent + `readystate: ${document.readyState}\n`;
// });

// document.addEventListener('DOMContentLoaded', (event) => {
//     log.textContent = log.textContent + `DOMContentLoaded\n`;
// });