function hoge() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://syllabus-cf2b9-default-rtdb.firebaseio.com/.json');
    request.responseType = 'json';
    request.send();
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
}

function getWeekChekbox() {
    const arr = [];
    const chk1 = document.form_week.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}



//request.send();