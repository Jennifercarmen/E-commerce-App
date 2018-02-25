//Nombre de las categorias
//https://api.mercadolibre.com/sites/MPE/search?access_token=APP_USR-4726736622395871-022319-beab0480f3b30a3f47723e210954ed75__K_N__-303804231&q=ipod&limit=10&price=100.0-300.0&condition=new
const btnHxr = document.getElementById('yop');
const containerCat = document.getElementById('categories');
const sect = document.getElementsByName('section');

btnHxr.addEventListener('click', (e) => {
  e.preventDefault();
  search();
});

const search = function() {
  let host = 'https://api.mercadolibre.com/';
  let categories = 'sites/MPE/categories';

  let XHR = new XMLHttpRequest();
  let uri = `${host}/${categories}`;
  //let proxy = 'https://cors-anywhere.herokuapp.com/';

  XHR.open('GET', uri);

  XHR.onload = successCallback;
  XHR.onerror = errorCallback;
  XHR.send();
};

const successCallback = function() {
  let data = JSON.parse(this.responseText);
  let cat = data.id;
  console.log(data);
  data.forEach(function(element, i) {
    console.log(element);
    console.log(i);
    
    //sect.find('.categories').append('<p/>');

});
};

const errorCallback = function() {
  cl('Ocurrio un error!!!');
};
