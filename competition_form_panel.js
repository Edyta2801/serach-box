function getFormData() {
    var target = event.target;
    var obj = {
      'ID': target.dataset.id,
      'player': target.dataset.name,
      'game': target.previousSibling.previousSibling.value,
      'competition': target.previousSibling.previousSibling.nextSibling.value,
      'edit_item': ''
    };
  
    dataJSON = JSON.stringify(obj);
    console.log(dataJSON);
  
  
    var data = {
      action: "sendCompetition",
      post_type: "POST",
      data: dataJSON,
    };
    jQuery.post(
      pkol_scripts.ajax_url,
      data,
      function (response) {
        console.log(data.data);
        console.log(response);
        alert('poprawnie zapisano zmiany');
      },
      "json"
    );
  }
  function sortOptions() {
    var target = event.target;
    var options = document.getElementById(target.id).options;
    var optionsArray = [];
    for (var i = 0; i < options.length; i++) {
      optionsArray.push(options[i]);
    }
    optionsArray = optionsArray.sort(function (a, b) {
      return a.innerHTML.toLowerCase().charCodeAt(0) - b.innerHTML.toLowerCase().charCodeAt(0);
    });
  
    for (var i = 0; i <= options.length; i++) {
      options[i] = optionsArray[i];
    }
    // options[0].selected = true;
  }
  
  
  function myFunction() {
    var input, filter, tabela, row, span,i, txtValue;
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
            // row[i].style.display = "";
        } else {
            row[i].style.display = "none";
        }
    }
  };