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
                // '<td>' + i.maker + '</td>' +
                // '<td>' + i.release + '</td>' +
                // '<td>' + i.price + '</td>' +
                // '<td>' + i.sales + '</td>' +
                '</tr>';
        })
        .join('');
    src = '<table>' + src + '</table>';
    console.log(src);

    const res = document.getElementById('result');
    res.innerHTML = src;
};

//request.send();