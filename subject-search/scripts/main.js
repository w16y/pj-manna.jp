const initialize = async() => {
    const url = "./data.json";
    const data = await fetch(url).then(res => res.json());
    draw(data);
};

function draw(data) {
    const week_list = ['', '月', '火', '水', '木', '金'];
    const textbook_flg_list = ['なし', 'あり'];
    let src = data.map(function(i) {
        return '<tr>' +
            '<td>' + week_list[i.week] + '</td>' +
            '<td>' + i.period + '</td>' +
            '<td>' + i.subject + '</td>' +
            '<td>' + i.name + '</td>' +
            '<td>' + i.credit + '</td>' +
            '<td>' + textbook_flg_list[i.textbook_flg] + '</td>' +
            '<td>' + '<a href="' + i.sylabus_link + '">' + i.sylabus_link + ' </a></td> ' +
            '</tr>';
    }).join('');
    src = '<table class="table table-bordered">' +
        '<th>曜日</th>' +
        '<th>単位</th>' +
        '<th>講義名</th>' +
        '<th>教員名</th>' +
        '<th>単位</th>' +
        '<th>教科書有無</th>' +
        src +
        '</table>';
    const res = document.getElementById('result');
    res.innerHTML = src;
}

const dataFilter = async() => {
    const url = "./data.json";
    const data = await fetch(url).then(res => res.json());
    const text = document.getElementById('input_text').value;
    console.log(text);
    const name_value = getNameForm();
    console.log(name_value);
    //const nameSelect = document.getElementById('t_name').value;
    let week_list = getWeekCheckbox();
    console.log(week_list);
    let period_list = getPeriodCheckbox();
    console.log(period_list);
    let semester_list = getSemesterCheckbox();
    console.log(semester_list);
    let credit_list = getCreditCheckbox();
    console.log(credit_list);
    let textbook_flg_list = getTextbookFlgCheckbox();
    console.log(textbook_flg_list);

    let filtered_data = data;

    if (name_value.length > 0) {
        console.log(name_value.length);
        console.log(filtered_data.name);
        filtered_data = filtered_data.filter(d => d.name === name_value);
    }


    if (subject_text.length > 0) {
        console.log('here');
        filtered_data = filtered_data.filter(d => d.subject.match(new RegExp(subject_text,'g')));
    }


    if (week_list > 0) {
        for (let i = 0; i < week_list.length; i++) {
            filtered_data = filtered_data.filter(d => d.week === week_list[i]);
        }
    }
    if (period_list > 0) {
        for (let i = 0; i < period_list.length; i++) {
            filtered_data = filtered_data.filter(d => d.period === period_list[i]);
        }
    }
    if (semester_list > 0) {
        for (let i = 0; i < semester_list.length; i++) {
            filtered_data = filtered_data.filter(d => d.semester === semester_list[i]);
        }
    }
    if (credit_list >= 0) {
        for (let i = 0; i < credit_list.length; i++) {
            filtered_data = filtered_data.filter(d => d.credit === credit_list[i]);
        }
    }
    if (textbook_flg_list >= 0) {
        for (let i = 0; i < textbook_flg_list.length; i++) {
            filtered_data = filtered_data.filter(d => d.textbook_flg === textbook_flg_list[i]);
        }
    }


    /*
    let src = data.map(function(i) {
            for (let j = 0; j < week_arr.length; j++) {

                if (i.week === week_arr[j]) {
                    return '<tr>' +
                        '<td>' + i.subject + '</td>' +
                        '<td>' + i.name + '</td>' +
                        '<td>' + i.credit + '</td>' +
                        '<td>' + i.textbook_flg + '</td>' +
                        '<td>' + '<a href="' + i.sylabus_link + '">' + i.sylabus_link + ' </a></td> ' +
                        '</tr>';
                }
            }
        })
        .join('');
    */
    draw(filtered_data);
};

window.addEventListener('DOMContentLoaded', () => {
    initialize();
});

function getSubjectForm() {
    const textbox = document.querySelector("#input_text").value;
    return textbox;
}

function getNameForm() {
    let value = document.querySelector("#t_name").value;
    if (value === '教員を選んでください') {
        value = '';
    }
    return value;
}

function getWeekCheckbox() {
    const arr = [];
    const chk1 = document.form_week.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}

function getPeriodCheckbox() {
    const arr = [];
    const chk1 = document.form_period.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}

function getSemesterCheckbox() {
    const arr = [];
    const chk1 = document.form_semester.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}

function getCreditCheckbox() {
    const arr = [];
    const chk1 = document.form_credit.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}

function getTextbookFlgCheckbox() {
    const arr = [];
    const chk1 = document.form_textbook_flg.chk1;
    for (let i = 0; i < chk1.length; i++) {
        if (chk1[i].checked) {
            arr.push(chk1[i].value);
        }
    }
    return arr;
}

//request.send();