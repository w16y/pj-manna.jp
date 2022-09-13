const hoge = async() => {
    const url = "data.json";
    const data = await fetch(url).then(res => res.json());
    console.log(data);
    week_arr = getWeekChekbox();
    console.log(week_arr);
    credit_arr = getCreditChekbox();
    console.log(credit_arr);

    let src = data.map(function(i) {
            for (let j = 0; j < week_arr.length; j++) {
                if (i.week === week_arr[j]) {
                    return '<tr>' +
                        '<td>' + i.subject + '</td>' +
                        '<td>' + i.name + '</td>' +
                        '<td>' + i.credit + '</td>' +
                        '<td>' + i.textbook_flg + '</td>' +
                        '<td>' + '<a href="' + i.sylabus_link + '">' + i.sylabus_link + ' </a></td> ' +
                        // '<td>' + i.sales + '</td>' +
                        '</tr>';
                }
            }
        })
        .join('');
    src = '<table class="table table-bordered">' + '<th>a</th>' +
        '<th>a</th>' +
        '<th>a</th>' +
        '<th>a</th>' +
        '<th>a</th>' + src + '</table>';
    console.log(src);

    const res = document.getElementById('result');
    res.innerHTML = src;
};

//window.addEventListener('DOMContentLoaded', () => {
//hoge();
//});

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

function getCreditChekbox() {
    const arr = [];
    const chk1 = document.form_credit.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}




//request.send();