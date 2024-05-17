const DEBUG = true

if (DEBUG == true) {
  var API_URL = "http://127.0.0.1:8000/SteamQuiz/api"
  var MAIN_URL = "http://127.0.0.1:8000/SteamQuiz/"
} else if (DEBUG == false) {
    var API_URL = "https://personaquiz.onrender.com/SteamQuiz/api"
    var MAIN_URL = "https://personaquiz.onrender.com/SteamQuiz"
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const quiz_id = urlParams.get('id')

console.log(quiz_id)

// Get quiz already made <--------------------------------<

const get_questions = function(request_id="1"){
    fetch(`${API_URL}/test/`)
    .then( response => {
    fetch(`${API_URL}/read/${request_id}`).then(response => response.json()).then(
        function(data){
        // se o data retornar um erro, ele mostra o erro.
        if(data["status"] != "Quiz Carregado!"){
            entrar.style.display = "inline-block"
            return document.getElementById("error").innerHTML = data["status"]

        } 
        else {
            // salva as informações coletadas do quiz do servidor
            let quiz_data = JSON.stringify(data);
            localStorage.setItem('quiz_data', quiz_data);
            const quiz_path = "/SteamQuiz/quiz/?id=" + request_id
                return window.location = quiz_path
        }
    });
    })
    .catch(error => {
        let error_label = document.getElementById("error") 
        return error_label.innerHTML = "Erro do servidor, tente novamente mais tarde."
    })
}

// SEARCH BAR BEHAVIOUR
let searchBar = document.getElementById("searchBar")
searchBar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (searchBar === document.activeElement) {
            let quizID = searchBar.value

            // checking if is a url in the search bar or an id
            if (quizID.startsWith(API_URL)) {
                get_questions(quizID.slice(-6))
            }
            else if (quizID.length == 6) {
                get_questions(quizID)
            } 
            else {
                // TODO: TRIGGER ERROR POPUP
                return
            }
        }
    }
})

/* INDEX PAGE STUFF */
    let startQuizBtn = document.getElementById("startQuiz")
    startQuizBtn.onclick = () => {
        searchBar.focus()
}