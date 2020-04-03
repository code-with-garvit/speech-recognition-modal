const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const synth = window.speechSynthesis;
const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const youtube = 'https://www.youtube.com/';

const prime_minster = "The Prime Minister of India is Narendra Modi";

const greetings = [
    'i am okay',
    'i am good',
    'i am fine'
];
const bye = [
    'Nice talking with youx',
    'It was great to talk with you'
];
var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            
            var time = h + ":" + m + ":" + s;


const president = 'Mr.Ram Nath Kovind is the president of India';

const intro = 'I am Jarvis Your Personal Assistant';

const boss = 'Garvit Motwani made me';

const cm = 'Mr. Kamal Nath is the chief minister of Madhya Pradesh';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function(){
    console.log("voice is activated you can speak");
};

recognition.onresult = function(event){
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
    console.log(transcript);
};

//add event listner to the button

btn.addEventListener('click',() => {
    recognition.start();
});

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance;
    speech.text = 'i dont know what you are speaking';
    if(message.includes('how are you')){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }
    
    if(message.includes('who are you')){
        speech.text = intro;
    }

    if(message.includes('who is the Prime Minister of India')){
        speech.text = prime_minster;
     }
     if(message.includes('who is the president of India')){
        speech.text = president;
     }
    if(message.includes('bye-bye')){
        const byeBye = bye[Math.floor(Math.random() * bye.length)];
        speech.text = byeBye;
    }
    if(message.includes('who made you')){
        speech.text = boss;
    }
    if(message.includes('who is the chief minister of Madhya Pradesh')){
        speech.text = cm;
    }
    if(message.includes('open YouTube')){
        window.open(youtube);
        speech.text = 'Okay';
    }
    if(message.includes('what is the time')){
            speak(getTime);
		speech.text = " ";
    }
	
	if(message.includes('what is the date')){
		speak(getData);
		speech.text = " ";
	}
	
	
	
	if(message.includes('what is the weather in ') || message.includes('what is the temperature in ')){
		getTheWeather(message);
		speech.text = " ";
	}
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString('hi-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
  const time = new Date(Date.now());
  return `today is ${time.toLocaleDateString()}`;
};
const getTheWeather = (speech) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`) 
  .then(function(response){
    return response.json();
  })
  .then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      synth.speak(utterThis);
      return;
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    synth.speak(utterThis);
  });
};