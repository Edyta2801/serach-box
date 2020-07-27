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
  
  (function ($) {
    $('document').ready(function () {
      $('#select-type').on('change', function () {
        let all = $('#game_statistic option.winter, #game_statistic option.summer');
        all.show();
        let value = $(this).val();
        $(`#game_statistic option:not(.${value})`).hide();
        if (value == 'all') {
          all.show();
        }
      });
    });
  })(jQuery);