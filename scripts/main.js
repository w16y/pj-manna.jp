let request = new XMLHttpRequest();
request.open('GET', 'https://syllabus-cf2b9-default-rtdb.firebaseio.com/.json');
request.responseType = 'json';

request.onload = function() {
    let response = request.response;
    console.log(response);
    console.log(typeof(response));

    let src = response.map(function(i) {
            return '<tr>' +
                '<td>' + i.subject + '</td>' +
                '<td>' + i.name + '</td>' +
                '<td>' + i.credit + '</td>' +
                '<td>' + i.textbook_flg + '</td>' +
                '<td>' + '<a href="' + i.sylabus_link + '">' + i.sylabus_link + ' </a></td> ' +
                // '<td>' + i.sales + '</td>' +
                '</tr>';
        })
        .join('');
    src = '<table class="table table-bordered">' + src + '</table>';
    console.log(src);

    const res = document.getElementById('result');
    res.innerHTML = src;
};

//request.send();