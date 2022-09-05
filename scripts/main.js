let request = new XMLHttpRequest();
request.open('GET', 'https://syllabus-cf2b9-default-rtdb.firebaseio.com/.json');
request.responseType = 'text';

request.onload = function() {
    let response = request.response;
    console.log(response);
    const res = document.getElementById('result');
    res.innerHTML = response;
};

//request.send();