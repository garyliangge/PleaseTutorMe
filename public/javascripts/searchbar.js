var subjects = [{
  "name": 'Computer Science'},{"name": 'French'},{"name": 'Philosophy'},{"name": 'Environmental Science'},{ "name": 'Spanish'},{"name": 'Biology'},{"name": 'Chemistry'},{"name": 'Mathematics'},{"name": 'Business'},{"name": 'Psychology'},{"name": 'Linguistics'},{"name": 'English'},{"name": 'Political Science'},{"name": 'United States History'},{"name": 'World History'},{"name": 'Electrical Engineering'},{"name": 'Mechanical Engineering'},{"name": 'Chemical Engineering'},{"name": 'Computer Engineering'},{"name": 'Materials Science'},{"name": 'Civil Engineering'},{"name": 'Czech'},{"name": 'Chinese'},{"name": 'Ethics'},{"name": 'Theology'},{"name": 'Physics'},{"name": 'Sociology'},{"name": 'Economics'},{"name": 'Art History'},{"name": 'Environmental Engineering'},{"name": 'German'},{"name": 'Peace and Conflict Studies'},{"name": 'Ethnic Studies'},{"name": 'Cognitive Science'},{"name": 'Neuroscience'},{"name": 'Legal Studies'},{"name": 'Biomedical Engineering'},{"name": 'Astronomy'},{"name": 'Actuarial Science'
}];

var options = {keys:['name'], id:'name'};
var f = new Fuse(subjects, options);
var finished = [];
var results;
var str = "";
var displayed = [];

// function search(){
// displayed = [];
//
// // document.getElementById("selected").innerHTML = finished;
// // document.getElementById("output").innerHTML = null;
// str = document.getElementById("searchbar").value;
//
// results = f.search(str);
// // for(var i = 0; i < results.length; i++){
//   // if(finished.indexOf(results[0]) < 0){
//     // var li = document.createElement("li");
//     // var text = document.createTextNode(results[i]);
//     // displayed.push(results[i]);
//     // li.appendChild(text);
//     // document.getElementById("output").appendChild(li);
//   alert("YES!@@@@@@@@@@@@@@@@#@#!#")
//     console.log(results);
//     document.getElementById("searchres").value = results[0];
//   // }
// // }
//
// }
function submit(event){
var key = event.keyCode;

  if(finished.length < 1){
      if(finished.indexOf(displayed[0]) < 0 && displayed[0] != null)
        finished.push(displayed[0]);
  }
  document.getElementById("searchbar").value = null;

}
function sub(event){
  // alert(document.getElementById("searchres").value)
var key = event.keyCode;
if(key == 13){
  document.getElementById('but').click();
}
}
