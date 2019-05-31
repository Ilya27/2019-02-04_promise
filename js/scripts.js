$(() => {
    function ajax(url) {
        return fetch(url).then(response => response.json());
    }

        let $container= $('<div>');
        $container.appendTo('body');
        let $ul_categories=$('<ul>');
        $ul_categories.appendTo($container)
            .addClass('list-group')
            .attr('id','categories');
        ajax(`./data/categories.json`)
            .then(url => {
                url.forEach(element => {
                    let $li_categories=$('<li>');
                    $li_categories.appendTo($ul_categories)
                        .addClass('list-group-item')
                        .text(element.title)
                        .attr('id',element.id)
                        .attr('data-status', 'close');
                    console.log(element)
                });
            })
            .catch(error => reject(error));

    $('#categories').on('click', '.list-group-item',function () {
         if ($(this).attr('data-status') == 'close') {
        $(this).attr('data-status','open')
        ajax(`./data/products.json`)
            .then(url => {
                url.forEach(element => {
                        if (element.category_id == $(this).attr('id')) {
                            $('<div>').appendTo($(this)).append($('<h1>').text(element.title)).append($('<h2>').text(element.description)).append($('<h2>').text(element.runtime));
                        }
                    })
                })
            }else{
                $(this).attr('data-status', 'close')
                flag = true;
                $(this).children().remove();
            }
        })
    })