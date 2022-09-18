//初期データ表示
const initialize = async() => {
    const url = "./data.json";
    const data = await fetch(url).then(res => res.json());
    draw(data);
};
//テーブル表示
function draw(data) {
    console.log("data", data);
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
        '<th>時限</th>' +
        '<th>講義名</th>' +
        '<th>教員名</th>' +
        '<th>単位</th>' +
        '<th>教科書有無</th>' +
        '<th>シラバス</th>' +
        src +
        '</table>';
    const res = document.getElementById('result');
    res.innerHTML = src;
}
//データのフィルター
const dataFilter = async() => {
    const url = "./data.json";
    const data = await fetch(url).then(res => res.json());
    // 講義名
    const subject_text = getSubjectForm();
    console.log("subject_text", subject_text);
    // 教員名
    const name_value = getNameForm();
    console.log("name_value", name_value);
    // 曜日
    let week_list = getWeekCheckbox();
    console.log("week_list", week_list);
    // 時限
    let period_list = getPeriodCheckbox();
    console.log("period_list", period_list);
    // 学期
    let semester_list = getSemesterCheckbox();
    console.log("semester_list", semester_list);
    // 単位
    let credit_list = getCreditCheckbox();
    console.log("credit_list", credit_list);
    // 教科書有無
    let textbook_flg_list = getTextbookFlgCheckbox();
    console.log("textbook_flg_list", textbook_flg_list);

    // gtag('event', 'searchbutton_click', {
    //     'subject': subject_text,
    //     'name': name_value,
    //     'week': week_list.toString(),
    //     'period': period_list.toString(),
    //     'semester': semester_list.toString(),
    //     'credit': credit_list.toString(),
    //     'textbook_flg': textbook_flg_list.toString()
    // });

    let filtered_data = data;
    console.log("filtered_data", filtered_data);

    //講義名フィルター
    if (subject_text.length > 0) {
        console.log('here');
        filtered_data = filtered_data.filter(d => d.subject.match(new RegExp(subject_text, 'g')));
    }
    console.log("filtered_data1", filtered_data);
    //教員名フィルター
    if (name_value.length > 0) {
        console.log(name_value.length);
        console.log(filtered_data.name);
        filtered_data = filtered_data.filter(d => d.name === name_value);
    }
    console.log("filtered_data2", filtered_data);
    //曜日フィルター
    //if (week_list.length > 0) {
    //     let temp = [];
    //     let temp2 = [];
    //     for (let i = 0; i < week_list.length; i++) {
    //         temp[i] = filtered_data.filter(d => d.week === week_list[i]);
    //     }
    //     console.log(temp);
    //     for (let i = 0; i < temp.length; i++) {
    //         for (let j = 0; j < temp[i].length; j++) {
    //             temp2.push(temp[i][j]);
    //         }
    //     }
    //     console.log(temp2);
    //     filtered_data = temp2;
    // }
    if (week_list.length > 0) {
        filtered_data = ListFilter(filtered_data, week_list, 'week');
    }
    console.log("filtered_data3", filtered_data);

    //時限フィルター
    if (period_list.length > 0) {
        filtered_data = ListFilter(filtered_data, period_list, 'period');
    }
    console.log("filtered_data4", filtered_data);

    //学期フィルター
    if (semester_list.length > 0) {
        filtered_data = ListFilter(filtered_data, semester_list, 'semester');
    }
    console.log("filtered_data5", filtered_data);

    //単位フィルター
    if (credit_list.length > 0) {
        filtered_data = ListFilter(filtered_data, credit_list, 'credit');
    }
    console.log("filtered_data6", filtered_data);

    //教科書有無フィルター
    if (textbook_flg_list.length > 0) {
        filtered_data = ListFilter(filtered_data, textbook_flg_list, 'textbook_flg');
    }
    console.log("filtered_data7", filtered_data);




    function ListFilter(rawdata, condition_list, key_name) {
        let temp1 = [];
        let temp2 = [];
        if (condition_list.length > 0) {
            for (let i = 0; i < condition_list.length; i++) {
                temp1[i] = rawdata.filter(d => d[key_name] === condition_list[i]);
            }
            console.log(temp1);
            for (let i = 0; i < temp1.length; i++) {
                for (let j = 0; j < temp1[i].length; j++) {
                    temp2.push(temp1[i][j]);
                }
            }
            console.log(temp2);
        }
        return temp2;
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
//画面読み込み後実行
window.addEventListener('DOMContentLoaded', () => {
    initialize();
});
//講義名情報取得
function getSubjectForm() {
    const textbox = document.querySelector("#input_text").value;
    return textbox;
}
//教員名情報取得
function getNameForm() {
    let value = document.querySelector("#t_name").value;
    if (value === '教員を選んでください') {
        value = '';
    }
    return value;
}
//曜日情報取得
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
//時限情報取得
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
//学期情報取得
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
//単位情報取得
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
//教科書有無情報取得
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