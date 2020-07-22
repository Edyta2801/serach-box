(function (document) {
    'use strict';

    var TableFilter = (function (myArray) {
        var search_input;


        function _onInputSearch(e) {
            search_input = e.target;
            var dives = document.getElementsByClassName(search_input.getAttribute('data-table'));
            console.log(dives);

            myArray.forEach.call(dives, function (div) {
                myArray.forEach.call(div.selects, function (select) {
                    myArray.forEach.call(select.options, function (selected) {
                        var text_content = selected.textContent.toLowerCase();
                        var search_val = search_input.value.toLowerCase();
                        selected.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
                     }
                    );
                });
            });
        }

        return {
            init: function () {
                var inputs = document.getElementsByClassName('search-input');
                myArray.forEach.call(inputs, function (input) {
                    input.oninput = _onInputSearch;
                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            TableFilter.init();
        }
    });

})(document);
